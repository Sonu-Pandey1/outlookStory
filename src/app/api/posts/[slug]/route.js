// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// // GET SINGLE POST
// export const GET = async (req, { params }) => {
//   // Make sure to await the params object before using it
//   const { slug } = await params;  // Await params object
  
//   try {
//     // Update views by incrementing by 1
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true }, // Include user details
//     });

//     console.log(post);  // You can remove this in production
//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };


// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";
// import { getAuthSession } from "@/utils/auth";

// // ✅ GET A SINGLE POST BY SLUG (Increments Views)
// export async function GET(req, { params }) {
//   const { slug } = params;
  
//   try {
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true },
//     });

//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (err) {
//     console.error("Error fetching post:", err);
//     return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
//   }
// }

// // ✅ UPDATE A POST BY SLUG (Requires Authentication)
// export async function PUT(req, { params }) {
//   const session = await getAuthSession();
//   if (!session) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), { status: 401 });
//   }

//   const { slug } = params;
//   const updatedData = await req.json();

//   try {
//     const post = await prisma.post.update({
//       where: { slug },
//       data: updatedData,
//     });

//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (err) {
//     console.error("Error updating post:", err);
//     return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
//   }
// }

// // ✅ DELETE A POST BY SLUG (Requires Authentication)
// export async function DELETE(req, { params }) {
//   const session = await getAuthSession();
//   if (!session) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), { status: 401 });
//   }

//   const { slug } = params;

//   try {
//     await prisma.post.delete({ where: { slug } });
//     return new NextResponse(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
//   } catch (err) {
//     console.error("Error deleting post:", err);
//     return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
//   }
// }


// ✅ GET a Single Post by Slug
// export async function GET(req, { params }) {
//   try {
//     const { slug } = params;
//     if (!slug) return NextResponse.json({ error: "Post slug is required" }, { status: 400 });

//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true },
//     });

//     return NextResponse.json(post, { status: 200 });
//   } catch (err) {
//     console.error("Error fetching post:", err);
//     return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
//   }
// }

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) return new Response("Post ID is required", { status: 400 });

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) return new Response("Post not found", { status: 404 });

  return new Response(JSON.stringify(post), { status: 200 });
}




// ✅ UPDATE a Post by ID
export async function PUT(req, { params }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });

  try {
    const { id } = params;
    const body = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// ✅ DELETE a Post by ID

// export async function DELETE(req, { params }) {
//   try {
//     const { userId } = getAuth(req); // Get Clerk's userId
//     if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const { slug } = params; // Get ID from URL params
//     if (!slug) return NextResponse.json({ message: "Post ID is required" }, { status: 400 });

//     console.log("🗑️ Deleting Post ID:", slug);

//     await prisma.post.delete({ where: { id: slug } });

//     return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
//   } catch (err) {
//     console.error("Error deleting post:", err);
//     return NextResponse.json({ message: "Failed to delete post", error: err.message }, { status: 500 });
//   }
// }
//? this is ok but issues is params 

// export async function DELETE(req, { params }) { // Destructure params directly
//   try {
//     const { userId } = getAuth(req);
//     if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const postId = params?.slug; // No need to extract context
//     const { postId } = await req.json();


//     console.log("🗑️ Deleting Post ID:", postId);

//     if (!postId) return NextResponse.json({ message: "Post ID is required" }, { status: 400 });

//     await prisma.post.delete({ where: { id: postId } });

//     return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
//   } catch (err) {
//     console.error("Error deleting post:", err);
//     return NextResponse.json({ message: "Failed to delete post", error: err.message }, { status: 500 });
//   }
// }

export async function DELETE(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json(); // Get postId from body
    console.log("🗑️ Deleting Post ID:", postId);

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    await prisma.post.delete({ where: { id: postId } });

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json({ message: "Failed to delete post", error: err.message }, { status: 500 });
  }
}



// export async function DELETE(req) {
//   try {
//   const { userId } = getAuth(req); // Get Clerk's userId from auth context
//     if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
//     const { id } = await req.json();
//     await prisma.post.delete({ where: { id } });

//     return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
//   } catch (err) {
//     console.error("Error deleting post:", err);
//     return NextResponse.json({ message: "Failed to delete post", error: err.message }, { status: 500 });
//   }
// }