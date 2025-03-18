// // // import { NextResponse } from "next/server";
// // // import jwt from "jsonwebtoken";
// // // import prisma from "@/utils/connect";

// // // export async function GET(req) {
// // //   try {
// // //     const token = req.cookies.get("token")?.value;
// // //     if (!token) {
// // //       return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// // //     const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, username: true, email: true, avatar: true } });

// // //     if (!user) {
// // //       return NextResponse.json({ error: "User not found." }, { status: 404 });
// // //     }

// // //     return NextResponse.json(user, { status: 200 });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: "Invalid token." }, { status: 401 });
// // //   }
// // // }


// // import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import prisma from "@/utils/connect";

// // export async function GET(req) {
// //   try {
// //     // 🔹 Get token from cookies
// //     const token = req.cookies.get("token")?.value;

// //     console.log("🔹 Received Token:", token); // Debugging

// //     // 🔹 If no token, return unauthorized
// //     if (!token) {
// //       return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
// //     }

// //     let decoded;
// //     try {
// //       decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// //     } catch (error) {
// //       console.error("🔴 JWT Error:", error.message); // Debugging
// //       return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
// //     }

// //     console.log("✅ Decoded Token:", decoded); // Debugging

// //     // 🔹 Find user in database
// //     const user = await prisma.user.findUnique({
// //       where: { id: decoded.id },
// //       select: { id: true, name: true, email: true, image: true, role: true },
// //     });

// //     if (!user) {
// //       return NextResponse.json({ error: "User not found." }, { status: 404 });
// //     }

// //     return NextResponse.json(user, { status: 200 });

// //   } catch (error) {
// //     console.error("Auth Check Error:", error);
// //     return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
// //   }
// // }

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/utils/connect";

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// export async function GET(req) {
//   try {
//     const token = req.cookies.get("token")?.value; // Read token from cookies

//     if (!token) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // Verify and decode token
//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (!decoded?.id) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     // Fetch user from database
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//       select: { id: true, name: true, email: true, image: true, role: true },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Auth error:", error);
//     return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/connect";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value; // Read token from HttpOnly cookie
    // console.log(token)

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, image: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
