// //   // "use client";
// //   // import Image from "next/image";
// //   // import Link from "next/link";
// //   // import React, { useContext } from "react";
// //   // import { ThemeContext } from "@/context/ThemeContext";
// //   // import { useRouter } from "next/navigation";
// //   // import "./LatestPopularPosts.scss";
// //   // import Menu from "../Menu/Menu";

// //   // export default function LatestPopularPosts({ categoryC, category, posts,inf }) {
// //   //   const { theme } = useContext(ThemeContext);
// //   //   const router = useRouter();
// //   //   console.log(posts);

// //   //   // Check if posts is an array and is not empty
// //   //   if (!Array.isArray(posts) || posts.length === 0) {
// //   //     return <div>No posts available.</div>;
// //   //   }

// //   //   return (
// //   //     <div className="latestPopularPosts">
// //   //       <section>
// //   //         <div className="container-fluid px-4 pb-4 pt-2">
// //   //           <div className="row">
// //   //             {/* Left Column - Latest Posts */}
// //   //             <div className="col-md-8 latestPostsContainer">
// //   //               {/* {categoryC && <h2 className="pb-3">{categoryC}</h2>} */}
// //   //               {!categoryC && (
// //   //                 <button className="btn btn-outline-primary mb-3">
// //   //                   Latest Posts
// //   //                 </button>
// //   //               )}
// //   //               <div className="row g-3 latestPosts pt-1">
// //   //                 {posts.map((item) => (
// //   //                   <div key={item.id} className="col-md-12">
// //   //                     <Link
// //   //                       href={`/category/${item.catSlug}/${item.slug}`}
// //   //                       className="text-decoration-none"
// //   //                     >
// //   //                       <div className="card border-0 shadow-sm h-100 d-flex flex-row">
// //   //                         <div className="position-relative">
// //   //                           <div className="image-container">
// //   //                             <Image
// //   //                               src={
// //   //                                 item.img ||
// //   //                                 "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACUCAMAAAB1LD/SAAAAYFBMVEUAAAD///9sbGzd3d3r6+sODg67u7vl5eXx8fG/v7+mpqbNzc3a2trW1tbQ0NA+Pj6zs7M1NTWtra2VlZWPj48XFxdhYWFycnJQUFAoKCh/f38bGxtaWlqenp6FhYVDQ0PuZ2P8AAAD3ElEQVR4nO3Y23ajIBQGYBEU1Hg+4vH933JQQUzaziSTtOnF/63VRjQhbNggxnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA7eMq5WHu3l5+r/IW1vYJsfS5YUnR7cXAzKnjQSn156HxVjnr5ZQUfpFFnDvMqYiIJU+9cvoTdF5/8EWnAgrltyyTcikMhgqqd1cl8K8uQJXPbZyJK761RUuLqwybmoaqb8n4PeaS8UOWYza8N4hFeFI/7Ub0VJ9FupYZlw/pa8r1xI4/urTFLTMQ53fvNK/h2ZomjvRwK96uPf7uSLOdiLiZ9NLNG/e+oKbtkvK/GmXYm4pDtieLIKFhnRUl1OnvR5ZlGP6MW1/lVskEfeXHhbc03ly73DXLHS8dETEJzdmaqv9K4MOWG5P/d5ue05LpM/eNwYtKRvu998lbp2nUs768qkIFfm4g7csz9/FKtM6U93sdC5z2ideDqPK91mVTHpV7kzkJtw1Kb/x31TSpIYvtoVVH1Lh1xeerOSGVMS+3qFyWvCeBhvHJadb8gInLXoGtiV5RONCpFbQ84xI7mQoM95JRkV/WN28Kna8mEveAng1NebGpMwnmLWjQhmzopx4BNKobc5qEjVQ6O/JSzorTHKuS19aO4HuGBbzmhI45OMz+k0glP49rfTKefkosg1jFWrF9nnh2FQZ1o2OkuIs5Tb6G+dFx2HbCTxduLjpgG9srEpZedeuBtEbNjzayzJH8gYqeL/Z5n1xvGWezd95sjFrZRvYru7qxWxkQU1wGPevfyu7Parkyj2l3du3KtFkGC4XyiTkwS/OKVaziN2xqxQ2z5L3enVU78dF++jIK5zWYk1dh09ce7E7c1vO3uFNvEa9ali9qymnlqBxKYO/XNZiVd78PLVcihMIj6C1K1KhwRbjuQI+udN+5ATsm1bXqr0y4zvNllntYhZ9zvwzejbJgt+HmXqepJk2OX6ZIHnj5fKifmSSGP1fZQLVemkfpJ4hLq1ak9P0m4TG881Ch/8hRpVoNJ6EHWTxIV1XUMUfy6GB5U6vUoD/jWmko/WrSs2Ea74vvMbs633iU+dlpdfL3p2piIZbw/VQ8+X7tPDXKydYEstu58D28iydTPPqd7G4aJR2VfRszf024oWVz1VSD808OObGxOLp+0nZj5OiYsm/uCc3fPlC7hfj+HlPcfP/RjvCaMLjRqTUDeWMQ0yUYzn+tFlePMHb6q4BO+/dVnDi6XqDoyX/aB+rLq7t9Tvsm/fnt79pe9v38bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC82B/1RzC3jHPADQAAAABJRU5ErkJggg=="
// //   //                               }
// //   //                               alt={item.title}
// //   //                               width={350}
// //   //                               height={200}
// //   //                               className="card-img-top rounded-0"
// //   //                               style={{
// //   //                                 objectFit: "cover",
// //   //                                 width: "100%",
// //   //                                 height: "100%",
// //   //                               }}
// //   //                             />
// //   //                           </div>
// //   //                           <span className="position-absolute top-0 m-2 text-black badge bg-info">
// //   //                             {item.catSlug}
// //   //                           </span>
// //   //                         </div>
// //   //                         <div
// //   //                           className={`card-body ${
// //   //                             theme === "dark" ? "dark" : "light"
// //   //                           } p-0 ps-4`}
// //   //                         >
// //   //                           <h6 className="card-title text-truncate-2">
// //   //                             {item.title}
// //   //                           </h6>
// //   //                           <span className=" small ">
// //   //                             BY{" "}
// //   //                             <span className="fs-6 text-primary">
// //   //                               {item.userEmail}
// //   //                             </span>{" "}
// //   //                             <small className=" ps-3">
// //   //                               {item.createdAt.slice(0, 10)}
// //   //                             </small>
// //   //                             <small className=" ps-3">{item.views}</small>
// //   //                           </span>
// //   //                           <p className="description text-truncate-2">
// //   //                             {item.desc}
// //   //                           </p>
// //   //                           <button className="btn btn-sm btn-outline-success">
// //   //                             Read More
// //   //                           </button>
// //   //                         </div>
// //   //                       </div>
// //   //                     </Link>
// //   //                   </div>
// //   //                 ))}
// //   //               </div>
// //   //               <InfiniteFeed />
// //   //             </div>

