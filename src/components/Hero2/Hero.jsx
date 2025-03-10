// // // import Image from "next/image";
// // // import React, { useContext, useEffect } from "react";
// // // import "./Hero.scss";
// // // import { ThemeContext } from "@/context/ThemeContext";

// // // function Hero({ data }) {
// // //   const {posts} = data;
// // //   console.log(posts)
// // //   const { theme } = useContext(ThemeContext);

// // //   useEffect(() => {
// // //     // console.log(theme);
// // //   }, [theme]);

// // //   if (!posts || posts.length < 4) {
// // //     return <div>Insufficient data available for this section.</div>;
// // //   }
  
// // //   // console.log(data)

// // //   return (
// // //     <>
// // //       <div className="HeroContainer ">
// // //         <div className="container-fluid">
// // //           <div className={`row px-2 ${theme === "dark" ? "dark" : "light"}`}>
// // //             {/* Left Column - Featured Article */}
// // //             <div className="col-12 col-lg-6 py-3 ">
// // //               <div className="card border-0 rounded shadow-sm overflow-hidden w-100">
// // //                 <Image
// // //                   src={posts[0].img || "fallback-image.png"}
// // //                   alt={posts[0].title}
// // //                   className="card-img-top hero-image"
// // //                   width={500}
// // //                   height={250}
// // //                   style={{ objectFit: "cover", height: "100%" }}
// // //                 />
// // //                 <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// // //                   <span
// // //                     className={`badge bg-${getBadgeColor(
// // //                       posts[0].category
// // //                     )} mb-2`}
// // //                   >
// // //                     {posts[0].category}
// // //                   </span>
// // //                   <h5 className="card-title text-white fw-bold">
// // //                     {posts[0].title}
// // //                   </h5>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Right Column - Smaller Articles */}
// // //             <div className="col-12 col-lg-6 py-3">
// // //               <div className="row g-2">
// // //                 {posts.slice(1, 3).map((article, index) => (
// // //                   <div key={index} className="col-6">
// // //                     <div className="card border-0 shadow-sm overflow-hidden h-100">
// // //                       <Image
// // //                         src={article.image}
// // //                         alt={article.title}
// // //                         className="card-img-top"
// // //                         width={250}
// // //                         height={150}
// // //                         style={{ objectFit: "cover", height: "100%" }}
// // //                       />
// // //                       <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// // //                         <span
// // //                           className={`badge bg-${getBadgeColor(
// // //                             article.category
// // //                           )} mb-1`}
// // //                         >
// // //                           {article.category}
// // //                         </span>
// // //                         <h6 className="card-title text-white">
// // //                           {article.title}
// // //                         </h6>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {/* Bottom Full-Width Article //todo -- NEED TO FIX THIS CARD NOTHING ELSE  */}
// // //               <div className="row mt-2 llll ">
// // //                 <div className="col-12">
// // //                   <div className="card border-0 shadow-sm overflow-hidden w-100 h-100">
// // //                     <Image
// // //                       src={posts[3].image}
// // //                       alt={posts[3].title}
// // //                       className="card-img-top"
// // //                       width={950}
// // //                       height={220}
// // //                       style={{
// // //                         objectFit: "cover",
// // //                         width: "100%",
// // //                         height: "100%",
// // //                       }}
// // //                     />
// // //                     <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// // //                       <span
// // //                         className={`badge bg-${getBadgeColor(
// // //                           posts[3].category
// // //                         )} mb-2`}
// // //                       >
// // //                         {posts[3].category}
// // //                       </span>
// // //                       <h6 className="card-title text-white">{posts[3].title}</h6>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // // Utility function to determine badge color
// // // const getBadgeColor = (category) => {
// // //   switch (category) {
// // //     case "story":
// // //       return "light";
// // //     case "videos":
// // //       return "danger";
// // //     case "events":
// // //       return "success";
// // //     case "business":
// // //       return "info";
// // //     case "cityconnect":
// // //       return "warning";
// // //     default:
// // //       return "primary";
// // //   }
// // // };

