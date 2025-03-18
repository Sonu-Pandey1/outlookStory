// import prisma from "@/utils/connect";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // GET ALL COMMENTS FOR A POST
// export const GET = async (req) => {
//   try {
//     const { searchParams } = new URL(req.url);
//     const postSlug = searchParams.get("postSlug");

//     let comments;

//     if (postSlug) {
//       // ✅ Fetch only comments related to the specific post
//       comments = await prisma.comment.findMany({
//         where: { postSlug },
//         include: {
//           user: {
//             select: { userId: true, name: true, image: true },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//       });
//     } else {
//       // ✅ Fetch latest 20 comments for the dashboard (from all posts)
//       comments = await prisma.comment.findMany({
//         include: {
//           user: {
//             select: { userId: true, name: true, image: true },
//           },
//           post: {
//             select: { title: true, slug: true }, // Include post info in dashboard
//           },
//         },
//         orderBy: { createdAt: "desc" },
//         take: 20, // Latest 20 comments
//       });
//     }

//     return new NextResponse(JSON.stringify(comments), { status: 200 });
//   } catch (err) {
//     console.error("Error fetching comments:", err.message);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // export const GET = async (req) => {
// //   try {
// //     const comments = await prisma.comment.findMany({
// //       include: {
// //         user: {
// //           select: { userId: true, name: true, image: true },
// //         },
// //       },
// //       orderBy: { createdAt: "desc" }, // Fetch latest comments first
// //       take: 20, // Limit to the latest 20 comments
// //     });

// //     return new NextResponse(JSON.stringify(comments), { status: 200 });
// //   } catch (err) {
// //     console.error("Error fetching comments:", err.message);
// //     return new NextResponse(
// //       JSON.stringify({ message: "Something went wrong!" }),
// //       { status: 500 }
// //     );
// //   }
// // };


// // POST A COMMENT
// export const POST = async (req) => {
//   const { userId } = getAuth(req); // Get Clerk's userId from auth context
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const body = await req.json();
//     const { desc, postSlug } = body;

//     if (!desc || !postSlug) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Both description and postSlug are required.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Check if post exists
//     const post = await prisma.post.findUnique({
//       where: { slug: postSlug },
//     });

//     if (!post) {
//       return new NextResponse(JSON.stringify({ message: "Post not found." }), {
//         status: 404,
//       });
//     }

//     // Create the comment
//     const comment = await prisma.comment.create({
//       data: {
//         desc,
//         postSlug,
//         userId,
//       },
//       include: {
//         user: {
//           select: {
//             name: true,
//             image: true,
//           },
//         },
//       },
//     });

//     // Add the createdAt timestamp to the response
//     const commentWithTimestamp = {
//       ...comment,
//       createdAt: comment.createdAt.toISOString(), // Ensure createdAt is returned as ISO string
//     };

//     return new NextResponse(JSON.stringify(commentWithTimestamp), { status: 200 });
//   } catch (err) {
//     // Check if err is null or an error object
//     if (err && err instanceof Error) {
//       console.error("Error posting comment:", err.message); // Log the error message
//     } else {
//       console.error("Unknown error:", err); // Log unknown errors
//     }
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // EDIT A COMMENT
// export const PUT = async (req) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const body = await req.json();
//     const { commentId, desc, postSlug } = body;

//     if (!desc || !commentId || !postSlug) {
//       return new NextResponse(
//         JSON.stringify({ message: "Missing required fields." }),
//         { status: 400 }
//       );
//     }

//     // Check if the comment exists
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       include: { post: true },
//     });

//     if (!comment) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment not found." }),
//         { status: 404 }
//       );
//     }

//     // Check if the user is the owner of the comment or the post owner
//     if (comment.userId !== userId && comment.post.userId !== userId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Unauthorized to edit this comment." }),
//         { status: 403 }
//       );
//     }

