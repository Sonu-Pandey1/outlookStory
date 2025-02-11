
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;  // Default to page 1 if not provided
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 10;

  // Build query object for Prisma, including pagination and category filter if provided
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),  // Only apply category filter if "cat" is provided
    },
  };

  try {
    // Use Prisma to fetch posts and count
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
      
    ]);

    // Return posts and count
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST (Same as your original code)
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
      // , username: session.user.name
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// // Fetch all posts without any filtering or pagination
// export const GET = async (req) => {
//   try {
//     // Fetch all posts from the database
//     const posts = await prisma.post.findMany();

//     // Return posts as a JSON response
//     return new NextResponse(JSON.stringify(posts), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

// CREATE A POST (Keep this if needed for creating posts)
// export const POST = async (req) => {
//   try {
//     const body = await req.json();

//     // Create a new post in the database
//     const post = await prisma.post.create({
//       data: body,  // Assuming the body contains the necessary data
//     });

//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

