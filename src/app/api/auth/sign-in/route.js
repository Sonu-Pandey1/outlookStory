// // import { NextResponse } from "next/server";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// // import prisma from "@/utils/connect";

// // const generateToken = (userId) => {
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
// // };

// // export async function POST(req) {
// //   try {
// //     const body = await req.json();
// //     // console.log(body)
// //     if (!body) {
// //       return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
// //     }

// //     const { email, password } = body;

// //     if (!email || !password) {
// //       return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
// //     }

// //     const user = await prisma.user.findUnique({ where: { email } });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
// //     }

// //     const token = generateToken(user.id);
// //     const { password: _, ...userInfo } = user;

// //     const response = NextResponse.json(userInfo, { status: 200 });
// //     response.cookies.set("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "lax",
// //       maxAge: 60 * 60 * 24 * 7, // 7 days
// //     });

// //     return response;
// //   } catch (error) {
// //     console.error("Login error:", error);
// //     return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
// //   }
// // }



// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "@/utils/connect";

// const JWT_SECRET = process.env.JWT_SECRET_KEY;
// const TOKEN_AGE = 7 * 24 * 60 * 60; // 7 days

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET_KEY is not defined in the environment variables.");
// }

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
//     }

//     // Exclude password
//     const { password: _, ...userInfo } = user;

//     // Generate token
//     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_AGE });

//     // Create response with cookie
//     const response = NextResponse.json(userInfo);
//     response.headers.set(
//       "Set-Cookie",
//       `token=${token}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict; Max-Age=${TOKEN_AGE}`
//     );

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/utils/connect";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const TOKEN_AGE = 7 * 24 * 60 * 60; // 7 days

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Exclude password from response
    const { password: _, ...userInfo } = user;

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_AGE });

    // Set authentication cookie
    const response = NextResponse.json(userInfo);
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict; Max-Age=${TOKEN_AGE}`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
