// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'
// import  { clerkClient } from '@clerk/nextjs/server'

// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Create new Svix instance with secret
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

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt?.data
//   const eventType = evt?.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)

  
//   if (eventType === 'user.created' || eventType === 'user.updated') {
//     const { id, first_name, last_name, image_url, email_addresses, username } =
//       evt?.data;
//     try {
//       const user = await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         image_url,
//         email_addresses,
//         username
//       );
//       if (user && eventType === 'user.created') {
//         try {
//           await clerkClient.users.updateUserMetadata(id, {
//             publicMetadata: {
//               userMongoId: user._id,
//               isAdmin: user.isAdmin,
//             },
//           });
//         } catch (error) {
//           console.log('Error updating user metadata:', error);
//         }
//       }
//     } catch (error) {
//       console.log('Error creating or updating user:', error);
//       return new Response('Error occured', {
//         status: 400,
//       });
//     }
//   }

//   if (eventType === 'user.deleted') {
//     const { id } = evt?.data;
//     try {
//       await deleteUser(id);
//     } catch (error) {
//       console.log('Error deleting user:', error);
//       return new Response('Error occured', {
//         status: 400,
//       });
//     }
//   }
  
//   return new Response('Webhook received', { status: 200 })
// }


import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Error: SIGNING_SECRET is missing in .env");
    return new Response("Error: Missing SIGNING_SECRET", { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);

  // Get necessary headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Check if required headers are present
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing Svix headers");
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  let evt;
  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook signature
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Extract event data
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;
    const eventType = evt?.type;

    console.log(`✅ Received webhook: ${eventType} for user ID: ${id}`);

    if (!id) {
      console.error("Error: Missing user ID in webhook data");
      return new Response("Error: Invalid webhook data", { status: 400 });
    }

    if (eventType === "user.created" || eventType === "user.updated") {
      if (!email_addresses || email_addresses.length === 0) {
        console.error(`Error: Missing email for user ${id}`);
        return new Response("Error: Missing email", { status: 400 });
      }

      try {
        const primaryEmail = email_addresses[0]?.email_address;

        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          primaryEmail,
          username
        );

        if (user && eventType === "user.created") {
          try {
            await clerkClient.users.updateUser(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin,
              },
            });
            console.log(`✅ Updated Clerk metadata for user ${id}`);
          } catch (error) {
            console.error("❌ Error updating Clerk metadata:", error);
          }
        }
      } catch (error) {
        console.error("❌ Error creating/updating user:", error);
        return new Response("Error processing user", { status: 500 });
      }
    }

    if (eventType === "user.deleted") {
      try {
        await deleteUser(id);
        console.log(`✅ Deleted user: ${id}`);
      } catch (error) {
        console.error("❌ Error deleting user:", error);
        return new Response("Error deleting user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    return new Response("Error processing webhook", { status: 500 });
  }
}
