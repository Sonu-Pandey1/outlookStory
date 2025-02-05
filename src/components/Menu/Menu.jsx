import React from "react";
import "./menu.scss";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = ({ singlePage, upperMenu }) => {
  return (
    <div className="menuWrapper">
      {singlePage ? (
        // If singlePage is true, display this
        <div className="menuContainer">
          <div className="container">
            <h2 className="subtitle">{"What's hot"}</h2>
            <h1 className="title">Most Popular</h1>
            <MenuPosts withImage={false} />
            <h2 className="subtitle">Discover by topic</h2>
            <h1 className="title">Categories</h1>
            <MenuCategories />
            <h2 className="subtitle">Chosen by the editor</h2>
            <h1 className="title">Editors Pick</h1>
            <MenuPosts withImage={true} />
          </div>
        </div>
      ) : upperMenu ? (
        // If upperMenu is true (and singlePage is false), display this
        <div className="menuContainer">
          <div className="container2">
            {/* <h1 className="title">Business Blogs</h1> */}
            <button className="btn btn-outline-primary">Business Blogs</button>
            <MenuPosts withImage={true} upperMenu={true} upperMenuTop={true} />
            {/* <h2 className="subtitle">Discover by topic</h2>
            <h1 className="title">Categories</h1>
            <MenuCategories /> */}
            <h2 className="subtitle">Chosen by the editor</h2>
            {/* <h1 className="title">Editors Pick</h1> */}
            <button className="btn btn-outline-primary">Editors Pick</button>
            <MenuPosts withImage={true} upperMenu={true} upperMenuTop={false} />
          </div>
        </div>
      ) : (
        // If both singlePage and upperMenu are false, display this
        <div className="menuContainer">
          <div className="container2">
            {/* <h1 className="title">Popular Blogs</h1> */}
            <button className="btn btn-outline-primary">Popular Blogs</button>
            <MenuPosts withImage={false} />
            <h2 className="subtitle">Discover by topic</h2>
            <h1 className="title">Categories</h1>
            <MenuCategories />
            <h2 className="subtitle">Chosen by the editor</h2>
            <h1 className="title">Recommended</h1>
            <MenuPosts withImage={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
