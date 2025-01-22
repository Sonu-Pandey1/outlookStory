// import GoogleProvider from "next-auth/providers/google"

// export const authOptions ={
//     providers: [
//       GoogleProvider({
//           clientId:process.env.GOOGLE_ID,
//           clientSecret:process.env.GOOGLE_SECRET,
//       }),
//     ],
//   } 
// utils/auth.js
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // oAuth Authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // paswordless email signin
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-replay@example.com>',
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
};
