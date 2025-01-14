"use client";

import React from "react";
import Breadcrumb from "../../../../../Components/Breadcrumb/page";
import { usePathname } from "next/navigation";

function Singalpage() {
  const pathname = usePathname();
  const category1 = pathname.split("/")[2];
  const category2 = pathname.split("/")[3];
  // console.log(category1);
  // console.log(category2);
  return (
    <div>
      <Breadcrumb category1={category1} category2={category2} />
      <h1>{category2}</h1>
      <h1>singalBlog</h1>
    </div>
  );
}

export default Singalpage;
