import prisma from "@/utils/connect";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET ALL COMMENTS FOR A POST
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);
//   const postSlug = searchParams.get("postSlug");

//   if (!postSlug) {
//     return new NextResponse(
//       JSON.stringify({ message: "Post slug is missing." }),
//       { status: 400 }
//     );
//   }

//   try {
//     const comments = await prisma.comment.findMany({
//       where: { postSlug },
//       include: {
//         user: {
//           select: { userId: true, name: true, image: true },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return new NextResponse(JSON.stringify(comments), { status: 200 });
//   } catch (err) {
//     // Check if err is null or an error object
//     if (err && err instanceof Error) {
//       console.error("Error fetching comments:", err.message); // Log the error message
//     } else {
//       console.error("Unknown error:", err); // Log unknown errors
//     }
//     return new NextResponse(
//       JSON.stringify({
//         message: "Something went wrong!",
//       }),
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: { userId: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" }, // Fetch latest comments first
      take: 20, // Limit to the latest 20 comments
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};


// POST A COMMENT
export const POST = async (req) => {
  const { userId } = getAuth(req); // Get Clerk's userId from auth context
  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const { desc, postSlug } = body;

    if (!desc || !postSlug) {
      return new NextResponse(
        JSON.stringify({
          message: "Both description and postSlug are required.",
        }),
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found." }), {
        status: 404,
      });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        desc,
        postSlug,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Add the createdAt timestamp to the response
    const commentWithTimestamp = {
      ...comment,
      createdAt: comment.createdAt.toISOString(), // Ensure createdAt is returned as ISO string
    };

    return new NextResponse(JSON.stringify(commentWithTimestamp), { status: 200 });
  } catch (err) {
    // Check if err is null or an error object
    if (err && err instanceof Error) {
      console.error("Error posting comment:", err.message); // Log the error message
    } else {
      console.error("Unknown error:", err); // Log unknown errors
    }
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// EDIT A COMMENT
export const PUT = async (req) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const { commentId, desc, postSlug } = body;

    if (!desc || !commentId || !postSlug) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { post: true },
    });

    if (!comment) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found." }),
        { status: 404 }
      );
    }

    // Check if the user is the owner of the comment or the post owner
    if (comment.userId !== userId && comment.post.userId !== userId) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized to edit this comment." }),
        { status: 403 }
      );
    }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { desc },
    });

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
  } catch (err) {
    // Check if err is null or an error object
    if (err && err instanceof Error) {
      console.error("Error Updating Comments:", err.message); // Log the error message
    } else {
      console.error("Unknown error:", err); // Log unknown errors
    }
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE A COMMENT
export const DELETE = async (req) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const { commentId } = await req.json();

    if (!commentId) {
      return new NextResponse(
        JSON.stringify({ message: "Comment ID is required." }),
        { status: 400 }
      );
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { post: true },
    });

    if (!comment) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found." }),
        { status: 404 }
      );
    }

    // Check if the user is the owner of the comment or the post owner
    if (comment.userId !== userId && comment.post.userId !== userId) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized to delete this comment." }),
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully." }),
      { status: 200 }
    );
  } catch (err) {
    if (err && err instanceof Error) {
      console.error("Error fdeleting comments:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
