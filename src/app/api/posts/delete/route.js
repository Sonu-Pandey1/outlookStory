import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function DELETE(req) {
  try {
    const { postId } = await req.json();
    console.log("Received delete request for post ID:", postId);

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Delete the post from Prisma
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
