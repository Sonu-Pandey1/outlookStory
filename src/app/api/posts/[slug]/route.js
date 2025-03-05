
import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

// GET a single post by ID
export async function GET(req, { params }) {
  try {
    const { slug } = params; // Extract post ID from URL
    console.log("Fetching post with ID:", slug);

    const post = await prisma.post.findUnique({
      where: { id: slug }, // Ensure ID type matches DB schema (string or integer)
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

// UPDATE a post by ID
export async function PUT(req, { params }) {
  try {
    const { slug } = params; // Extract post ID from URL
    const { title, desc, img, catSlug } = await req.json();

    console.log("Updating post with ID:", slug);

    const updatedPost = await prisma.post.update({
      where: { id: slug },
      data: { title, desc, img, catSlug },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
