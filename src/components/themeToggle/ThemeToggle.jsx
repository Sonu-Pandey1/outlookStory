"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import "./themeToggle.scss"; // Import the SCSS file

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={`theme-toggle ${theme === "dark" ? "dark" : "light"}`}
      onClick={toggle}
    >
      <Image
        src="/moon.png"
        alt="Moon"
        width={14}
        height={14}
        className="icon"
      />
      <div className="ball"></div>
      <Image src="/sun.png" alt="Sun" width={14} height={14} className="icon" />
    </div>
  );
};

export default ThemeToggle;
