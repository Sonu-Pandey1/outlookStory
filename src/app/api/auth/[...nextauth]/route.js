// import { authOptions } from "@/app/utils/auth"
// import NextAuth from "next-auth"

 
// // export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
// const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST};

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "../../../utils/auth"; // make sure to update the path to where you define authOptions

// Create the handler for the NextAuth API route
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
