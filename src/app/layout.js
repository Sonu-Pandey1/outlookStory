// import ClientLayout from "../providers/ClientLayout";
// import { ThemeContextProvider } from "../context/ThemeContext.jsx";
// import "../styles/globals.scss";
// import { ClerkProvider } from "@clerk/nextjs";
// import QueryProvider from "@/providers/QueryProvider";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Head from "next/head";

// // also add meta data to singl blog page so that
// // also add on each singl page like about contact etc

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <Head>
//         {/* ✅ Global Meta Tags */}
//         <title>{siteMetadata.title}</title>
//         <meta name="description" content={siteMetadata.description} />
//         <meta name="robots" content="index, follow" />

//         {/* ✅ OpenGraph Metadata */}
//         <meta property="og:title" content={siteMetadata.title} />
//         <meta property="og:description" content={siteMetadata.description} />
//         <meta property="og:url" content={siteMetadata.siteUrl} />
//         <meta property="og:site_name" content={siteMetadata.title} />
//         <meta property="og:image" content={siteMetadata.socialBanner} />
//         <meta property="og:type" content="website" />

//         {/* ✅ Twitter Card Metadata */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={siteMetadata.title} />
//         <meta name="twitter:description" content={siteMetadata.description} />
//         <meta name="twitter:image" content={siteMetadata.socialBanner} />
//         <meta name="twitter:site" content={siteMetadata.twitterHandle} />

//         {/* ✅ Favicon */}
//         <link rel="icon" href="/favicon.png" type="image/png" />
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
//           async
//         ></script>
//       </Head>
//       <body>
//         <ClerkProvider>
//           <QueryProvider>
//             <ThemeContextProvider>
//               <ClientLayout>{children}</ClientLayout>
//             </ThemeContextProvider>
//           </QueryProvider>
//         </ClerkProvider>
//         <ToastContainer />
//       </body>
//     </html>
//   );
// }

// import ClientLayout from "../providers/ClientLayout";
// import { ThemeContextProvider } from "../context/ThemeContext.jsx";
// import "../styles/globals.scss";
// import { ClerkProvider } from "@clerk/nextjs";
// import QueryProvider from "@/providers/QueryProvider";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import siteMetadata from "../config/siteMetadata";

// export const metadata = {
//   title: siteMetadata.title,
//   description: siteMetadata.description,
//   openGraph: {
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     url: siteMetadata.siteUrl,
//     siteName: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     images: [siteMetadata.socialBanner],
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* ✅ Favicon */}
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
//           async
//         ></script>
//       </head>
//       <body>
//         <ClerkProvider>
//           <QueryProvider>
//             <ThemeContextProvider>
//               <ClientLayout>{children}</ClientLayout>
//             </ThemeContextProvider>
//           </QueryProvider>
//         </ClerkProvider>
//         <ToastContainer />
//       </body>
//     </html>
//   );
// }
//* dont remove it posssible need thr=em

import ClientLayout from "../providers/ClientLayout";
import { ThemeContextProvider } from "../context/ThemeContext.jsx";
import "../styles/globals.scss";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import siteMetadata from "../config/siteMetadata"; // ✅ Import the metadata file
import { AuthContextProvider, AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ✅ Bootstrap CDN */}
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
          async
        ></script>
      </head>
      <body>
        <ClerkProvider>
        <AuthProvider >
          <QueryProvider>
            <ThemeContextProvider>
              <ClientLayout>{children}</ClientLayout>
            </ThemeContextProvider>
          </QueryProvider>
          </AuthProvider>
        </ClerkProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
