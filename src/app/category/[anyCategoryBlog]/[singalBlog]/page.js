// "use client";
// //todo ----- for resl sit like sections scrolling effect use postion sticly on top in side couumn so that content on his place stay when col end content scrolll
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import "./SinglePage.scss";
// import Comments from "@/components/comments/Comments";
// import Menu from "@/components/Menu/Menu";
// import Link from "next/link";
// import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
// import { FaComment, FaEye, FaRegComment } from "react-icons/fa6";
// import PostNotFound from "@/components/PostNotFound/PostNotFound";

// // Fetch data based on the slug
// const getData = async (slug) => {
//   const res = await fetch(`/api/posts/${slug}`, {
//     //?popular=true&limit=5
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch post data");
//   }

//   return res.json();
// };
// console.log("Post Data:", post);
// console.log("User:", post?.user);
// console.log("Category:", post?.category);
// const SinglePage = () => {
//   const pathname = usePathname();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // console.log(data);

//   // Extract the slug from the URL
//   const slug = pathname.split("/").pop(); // Assuming slug is the last part of the URL

//   useEffect(() => {
//     if (slug) {
//       const fetchData = async () => {
//         try {
//           const postData = await getData(slug);
//           setData(postData);
//         } catch (error) {
//           console.error("Error fetching post data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }
//   }, [slug]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!data) {
//     return <PostNotFound />;
//   }

//   return (
//     <>
//       <div className="singlePage">
//         <div className="container-fluid p-4">
//           <div className="row">
//             <div className="col-12 col-md-7 col-lg-8 leftCol">
//               <div className="title pb-2">
//                 <h1>{data.title}</h1>
//               </div>

//               <div className="writerInfo d-flex flex-wrap align-items-center pt-2">
//                 <span className="userImg pe-3 d-flex align-items-center">
//                   {data?.user?.image && (
//                     <div className="userImageContainer">
//                       <Image
//                         src={data.user.image}
//                         alt="avatar"
//                         className="avatar"
//                         height={300}
//                         width={500}
//                       />
//                     </div>
//                   )}
//                 </span>
//                 <span className="username pe-2">
//                   by{" "}
//                   <Link className="text-decoration-none" href="/">
//                     {data?.user?.name || "Unknown User"}
//                   </Link>
//                 </span>
//                 <span className="date pe-2">
//                   --{" "}
//                   {new Date(data.createdAt)
//                     .toISOString()
//                     .split("T")[0]
//                     .split("-")
//                     .reverse()
//                     .join("-")}
//                 </span>
//                 <span className="categories ps-5 ps-sm-0" > in {data.catSlug}</span>
//                 <span className="views ps-5 ps-sm-4">
//                   <FaEye className="viewsIcon" /> {data.views}
//                 </span>
//               </div>

//               <div className="postDetailsContainer py-4">
//                 {data?.img && (
//                   <div className="postImageWrapper pb-4">
//                     <Image
//                       src={data.img}
//                       alt="avatar"
//                       className="postimg"
//                       height={500}
//                       width={900}
//                     />
//                   </div>
//                 )}
//                 <div className="postDetails">
//                   <div
//                     className="description pb-5 pt-3"
//                     dangerouslySetInnerHTML={{ __html: data?.desc }}
//                   />

//                   <div className="p-3">
//                     <div className="writerInfo2 p-4 shadow border row ">
//                       <div className="userImg text-center col-12 col-md-4 d-flex justify-content-center align-items-center">
//                         {data?.user?.image && (
//                           <div className="userImageContainer">
//                             <Image
//                               src={data.user.image}
//                               alt="avatar"
//                               className="avatar"
//                               height={300}
//                               width={500}
//                             />
//                           </div>
//                         )}
//                       </div>
//                       <div className="userDetails text-center text-sm-start pt-4 pt-sm-0 col-12 col-md-8">
//                         <p className="username pe-2 fs-5">
//                           <Link className=" text-decoration-none" href="/">
//                             {data?.user?.name || "Unknown User"}
//                           </Link>
//                         </p>
//                         <p className="userBio">
//                           Lorem ipsum dolor sit amet, consectetur adipisicing
//                           elit. Hic non aperiam tenetur at ratione ex repellat
//                           earum blanditiis eaque dolorem magni reprehenderit
//                           minus vel dolor, eveniet modi amet commodi.
//                         </p>
//                         <p className="socialIcons  d-flex justify-content-center justify-content-sm-start gap-3">
//                           <Facebook className="icon" />
//                           <Twitter className="icon" />
//                           <Instagram className="icon" />
//                           <LinkedIn className="icon" />
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="comment d-none d-md-block">
//                   <Comments postSlug={slug} />
//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-md-5 col-lg-4 rightCol ">
//               <div className="advertisement px-sm-5">
//                 <Image
//                   src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/300x250_2.jpg"
//                   alt="advertisement-img"
//                   className="advertisementImage card-img-top"
//                   width={350}
//                   height={250}
//                 />
//               </div>
//               <div className="othereBlogs ">
//                 <Menu singlePage={true} />
//               </div>
//               <div className="comment d-md-none">
//                 <Comments postSlug={slug} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SinglePage;




