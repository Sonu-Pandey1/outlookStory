import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Fetch user data
        comments: true, // Fetch comments
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
  }
}
