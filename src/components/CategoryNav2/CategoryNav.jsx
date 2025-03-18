

// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import "./Category.scss";
// import { ThemeContext } from "@/context/ThemeContext";
// import Card3 from "../Card2/Card3";

// const CategoryNav = () => {
//   const [categories, setCategories] = useState([]); // Stores categories from API
//   const [posts, setPosts] = useState([]); // Stores fetched posts
//   const [activeCategory, setActiveCategory] = useState(""); // Stores selected category
//   const { theme } = useContext(ThemeContext);

//   // console.log(categories)
//   // Fetch posts and categories
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("/api/posts"); // Adjust API route if needed
//         const data = await response.json();
//         if (data.posts) {
//           setPosts(data.posts);

//           // Extract unique categories from posts
//           const uniqueCategories = [
//             ...new Set(data.posts.map((post) => post.catSlug)),
//           ];
//           setCategories(uniqueCategories);
//           setActiveCategory(uniqueCategories[0] || ""); // Set first category as default
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter posts based on active category & limit to 4 posts
//   const activeArticles = posts.filter((post) => post.catSlug === activeCategory).slice(0, 4);

//   return (
//     <div className="categoryContainer container-fluid px-4 pb-3">
//       <div className="categoryNav p-4 rounded">
//         {/* Category Tabs */}
//         <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
//           <h4 className="text-primary fw-bold">{activeCategory || "Categories"}</h4>
//           <div className="d-flex gap-2 flex-wrap">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`btn ${
//                   activeCategory === category ? "btn-primary" : "btn-outline-primary"
//                 }`}
//                 onClick={() => setActiveCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Articles Grid (Limited to 4 Posts) */}
//         <div className="row">
//           {activeArticles.length > 0 ? (
//             activeArticles.map((article) => <Card3 key={article.id} item={article} />)
//           ) : (
//             <p>No posts available in this category.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryNav;

"use client";
import React, { useContext, useState, useEffect } from "react";
import "./Category.scss";
import { ThemeContext } from "@/context/ThemeContext";
import Card3 from "../Card2/Card3"; // Check if this path is correct

const CategoryNav = () => {
  const [categories, setCategories] = useState([]); // Stores categories from API
  const [posts, setPosts] = useState([]); // Stores fetched posts
  const [activeCategory, setActiveCategory] = useState(""); // Stores selected category
  const { theme } = useContext(ThemeContext);

  // Fetch posts and categories
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts"); // Adjust API route if needed
        const data = await response.json();

        if (Array.isArray(data?.posts)) {
          setPosts(data.posts);

          // Extract unique categories from posts
          const uniqueCategories = [...new Set(data.posts.map((post) => post.catSlug))];
          setCategories(uniqueCategories);
          
          // Set first category as default if not already set
          if (!activeCategory && uniqueCategories.length > 0) {
            setActiveCategory(uniqueCategories[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on active category & limit to 4 posts
  const activeArticles = posts.filter((post) => post.catSlug === activeCategory).slice(0, 4);

  return (
    <div className="categoryContainer container-fluid px-4 pb-3">
      <div className="categoryNav p-4 rounded">
        {/* Category Tabs */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h4 className="text-primary fw-bold">{activeCategory || "Categories"}</h4>
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  activeCategory === category ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid (Limited to 4 Posts) */}
        <div className="row">
          {activeArticles.length > 0 ? (
            activeArticles.map((article) => <Card3 key={article.id} item={article} />)
          ) : (
            <p className="text-muted">No posts available in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
