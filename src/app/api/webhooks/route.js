// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import prisma from "@/utils/connect";

// export async function POST(req) {
//   try {
//     const SIGNING_SECRET = process.env.SIGNING_SECRET;

//     if (!SIGNING_SECRET) {
//       console.error("Missing SIGNING_SECRET in environment variables");
//       return new Response("Error: Missing SIGNING_SECRET", { status: 500 });
//     }

//     console.log("📩 Webhook received");

//     // ✅ Create Svix instance
//     const wh = new Webhook(SIGNING_SECRET);

//     // ✅ Get headers from request
//     const headerPayload = headers(); // headers() is synchronous in Next.js
//     const svix_id = headerPayload.get("svix-id");
//     const svix_timestamp = headerPayload.get("svix-timestamp");
//     const svix_signature = headerPayload.get("svix-signature");

//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       console.error("Missing Svix headers");
//       return new Response("Error: Missing Svix headers", { status: 400 });
//     }

//     // ✅ Get request body
//     const payload = await req.json();
//     const body = JSON.stringify(payload);

//     let evt;
//     try {
//       evt = wh.verify(body, {
//         "svix-id": svix_id,
//         "svix-timestamp": svix_timestamp,
//         "svix-signature": svix_signature,
//       });
//     } catch (err) {
//       console.error("❌ Verification failed:", err.message);
//       return new Response("Error: Verification error", { status: 400 });
//     }

//     const { id } = evt?.data;
//     const eventType = evt?.type;

//     if (!id) {
//       console.error("❌ Missing user ID in event data");
//       return new Response("Error: Missing user ID", { status: 400 });
//     }

//     console.log(`✅ Event received: ${eventType} for user ${id}`);

//     if (!clerkClient || !clerkClient.users) {
//       console.error("Clerk client is not available");
//       return new Response("Error: Clerk client not available", { status: 500 });
//     }

//     // ✅ Handle user.created & user.updated events
//     if (eventType === "user.created" || eventType === "user.updated") {
//       const { first_name, last_name, image_url, email_addresses } = evt?.data;

//       const email = email_addresses?.[0]?.email_address || "";
//       if (!email) {
//         console.error("❌ Missing email address");
//         return new Response("Error: Missing email", { status: 400 });
//       }

//       try {
//         // Step 1: Synchronize with Prisma Database
//         const user = await prisma.user.upsert({
//           where: { userId: id },
//           update: {
//             name: `${first_name || ""} ${last_name || ""}`.trim(),
//             email,
//             image: image_url || "",
//             updatedAt: new Date(),
//           },
//           create: {
//             userId: id,
//             name: `${first_name || ""} ${last_name || ""}`.trim(),
//             email,
//             image: image_url || "",
//             role: "user",
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         });

//         console.log(`✅ User ${id} synchronized with Prisma`);

//         // Step 2: Update metadata in Clerk
//         if (user) {
//           await clerkClient.users.updateUser(id, {
//             publicMetadata: {
//               userMongoId: user.userId,
//               role: user.role || "user",
//             },
//           });
//           console.log(`✅ User metadata updated in Clerk`);
//         }
//       } catch (error) {
//         console.error("❌ Error updating user:", error);
//         return new Response("Error occurred during user creation/update", {
//           status: 500,
//         });
//       }
//     }

//     // ✅ Handle user.deleted event
//     if (eventType === "user.deleted") {
//       try {
//         // Step 1: Delete user from Prisma database
//         await prisma.user.delete({ where: { userId: id } });
//         console.log(`✅ User ${id} deleted from Prisma`);

//         // Step 2: Delete user from Clerk
//         await clerkClient.users.deleteUser(id);
//         console.log(`✅ User ${id} deleted from Clerk`);
//       } catch (error) {
//         console.error("❌ Error deleting user:", error);
//         return new Response("Error occurred during user deletion", {
//           status: 500,
//         });
//       }
//     }

//     return new Response("✅ Webhook processed successfully", { status: 200 });
//   } catch (error) {
//     console.error("❌ Unexpected error:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }



import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "@/utils/connect";

export async function POST(req) {
  try {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) return new Response("Error: Missing SIGNING_SECRET", { status: 500 });

    console.log("📩 Webhook received");

    // ✅ Parse headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) return new Response("Error: Missing Svix headers", { status: 400 });

    // ✅ Verify webhook
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(SIGNING_SECRET);

    let evt;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("❌ Verification failed:", err.message);
      return new Response("Error: Verification error", { status: 400 });
    }

    const { id } = evt?.data;
    const eventType = evt?.type;

    if (!id) return new Response("Error: Missing user ID", { status: 400 });

    console.log(`✅ Event received: ${eventType} for user ${id}`);

    // ✅ Return 200 response quickly to prevent retries
    new Response("✅ Webhook received", { status: 200 });

    // Process updates asynchronously
    (async () => {
      if (eventType === "user.created" || eventType === "user.updated") {
        const { first_name, last_name, image_url, email_addresses } = evt?.data;
        const email = email_addresses?.[0]?.email_address || "";
        if (!email) return;

        try {
          // ✅ Fetch existing user from Prisma
          const existingUser = await prisma.user.findUnique({ where: { userId: id } });

          const updatedData = {
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            email,
            image: image_url || "",
            updatedAt: new Date(),
          };

          // ✅ Only update Prisma if data changed
          if (!existingUser || JSON.stringify(existingUser) !== JSON.stringify(updatedData)) {
            const user = await prisma.user.upsert({
              where: { userId: id },
              update: updatedData,
              create: { userId: id, ...updatedData, role: "user", createdAt: new Date() },
            });

            console.log(`✅ User ${id} synchronized with Prisma`);

            // ✅ Fetch existing metadata from Clerk
            const currentUser = await clerkClient.users.getUser(id);
            const existingMetadata = currentUser.publicMetadata || {};
            const newMetadata = { userMongoId: user.userId, role: user.role || "user" };

            // ✅ Only update Clerk metadata if changed
            if (JSON.stringify(existingMetadata) !== JSON.stringify(newMetadata)) {
              await clerkClient.users.updateUser(id, { publicMetadata: newMetadata });
              console.log(`✅ User metadata updated in Clerk`);
            } else {
              console.log(`⚠️ No metadata change detected, skipping update`);
            }
          } else {
            console.log(`⚠️ No changes detected in Prisma, skipping update`);
          }
        } catch (error) {
          console.error("❌ Error updating user:", error);
        }
      }

      if (eventType === "user.deleted") {
        try {
          await prisma.user.delete({ where: { userId: id } });
          console.log(`✅ User ${id} deleted from Prisma`);

          await clerkClient.users.deleteUser(id);
          console.log(`✅ User ${id} deleted from Clerk`);
        } catch (error) {
          console.error("❌ Error deleting user:", error);
        }
      }
    })();

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