// // // export default Hero;


// // import Image from "next/image";
// // import React, { useContext, useEffect } from "react";
// // import "./Hero.scss";
// // import { ThemeContext } from "@/context/ThemeContext";

// // function Hero({ data }) {
// //   const { posts } = data;
// //   const { theme } = useContext(ThemeContext);

// //   useEffect(() => {
// //     // console.log(theme);
// //   }, [theme]);

// //   if (!posts || posts.length < 4) {
// //     return <div>Insufficient data available for this section.</div>;
// //   }

// //   // console.log(posts)

// //   return (
// //     <>
// //       <div className="HeroContainer ">
// //         <div className="container-fluid">
// //           <div className={`row px-2 ${theme === "dark" ? "dark" : "light"}`}>
// //             {/* Left Column - Featured Article */}
// //             <div className="col-12 col-lg-6 py-3 ">
// //               <div className="card border-0 rounded shadow-sm overflow-hidden w-100">
// //                 <Image
// //                   src={posts[0]?.img || "/fallback-image.png"}
// //                   alt={posts[0]?.title || "No title"}
// //                   className="card-img-top hero-image"
// //                   width={500}
// //                   height={250}
// //                   style={{ objectFit: "cover", height: "100%" }}
// //                 />
// //                 <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// //                   <span className={`badge bg-${getBadgeColor(posts[0]?.catSlug)} mb-2`}>
// //                     {posts[0]?.catSlug || "Uncategorized"}
// //                   </span>
// //                   <h5 className="card-title text-white fw-bold">
// //                     {posts[0]?.title || "No title available"}
// //                   </h5>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Column - Smaller Articles */}
// //             <div className="col-12 col-lg-6 py-3">
// //               <div className="row g-2">
// //                 {posts.slice(1, 3).map((article, index) => (
// //                   <div key={index} className="col-6">
// //                     <div className="card border-0 shadow-sm overflow-hidden h-100">
// //                       <Image
// //                         src={article?.img || "/fallback-image.png"}
// //                         alt={article?.title || "No title"}
// //                         className="card-img-top"
// //                         width={250}
// //                         height={150}
// //                         style={{ objectFit: "cover", height: "100%" }}
// //                       />
// //                       <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// //                         <span className={`badge bg-${getBadgeColor(article?.catSlug)} mb-1`}>
// //                           {article?.catSlug || "Uncategorized"}
// //                         </span>
// //                         <h6 className="card-title text-white">
// //                           {article?.title || "No title available"}
// //                         </h6>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Bottom Full-Width Article - FIXED */}
// //               {posts[3] && (
// //                 <div className="row mt-2 llll">
// //                   <div className="col-12">
// //                     <div className="card border-0 shadow-sm overflow-hidden w-100 h-100">
// //                       <Image
// //                         src={posts[3]?.img || "/fallback-image.png"}
// //                         alt={posts[3]?.title || "No title"}
// //                         className="card-img-top"
// //                         width={950}
// //                         height={220}
// //                         style={{
// //                           objectFit: "cover",
// //                           width: "100%",
// //                           height: "100%",
// //                         }}
// //                       />
// //                       <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
// //                         <span className={`badge bg-${getBadgeColor(posts[3]?.catSlug)} mb-2`}>
// //                           {posts[3]?.catSlug || "Uncategorized"}
// //                         </span>
// //                         <h6 className="card-title text-white">
// //                           {posts[3]?.title || "No title available"}
// //                         </h6>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // // Utility function to determine badge color
// // const getBadgeColor = (catSlug) => {
// //   switch (catSlug?.toLowerCase()) {
// //     case "story":
// //       return "light";
// //     case "videos":
// //       return "danger";
// //     case "events":
// //       return "success";
// //     case "business":
// //       return "info";
// //     case "cityconnect":
// //       return "warning";
// //     default:
// //       return "primary";
// //   }
// // };

