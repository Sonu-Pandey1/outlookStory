import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import LatestPopularPosts from "./LatestPopularPost2/LatestPopularPosts";

// Fetch posts based on category and pagination
const fetchPosts = async ({ pageParam = 1, cat }) => {
  const url = cat
    ? `/api/posts?page=${pageParam}&cat=${cat}`
    : `/api/posts?page=${pageParam}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const InfiniteFeed = ({ category = null }) => {
  // This state will hold the initial posts (first 5)
  const [initialPosts, setInitialPosts] = useState([]);

  // Using React Query's useInfiniteQuery to manage infinite scrolling state
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", category], // Adjust query key to include category
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, cat: category }), // Fetch posts based on category
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    // Prefetch the first 5 posts on initial load (not triggered on subsequent scrolls)
    onSuccess: (data) => {
      if (data.pages.length === 1) {
        setInitialPosts(data.pages[0].posts); // Storing initial posts separately
      }
    },
  });

  // If the first 5 posts have been fetched, we can skip fetching them in subsequent pages
  const mergedPosts = initialPosts.concat(
    data?.pages?.flatMap((page) => page.posts) || []
  );

  if (isLoading && initialPosts.length === 0) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts!</div>;

  return (
    <div>
      {/* Infinite scroll will be in Latest Posts section */}
      <section>
        <div className="container-fluid px-4 pb-4 pt-2">
          <div className="row">
            <div className="col-md-8 latestPostsContainer bg-danger pt-5">
              {/* Render "Latest Posts" section */}
              <button className="btn btn-outline-primary mb-3">
                Latest Posts
              </button>
              {/* Infinite Scroll inside the Latest Posts section */}
              <InfiniteScroll
                dataLength={mergedPosts.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<h4>Loading more posts...</h4>}
                endMessage={<p>No more posts</p>}
                scrollThreshold={0.90}
              >
                {/* Render posts using LatestPopularPosts component */}
                <LatestPopularPosts
                  imf={true}
                  categoryC={category}
                  category={category}
                  posts={mergedPosts}
                />
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfiniteFeed;
