import React, { useContext, useState, useEffect, useCallback } from "react";
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
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
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
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, cat: category }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // Store the first batch of posts separately to avoid refetching issues
  useEffect(() => {
    if (data?.pages?.length === 1) {
      setInitialPosts(data.pages[0].posts);
    }
  }, [data]);

  // Merge initial posts with subsequent pages
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
            <div className="col-12 col-md-6 col-lg-8 latestPostsContainer order-2 order-md-1">
              <button className="btn btn-outline-primary mb-3">
                Latest Posts
              </button>

              {/* Infinite Scroll inside the Latest Posts section */}
              <InfiniteScroll
                className="overflow-hidden"
                dataLength={mergedPosts.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={
                  <h4 className="pt-4 d-flex align-items-center justify-content-center">
                    Loading more posts...
                  </h4>
                }
                endMessage={
                  <p className="pt-4 d-flex align-items-center justify-content-center">
                    No more posts
                  </p>
                }
                scrollThreshold={0.90}
              >
                {/* Render posts */}
                <div className="row g-3 latestPosts pt-1">
                  {mergedPosts.map((item, index) => (
                    <div key={index} className="col-md-12">
                      <Link
                        href={`/category/${item.catSlug}/${item.slug}`}
                        className="text-decoration-none cardLatest pt-5 mt-5"
                      >
                        <div className="card  py-sm-0 border-0 shadow-sm h-100 d-flex flex-column flex-sm-row flex-md-column flex-lg-row">
                          <div className="position-relative">
                            <div className="image-container">
                              <Image
                                src={item.img || "/fallback-image.jpg"}
                                alt={item.title}
                                width={350}
                                height={200}
                                className="card-img-top rounded-0"
                              />
                            </div>
                            <span className="position-absolute top-0 m-2 text-black badge bg-info">
                              {item.catSlug}
                            </span>
                          </div>
                          <div
                            className={`card-body p-lg-2 ps-lg-4`}
                          >
                            <h6 className="card-title text-truncate-2">
                              {item.title}
                            </h6>
                            <span className="small">
                              BY{" "}
                              <span className="fs-6 text-primary">
                                {item.userEmail}
                              </span>
                              <small className="ps-3">
                                {item.createdAt.slice(0, 10)}
                              </small>
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
            <div className="col-12 col-md-6 col-lg-4 ps-2 order-1 order-md-2">
              <Menu />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
