// import { NextResponse } from "next/server";
// import prisma from "@/utils/connect";
// import { verifyToken } from "@/utils/auth"; // Utility to verify JWT token

// export async function DELETE(req) {
//   try {
//     // Get token from cookies
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
//     }

//     // Verify user from token
//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Invalid token." }, { status: 401 });
//     }

//     // Delete user from database
//     await prisma.user.delete({
//       where: { id: decoded.id },
//     });

//     // Clear the authentication cookie
//     const response = NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
//     response.cookies.set("token", "", { expires: new Date(0), httpOnly: true });

//     return response;
//   } catch (error) {
//     console.error("Delete user error:", error);
//     return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import prisma from "@/utils/connect";
// import jwt from "jsonwebtoken";

// export async function DELETE(req) {
//   try {
//     // 1️⃣ Extract token from request cookies
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized: No token provided." }, { status: 401 });
//     }

//     // 2️⃣ Verify the token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     } catch (err) {
//       return NextResponse.json({ error: "Unauthorized: Invalid token." }, { status: 401 });
//     }

//     // 3️⃣ Get userId from the request body
//     const body = await req.json();
//     const { userId } = body;
//     if (!userId) {
//       return NextResponse.json({ error: "User ID is required." }, { status: 400 });
//     }

//     // 4️⃣ Check if the user exists
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     // 5️⃣ Delete the user
//     await prisma.user.delete({ where: { id: userId } });

//     return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
//   } catch (error) {
//     console.error("Delete error:", error);
//     return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided." }, { status: 401 });
    }

    // 2️⃣ Verify token and extract user ID
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized: Invalid token." }, { status: 401 });
    }

    // 3️⃣ Get userId from the request body
    const body = await req.json();
    const { userId } = body;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    // 4️⃣ Ensure the user is only deleting themselves
    if (decoded.id !== userId) {
      return NextResponse.json({ error: "Unauthorized: You can only delete your own account." }, { status: 403 });
    }

    // 5️⃣ Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // 6️⃣ Delete the user
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
