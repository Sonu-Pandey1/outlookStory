// // import { NextResponse } from "next/server";

// // export async function POST() {
// //   try {
// //     const response = NextResponse.json({ message: "Logout successful." }, { status: 200 });

// //     // Clear the token cookie properly BEFORE sending the response
// //     response.cookies.set("token", "", {
// //       expires: new Date(0), // Expire immediately
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "lax",
// //       path: "/", // Ensure the cookie is cleared across all paths
// //     });

// //     return response;
// //   } catch (error) {
// //     return NextResponse.json({ error: "Logout failed." }, { status: 500 });
// //   }
// // }


// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     const response = NextResponse.json({ message: "Logout successful." });

//     // Clear the token cookie
//     response.headers.set(
//       "Set-Cookie",
//       "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
//     );

//     return response;
//   } catch (error) {
//     console.error("Logout error:", error);
//     return NextResponse.json({ error: "Logout failed." }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     const response = NextResponse.json({ message: "Logout successful." });

//     // Clear authentication cookie
//     response.headers.set(
//       "Set-Cookie",
//       "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
//     );

//     return response;
//   } catch (error) {
//     console.error("Logout error:", error);
//     return NextResponse.json({ error: "Logout failed." }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful." }, { status: 200 });

    // Properly clear the token cookie
    response.headers.set(
      "Set-Cookie",
      "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
