import { NextResponse } from "next/server";
import prisma from "@/utils/connect"; // Adjust if needed

export async function PUT(req) {
  try {
    const { id, title, content } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}
