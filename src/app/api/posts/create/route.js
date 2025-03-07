

// import { NextResponse } from "next/server";
// import prisma from "@/utils/connect";


// export async function POST(req) {
//   try {
//     const { title, content } = await req.json();
//     const newPost = await prisma.post.create({
//       data: { title, content },
//     });
//     return NextResponse.json({ post: newPost }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error creating post" }, { status: 500 });
//   }
// }

