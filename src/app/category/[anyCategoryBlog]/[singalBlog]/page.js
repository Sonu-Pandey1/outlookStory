"use client";
//todo ----- for resl sit like sections scrolling effect use postion sticly on top in side couumn so that content on his place stay when col end content scrolll
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./SinglePage.scss";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/Menu/Menu";
import Link from "next/link";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { FaComment, FaEye, FaRegComment } from "react-icons/fa6";
import PostNotFound from "@/components/PostNotFound/PostNotFound";

// Fetch data based on the slug
const getData = async (slug) => {
  const res = await fetch(`/api/posts/${slug}`, {
    //?popular=true&limit=5
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }

  return res.json();
};

const SinglePage = () => {
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(data);

  // Extract the slug from the URL
  const slug = pathname.split("/").pop(); // Assuming slug is the last part of the URL

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const postData = await getData(slug);
          setData(postData);
        } catch (error) {
          console.error("Error fetching post data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <PostNotFound />;
  }

  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "NewsArticle",
  //   "headline": blog.title,
  //   "description": blog.description,
  //   "image": imageList,
  //   "datePublished": new Date(blog.publishedAt).toISOString(),
  //   "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
  //   "author": [{
  //       "@type": "Person",
  //       "name": blog?.author ? [blog.author] : siteMetadata.author,
  //       "url": siteMetadata.twitter,
  //     }]
  // }

  return (
    <>
      <div className="singlePage">
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col col-8 leftCol">
              <div className="title">
                <h1>{data.title}</h1>
              </div>
              <div className="writerInfo d-flex align-items-center pt-2 ">
                <span className="userImg pe-3">
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
                  <Link className=" text-decoration-none" href="/">
                    {" "}
                    {data?.user.name}
                  </Link>
                </span>
                <span className="date pe-2">
                  {" "}
                  --{" "}
                  {new Date(data.createdAt)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </span>
                <span className="categories"> in {data.catSlug}</span>
                <span className="views ps-4">
                  {" "}
                  <FaEye className="viewsIcon" /> {data.views}
                </span>
              </div>
              <div className="postDetailsContainer py-4">
                {data?.img && (
                  <div className="postImageWrapper pb-4">
                    <Image
                      src={data.img}
                      alt="avatar"
                      className="postimg"
                      height={500}
                      width={900}
                    />
                  </div>
                )}
                <div className="postDetails">
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: data?.desc }}
                  />

                  <div className="writerInfo2 p-5 d-flex align-items-center gap-4 shadow ">
                    <div className="userImg pe-3">
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
                    </div>
                    <div className="userDetails">
                      <p className="username pe-2 fs-5">
                        {" "}
                        <Link className=" text-decoration-none" href="/">
                          {" "}
                          {data?.user.name}
                        </Link>
                      </p>
                      <p className="userBio">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Hic non aperiam tenetur at ratione ex repellat
                        earum blanditiis eaque dolorem magni reprehenderit minus
                        vel dolor, eveniet modi amet commodi .
                      </p>
                      <div className="socicalIcons d-flex gap-3">
                        <Facebook className="icon" />
                        <Twitter className="icon" />
                        <Instagram className="icon" />
                        <LinkedIn className="icon" />
                      </div>
                    </div>
                  </div>

                  <div className="relatedBlogs">
                    {/* //todo ---- related blogs section need to create stilll panding !*/}
                  </div>

                  <div className="comment">
                    <Comments postSlug={slug} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-4 rightCol">
              <div className="advertisement px-5">
                <Image
                  src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/300x250_2.jpg"
                  alt="advertisement-img"
                  className="advertisementImage card-img-top"
                  width={350}
                  height={250}
                />
              </div>
              <div className="othereBlogs">
                <Menu singlePage={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
