"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { UserProfile } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useContext } from "react";

export default function DashProfile() {
  const { theme } = useContext(ThemeContext);

  console.log(theme);
  return (
    <div
      className=" d-flex justify-content-center col overflow-y-scroll "
      style={{ height: "calc(100vh - 60px)" }}
    >
      <UserProfile 
        appearance={{
          baseTheme: theme === "dark" ? dark : light,
        }}
        routing="hash"
      />
    </div>
  );
}
