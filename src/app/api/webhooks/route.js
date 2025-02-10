
// import { Webhook } from "svix";

// import { headers } from "next/headers";
// import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
// import { clerkClient } from "@clerk/clerk-sdk-node";

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;
  
//   if (!SIGNING_SECRET) {
//     console.error("❌ SIGNING_SECRET is missing. Check your .env file.");
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // ✅ Create Svix instance
//   const wh = new Webhook(SIGNING_SECRET);

//   // ✅ Get headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // ✅ Check if headers exist
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     console.error("❌ Missing Svix headers.");
//     return new Response("Error: Missing Svix headers", { status: 400 });
//   }

//   // ✅ Get request body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;

//   // ✅ Verify payload
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("❌ Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", { status: 400 });
//   }

//   // ✅ Extract event data
//   const { id } = evt?.data;
//   const eventType = evt?.type;

//   console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
//   console.log("Webhook payload:", body);

 

//   // ✅ Handle user.created & user.updated events
//   if (eventType === "user.created") {
//     try {
//       await prisma.user.create({
//         data: {
//           id: evt.data.id,
//           username: JSON.parse(body).data.username,
//           email: JSON.parse(body).data.email_addresses[0].email_address,
//           img: JSON.parse(body).image_url || "" 
//         },
//       });
//       return new Response("User created", { status: 200 });
//     } catch (err) {
//       console.log(err);
//       return new Response("Error: Failed to create a user!", {
//         status: 500,
//       });
//     }
//   }

//   // ✅ Handle user.deleted event
//   if (eventType === "user.deleted") {
//     try {
//       await prisma.user.delete({ where: { id: evt.data.id } });
//       return new Response("User deleted", { status: 200 });
//     } catch (err) {
//       console.log(err);
//       return new Response("Error: Failed to create a user!", {
//         status: 500,
//       });
//     }
//   }

//   return new Response("✅ Webhook received", { status: 200 });
// }


// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { PrismaClient } from "@prisma/client";  // Ensure this import is here
// import { clerkClient } from "@clerk/clerk-sdk-node";

// const prisma = new PrismaClient(); // Initialize Prisma client

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     console.error("❌ SIGNING_SECRET is missing. Check your .env file.");
//     throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local");
//   }

//   const wh = new Webhook(SIGNING_SECRET);

//   // Get headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // Check if headers exist
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     console.error("❌ Missing Svix headers.");
//     return new Response("Error: Missing Svix headers", { status: 400 });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("❌ Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", { status: 400 });
//   }

//   const { id, username, email_addresses, image_url } = evt?.data || {};
//   const eventType = evt?.type;

//   console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
//   console.log("Webhook payload:", body);

//   // Handle user.created event
//   if (eventType === "user.created") {
//     if (!id || !username || !email_addresses?.[0]?.email_address) {
//       console.error("❌ Missing necessary user data.");
//       return new Response("Error: Invalid event data", { status: 400 });
//     }

//     try {
//       await prisma.user.create({
//         data: {
//           id,
//           username,
//           email: email_addresses[0].email_address,
//           img: image_url || "",
//         },
//       });
//       return new Response("User created", { status: 200 });
//     } catch (err) {
//       console.log("❌ Error while creating user:", err);
//       return new Response("Error: Failed to create a user!", { status: 500 });
//     }
//   }

//   // Handle user.deleted event
//   if (eventType === "user.deleted") {
//     if (!id) {
//       console.error("❌ Missing user ID for deletion.");
//       return new Response("Error: Missing user ID", { status: 400 });
//     }

//     try {
//       await prisma.user.delete({ where: { id } });
//       return new Response("User deleted", { status: 200 });
//     } catch (err) {
//       console.log("❌ Error while deleting user:", err);
//       return new Response("Error: Failed to delete a user!", { status: 500 });
//     }
//   }

//   return new Response("✅ Webhook received", { status: 200 });
// // }
// import prisma from "@/utils/connect";
// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
//     )
//   }

//   // Create Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload = await headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     })
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err)
//     return new Response('Error: Verification error', {
//       status: 400,
//     })
//   }

//   // Log the event
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)

//   // Handle user.created event
//   if (eventType === 'user.created') {
//     try {
//       await prisma.user.create({
//         data: {
//           id: evt.data.id,
//           username: JSON.parse(body).data.username,
//           email: JSON.parse(body).data.email_addresses[0].email_address,
//           img: JSON.parse(body).image_url || '',
//         },
//       })
//       return new Response('User created', { status: 200 })
//     } catch (err) {
//       console.log(err)
//       return new Response('Error: Failed to create a user!', {
//         status: 500,
//       })
//     }
//   }

