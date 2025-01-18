// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "../../../../../Components/Breadcrumb/page";  // Ensure this path is correct
// import { usePathname } from "next/navigation";

// // Sample latestPostData you provided
// const latestPoastData = [
//   { id: 1, category: "Stories", title: "Instagram Is Testing Photo Albums, Because Nothing Is Sacred Anymore", imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg" },
//   { id: 2, category: "Stories", title: "Instagram Is Testing Photo Albums, Because Nothing Is Sacred Anymore", imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg" },
//   { id: 3, category: "CityConnect", title: "Netflix Introduces a Cheaper Subscription Plan With Ads", imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg" },
//   { id: 4, category: "Events", title: "Marvel Studios Unveils New Superhero Movies", imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg" },
//   { id: 5, category: "Videos", title: "Global Markets Hit by New Economic Challenges", imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg" },
// ];

// function SinglePage() {
//   const pathname = usePathname();
  
//   // Extract category1 and category2 from the URL
//   const category1 = pathname.split("/")[2]; // e.g., Stories, CityConnect, etc.
//   const category2 = pathname.split("/")[3]; // The blog title

//   const [blog, setBlog] = useState(null);

//   // Fetch and filter the blog post based on category1 and category2
//   useEffect(() => {
//     if (category1 && category2) {
//       // Find the matching blog post from the latestPoastData array
//       const filteredBlog = latestPoastData.filter(
//         (post) => post.category === category1 && post.title === category2
//       );

//       if (filteredBlog.length > 0) {
//         setBlog(filteredBlog[0]);  // Set the blog data to state
//       }
//     }
//   }, [category1, category2]);

//   if (!blog) return <div>Loading...</div>; // Show loading state until blog is fetched

//   return (
//     <div>
//       <Breadcrumb category1={category1} category2={category2} />
//       <h1>{category2}</h1>  {/* Display the title of the blog */}
//       <h2>{category1}</h2>  {/* Display the category name */}
      
//       <div className="blogDetailPage">
//         <div className="container">
//           <h1>{blog.title}</h1> {/* Display the title */}
//           <img src={blog.imgSrc} alt={blog.title} className="img-fluid" /> {/* Display the image */}
//           <div className="content">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet venenatis nisl...</p> {/* Placeholder content */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SinglePage;


"use client";

import React from "react";
import "./SingalPage.scss"
import { usePathname } from "next/navigation";

// Dummy data
const blog = {
  title: "Instagram Is Testing Photo Albums, Because Nothing Is Sacred Anymore",
  imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  category: "Social Media",
  author: "Jane Doe",
  date: "January 18, 2025",
  content: `
    Instagram is reportedly testing a new feature that would allow users to create photo albums within stories. This comes as a part of a broader effort to encourage more engaging and creative content on the platform. 
    Curabitur laoreet venenatis nisl, eu feugiat lacus facilisis eget. 
    Aenean vitae ligula metus. Nam bibendum tortor sed mauris scelerisque, 
    ac tincidunt purus tincidunt. 
    Curabitur auctor sapien ligula, sed feugiat nulla tempor et.
  `,
};

const BlogDetailPage = () => {
  const pathname = usePathname();

  return (
    <div className="blog-detail-page">
      <header className="blog-header">
        <div className="container">
          <h1>{blog.title}</h1>
          <p className="blog-meta">
            <span>{blog.category}</span> | <span>{blog.date}</span> | <span>{blog.author}</span>
          </p>
          <img src={blog.imgSrc} alt={blog.title} className="img-fluid blog-image" />
        </div>
      </header>

      <div className="container blog-content">
        <div className="content-section">
          <div className="content-text">
            <h2>Blog Content</h2>
            <p>{blog.content}</p>
          </div>
        </div>

        <aside className="sidebar">
          <h3>Related Articles</h3>
          <ul>
            <li><a href="#">How to Create Stunning Instagram Stories</a></li>
            <li><a href="#">The Impact of Instagram on Social Media Trends</a></li>
            <li><a href="#">Why Visual Content Dominates the Digital World</a></li>
          </ul>
        </aside>
      </div>

      <footer className="blog-footer">
        <div className="container">
          <p>© 2025 Your Blog. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetailPage;
