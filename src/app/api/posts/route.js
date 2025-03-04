
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