//   // Handle user.deleted event
//   if (eventType === 'user.deleted') {
//     try {
//       await prisma.user.delete({ where: { id: evt.data.id } })
//       return new Response('User deleted', { status: 200 })
//     } catch (err) {
//       console.log(err)
//       return new Response('Error: Failed to delete user!', {
//         status: 500,
//       })
//     }
//   }

//   return new Response('Webhook received', { status: 200 })
// }


// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { clerkClient } from "@clerk/clerk-sdk-node";  // Clerk SDK to manage user data in Clerk
// import prisma from "@/utils/connect";  // Prisma Client to interact with your database

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     console.error("❌ SIGNING_SECRET is missing. Check your .env file.");
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // ✅ Create Svix instance with the secret
//   const wh = new Webhook(SIGNING_SECRET);

//   // ✅ Get headers from request
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // ✅ Check if headers exist
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     console.error("❌ Missing Svix headers.");
//     return new Response("Error: Missing Svix headers", { status: 400 });
//   }

//   // ✅ Get request body (payload)
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;

//   // ✅ Verify payload with Svix secret
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("❌ Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", { status: 400 });
//   }

//   // ✅ Extract event data
//   const { id } = evt?.data;
//   const eventType = evt?.type;

//   console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
//   console.log("Webhook payload:", body);

//   // ✅ Ensure Clerk Client is Available
//   if (!clerkClient || !clerkClient.users) {
//     console.error("❌ Clerk client is undefined. Check your Clerk setup.");
//     return new Response("Error: Clerk client not available", { status: 500 });
//   }

//   // ✅ Handle user.created & user.updated events
//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { first_name, last_name, image_url, email_addresses, username } = evt?.data;

//     try {
//       // Step 1: Synchronize with Prisma Database
//       const user = await prisma.user.upsert({
//         where: { id: id },
//         update: {
//           username: username,
//           email: email_addresses[0]?.email_address,  // Assuming only one email address
//           img: image_url || "",  // Default empty image if not provided
//         },
//         create: {
//           id: id,
//           username: username,
//           email: email_addresses[0]?.email_address,
//           img: image_url || "",
//         },
//       });

//       console.log(`User ${id} created or updated in the database`);

//       // Step 2: Synchronize with Clerk
//       if (user) {
//         await clerkClient.users.updateUser(id, {
//           publicMetadata: {
//             userMongoId: user.id,  // Sync the MongoDB ID with Clerk
//             role: user.role || "user",  // Default to "user" if no role
//           },
//         });
//         console.log(`✅ Clerk metadata updated for user ${id}`);
//       }
//     } catch (error) {
//       console.error("❌ Error creating or updating user:", error);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   // ✅ Handle user.deleted event
//   if (eventType === "user.deleted") {
//     try {
//       // Step 1: Delete user from Prisma database
//       await prisma.user.delete({ where: { id: id } });
//       console.log(`✅ User ${id} deleted from the database`);

//       // Step 2: Delete user from Clerk
//       await clerkClient.users.deleteUser(id);
//       console.log(`✅ User ${id} deleted from Clerk`);

//     } catch (error) {
//       console.error("❌ Error deleting user:", error);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   return new Response("✅ Webhook received", { status: 200 });
// }


// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { clerkClient } from "@clerk/clerk-sdk-node";  // Clerk SDK to manage user data in Clerk
// import prisma from "@/utils/connect";  // Prisma Client to interact with your database

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     console.error("❌ SIGNING_SECRET is missing. Check your .env file.");
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // ✅ Create Svix instance with the secret
//   const wh = new Webhook(SIGNING_SECRET);

//   // ✅ Get headers from request
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // ✅ Check if headers exist
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     console.error("❌ Missing Svix headers.");
//     return new Response("Error: Missing Svix headers", { status: 400 });
//   }

//   // ✅ Get request body (payload)
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;

//   // ✅ Verify payload with Svix secret
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//     console.log("Webhook payload verified:", evt);
//   } catch (err) {
//     console.error("❌ Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", { status: 400 });
//   }

//   // ✅ Extract event data
//   const { id } = evt?.data;
//   const eventType = evt?.type;

//   console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
//   console.log("Webhook payload:", body);

//   // ✅ Ensure Clerk Client is Available
//   if (!clerkClient || !clerkClient.users) {
//     console.error("❌ Clerk client is undefined. Check your Clerk setup.");
//     return new Response("Error: Clerk client not available", { status: 500 });
//   }

//   // ✅ Handle user.created & user.updated events
//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { first_name, last_name, image_url, email_addresses, username } = evt?.data;

