"use client";

import React from "react";
import Breadcrumb from "../../../../Components/Breadcrumb/page";
import { usePathname } from "next/navigation";

export default function AnyCategoryPage({ params }) {
  // console.log(params.anyCategoryBlog)
  const pathname = usePathname();
  const category = pathname.split("/")[2];

  return (
    <div>
      <Breadcrumb category={category} />
      <h1>{category}</h1>
    </div>
  );
}