// // export default Hero;


// import Image from "next/image";
// import Link from "next/link";
// import React, { useContext, useEffect } from "react";
// import "./Hero.scss";
// import { ThemeContext } from "@/context/ThemeContext";

// function Hero({ data }) {
//   const { posts } = data;
//   const { theme } = useContext(ThemeContext);

//   useEffect(() => {}, [theme]);

//   if (!posts || posts.length < 4) {
//     return <div>Insufficient data available for this section.</div>;
//   }

//   return (
//     <div className="HeroContainer">
//       <div className="container-fluid">
//         <div className={`row px-2 ${theme === "dark" ? "dark" : "light"}`}>
//           {/* Left Column - Featured Article */}
//           <div className="col-12 col-lg-6 py-3">
//             <Link href={`/category/${posts[0]?.catSlug}/${posts[0]?.slug}`} passHref legacyBehavior>
//               <a className="text-decoration-none">
//                 <div className="card border-0 rounded shadow-sm overflow-hidden w-100">
//                   <Image
//                     src={posts[0]?.img || "/fallback-image.png"}
//                     alt={posts[0]?.title || "No title"}
//                     className="card-img-top hero-image"
//                     width={500}
//                     height={250}
//                     style={{ objectFit: "cover", height: "100%" }}
//                   />
//                   <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
//                     <span className={`badge bg-${getBadgeColor(posts[0]?.catSlug)} mb-2`}>
//                       {posts[0]?.catSlug || "Uncategorized"}
//                     </span>
//                     <h5 className="card-title text-white fw-bold">
//                       {posts[0]?.title || "No title available"}
//                     </h5>
//                   </div>
//                 </div>
//               </a>
//             </Link>
//           </div>

//           {/* Right Column - Smaller Articles */}
//           <div className="col-12 col-lg-6 py-3">
//             <div className="row g-2">
//               {posts.slice(1, 3).map((article, index) => (
//                 <div key={index} className="col-6">
//                   <Link href={`/category/${article?.catSlug}/${article?.slug}`} passHref legacyBehavior>
//                     <a className="text-decoration-none">
//                       <div className="card border-0 shadow-sm overflow-hidden h-100">
//                         <Image
//                           src={article?.img || "/fallback-image.png"}
//                           alt={article?.title || "No title"}
//                           className="card-img-top"
//                           width={250}
//                           height={150}
//                           style={{ objectFit: "cover", height: "100%" }}
//                         />
//                         <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
//                           <span className={`badge bg-${getBadgeColor(article?.catSlug)} mb-1`}>
//                             {article?.catSlug || "Uncategorized"}
//                           </span>
//                           <h6 className="card-title text-white">
//                             {article?.title || "No title available"}
//                           </h6>
//                         </div>
//                       </div>
//                     </a>
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Bottom Full-Width Article */}
//             {posts[3] && (
//               <div className="row mt-2 llll">
//                 <div className="col-12">
//                   <Link href={`/category/${posts[3]?.catSlug}/${posts[3]?.slug}`} passHref legacyBehavior>
//                     <a className="text-decoration-none">
//                       <div className="card border-0 shadow-sm overflow-hidden w-100 h-100">
//                         <Image
//                           src={posts[3]?.img || "/fallback-image.png"}
//                           alt={posts[3]?.title || "No title"}
//                           className="card-img-top"
//                           width={950}
//                           height={220}
//                           style={{ objectFit: "cover", width: "100%", height: "100%" }}
//                         />
//                         <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
//                           <span className={`badge bg-${getBadgeColor(posts[3]?.catSlug)} mb-2`}>
//                             {posts[3]?.catSlug || "Uncategorized"}
//                           </span>
//                           <h6 className="card-title text-white">
//                             {posts[3]?.title || "No title available"}
//                           </h6>
//                         </div>
//                       </div>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Utility function to determine badge color
// const getBadgeColor = (catSlug) => {
//   switch (catSlug?.toLowerCase()) {
//     case "story":
//       return "light";
//     case "videos":
//       return "danger";
//     case "events":
//       return "success";
//     case "business":
//       return "info";
//     case "cityconnect":
//       return "warning";
//     default:
//       return "primary";
//   }
// };