// //   //             {/* Right Column - Popular Posts */}
// //   //             <div className="col-md-4 popularPostContainer">
// //   //               <Menu singlePage={false} upperMenu={false} />
// //   //             </div>
// //   //           </div>
// //   //         </div>
// //   //       </section>
// //   //     </div>
// //   //   );
// //   // }


// //   import React, { useContext, useState } from "react";
// // import { useInfiniteQuery } from "@tanstack/react-query";
// // import InfiniteScroll from "react-infinite-scroll-component";
// // import { ThemeContext } from "@/context/ThemeContext";
// // import Image from "next/image";
// // import Link from "next/link";
// // import "./LatestPopularPosts.scss";
// // import Menu from "../Menu/Menu"; // Assuming you still want the Menu to appear on home page

// // // Fetch posts based on category and pagination
// // const fetchPosts = async ({ pageParam = 1, cat }) => {
// //   const url = cat 
// //     ? `/api/posts?page=${pageParam}&cat=${cat}` 
// //     : `/api/posts?page=${pageParam}`; // If no category, fetch all posts
// //   const response = await fetch(url);
// //   const data = await response.json();
// //   return data;
// // };

// // export default function LatestPopularPosts({ category = null }) {
// //   const { theme } = useContext(ThemeContext);
// //   const [initialPosts, setInitialPosts] = useState([]);

