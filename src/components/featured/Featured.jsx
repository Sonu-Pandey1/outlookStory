// import React from "react";
// import PropTypes from "prop-types";
// import Image from "next/image";

// function Hero({ posts }) {
//   // If there are fewer than 4 posts, show a message
//   if (!posts || posts.length < 4) {
//     return <div>Insufficient data available for this section.</div>;
//   }

//   return (
//     <div className="heroContainer mb-5 ">
//       <div className="container-fluid">
//         {/* Main Row: Featured Section */}
//         <div className="row g-3 heroWrapper m-0">
//           {/* Left: Featured Article */}
//           <div className="col-md-6">
//             <div className="card bg-danger rounded-5 border-0 rounded lth shadow-sm overflow-hidden">
//               <Image
//                 src={posts[0].img} // Use img instead of image
//                 alt={`Image for ${posts[0].title}`}
//                 className="card-img-top hero-image"
//                 width={600}
//                 height={450}
//                 style={{ objectFit: "cover", height: "100%" }}
//               />
//               <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
//                 <span
//                   className={`badge bg-${getBadgeColor(posts[0].catSlug)} mb-2`} // Use catSlug for category
//                 >
//                   {posts[0].catSlug}
//                 </span>
//                 <h4 className="card-title text-white fw-bold">{posts[0].title}</h4>
//               </div>
//             </div>
//           </div>

//           {/* Right: Smaller Articles Section */}
//           <div className="col-md-6">
//             <div className="row g-3">
//               {posts.slice(1, 3).map((article, index) => (
//                 <div key={index} className="col-6">
//                   <div className="card rounded border-0 shadow-sm overflow-hidden">
//                     <Image
//                       src={article.img} // Use img here too
//                       alt={`Image for ${article.title}`}
//                       className="card-img-top"
//                       width={300}
//                       height={200}
//                       style={{ objectFit: "cover", height: "100%" }}
//                     />
//                     <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
//                       <span
//                         className={`badge bg-${getBadgeColor(article.catSlug)} mb-1`} // Use catSlug here
//                       >
//                         {article.catSlug}
//                       </span>
//                       <h6 className="card-title text-white">{article.title}</h6>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {/* Bottom Row: Full-Width Article */}
//               <div className="col-12">
//                 <div className="card rounded border-0 bth shadow-sm overflow-hidden">
//                   <Image
//                     src={posts[3].img} // Use img here as well
//                     alt={`Image for ${posts[3].title}`}
//                     className="card-img-top"
//                     width={600}
//                     height={250}
//                     style={{ objectFit: "cover", height: "100%" }}
//                   />
//                   <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
//                     <span
//                       className={`badge bg-${getBadgeColor(posts[3].catSlug)} mb-2`} // Use catSlug here
//                     >
//                       {posts[3].catSlug}
//                     </span>
//                     <h5 className="card-title text-white">{posts[3].title}</h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Utility function to determine badge color based on category
// const getBadgeColor = (category) => {
//   switch (category) {
//     case "fashion":
//       return "light";
//     case "food":
//       return "danger";
//     case "business":
//       return "success";
//     case "cityconnect":
//       return "warning";
//     case "events":
//       return "info";
//     default:
//       return "primary"; // Default color if category doesn't match any cases
//   }
// };

// Hero.propTypes = {
//   posts: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       img: PropTypes.string.isRequired, // Changed to img
//       catSlug: PropTypes.string.isRequired, // Updated to use catSlug
//     })
//   ).isRequired,
// };

// export default Hero;


import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function Hero({ posts = [] }) {
  // Ensure there are at least 4 posts before rendering
  if (posts.length < 4) {
    return <div>Insufficient data available for this section.</div>;
  }

  return (
    <div className="heroContainer mb-5">
      <div className="container-fluid">
        {/* Main Row: Featured Section */}
        <div className="row g-3 heroWrapper m-0">
          {/* Left: Featured Article */}
          <div className="col-md-6">
            <div className="card bg-danger rounded-5 border-0 shadow-sm overflow-hidden">
              <Image
                src={posts[0]?.img || "/fallback-image.jpg"}
                alt={`Featured image for ${posts[0]?.title || "Post"}`}
                className="card-img-top hero-image"
                width={600}
                height={450}
                style={{ objectFit: "cover", height: "100%" }}
                priority
              />
              <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
                <span className={`badge bg-${getBadgeColor(posts[0]?.catSlug)} mb-2`}>
                  {posts[0]?.catSlug}
                </span>
                <h4 className="card-title text-white fw-bold">{posts[0]?.title}</h4>
              </div>
            </div>
          </div>

          {/* Right: Smaller Articles Section */}
          <div className="col-md-6">
            <div className="row g-3">
              {posts.slice(1, 3).map((article, index) => (
                <div key={index} className="col-6">
                  <div className="card rounded border-0 shadow-sm overflow-hidden">
                    <Image
                      src={article?.img || "/fallback-image.jpg"}
                      alt={`Thumbnail for ${article?.title || "Post"}`}
                      className="card-img-top"
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                      <span className={`badge bg-${getBadgeColor(article?.catSlug)} mb-1`}>
                        {article?.catSlug}
                      </span>
                      <h6 className="card-title text-white">{article?.title}</h6>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Row: Full-Width Article */}
              <div className="col-12">
                <div className="card rounded border-0 shadow-sm overflow-hidden">
                  <Image
                    src={posts[3]?.img || "/fallback-image.jpg"}
                    alt={`Featured image for ${posts[3]?.title || "Post"}`}
                    className="card-img-top"
                    width={600}
                    height={250}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
                    <span className={`badge bg-${getBadgeColor(posts[3]?.catSlug)} mb-2`}>
                      {posts[3]?.catSlug}
                    </span>
                    <h5 className="card-title text-white">{posts[3]?.title}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to determine badge color based on category
const getBadgeColor = (category) => {
  const badgeColors = {
    fashion: "light",
    food: "danger",
    business: "success",
    cityconnect: "warning",
    events: "info",
  };
  return badgeColors[category] || "primary"; // Default to "primary" if category not found
};

Hero.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      img: PropTypes.string, // Not required since fallback is provided
      catSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Hero;

