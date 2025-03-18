// // // import bcrypt from "bcrypt";
// // // import jwt from "jsonwebtoken";
// // // import { NextResponse } from "next/server";
// // // import prisma from "@/utils/connect";

// // // const TOKEN_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
// // // const DEFAULT_AVATAR = "https://cdn-icons-gif.flaticon.com/8797/8797862.gif";

// // // const generateToken = (userId) => {
// // //   if (!userId) throw new Error("User ID is required to generate token.");
// // //   return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
// // //     expiresIn: "7d",
// // //   });
// // // };

// // // export async function POST(req) {
// // //   try {
// // //     const body = await req.json();
// // //     const { username, email, password, avatar } = body;

// // //     if (!username || !email || !password) {
// // //       return NextResponse.json({ error: "All fields are required." }, { status: 400 });
// // //     }

// // //     const existingUser = await prisma.user.findUnique({ where: { email } });
// // //     if (existingUser) {
// // //       return NextResponse.json({ error: "Email already exists." }, { status: 400 });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     const newUser = await prisma.user.create({
// // //       data: {
// // //         username,
// // //         email,
// // //         password: hashedPassword,
// // //         avatar: avatar || DEFAULT_AVATAR,
// // //       },
// // //     });

// // //     // Ensure user was created
// // //     if (!newUser || !newUser.id) {
// // //       return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
// // //     }

// // //     // Generate JWT token
// // //     const token = generateToken(newUser.id);

// // //     // Send response with cookie
// // //     const response = NextResponse.json(
// // //       { message: "User registered successfully.", user: { id: newUser.id, username: newUser.username, email: newUser.email } },
// // //       { status: 201 }
// // //     );
    
// // //     response.cookies.set("token", token, {
// // //       httpOnly: true,
// // //       secure: process.env.NODE_ENV === "production",
// // //       sameSite: "strict",
// // //       maxAge: TOKEN_AGE,
// // //     });

// // //     return response;
// // //   } catch (error) {
// // //     console.error("Registration error:", error);
// // //     return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
// // //   }
// // // }


// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// // import { NextResponse } from "next/server";
// // import prisma from "@/utils/connect";

// // const TOKEN_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
// // const DEFAULT_AVATAR = "https://cdn-icons-gif.flaticon.com/8797/8797862.gif";

// // const generateToken = (userId) => {
// //   if (!userId) {
// //     console.error("JWT Error: User ID is missing");
// //     throw new Error("User ID is required to generate token.");
// //   }
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
// //     expiresIn: "7d",
// //   });
// // };

// // export async function POST(req) {
// //   try {
// //     const body = await req.json();
// //     const { name, email, password, image } = body;

// //     if (!name || !email || !password) {
// //       return NextResponse.json({ error: "All fields are required." }, { status: 400 });
// //     }

// //     const existingUser = await prisma.user.findUnique({ where: { email } });
// //     if (existingUser) {
// //       return NextResponse.json({ error: "Email already exists." }, { status: 400 });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = await prisma.user.create({
// //       data: {
// //         name,
// //         email,
// //         password: hashedPassword,
// //         image: image || DEFAULT_AVATAR,
// //       },
// //     });

// //     console.log("New User Created:", newUser); // Debugging

// //     if (!newUser || !newUser.id) {
// //       console.error("Error: User ID is missing in newUser object.");
// //       return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
// //     }

// //     const token = generateToken(newUser.id);

// //     const response = NextResponse.json(
// //       { message: "User registered successfully.", user: { id: newUser.id, name: newUser.name, email: newUser.email } },
// //       { status: 201 }
// //     );
    
// //     response.cookies.set("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "strict",
// //       maxAge: TOKEN_AGE,
// //     });

// //     return response;
// //   } catch (error) {
// //     console.error("Registration error:", error);
// //     return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
// //   }
// // }

// // import { NextResponse } from "next/server";
// // import prisma from "@/utils/connect";

// // export async function POST(req) {
// //   try {
// //     const body = await req.json();
// //     console.log("Received Data:", body);

// //     const { name, email } = body;

// //     if (!name || !email) {
// //       return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
// //     }

// //     const newUser = await prisma.user.create({
// //       data: { name, email },
// //     });

// //     console.log("User Created:", newUser);

// //     return NextResponse.json({ message: "User created successfully.", user: newUser }, { status: 201 });
// //   } catch (error) {
// //     console.error("Database error:", error);
// //     return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
// //   }
// // }


// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "@/utils/connect";

// const TOKEN_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
// const JWT_SECRET = process.env.JWT_SECRET_KEY; // Make sure this is set in .env

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("Received Data:", body);

//     const { name, email, password, image, role } = body;

//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
//     }

//     // Check if the user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: "User already exists. Please log in." }, { status: 400 });
//     }
//     // console.log("fvrefrerevrevr")

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
// // console.log(hashedPassword)
//     // Create user in database
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         image: image ,
//         role: role 
//       },
//     });
//     console.log(newUser)

//     // Generate JWT token
//     const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: TOKEN_AGE });

//     console.log("User Created:", newUser);

//     // Set cookie with JWT
//     const response = NextResponse.json({ message: "User registered successfully.", user: newUser }, { status: 201 });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: TOKEN_AGE * 1000, // Convert to milliseconds
//     });

//     return response;
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/utils/connect";

const TOKEN_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, image, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists. Please log in." }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, image, role },
    });

    // Exclude password from response
    const { password: _, ...userInfo } = newUser;

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: TOKEN_AGE });

    // Create response with cookie
    const response = NextResponse.json({ message: "User registered successfully.", user: userInfo });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict; Max-Age=${TOKEN_AGE}`
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