// //   const {
// //     data,
// //     isError,
// //     isLoading,
// //     hasNextPage,
// //     fetchNextPage,
// //     isFetchingNextPage
// //   } = useInfiniteQuery({
// //     queryKey: ['posts', category], // Adjust query key to include category
// //     queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, cat: category }), // Fetch posts based on category
// //     getNextPageParam: (lastPage, pages) => {
// //       return lastPage.hasMore ? pages.length + 1 : undefined;
// //     },
// //     onSuccess: (data) => {
// //       if (data.pages.length === 1) {
// //         setInitialPosts(data.pages[0].posts);  // Storing initial posts separately
// //       }
// //     },
// //   });

// //   // If the first 5 posts have been fetched, we can skip fetching them in subsequent pages
// //   const mergedPosts = initialPosts.concat(
// //     data?.pages?.flatMap((page) => page.posts) || []
// //   );

// //   if (isLoading && initialPosts.length === 0) return <div>Loading...</div>;
// //   if (isError) return <div>Error fetching posts!</div>;

// //   return (
// //     <div className="latestPopularPosts">
// //       <section>
// //         <div className="container-fluid px-4 pb-4 pt-2">
// //           <div className="row">
// //             {/* Left Column - Latest Posts */}
// //             <div className="col-md-8 latestPostsContainer">
// //               <button className="btn btn-outline-primary mb-3">
// //                 Latest Posts
// //               </button>

// //               {/* Infinite Scroll inside the Latest Posts section */}
// //               <InfiniteScroll
// //                 dataLength={mergedPosts.length} // Total posts length
// //                 next={fetchNextPage} // Fetch next page on scroll
// //                 hasMore={hasNextPage} // Check if there are more posts to load
// //                 loader={<h4>Loading more posts...</h4>} // Loading indicator
// //                 endMessage={<p>No more posts</p>} // Message when no more posts
// //                 scrollThreshold={0.95} // Trigger fetching when 95% of the scroll is reached
// //               >
// //                 {/* Render posts */}
// //                 <div className="row g-3 latestPosts pt-1">
// //                   {mergedPosts.map((item) => (
// //                     <div key={item.id} className="col-md-12">
// //                       <Link
// //                         href={`/category/${item.catSlug}/${item.slug}`}
// //                         className="text-decoration-none"
// //                       >
// //                         <div className="card border-0 shadow-sm h-100 d-flex flex-row">
// //                           <div className="position-relative">
// //                             <div className="image-container">
// //                               <Image
// //                                 src={item.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACUCAMAAAB1LD/SAAAAYFBMVEUAAAD///9sbGzd3d3r6+sODg67u7vl5eXx8fG/v7+mpqbNzc3a2trW1tbQ0NA+Pj6zs7M1NTWtra2VlZWPj48XFxdhYWFycnJQUFAoKCh/f38bGxtaWlqenp6FhYVDQ0PuZ2P8AAAD3ElEQVR4nO3Y23ajIBQGYBEU1Hg+4vH933JQQUzaziSTtOnF/63VRjQhbNggxnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA7eMq5WHu3l5+r/IW1vYJsfS5YUnR7cXAzKnjQSn156HxVjnr5ZQUfpFFnDvMqYiIJU+9cvoTdF5/8EWnAgrltyyTcikMhgqqd1cl8K8uQJXPbZyJK761RUuLqwybmoaqb8n4PeaS8UOWYza8N4hFeFI/7Ub0VJ9FupYZlw/pa8r1xI4/urTFLTMQ53fvNK/h2ZomjvRwK96uPf7uSLOdiLiZ9NLNG/e+oKbtkvK/GmXYm4pDtieLIKFhnRUl1OnvR5ZlGP6MW1/lVskEfeXHhbc03ly73DXLHS8dETEJzdmaqv9K4MOWG5P/d5ue05LpM/eNwYtKRvu998lbp2nUs768qkIFfm4g7csz9/FKtM6U93sdC5z2ideDqPK91mVTHpV7kzkJtw1Kb/x31TSpIYvtoVVH1Lh1xeerOSGVMS+3qFyWvCeBhvHJadb8gInLXoGtiV5RONCpFbQ84xI7mQoM95JRkV/WN28Kna8mEveAng1NebGpMwnmLWjQhmzopx4BNKobc5qEjVQ6O/JSzorTHKuS19aO4HuGBbzmhI45OMz+k0glP49rfTKefkosg1jFWrF9nnh2FQZ1o2OkuIs5Tb6G+dFx2HbCTxduLjpgG9srEpZedeuBtEbNjzayzJH8gYqeL/Z5n1xvGWezd95sjFrZRvYru7qxWxkQU1wGPevfyu7Parkyj2l3du3KtFkGC4XyiTkwS/OKVaziN2xqxQ2z5L3enVU78dF++jIK5zWYk1dh09ce7E7c1vO3uFNvEa9ali9qymnlqBxKYO/XNZiVd78PLVcihMIj6C1K1KhwRbjuQI+udN+5ATsm1bXqr0y4zvNllntYhZ9zvwzejbJgt+HmXqepJk2OX6ZIHnj5fKifmSSGP1fZQLVemkfpJ4hLq1ak9P0m4TG881Ch/8hRpVoNJ6EHWTxIV1XUMUfy6GB5U6vUoD/jWmko/WrSs2Ea74vvMbs633iU+dlpdfL3p2piIZbw/VQ8+X7tPDXKydYEstu58D28iydTPPqd7G4aJR2VfRszf024oWVz1VSD808OObGxOLp+0nZj5OiYsm/uCc3fPlC7hfj+HlPcfP/RjvCaMLjRqTUDeWMQ0yUYzn+tFlePMHb6q4BO+/dVnDi6XqDoyX/aB+rLq7t9Tvsm/fnt79pe9v38bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC82B/1RzC3jHPADQAAAABJRU5ErkJggg=="} // Default image if none
// //                                 alt={item.title}
// //                                 width={350}
// //                                 height={200}
// //                                 className="card-img-top rounded-0"
// //                                 style={{
// //                                   objectFit: "cover",
// //                                   width: "100%",
// //                                   height: "100%",
// //                                 }}
// //                               />
// //                             </div>
// //                             <span className="position-absolute top-0 m-2 text-black badge bg-info">
// //                               {item.catSlug}
// //                             </span>
// //                           </div>
// //                           <div
// //                             className={`card-body ${theme === "dark" ? "dark" : "light"} p-0 ps-4`}
// //                           >
// //                             <h6 className="card-title text-truncate-2">
// //                               {item.title}
// //                             </h6>
// //                             <span className="small">
// //                               BY{" "}
// //                               <span className="fs-6 text-primary">
// //                                 {item.userEmail}
// //                               </span>{" "}
// //                               <small className="ps-3">{item.createdAt.slice(0, 10)}</small>
// //                               <small className="ps-3">{item.views}</small>
// //                             </span>
// //                             <p className="description text-truncate-2">
// //                               {item.desc}
// //                             </p>
// //                             <button className="btn btn-sm btn-outline-success">
// //                               Read More
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </Link>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </InfiniteScroll>
// //             </div>

