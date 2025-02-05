import Link from "next/link";
import React from "react";
import "./menuCategories.scss";

const MenuCategories = () => {
  return (
    <div className="categoryList">
      <Link href="/category/stories" className="categoryItem style">
        Stories
      </Link>
      <Link href="/category/business" className="categoryItem fashion">
        Business
      </Link>
      <Link href="/category/cityConnect" className="categoryItem food">
        City Connect
      </Link>
      <Link href="/category/events" className="categoryItem travel">
        Events
      </Link>
      <Link href="/category/videos" className="categoryItem culture">
        Videos
      </Link>
      <Link href="/category/launchPad" className="categoryItem coding">
        Launch Pad
      </Link>
    </div>
  );
};

export default MenuCategories;
