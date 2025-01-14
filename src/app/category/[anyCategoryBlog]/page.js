"use client";

import React from "react";
import Breadcrumb from "../../../../Components/Breadcrumb/page";
import { usePathname } from "next/navigation";
import LatestPopularPosts from "../../../../Components/LatestPopularPost/LatestPopularPosts";

export default function AnyCategoryPage({ params }) {
  // console.log(params.anyCategoryBlog)
  const pathname = usePathname();
  const category = pathname.split("/")[2];
const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);


  return (
    <div>
      <Breadcrumb category={capitalizedCategory} />
      <div className="anyCategoryPage">
        <LatestPopularPosts categoryC={capitalizedCategory}/>
      </div>
    </div>
  );
}