// //             {/* Right Column - Render only once on Home Page */}
// //             {category === null && (
// //               <div className="col-md-4 popularPostContainer">
// //                 <Menu singlePage={false} upperMenu={false} />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }


// import React, { useContext, useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { ThemeContext } from "@/context/ThemeContext";
// import Image from "next/image";
// import Link from "next/link";
// import "./LatestPopularPosts.scss";
// import Menu from "../Menu/Menu";

// // Fetch posts based on category and pagination
// const fetchPosts = async ({ pageParam = 1, cat }) => {
//   const url = cat 
//     ? `/api/posts?page=${pageParam}&cat=${cat}` 
//     : `/api/posts?page=${pageParam}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// export default function LatestPopularPosts({ category = null }) {
//   const { theme } = useContext(ThemeContext);
//   const [initialPosts, setInitialPosts] = useState([]);

//   const {
//     data,
//     isError,
//     isLoading,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage
//   } = useInfiniteQuery({
//     queryKey: ['posts', category], 
//     queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, cat: category }),
//     getNextPageParam: (lastPage, pages) => {
//       return lastPage.hasMore ? pages.length + 1 : undefined;
//     },
//     onSuccess: (data) => {
//       if (data.pages.length === 1) {
//         setInitialPosts(data.pages[0].posts);
//       }
//     },
//   });