//     try {
//       // Step 1: Synchronize with Prisma Database
//       const user = await prisma.user.upsert({
//         where: { userId: id },  // Ensure this is using Clerk's userId
//         update: {
//           name: `${first_name} ${last_name}`, // Combine first and last names
//           email: email_addresses[0]?.email_address,  // Handle email if present
//           image: image_url || "",  // Default empty image if not provided
//         },
//         create: {
//           userId: id,  // Clerk's unique userId
//           name: `${first_name} ${last_name}`,  // Store full name
//           email: email_addresses[0]?.email_address,  // Store email if present
//           image: image_url || "",  // Store image if present
//           role: "user",
//           createdAt: new Date(),  // Timestamp for creation
//           updatedAt: new Date(),  // Timestamp for the update
//         },
//       });

//       console.log(`User ${id} created or updated in the Prisma database`);

//       // Step 2: Synchronize with Clerk (update metadata)
//       if (user) {
//         await clerkClient.users.updateUser(id, {
//           publicMetadata: {
//             userMongoId: user.userId,  // Sync the MongoDB ID with Clerk
//             role: user.role || "user",  // Default to "user" if no role
//           },
//         });
//         console.log(`✅ Clerk metadata updated for user ${id}`);
//       }
//     } catch (error) {
//       console.error("❌ Error creating or updating user:", error);
//       return new Response("Error occurred during user creation or update", { status: 400 });
//     }
//   }

//   // ✅ Handle user.deleted event
//   if (eventType === "user.deleted") {
//     try {
//       // Step 1: Delete user from Prisma database
//       await prisma.user.delete({ where: { userId: id } });
//       console.log(`✅ User ${id} deleted from the database`);

//       // Step 2: Delete user from Clerk
//       await clerkClient.users.deleteUser(id);
//       console.log(`✅ User ${id} deleted from Clerk`);

//     } catch (error) {
//       console.error("❌ Error deleting user:", error);
//       return new Response("Error occurred during user deletion", { status: 400 });
//     }
//   }

//   return new Response("✅ Webhook received", { status: 200 });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Clerk SDK to manage user data in Clerk
import prisma from "@/utils/connect"; // Prisma Client to interact with your database

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("❌ SIGNING_SECRET is missing. Check your .env file.");
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
    console.error("❌ Missing Svix headers.");
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
    console.log("Webhook payload verified:", evt);
  } catch (err) {
    console.error("❌ Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  // ✅ Extract event data
  const { id } = evt?.data;
  const eventType = evt?.type;

  console.log(`📩 Received webhook with ID ${id} and event type: ${eventType}`);
  console.log("Webhook payload:", body);

  // ✅ Ensure Clerk Client is Available
  if (!clerkClient || !clerkClient.users) {
    console.error("❌ Clerk client is undefined. Check your Clerk setup.");
    return new Response("Error: Clerk client not available", { status: 500 });
  }

  // ✅ Handle user.created & user.updated events
  if (eventType === "user.created" || eventType === "user.updated") {
    const { first_name, last_name, image_url, email_addresses, username } = evt?.data;

    try {
      // Step 1: Synchronize with Prisma Database
      const user = await prisma.user.upsert({
        where: { userId: id }, // Ensure this is using Clerk's userId
        update: {
          name: `${first_name} ${last_name}`, // Combine first and last names
          email: email_addresses[0]?.email_address,  // Handle email if present
          image: image_url || "",  // Default empty image if not provided
        },
        create: {
          userId: id,  // Clerk's unique userId
          name: `${first_name} ${last_name}`,  // Store full name
          email: email_addresses[0]?.email_address,  // Store email if present
          image: image_url || "",  // Store image if present
          role: "user",
          createdAt: new Date(),  // Timestamp for creation
          updatedAt: new Date(),  // Timestamp for the update
        },
      });

      console.log(`User ${id} created or updated in the Prisma database`);

      // Step 2: Synchronize with Clerk (update metadata)
      if (user) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            userMongoId: user.userId,  // Sync the MongoDB ID with Clerk
            role: user.role || "user",  // Default to "user" if no role
          },
        });
        console.log(`✅ Clerk metadata updated for user ${id}`);
      }
    } catch (error) {
      console.error("❌ Error creating or updating user:", error);
      return new Response("Error occurred during user creation or update", { status: 400 });
    }
  }

  // ✅ Handle user.deleted event
  if (eventType === "user.deleted") {
    try {
      // Step 1: Delete user from Prisma database
      await prisma.user.delete({ where: { userId: id } });
      console.log(`✅ User ${id} deleted from the database`);

      // Step 2: Delete user from Clerk
      await clerkClient.users.deleteUser(id);
      console.log(`✅ User ${id} deleted from Clerk`);

    } catch (error) {
      console.error("❌ Error deleting user:", error);
      return new Response("Error occurred during user deletion", { status: 400 });
    }
  }

  return new Response("✅ Webhook received", { status: 200 });
}
