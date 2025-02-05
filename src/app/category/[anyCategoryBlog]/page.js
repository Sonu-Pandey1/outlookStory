// // "use client";

// // import React from "react";
// // import Breadcrumb from "../../../../Components/Breadcrumb/page";
// // import { usePathname } from "next/navigation";
// // import LatestPopularPosts from "../../../../Components/LatestPopularPost/LatestPopularPosts";

// // export default function AnyCategoryPage({ params }) {
// //   // console.log(params.anyCategoryBlog)
// //   const pathname = usePathname();
// //   const category = pathname.split("/")[2];
// //   const capitalizedCategory =
// //     category.charAt(0).toUpperCase() + category.slice(1);

// //   return (
// //     <div className="">
// //       <Breadcrumb category={capitalizedCategory} />
// //       <div className="anyCategoryPage">
// //         <LatestPopularPosts categoryC={capitalizedCategory} />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React from "react";
// import Breadcrumb from "../../../components/Breadcrumb2/Breadcrumb";  // Your breadcrumb component
// import { usePathname } from "next/navigation";
// import LatestPopularPosts from "../../../components/LatestPopularPost2/LatestPopularPosts";  // The component that displays the posts

// export default function AnyCategoryPage() {
//   // Get the category name from the URL
//   const pathname = usePathname();
//   const category = pathname.split("/")[2]; // Assuming /category/[anycategory] path
//   const capitalizedCategory =
//     category.charAt(0).toUpperCase() + category.slice(1); // Capitalize category name

//   return (
//     <div className="">
//       {/* Breadcrumb component */}
//       <Breadcrumb category={capitalizedCategory} />

//       <div className="anyCategoryPage">
//         {/* Pass the category to LatestPopularPosts */}
//         <LatestPopularPosts categoryC={capitalizedCategory} category={category} />
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "../../../components/Breadcrumb2/Breadcrumb";  // Your breadcrumb component
// import { usePathname } from "next/navigation";
// import LatestPopularPosts from "../../../components/LatestPopularPost2/LatestPopularPosts";  // The component that displays the posts

// const getPostsByCategory = async (category) => {
//   const res = await fetch(`http://localhost:3000/api/posts?category=${category}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   return res.json();
// };

// export default function AnyCategoryPage() {
//   // Get the category name from the URL
//   const pathname = usePathname();
//   const category = pathname.split("/")[2]; // Assuming /category/[anycategory] path
//   const capitalizedCategory =
//     category.charAt(0).toUpperCase() + category.slice(1); // Capitalize category name

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPostsByCategory(category);
//         setPosts(data);
//       } catch (err) {
//         setError("Failed to load posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [category]);

//   return (
//     <div className="category-page">
//       <Breadcrumb category={capitalizedCategory} />

//       <div className="anyCategoryPage">
//         <h1 className="category-title">{capitalizedCategory}</h1>

//         {loading ? (
//           <p>Loading posts...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : (
//           <LatestPopularPosts posts={posts} categoryC={capitalizedCategory} />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb2/Breadcrumb";
import { usePathname } from "next/navigation";
import LatestPopularPosts from "@/components/LatestPopularPost2/LatestPopularPosts";
// import LatestPopularPosts from "../../../components/LatestPopularPost2/LatestPopularPosts";

// API fetch for posts based on category
const getPostsByCategory = async (category) => {
  const res = await fetch(`/api/posts?cat=${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export default function AnyCategoryPage() {
  const pathname = usePathname();
  const category = pathname.split("/")[2]; // Extract the category from the URL
  // console.log(category)
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the first letter

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByCategory(category); // Fetch posts by category
        setPosts(data.posts); // Assuming the backend returns posts in "data.posts"
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="category-page">
      <Breadcrumb category={capitalizedCategory} />

      <div className="anyCategoryPage">
        <h1 className="category-title container-fluid ps-4">
          {capitalizedCategory}
        </h1>

        {loading ? (
          <p className="container-fluid">Loading posts...</p>
        ) : error ? (
          <p className="error-message container-fluid">{error}</p>
        ) : (
          <LatestPopularPosts
            category={category}
            posts={posts}
            categoryC={capitalizedCategory}
          />
        )}
      </div>
    </div>
  );
}