//     // Update the comment
//     const updatedComment = await prisma.comment.update({
//       where: { id: commentId },
//       data: { desc },
//       include: {
//     user: {
//       select: { name: true, image: true },
//     },
//   },
//     });

//     return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
//   } catch (err) {
//     // Check if err is null or an error object
//     if (err && err instanceof Error) {
//       console.error("Error Updating Comments:", err.message); // Log the error message
//     } else {
//       console.error("Unknown error:", err); // Log unknown errors
//     }
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // DELETE A COMMENT
// export const DELETE = async (req) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const { commentId } = await req.json();

//     if (!commentId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment ID is required." }),
//         { status: 400 }
//       );
//     }

//     // Check if the comment exists
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       include: { post: true },
//     });

//     if (!comment) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment not found." }),
//         { status: 404 }
//       );
//     }

//     // Check if the user is the owner of the comment or the post owner
//     if (comment.userId !== userId && comment.post.userId !== userId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Unauthorized to delete this comment." }),
//         { status: 403 }
//       );
//     }

//     // Delete the comment
//     await prisma.comment.delete({
//       where: { id: commentId },
//     });

//     return new NextResponse(
//       JSON.stringify({ message: "Comment deleted successfully." }),
//       { status: 200 }
//     );
//   } catch (err) {
//     if (err && err instanceof Error) {
//       console.error("Error deleting comment", err.message);
//     } else {
//       console.error("Unknown error:", err);
//     }
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };



// import prisma from "@/utils/connect";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // GET ALL COMMENTS FOR A POST OR DASHBOARD
// export const GET = async (req) => {
//   try {
//     const { searchParams } = new URL(req.url);
//     const postSlug = searchParams.get("postSlug");

//     let comments;

//     if (postSlug) {
//       // ✅ Fetch only comments related to the specific post
//       comments = await prisma.comment.findMany({
//         where: { postSlug },
//         include: {
//           user: {
//             select: { id: true, name: true, image: true }, // FIX: Changed `userId` → `id`
//           },
//         },
//         orderBy: { createdAt: "desc" },
//       });
//     } else {
//       // ✅ Fetch latest 20 comments for the dashboard (all posts)
//       comments = await prisma.comment.findMany({
//         include: {
//           user: {
//             select: { id: true, name: true, image: true }, // FIX: Changed `userId` → `id`
//           },
//           post: {
//             select: { title: true, slug: true },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//         take: 20,
//       });
//     }

//     return new NextResponse(JSON.stringify(comments), { status: 200 });
//   } catch (err) {
//     console.error("Error fetching comments:", err.message);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // POST A COMMENT
// export const POST = async (req) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const body = await req.json();
//     const { desc, postSlug } = body;

//     if (!desc || !postSlug) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Both description and postSlug are required.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Check if post exists
//     const post = await prisma.post.findUnique({
//       where: { slug: postSlug },
//     });

//     if (!post) {
//       return new NextResponse(JSON.stringify({ message: "Post not found." }), {
//         status: 404,
//       });
//     }

//     // Create the comment
//     const comment = await prisma.comment.create({
//       data: {
//         desc,
//         postSlug,
//         userId, // Ensure correct linking to user
//       },
//       include: {
//         user: {
//           select: {
//             id: true, // FIX: Include `id` for consistency
//             name: true,
//             image: true,
//           },
//         },
//       },
//     });

//     return new NextResponse(
//       JSON.stringify({
//         ...comment,
//         createdAt: comment.createdAt.toISOString(), // Ensure `createdAt` is formatted properly
//       }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error posting comment:", err.message);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // EDIT A COMMENT
// export const PUT = async (req) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const body = await req.json();
//     const { commentId, desc, postSlug } = body;

//     if (!desc || !commentId || !postSlug) {
//       return new NextResponse(
//         JSON.stringify({ message: "Missing required fields." }),
//         { status: 400 }
//       );
//     }

//     // Check if the comment exists
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       include: { post: true },
//     });

