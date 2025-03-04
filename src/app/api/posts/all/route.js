
// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid"; // For generating a unique slug

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("📥 Received Request Body:", body);

//     // ✅ Validate required fields
//     if (!body.title || !body.content || !body.userId || !body.catSlug || !body.desc) {
//       console.error("❌ Missing required fields:", body);
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     // ✅ Generate a unique slug from title
//     const slug = `${body.title.toLowerCase().replace(/\s+/g, "-")}-${uuidv4()}`;

//     // ✅ Create the post
//     const post = await prisma.post.create({
//       data: {
//         title: body.title,
//         desc: body.desc, // Ensure desc is provided
//         content: body.content,
//         userId: body.userId,
//         slug, // Use generated slug
//         catSlug: body.catSlug, // Ensure category slug is provided
//       },
//     });

//     console.log("✅ Post Created Successfully:", post);
//     return NextResponse.json(post, { status: 201 });

//   } catch (err) {
//     console.error("🔥 Error creating post:", err);
//     return NextResponse.json({ message: "Something went wrong!", error: err.message }, { status: 500 });
//   }
// }


// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!posts || posts.length === 0) {
//       return NextResponse.json({ message: "No posts found." }, { status: 404 });
//     }

//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (err) {
//     console.error("Error fetching posts:", err);
//     return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
//   }
// }


// app/api/posts/route.js
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/nextjs/server";


export async function POST(req) {
  try {
  const { userId } = getAuth(req); // Get Clerk's userId from auth context
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    console.log("📥 Received Request Body:", body);

    if (!body.title || !body.desc || !body.userId || !body.catSlug) {
      console.error("❌ Missing required fields:", body);
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const slug = `${body.title.toLowerCase().replace(/\s+/g, "-")}-${uuidv4()}`;

    const post = await prisma.post.create({
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img || null,
        userId: body.userId,
        slug,
        catSlug: body.catSlug,
      },
    });

    console.log("✅ Post Created Successfully:", post);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("🔥 Error creating post:", err);
    return NextResponse.json({ message: "Something went wrong!", error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
// console.log(posts)
    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: "No posts found." }, { status: 404 });
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