//   const mergedPosts = initialPosts.concat(
//     data?.pages?.flatMap((page) => page.posts) || []
//   );
// console.log(mergedPosts)
//   if (isLoading && initialPosts.length === 0) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching posts!</div>;

//   return (
//     <div className="latestPopularPosts">
//       <section>
//         <div className="container-fluid px-4 pb-4 pt-2">
//           <div className="row">
//             {/* Left Column - Latest Posts */}
//             <div className="col-md-8 latestPostsContainer">
//               <button className="btn btn-outline-primary mb-3">
//                 Latest Posts
//               </button>

//               {/* Infinite Scroll inside the Latest Posts section */}
//               <InfiniteScroll
//                 dataLength={mergedPosts.length}
//                 next={fetchNextPage}
//                 hasMore={hasNextPage}
//                 loader={<h4>Loading more posts...</h4>}
//                 endMessage={<p>No more posts</p>}
//                 scrollThreshold={0.95}
//               >
//                 {/* Render posts */}
//                 <div className="row g-3 latestPosts pt-1">
//                   {mergedPosts.map((item) => (
//                     <div key={item.id} className="col-md-12">
//                       <Link
//                         href={`/category/${item.catSlug}/${item.slug}`}
//                         className="text-decoration-none"
//                       >
//                         <div className="card border-0 shadow-sm h-100 d-flex flex-row">
//                           <div className="image-container">
//                             <Image
//                               src={item.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACUCAMAAAB1LD/SAAAAYFBMVEUAAAD///9sbGzd3d3r6+sODg67u7vl5eXx8fG/v7+mpqbNzc3a2trW1tbQ0NA+Pj6zs7M1NTWtra2VlZWPj48XFxdhYWFycnJQUFAoKCh/f38bGxtaWlqenp6FhYVDQ0PuZ2P8AAAD3ElEQVR4nO3Y23ajIBQGYBEU1Hg+4vH933JQQUzaziSTtOnF/63VRjQhbNggxnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA7eMq5WHu3l5+r/IW1vYJsfS5YUnR7cXAzKnjQSn156HxVjnr5ZQUfpFFnDvMqYiIJU+9cvoTdF5/8EWnAgrltyyTcikMhgqqd1cl8K8uQJXPbZyJK761RUuLqwybmoaqb8n4PeaS8UOWYza8N4hFeFI/7Ub0VJ9FupYZlw/pa8r1xI4/urTFLTMQ53fvNK/h2ZomjvRwK96uPf7uSLOdiLiZ9NLNG/e+oKbtkvK/GmXYm4pDtieLIKFhnRUl1OnvR5ZlGP6MW1/lVskEfeXHhbc03ly73DXLHS8dETEJzdmaqv9K4MOWG5P/d5ue05LpM/eNwYtKRvu998lbp2nUs768qkIFfm4g7csz9/FKtM6U93sdC5z2ideDqPK91mVTHpV7kzkJtw1Kb/x31TSpIYvtoVVH1Lh1xeerOSGVMS+3qFyWvCeBhvHJadb8gInLXoGtiV5RONCpFbQ84xI7mQoM95JRkV/WN28Kna8mEveAng1NebGpMwnmLWjQhmzopx4BNKobc5qEjVQ6O/JSzorTHKuS19aO4HuGBbzmhI45OMz+k0glP49rfTKefkosg1jFWrF9nnh2FQZ1o2OkuIs5Tb6G+dFx2HbCTxduLjpgG9srEpZedeuBtEbNjzayzJH8gYqeL/Z5n1xvGWezd95sjFrZRvYru7qxWxkQU1wGPevfyu7Parkyj2l3du3KtFkGC4XyiTkwS/OKVaziN2xqxQ2z5L3enVU78dF++jIK5zWYk1dh09ce7E7c1vO3uFNvEa9ali9qymnlqBxKYO/XNZiVd78PLVcihMIj6C1K1KhwRbjuQI+udN+5ATsm1bXqr0y4zvNllntYhZ9zvwzejbJgt+HmXqepJk2OX6ZIHnj5fKifmSSGP1fZQLVemkfpJ4hLq1ak9P0m4TG881Ch/8hRpVoNJ6EHWTxIV1XUMUfy6GB5U6vUoD/jWmko/WrSs2Ea74vvMbs633iU+dlpdfL3p2piIZbw/VQ8+X7tPDXKydYEstu58D28iydTPPqd7G4aJR2VfRszf024oWVz1VSD808OObGxOLp+0nZj5OiYsm/uCc3fPlC7hfj+HlPcfP/RjvCaMLjRqTUDeWMQ0yUYzn+tFlePMHb6q4BO+/dVnDi6XqDoyX/aB+rLq7t9Tvsm/fnt79pe9v38bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC82B/1RzC3jHPADQAAAABJRU5ErkJggg=="} // Default image if none
//                               alt={item.title}
//                               width={350}
//                               height={200}
//                               className="card-img-top rounded-0"
//                               style={{
//                                 objectFit: "cover",
//                                 width: "100%",
//                                 height: "100%",
//                               }}
//                             />
//                             <span className="position-absolute top-0 m-2 badge">
//                               {item.catSlug}
//                             </span>
//                           </div>
//                           <div className={`card-body ${theme === "dark" ? "dark" : "light"}`}>
//                             <h6 className="card-title text-truncate-2">
//                               {item.title}
//                             </h6>
//                             <span className="small">
//                               BY{" "}
//                               <span className="fs-6 text-primary">
//                                 {item.userEmail}
//                               </span>{" "}
//                               <small className="ps-3">{item.createdAt.slice(0, 10)}</small>
//                               <small className="ps-3">{item.views}</small>
//                             </span>
//                             <p className="description text-truncate-2">
//                               {item.desc}
//                             </p>
//                             <button className="btn btn-sm btn-outline-success">
//                               Read More
//                             </button>
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </InfiniteScroll>
//             </div>

