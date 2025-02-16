import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "@/utils/connect";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // ✅ Create Svix instance with the secret
  const wh = new Webhook(SIGNING_SECRET);

  // ✅ Get headers from request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // ✅ Check if headers exist
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // ✅ Get request body (payload)
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // ✅ Verify payload with Svix secret
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Error: Verification error", { status: 400 });
  }

  // ✅ Extract event data
  const { id } = evt?.data;
  const eventType = evt?.type;

  // console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
  // console.log("Webhook payload:", body);

  // ✅ Ensure Clerk Client is Available
  if (!clerkClient || !clerkClient.users) {
    return new Response("Error: Clerk client not available", { status: 500 });
  }

  // ✅ Handle user.created & user.updated events
  if (eventType === "user.created" || eventType === "user.updated") {
    const { first_name, last_name, image_url, email_addresses, username } =
      evt?.data;

    try {
      // Step 1: Synchronize with Prisma Database
      const user = await prisma.user.upsert({
        where: { userId: id },
        update: {
          name: `${first_name} ${last_name}`,
          email: email_addresses[0]?.email_address,
          image: image_url || "", //
        },
        create: {
          userId: id,
          name: `${first_name} ${last_name}`,
          email: email_addresses[0]?.email_address,
          image: image_url || "",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(`User ${id} created or updated in the Prisma database`);

      // Step 2: Synchronize with Clerk (update metadata)
      if (user) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            userMongoId: user.userId,
            role: user.role || "user",
          },
        });
      }
    } catch (error) {
      return new Response("Error occurred during user creation or update", {
        status: 400,
      });
    }
  }

  // ✅ Handle user.deleted event
  if (eventType === "user.deleted") {
    try {
      // Step 1: Delete user from Prisma database
      await prisma.user.delete({ where: { userId: id } });

      // Step 2: Delete user from Clerk
      await clerkClient.users.deleteUser(id);
    } catch (error) {
      return new Response("Error occurred during user deletion", {
        status: 400,
      });
    }
  }

  return new Response("✅ Webhook received", { status: 200 });
}
