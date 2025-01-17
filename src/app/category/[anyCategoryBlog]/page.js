// "use client";

// import React from "react";
// import Breadcrumb from "../../../../Components/Breadcrumb/page";
// import { usePathname } from "next/navigation";
// import LatestPopularPosts from "../../../../Components/LatestPopularPost/LatestPopularPosts";

// export default function AnyCategoryPage({ params }) {
//   // console.log(params.anyCategoryBlog)
//   const pathname = usePathname();
//   const category = pathname.split("/")[2];
//   const capitalizedCategory =
//     category.charAt(0).toUpperCase() + category.slice(1);

//   return (
//     <div className="">
//       <Breadcrumb category={capitalizedCategory} />
//       <div className="anyCategoryPage">
//         <LatestPopularPosts categoryC={capitalizedCategory} />
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import Breadcrumb from "../../../../Components/Breadcrumb/page";  // Your breadcrumb component
import { usePathname } from "next/navigation";
import LatestPopularPosts from "../../../../Components/LatestPopularPost/LatestPopularPosts";  // The component that displays the posts

export default function AnyCategoryPage() {
  // Get the category name from the URL
  const pathname = usePathname();
  const category = pathname.split("/")[2]; // Assuming /category/[anycategory] path
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1); // Capitalize category name

  return (
    <div className="">
      {/* Breadcrumb component */}
      <Breadcrumb category={capitalizedCategory} />
      
      <div className="anyCategoryPage">
        {/* Pass the category to LatestPopularPosts */}
        <LatestPopularPosts categoryC={capitalizedCategory} />
      </div>
    </div>
  );
}
