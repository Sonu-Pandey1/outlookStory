// // import { cookies } from "next/headers";
// // import jwt from "jsonwebtoken"; // If you're using JWT, adjust based on your setup

// // export const getUserFromCookie = () => {
// //   try {
// //     const cookieStore = cookies();
// //     const token = cookieStore.get("token")?.value; // Adjust key if different

// //     if (!token) return null;

// //     // Decode token (Assuming it's a JWT, modify if needed)
// //     const user = jwt.verify(token, process.env.JWT_SECRET_KEY); // Ensure you have JWT_SECRET in .env

// //     return user; // Example: { id: "123", name: "John Doe", role: "user" }
// //   } catch (error) {
// //     console.error("Invalid auth token:", error.message);
// //     return null;
// //   }
// // };


// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken"; // Assuming you use JWT, adjust if needed

// export const getUserFromCookie = async () => {
//   try {
//     const cookieStore = cookies();
//     const tokenn = await cookieStore.get("token"); // ⬅️ Await the cookie retrieval

//     if (!tokenCookie) return null;

//     const token = tokenn.value;

//     // Decode token (assuming JWT, modify if needed)
//     const user = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET exists in .env

//     return user; // Example: { id: "123", name: "John Doe", role: "user" }
//   } catch (error) {
//     console.error("Invalid auth token:", error.message);
//     return null;
//   }
// };


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserFromCookie = async () => {
    try {
        const cookieStore = cookies();
        const tokenCookie = await cookieStore.get("token");
        if (!tokenCookie) return null;
        const token = tokenCookie.value;
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return user;
    } catch (error) {
        console.error("Invalid auth token:", error.message);
        return null;
    }
};