// export default Hero;


import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import "./Hero.scss";
import { ThemeContext } from "@/context/ThemeContext";

function Hero({ data }) {
  const { posts } = data;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {}, [theme]);

  if (!posts || posts.length < 4) {
    return <div>Insufficient data available for this section.</div>;
  }

  return (
    <div className="HeroContainer">
      <div className="container-fluid">
        <div className={`row px-2 ${theme === "dark" ? "dark" : "light"}`}>
          {/* Left Column - Featured Article */}
          <div className="col-12 col-lg-6 py-3">
            <Link href={`/category/${posts[0]?.catSlug}/${posts[0]?.slug}`} passHref legacyBehavior>
              <a className="text-decoration-none">
                <div className="card border-0 rounded shadow-sm overflow-hidden w-100">
                  <Image
                    src={posts[0]?.img || "/fallback-image.png"}
                    alt={posts[0]?.title || "No title"}
                    className="card-img-top hero-image"
                    width={500}
                    height={250}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                    <span className={`badge bg-${getBadgeColor(posts[0]?.catSlug)} mb-2`}>
                      {posts[0]?.catSlug || "Uncategorized"}
                    </span>
                    <h5 className="card-title text-white fw-bold">
                      {posts[0]?.title || "No title available"}
                    </h5>
                    <p className="card-text text-white text-truncate-2">
                      {posts[0]?.desc || "No description available"}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>

          {/* Right Column - Smaller Articles */}
          <div className="col-12 col-lg-6 py-3">
            <div className="row g-2">
              {posts.slice(1, 3).map((article, index) => (
                <div key={index} className="col-6">
                  <Link href={`/category/${article?.catSlug}/${article?.slug}`} passHref legacyBehavior>
                    <a className="text-decoration-none">
                      <div className="card border-0 shadow-sm overflow-hidden h-100">
                        <Image
                          src={article?.img || "/fallback-image.png"}
                          alt={article?.title || "No title"}
                          className="card-img-top"
                          width={250}
                          height={150}
                          style={{ objectFit: "cover", height: "100%" }}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                          <span className={`badge bg-${getBadgeColor(article?.catSlug)} mb-1`}>
                            {article?.catSlug || "Uncategorized"}
                          </span>
                          <h6 className="card-title text-white">
                            {article?.title || "No title available"}
                          </h6>
                          <p className="card-text text-white text-truncate-2">
                            {article?.desc || "No description available"}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom Full-Width Article */}
            {posts[3] && (
              <div className="row mt-2 llll">
                <div className="col-12">
                  <Link href={`/category/${posts[3]?.catSlug}/${posts[3]?.slug}`} passHref legacyBehavior>
                    <a className="text-decoration-none">
                      <div className="card border-0 shadow-sm overflow-hidden w-100 h-100">
                        <Image
                          src={posts[3]?.img || "/fallback-image.png"}
                          alt={posts[3]?.title || "No title"}
                          className="card-img-top"
                          width={950}
                          height={220}
                          style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                          <span className={`badge bg-${getBadgeColor(posts[3]?.catSlug)} mb-2`}>
                            {posts[3]?.catSlug || "Uncategorized"}
                          </span>
                          <h6 className="card-title text-white">
                            {posts[3]?.title || "No title available"}
                          </h6>
                          <p className="card-text text-white text-truncate-2">
                            {posts[3]?.desc || "No description available"}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to determine badge color
const getBadgeColor = (catSlug) => {
  switch (catSlug?.toLowerCase()) {
    case "story":
      return "light";
    case "videos":
      return "danger";
    case "events":
      return "success";
    case "business":
      return "info";
    case "cityconnect":
      return "warning";
    default:
      return "primary";
  }
};

export default Hero;
