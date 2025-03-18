// // "use client";

// // import { createContext, useEffect, useState } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// // console.log(user)
// //   // Fetch logged-in user on page load
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await fetch("/api/auth/me", { credentials: "include" });
// //         if (res.ok) {
// //           const data = await res.json();
// //           setUser(data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   // Login function
// //   const login = async (email, password) => {
// //     try {
// //       const res = await fetch("/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //         credentials: "include",
// //       });

// //       if (!res.ok) {
// //         throw new Error("Invalid credentials");
// //       }

// //       const data = await res.json();
// //       setUser(data);
// //       return { success: true, user: data };
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       return { success: false, error: error.message };
// //     }
// //   };

// //   // Logout function
// //   const logout = async () => {
// //     try {
// //       await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
// //       setUser(null);
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// "use client";

// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch logged-in user on page load using cookies
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" }); // Includes HttpOnly cookies
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include", // Ensures cookies are stored
//       });

//       if (!res.ok) throw new Error("Invalid credentials");

//       const data = await res.json();
//       setUser(data);
//       return { success: true, user: data };
//     } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, error: error.message };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// "use client";

// import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie"; // Install with: npm install js-cookie
// import {jwtDecode} from "jwt-decode"; // Install with: npm install jwt-decode

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
// console.log(user)
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = Cookies.get("token");
//         console.log("userid"+token)
//         if (token) {
//           // Decode token to get user ID
//           const decoded = jwtDecode(token);
//           const userId = decoded?.id;

//           if (userId) {
//             // Fetch user details from backend
//             const res = await fetch("/api/auth/me", { credentials: "include" });
//             if (res.ok) {
//               const data = await res.json();
//               setUser(data);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error initializing authentication:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const data = await res.json();
//       setUser(data); // Set user after login

//       return { success: true, user: data };
//     } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, error: error.message };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
//       setUser(null);
//       Cookies.remove("token"); // Remove token from cookies
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" }); // Fetch user from backend
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensures cookies are included in the request
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      // Fetch user details after login
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await userRes.json();
      setUser(userData); // Set user after fetching details

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", { method: "POST", credentials: "include" });

      if (res.ok) {
        setUser(null); // Clear user state
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  // // Logout function
  // const logout = async () => {
  //   try {
  //     await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  //     setUser(null);
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
