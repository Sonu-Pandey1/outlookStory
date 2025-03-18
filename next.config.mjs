/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['demo.tagdiv.com','jnews.io','via.placeholder.com','lh3.googleusercontent.com','outlookstory.com','outlook-story.vercel.app','randomuser.me','img.clerk.com','cdn-icons-png.flaticon.com','i.pravatar.cc','source.unsplash.com','source.unsplash.com'], // Add the external domain here
    },
    // swcMinify: true, // ✅ Reduces memory usage
  };
  
  export default nextConfig;
  
// /** @type {import('next').NextConfig} */
// const path = require("path");

// const nextConfig = {
//   images: {
//     domains: [
//       "demo.tagdiv.com",
//       "jnews.io",
//       "via.placeholder.com",
//       "lh3.googleusercontent.com",
//       "outlookstory.com",
//       "outlook-story.vercel.app",
//       "randomuser.me",
//       "img.clerk.com",
//       "cdn-icons-png.flaticon.com",
//       "i.pravatar.cc",
//       "source.unsplash.com",
//       "source.unsplash.com",
//     ],
//   },
//   webpack: (config) => {
//     config.resolve.alias["@"] = path.resolve(__dirname, "src");
//     return config;
//   },
// };

// export default nextConfig;
