
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosts = posts.map(post => ({
      ...post,
      authorName: post.user?.name || "Unknown",
    }));

    return NextResponse.json({ posts: formattedPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
  }
}
