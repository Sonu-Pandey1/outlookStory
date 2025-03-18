
import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

// GET a single post by ID




export async function GET(req, { params }) {
  try {
    if (!params?.slug) {
      return NextResponse.json({ error: "Missing post slug" }, { status: 400 });
    }

    const slug = params.slug;
    // console.log("Fetching post with slug:", slug);

    // Debugging: Check all slugs stored
    const allPosts = await prisma.post.findMany({
      select: { slug: true },
    });
    // console.log("All stored slugs:", allPosts);

    // Fetch post by slug
    const post = await prisma.post.findFirst({
      where: { slug },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        }
      }
    });

    // console.log("Post found:", post); // Log if found

    if (!post) {
      return NextResponse.json({ error: "Post not found", storedSlugs: allPosts }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

// export async function GET(req, { params }) {
//   try {
//     console.log("Request received at /api/posts/[slug]");

//     // Check if params exist
//     if (!params) {
//       console.error("Error: params object is missing");
//       return NextResponse.json({ error: "Internal Server Error: Missing params" }, { status: 500 });
//     }

//     // Check if slug exists in params
//     if (!params.slug) {
//       console.error("Error: Slug is missing in params");
//       return NextResponse.json({ error: "Missing post slug" }, { status: 400 });
//     }

//     const slug = params.slug;
//     console.log(`Fetching post with slug: ${slug}`);

//     // Check stored slugs in the database
//     const allPosts = await prisma.post.findMany({
//       select: { slug: true },
//     });
//     console.log("All stored slugs:", allPosts.map(p => p.slug));

//     // Fetch post by slug
//     const post = await prisma.post.findUnique({
//       where: { slug:slug },
//       include: {
//         user: {
//           select: { id: true, name: true, image: true },
//         },
//       },
//     });

//     if (!post) {
//       console.warn(`Post not found for slug: ${slug}`);
//       return NextResponse.json(
//         { error: "Post not found", storedSlugs: allPosts.map(p => p.slug) }, 
//         { status: 404 }
//       );
//     }

//     console.log("Post found:", post);
//     return NextResponse.json(post, { status: 200 });

//   } catch (err) {
//     console.error("Error fetching post:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }




// UPDATE a post by ID
export async function PUT(req, { params }) {
  try {
    const { slug } = params; // Extract post ID from URL
    const { title, desc, img, catSlug } = await req.json();

    console.log("Updating post with ID:", slug);

    const updatedPost = await prisma.post.update({
      where: { slug: slug },
      data: { title, desc, img, catSlug },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