"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./SinglePage.scss";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/Menu/Menu";
import Link from "next/link";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { FaEye } from "react-icons/fa6";
import PostNotFound from "@/components/PostNotFound/PostNotFound";

// Fetch data based on the slug
const getData = async (slug) => {
  try {
    const res = await fetch(`/api/posts/${slug}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch post: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
};

const SinglePage = () => {
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const slug = pathname.split("/").pop(); // Extract slug from URL

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      const postData = await getData(slug);
      setData(postData);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  if (!data) return <PostNotFound />;

  return (
    <div className="singlePage">
      <div className="container-fluid p-4">
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-12 col-md-7 col-lg-8 leftCol">
            <div className="title pb-2">
              <h1>{data.title}</h1>
            </div>

            {/* Writer Info */}
            <div className="writerInfo d-flex flex-wrap align-items-center pt-2">
              <span className="userImg pe-3 d-flex align-items-center">
                {data?.user?.image && (
                  <div className="userImageContainer">
                    <Image
                      src={data.user.image}
                      alt="avatar"
                      className="avatar"
                      height={300}
                      width={500}
                    />
                  </div>
                )}
              </span>
              <span className="username pe-2">
                by{" "}
                <Link className="text-decoration-none" href="/">
                  {data?.user?.name || "Unknown User"}
                </Link>
              </span>
              <span className="date pe-2">
                -- {new Date(data.createdAt).toLocaleDateString()}
              </span>
              <span className="categories ps-5 ps-sm-0">
                in {data?.catSlug || "Uncategorized"}
              </span>
              <span className="views ps-5 ps-sm-4">
                <FaEye className="viewsIcon" /> {data.views}
              </span>
            </div>

            {/* Post Details */}
            <div className="postDetailsContainer py-4">
              {data?.img && (
                <div className="postImageWrapper pb-4">
                  <Image
                    src={data.img}
                    alt="Post Image"
                    className="postimg"
                    height={500}
                    width={900}
                  />
                </div>
              )}
              <div className="postDetails">
                <div
                  className="description pb-5 pt-3"
                  dangerouslySetInnerHTML={{ __html: data?.desc }}
                />
                {/* Writer Info 2 */}
                <div className="p-3">
                  <div className="writerInfo2 p-4 shadow border row">
                    <div className="userImg text-center col-12 col-md-4 d-flex justify-content-center align-items-center">
                      {data?.user?.image && (
                        <div className="userImageContainer">
                          <Image
                            src={data.user.image}
                            alt="User Avatar"
                            className="avatar"
                            height={300}
                            width={500}
                          />
                        </div>
                      )}
                    </div>
                    <div className="userDetails text-center text-sm-start pt-4 pt-sm-0 col-12 col-md-8">
                      <p className="username pe-2 fs-5">
                        <Link className="text-decoration-none" href="/">
                          {data?.user?.name || "Unknown User"}
                        </Link>
                      </p>
                      <p className="userBio">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Hic non aperiam tenetur at ratione ex repellat
                        earum blanditiis eaque dolorem magni reprehenderit
                        minus vel dolor, eveniet modi amet commodi.
                      </p>
                      <p className="socialIcons d-flex justify-content-center justify-content-sm-start gap-3">
                        <Facebook className="icon" />
                        <Twitter className="icon" />
                        <Instagram className="icon" />
                        <LinkedIn className="icon" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="comment d-none d-md-block">
              <Comments postSlug={slug} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-md-5 col-lg-4 rightCol">
            <div className="advertisement px-sm-5">
              <Image
                src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/300x250_2.jpg"
                alt="advertisement-img"
                className="advertisementImage card-img-top"
                width={350}
                height={250}
              />
            </div>
            <div className="otherBlogs">
              <Menu singlePage={true} />
            </div>
            <div className="comment d-md-none">
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