//     if (!comment) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment not found." }),
//         { status: 404 }
//       );
//     }

//     // Check if the user is the owner of the comment or the post owner
//     if (comment.userId !== userId && comment.post.userId !== userId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Unauthorized to edit this comment." }),
//         { status: 403 }
//       );
//     }

//     // Update the comment
//     const updatedComment = await prisma.comment.update({
//       where: { id: commentId },
//       data: { desc },
//       include: {
//         user: {
//           select: { id: true, name: true, image: true },
//         },
//       },
//     });

//     return new NextResponse(
//       JSON.stringify({
//         ...updatedComment,
//         createdAt: updatedComment.createdAt.toISOString(),
//       }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error updating comment:", err.message);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // DELETE A COMMENT
// export const DELETE = async (req) => {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
//       status: 401,
//     });
//   }

//   try {
//     const { commentId } = await req.json();

//     if (!commentId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment ID is required." }),
//         { status: 400 }
//       );
//     }

//     // Check if the comment exists
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       include: { post: true },
//     });

//     if (!comment) {
//       return new NextResponse(
//         JSON.stringify({ message: "Comment not found." }),
//         { status: 404 }
//       );
//     }

//     // Check if the user is the owner of the comment or the post owner
//     if (comment.userId !== userId && comment.post.userId !== userId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Unauthorized to delete this comment." }),
//         { status: 403 }
//       );
//     }

//     // Delete the comment
//     await prisma.comment.delete({
//       where: { id: commentId },
//     });

//     return new NextResponse(
//       JSON.stringify({ message: "Comment deleted successfully." }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error deleting comment:", err.message);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };




import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/utils/getUserFromCookie";

// GET ALL COMMENTS FOR A POST OR DASHBOARD
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");
    let comments;

    if (postSlug) {
      comments = await prisma.comment.findMany({
        where: { postSlug },
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      comments = await prisma.comment.findMany({
        include: {
          user: { select: { id: true, name: true, image: true } },
          post: { select: { title: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    }

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// POST A COMMENT
export const POST = async (req) => {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });

  try {
    const { desc, postSlug } = await req.json();
    if (!desc || !postSlug) return NextResponse.json({ message: "Both description and postSlug are required." }, { status: 400 });

    const post = await prisma.post.findUnique({ where: { slug: postSlug } });
    if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });

    const comment = await prisma.comment.create({
      data: { desc, postSlug, userId: user.id },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    return NextResponse.json({ ...comment, createdAt: comment.createdAt.toISOString() });
  } catch (err) {
    console.error("Error posting comment:", err.message);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// EDIT A COMMENT
export const PUT = async (req) => {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });

  try {
    const { commentId, desc } = await req.json();
    if (!desc || !commentId) return NextResponse.json({ message: "Missing required fields." }, { status: 400 });

    const comment = await prisma.comment.findUnique({ where: { id: commentId }, include: { post: true } });
    if (!comment) return NextResponse.json({ message: "Comment not found." }, { status: 404 });

    if (comment.userId !== user.id && comment.post.userId !== user.id)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { desc },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    return NextResponse.json({ ...updatedComment, createdAt: updatedComment.createdAt.toISOString() });
  } catch (err) {
    console.error("Error updating comment:", err.message);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// DELETE A COMMENT
export const DELETE = async (req) => {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });

  try {
    const { commentId } = await req.json();
    if (!commentId) return NextResponse.json({ message: "Comment ID is required." }, { status: 400 });

    const comment = await prisma.comment.findUnique({ where: { id: commentId }, include: { post: true } });
    if (!comment) return NextResponse.json({ message: "Comment not found." }, { status: 404 });

    if (comment.userId !== user.id && comment.post.userId !== user.id)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });

    await prisma.comment.delete({ where: { id: commentId } });
    return NextResponse.json({ message: "Comment deleted successfully." });
  } catch (err) {
    console.error("Error deleting comment:", err.message);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
