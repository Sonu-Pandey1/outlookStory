/* eslint-disable @next/next/no-sync-scripts */
// /* eslint-disable @next/next/no-sync-scripts */

// import "../../styles/globals.scss";
// import ClientLayout from "../providers/ClientLayout";
// import ThemeProvider, { ThemeContextProvider } from "../providers/ThemeProvider";
// import AuthProvider from "../Providers/AuthProvider";

// export const metadata = {
//   title: "Outlook Story", // Set your page title here
//   description: "Dynamic content rendering based on the page type", // Set the description for SEO
//   openGraph: {
//     title: "Outlook Story",
//     description: "Dynamic content rendering based on the page type",
//     url: "https://yourdomain.com",
//     image: "/path-to-image.jpg",
//   },
//   twitter: {
//     card: "summary_large_image", // Twitter card configuration
//     title: "Outlook Story",
//     description: "Dynamic content rendering based on the page type",
//     image: "/path-to-image.jpg",
//   },
// };

// export default function RootLayout({ children }) {

//   return (
//     <html lang="en">
//       {/* suppressHydrationWarning */}
//       <head>
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//           integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
//           crossOrigin="anonymous"
//         />

//         <script
//           src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
//           integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
//           crossOrigin="anonymous"
//         ></script>
//       </head>
//       <body>
//         {/* <ThemeProvider>
//           <ThemeComponent> */}
//         <AuthProvider>
//           <ThemeContextProvider>
//             {/* <ThemeProvider> */}
//             <ClientLayout>{children}</ClientLayout>
//             {/* </ThemeProvider> */}
//           </ThemeContextProvider>
//         </AuthProvider>

//       </body>
//     </html>
//   );
// }

"use client";
import ClientLayout from "../providers/ClientLayout";
import { ThemeContextProvider } from "../context/ThemeContext.jsx"; // Correct import
import AuthProvider from "../Providers/AuthProvider"; 
import "../styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <AuthProvider>
          <ThemeContextProvider>
            <ClientLayout>{children}</ClientLayout>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