//             {/* Right Column - Render only once on Home Page */}
//             {category === null && (
//               <div className="col-md-4 popularPostContainer">
//                 <Menu singlePage={false} upperMenu={false} />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import "./LatestPopularPosts.scss";
import Menu from "../Menu/Menu";

// Fetch posts based on category and pagination
const fetchPosts = async ({ pageParam = 1, cat }) => {
  const url = cat 
    ? `/api/posts?page=${pageParam}&cat=${cat}` 
    : `/api/posts?page=${pageParam}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function LatestPopularPosts({ category = null }) {
  const { theme } = useContext(ThemeContext);
  const [initialPosts, setInitialPosts] = useState([]);

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts', category], 
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, cat: category }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    onSuccess: (data) => {
      if (data.pages.length === 1) {
        setInitialPosts(data.pages[0].posts); // Store initial posts separately
      }
    },
  });

  // Merge initial posts with posts from subsequent pages
  const mergedPosts = initialPosts.concat(
    data?.pages?.flatMap((page) => page.posts) || []
  );

  if (isLoading && initialPosts.length === 0) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts!</div>;

  return (
    <div className="latestPopularPosts">
      <section>
        <div className="container-fluid px-4 pb-4 pt-2">
          <div className="row">
            {/* Left Column - Latest Posts */}
            <div className="col-md-8 latestPostsContainer">
              <button className="btn btn-outline-primary mb-3">
                Latest Posts
              </button>

              {/* Infinite Scroll inside the Latest Posts section */}
              <InfiniteScroll
                dataLength={mergedPosts.length} // Total posts length
                next={fetchNextPage} // Fetch next page on scroll
                hasMore={hasNextPage} // Check if there are more posts to load
                loader={<h4>Loading more posts...</h4>} // Loading indicator
                endMessage={<p className="pt-4">No more posts</p>} // Message when no more posts
                scrollThreshold={0.95} // Trigger fetching when 95% of the scroll is reached
              >
                {/* Render posts */}
                <div className="row g-3 latestPosts pt-1">
                  {mergedPosts.map((item) => (
                    <div key={item.id} className="col-md-12">
                      <Link
                        href={`/category/${item.catSlug}/${item.slug}`}
                        className="text-decoration-none"
                      >
                        <div className="card border-0 shadow-sm h-100 d-flex flex-row">
                          <div className="position-relative">
                            <div className="image-container">
                              <Image
                                src={item.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACUCAMAAAB1LD/SAAAAYFBMVEUAAAD///9sbGzd3d3r6+sODg67u7vl5eXx8fG/v7+mpqbNzc3a2trW1tbQ0NA+Pj6zs7M1NTWtra2VlZWPj48XFxdhYWFycnJQUFAoKCh/f38bGxtaWlqenp6FhYVDQ0PuZ2P8AAAD3ElEQVR4nO3Y23ajIBQGYBEU1Hg+4vH933JQQUzaziSTtOnF/63VRjQhbNggxnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA7eMq5WHu3l5+r/IW1vYJsfS5YUnR7cXAzKnjQSn156HxVjnr5ZQUfpFFnDvMqYiIJU+9cvoTdF5/8EWnAgrltyyTcikMhgqqd1cl8K8uQJXPbZyJK761RUuLqwybmoaqb8n4PeaS8UOWYza8N4hFeFI/7Ub0VJ9FupYZlw/pa8r1xI4/urTFLTMQ53fvNK/h2ZomjvRwK96uPf7uSLOdiLiZ9NLNG/e+oKbtkvK/GmXYm4pDtieLIKFhnRUl1OnvR5ZlGP6MW1/lVskEfeXHhbc03ly73DXLHS8dETEJzdmaqv9K4MOWG5P/d5ue05LpM/eNwYtKRvu998lbp2nUs768qkIFfm4g7csz9/FKtM6U93sdC5z2ideDqPK91mVTHpV7kzkJtw1Kb/x31TSpIYvtoVVH1Lh1xeerOSGVMS+3qFyWvCeBhvHJadb8gInLXoGtiV5RONCpFbQ84xI7mQoM95JRkV/WN28Kna8mEveAng1NebGpMwnmLWjQhmzopx4BNKobc5qEjVQ6O/JSzorTHKuS19aO4HuGBbzmhI45OMz+k0glP49rfTKefkosg1jFWrF9nnh2FQZ1o2OkuIs5Tb6G+dFx2HbCTxduLjpgG9srEpZedeuBtEbNjzayzJH8gYqeL/Z5n1xvGWezd95sjFrZRvYru7qxWxkQU1wGPevfyu7Parkyj2l3du3KtFkGC4XyiTkwS/OKVaziN2xqxQ2z5L3enVU78dF++jIK5zWYk1dh09ce7E7c1vO3uFNvEa9ali9qymnlqBxKYO/XNZiVd78PLVcihMIj6C1K1KhwRbjuQI+udN+5ATsm1bXqr0y4zvNllntYhZ9zvwzejbJgt+HmXqepJk2OX6ZIHnj5fKifmSSGP1fZQLVemkfpJ4hLq1ak9P0m4TG881Ch/8hRpVoNJ6EHWTxIV1XUMUfy6GB5U6vUoD/jWmko/WrSs2Ea74vvMbs633iU+dlpdfL3p2piIZbw/VQ8+X7tPDXKydYEstu58D28iydTPPqd7G4aJR2VfRszf024oWVz1VSD808OObGxOLp+0nZj5OiYsm/uCc3fPlC7hfj+HlPcfP/RjvCaMLjRqTUDeWMQ0yUYzn+tFlePMHb6q4BO+/dVnDi6XqDoyX/aB+rLq7t9Tvsm/fnt79pe9v38bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC82B/1RzC3jHPADQAAAABJRU5ErkJggg=="}
                                alt={item.title}
                                width={350}
                                height={200}
                                className="card-img-top rounded-0"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <span className="position-absolute top-0 m-2 text-black badge bg-info">
                              {item.catSlug}
                            </span>
                          </div>
                          <div
                            className={`card-body ${theme === "dark" ? "dark" : "light"} p-0 ps-4`}
                          >
                            <h6 className="card-title text-truncate-2">
                              {item.title}
                            </h6>
                            <span className="small">
                              BY{" "}
                              <span className="fs-6 text-primary">
                                {item.userEmail}
                              </span>{" "}
                              <small className="ps-3">{item.createdAt.slice(0, 10)}</small>
                              <small className="ps-3">{item.views}</small>
                            </span>
                            <p className="description text-truncate-2">
                              {item.desc}
                            </p>
                            <button className="btn btn-sm btn-outline-success">
                              Read More
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>

            {/* Right Column - Popular Posts */}
            <div className="col-md-4 ps-2">
              <Menu />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
