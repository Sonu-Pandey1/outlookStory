// "use client";

// import { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// // const getFromLocalStorage = () => {
// //   if (typeof window !== "undefined") {
// //     const value = localStorage.getItem("theme");
// //     return value || "light";
// //   }
// // };

// export const ThemeContextProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light")
//   // (() => {
//   //   return getFromLocalStorage();
//   // });

//   const toggle = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggle }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


"use client";
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "light";  // Default to light if nothing is stored
    }
    return "light";  // Default theme on server-side rendering
  });

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
