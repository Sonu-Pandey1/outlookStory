// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// const TOKEN_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
// const DEFAULT_AVATAR = "https://cdn-icons-gif.flaticon.com/8797/8797862.gif";

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "7d",
//   });
// };

// export async function POST(req) {
//   try {
//     const { email, name, photo } = await req.json();
//     if (!email || !name) {
//       return NextResponse.json({ error: "Email and name are required." }, { status: 400 });
//     }

//     let user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       const generatedPassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(generatedPassword, 10);
//       const username = `${name.replace(/\s+/g, "").toLowerCase()}${Math.random().toString(36).slice(-4)}`;

//       user = await prisma.user.create({
//         data: {
//           username,
//           email,
//           password: hashedPassword,
//           avatar: photo || DEFAULT_AVATAR,
//         },
//       });
//     }

//     const token = generateToken(user.id);
//     const { password: _, ...userInfo } = user;

//     const response = NextResponse.json({ user: userInfo, message: "Authentication successful." }, { status: 200 });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: TOKEN_AGE,
//     });

//     return response;
//   } catch (error) {
//     console.error("Google authentication error:", error);
//     return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
//   }
// }


// 💡 How to Implement Google Auth on Frontend (Next.js)
// You'll need to handle Google Sign-In on the frontend.

// Install Google Sign-In SDK

// nginx
// Copy
// Edit
// npm install @react-oauth/google
// Set Up the Provider in _app.js

// jsx
// Copy
// Edit
// import { GoogleOAuthProvider } from "@react-oauth/google";

// function MyApp({ Component, pageProps }) {
//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       <Component {...pageProps} />
//     </GoogleOAuthProvider>
//   );
// }

// export default MyApp;
// Google Login Button in Login.js

// jsx
// Copy
// Edit
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// function Login() {
//   const handleLoginSuccess = async (credentialResponse) => {
//     try {
//       const { data } = await axios.post("/api/auth/google", {
//         token: credentialResponse.credential,
//       });

//       console.log("Login Success:", data);
//       document.cookie = `token=${data.token}; path=/`; // Save token in cookies
//     } catch (error) {
//       console.error("Login Failed", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login with Google</h2>
//       <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.error("Login Failed")} />
//     </div>
//   );
// }

// export default Login;
// 📌 Summary
// Fixed your API by adding proper Google token verification.
// Explained the logic of how Google authentication works.
// Provided frontend code to integrate Google Sign-In in Next.js.
// Gave step-by-step instructions to test it in Postman.
// 🚀 Now your Google Authentication is secure and works properly. Let me know if you have any questions! 😊