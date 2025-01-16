

/* eslint-disable @next/next/no-sync-scripts */




import "./globals.scss";
import Navbar from "../../Components/navbar/Navbar.jsx";
import Hader from "../../Components/hader/Hader.jsx";
import Footer from "../../Components/Footer/Footer";
import HeroWrapper from "../../Components/Hero/HeroWrapper";
import ClientLayout from "../../Components/ClientLayout/ClientLayout";

export const metadata = {
  title: "Dynamic Hero Section",
  description: "Dynamic content rendering based on the page type",
};

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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
      {/* <body>
        <Hader />
        <Navbar />
        <section className="heroSection pb-5">
          <HeroWrapper />
        </section>
        {children}
        <Footer />
      </body> */}
    </html>
  );
}

