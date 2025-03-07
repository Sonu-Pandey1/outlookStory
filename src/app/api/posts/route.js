import prisma from "@/utils/connect";
import slugify from "slugify";
import { NextResponse } from "next/server";

//* get req for home pages to get alll post or cat wise posts ----
export async function GET(request) {                           
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat") || null;
  const postsPerPage = 5;

  const query = {
    take: postsPerPage,
    skip: postsPerPage * (page - 1),
    where: cat ? { catSlug: cat } : {},
    orderBy: { createdAt: "desc" }, // Sort newest first //? normaly use this 
    // orderBy: { updatedAt: "desc" }, // Sort by updatedAt instead of createdAt //? we can use this in recomanded blogs section
    // orderBy: { views: "desc" }, // Most viewed posts first //? use this in popular section
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


//* Use For Creating A Post -----


export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
    }

    const { title, desc, img, catSlug, userId } = body;

    if (!title || !desc || !catSlug || !userId) {
      return NextResponse.json({ message: "Title, desc, catSlug, and userId are required" }, { status: 400 });
    }

    // ✅ Ensure category exists
    const category = await prisma.category.findUnique({
      where: { slug: catSlug },
    });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // ✅ Ensure user exists
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Generate a unique slug
    let baseSlug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = `${baseSlug}-${Date.now()}`;

    // ✅ Ensure slug is unique in DB
    let existingPost = await prisma.post.findUnique({ where: { slug: uniqueSlug } });
    while (existingPost) {
      uniqueSlug = `${baseSlug}-${Date.now()}`;
      existingPost = await prisma.post.findUnique({ where: { slug: uniqueSlug } });
    }

    // ✅ Create post
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        img: img || null,
        slug: uniqueSlug,
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

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
//     }

//     const { title, desc, img, catSlug, userId } = body;

//     if (!title || !desc || !catSlug || !userId) {
//       return NextResponse.json({ message: "Title, desc, catSlug, and userId are required" }, { status: 400 });
//     }

//     // Generate a unique slug for the post
//     const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

//     const newPost = await prisma.post.create({
//       data: {
//         title,
//         desc,
//         img: img || null,
//         slug,
//         catSlug,
//         userId,
//       },
//     });

//     return NextResponse.json({ post: newPost }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating post:", error);
//     return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
//   }
// }

//* UPDATE AN EXISTING POST -----
export async function PUT(req, { params }) {
  try {
    const postId = params.postId; 
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