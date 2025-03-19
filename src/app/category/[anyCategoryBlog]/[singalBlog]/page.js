

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./SinglePage.scss";
// import Comments from "../../../../components/Comments/Comments.jsx";
// import Comments from "@/components/Comments/Comments.jsx";
import Menu from "@/components/Menu/Menu";
import Link from "next/link";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { FaEye } from "react-icons/fa6";
import PostNotFound from "@/components/PostNotFound/PostNotFound";
import Head from "next/head";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";

const fetchPostData = async (slug) => {
  try {
    const res = await fetch(`/api/posts/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
    return await res.json();
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
      const postData = await fetchPostData(slug);
      setData(postData);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <PostNotFound />;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const metaDescription = data.desc?.substring(0, 160) || "Read amazing blog posts!";
  const postImage = data.img || "/default-image.jpg";
  const formattedDate = new Date(data.createdAt).toLocaleDateString();

  return (
    <>
      {/* ✅ Dynamic Metadata for SEO & Social Sharing */}
      <Head>
        <title>{data.title} | Your Blog</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />

        {/* ✅ OpenGraph Metadata */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://yourblog.com/post/${slug}`} />
        <meta property="og:site_name" content="Your Blog" />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />

        {/* ✅ Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={postImage} />
      </Head>

      <div className="singlePage">
        <div className="container-fluid p-4">
          <div className="row">
            {/* LEFT COLUMN */}
            <div className="col-12 col-md-7 col-lg-8 leftCol">
              <div className="title pb-2">
                <h1>{data.title}</h1>
              </div>

              {/* Share Buttons */}
              <div className="share-buttons d-flex gap-3 py-2">
                <FacebookShareButton url={shareUrl}>
                  <Facebook className="icon" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <Twitter className="icon" />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedIn className="icon" />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <Instagram className="icon" />
                </WhatsappShareButton>
              </div>

              {/* Writer Info */}
              <div className="writerInfo d-flex flex-wrap align-items-center pt-2 ">
                {data?.user?.image && (
                  <div className="userImageContainer">
                    <Image src={data.user.image} alt="Author" className="avatar rounded-5" height={50} width={50} />
                  </div>
                )}
                <span className="username pe-2 ps-3">
                  by <Link className="text-decoration-none" href="/">{data?.user?.name || "Unknown User"}</Link>
                </span>
                <span className="date pe-2">— {formattedDate}</span>
                <span className="categories ps-5 ps-sm-0"> in {data?.catSlug || "Uncategorized"} </span>
                <span className="views ps-5 ps-sm-4"> <FaEye className="viewsIcon" /> {data.views} </span>
              </div>

              {/* Post Details */}
              <div className="postDetailsContainer py-4">
                {data?.img && (
                  <div className="postImageWrapper pb-4">
                    <Image src={postImage} alt="Post Image" className="postimg" height={500} width={900} />
                  </div>
                )}
                <div className="postDetails">
                  <div className="description pb-5 pt-3" dangerouslySetInnerHTML={{ __html: data?.desc }} />

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
              {/* <div className="comment d-none d-md-block">
                <Comments postSlug={slug} />
              </div> */}
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
              {/* <div className="comment d-md-none">
                <Comments postSlug={slug} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
