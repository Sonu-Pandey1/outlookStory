// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       include: {
//         user: true, // Fetch user data
//         comments: true, // Fetch comments
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
//   }
// }
//? get req for home pages to get alll post or cat wise posts

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat") || null; // If no category, set to null
  const postsPerPage = 5;

  const query = {
    take: postsPerPage,
    skip: postsPerPage * (page - 1),
    where: cat ? { catSlug: cat } : {}, // If no category, fetch all posts
    // orderBy: { createdAt: "desc" }, // Sort newest first
    // orderBy: { updatedAt: "desc" }, // 👈 Sort by updatedAt instead of createdAt
    orderBy: { views: "desc" }, // Most viewed posts first
    include: {
      user: {
        select: { name: true }, // Only fetch user name
      },
    },
  };

  try {
    const [posts, totalPosts] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    const hasMore = (page * postsPerPage) < totalPosts;

    return new Response(JSON.stringify({ posts, hasMore }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}



export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
    }

    // Extract and validate required fields
    const { title, desc, img, catSlug, userId } = body;

    if (!title || !desc || !catSlug || !userId) {
      return NextResponse.json({ message: "Title, desc, catSlug, and userId are required" }, { status: 400 });
    }

    // // Check if the category exists
    // const categoryExists = await prisma.category.findUnique({
    //   where: { slug: catSlug },
    // });

    // if (!categoryExists) {
    //   return NextResponse.json({ message: "Invalid category slug" }, { status: 400 });
    // }

    // // Check if the user exists
    // const userExists = await prisma.user.findUnique({
    //   where: { userId },
    // });

    // if (!userExists) {
    //   return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    // }

    // Generate a unique slug for the post
    const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    // Create a new post
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        img: img || null, // Allow null images
        slug,
        catSlug,
        userId,
      },
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}



// UPDATE AN EXISTING POST (PUT request)
export async function PUT(req, { params }) {
  try {
    const postId = params.postId; // Extract post ID from URL
    const body = await req.json();

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img || null,
        catSlug: body.catSlug,
      },
    });

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}