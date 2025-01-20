"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeComponent({ children }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="min-vh-100">{children}</div>
    </div>
  );
}
