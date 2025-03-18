// "use client";

// import React, { useContext, useState } from "react";
// import "./LoginPage.scss";
// import AnimationWrapper from "../../providers/AnimationWrapper";
// import { AnimatePresence, motion } from "framer-motion";
// import { ThemeContext } from "@/context/ThemeContext";

// export default function LoginPage() {
//   const [activeTab, setActiveTab] = useState("login");
//   const { theme } = useContext(ThemeContext);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleLogin = () => {
//     console.log(" login done !");
//   };

//   const handleRegister = () => {
//     console.log(" register done !");
//   };

//   return (
//     <>
//       <AnimationWrapper keyValue={activeTab}>
//         <div className={`login-page ${theme === "dark" ? "dark" : "light"}`}>
//           <div className={`login-container shadow`}>
//             <div>
//               <h1 className="app-title">Outlook Story</h1>
//             </div>

//             <div className="tab-buttons">
//               <button
//                 className={activeTab === "login" ? "active" : ""}
//                 onClick={() => handleTabChange("login")}
//               >
//                 Login
//               </button>
//               <button
//                 className={activeTab === "signup" ? "active" : ""}
//                 onClick={() => handleTabChange("signup")}
//               >
//                 Sign Up
//               </button>
//             </div>

//             <AnimatePresence exitBeforeEnter>
//               {activeTab === "login" && (
//                 <motion.div
//                   key="login"
//                   className="form-container"
//                   initial={{ opacity: 0, scale: 0.85 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <button
//                     onClick={() => signIn("google")}
//                     className="oauth-button google"
//                   >
//                     Sign in with Google
//                   </button>
//                   <div className="divider">OR</div>
//                   <form>
//                     <div className="input-group mb-2">
//                       <input type="email" placeholder="Email" required />
//                     </div>
//                     <div className="input-group mb-4">
//                       <input type="password" placeholder="Password" required />
//                     </div>
//                     <button type="submit" className="submit-button" onClick={()=>{handleLogin()}} >
//                       Login
//                     </button>
//                   </form>
//                 </motion.div>
//               )}

//               {activeTab === "signup" && (
//                 <motion.div
//                   key="signup"
//                   className="form-container"
//                   initial={{ opacity: 0, scale: 0.85 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <button className="oauth-button google">
//                     Sign up with Google
//                   </button>
//                   <div className="divider">OR</div>
//                   <form>
//                     <div className="input-group mb-2">
//                       <input type="text" placeholder="Username" required />
//                     </div>
//                     <div className="input-group mb-2">
//                       <input type="email" placeholder="Email" required />
//                     </div>
//                     <div className="input-group mb-4">
//                       <input type="password" placeholder="Password" required />
//                     </div>
//                     <button type="submit" className="submit-button" onClick={()=>{handleRegister()}}  >
//                       Sign Up
//                     </button>
//                   </form>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </AnimationWrapper>
//     </>
//   );
// }




// "use client";

// import React, { useContext, useState } from "react";
// import "./LoginPage.scss";
// import AnimationWrapper from "../../providers/AnimationWrapper";
// import { AnimatePresence, motion } from "framer-motion";
// import { ThemeContext } from "@/context/ThemeContext";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function LoginPage() {
//   const [activeTab, setActiveTab] = useState("login");
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const { theme } = useContext(ThemeContext);


//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setError("");
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result); // Set preview
//         signupFormik.setFieldValue("image", reader.result); // Store Base64 for API
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//    // Login API Call
//    const handleLogin = async (values) => {
//     setError(null);
//     try {
//       const res = await fetch("/api/auth/sign-in", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login Failed");
//       console.log("Login Success:", data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Register API Call
//   const handleRegister = async (values) => {
//     setError(null);
//     try {
//       const res = await fetch("/api/auth/sign-up", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//         name: values.username, 
//         email: values.email,
//         password: values.password,
//         image: values.image || "/fallback-image.png", // Default image
//         role: values.role || "user", // Default role
//       }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");
//       console.log("Registration Success:", data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };


//   const loginFormik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//     }),
//     onSubmit: handleLogin,
//   });

//   // Signup Formik
// const signupFormik = useFormik({
//   initialValues: { username: "", email: "", password: "", image: "", role: "user" },
//   validationSchema: Yup.object({
//     username: Yup.string().min(3, "Min 3 characters").required("Username is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//     image: Yup.string().url("Invalid URL"), // Optional, validates URL if provided
//     role: Yup.string().oneOf(["user","writer"], "Invalid role"), // Ensures only valid roles
//   }),
//   onSubmit: handleRegister,
// });

//   return (
//     <AnimationWrapper keyValue={activeTab}>
//       <div className={`login-page ${theme === "dark" ? "dark" : "light"}`}>
//         <div className={`login-container shadow`}>
//           <h1 className="app-title">Outlook Story</h1>

//           <div className="tab-buttons">
//             <button className={activeTab === "login" ? "active" : ""} onClick={() => handleTabChange("login")}>
//               Login
//             </button>
//             <button className={activeTab === "signup" ? "active" : ""} onClick={() => handleTabChange("signup")}>
//               Sign Up
//             </button>
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <AnimatePresence mode="wait">
//             {activeTab === "login" && (
//               <motion.div
//                 key="login"
//                 className="form-container"
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <button className="oauth-button google">Sign in with Google</button>
//                 <div className="divider">OR</div>
//                 <form onSubmit={loginFormik.handleSubmit}>
//                   <div className="input-group mb-2">
//                     <input type="email" placeholder="Email" {...loginFormik.getFieldProps("email")} />
//                     {loginFormik.touched.email && loginFormik.errors.email && (
//                       <div className="error">{loginFormik.errors.email}</div>
//                     )}
//                   </div>
//                   <div className="input-group mb-4">
//                     <input type="password" placeholder="Password" {...loginFormik.getFieldProps("password")} />
//                     {loginFormik.touched.password && loginFormik.errors.password && (
//                       <div className="error">{loginFormik.errors.password}</div>
//                     )}
//                   </div>
//                   <button type="submit" className="submit-button">Login</button>
//                 </form>
//               </motion.div>
//             )}

//             {activeTab === "signup" && (
//               <motion.div
//                 key="signup"
//                 className="form-container"
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <button className="oauth-button google">Sign up with Google</button>
//                 <div className="divider">OR</div>
//                 <form onSubmit={signupFormik.handleSubmit}>
//                   <div className="input-group mb-2">
//                     <input type="text" placeholder="Username" {...signupFormik.getFieldProps("username")} />
//                     {signupFormik.touched.username && signupFormik.errors.username && (
//                       <div className="error">{signupFormik.errors.username}</div>
//                     )}
//                   </div>
//                   <div className="input-group mb-2">
//                     <input type="email" placeholder="Email" {...signupFormik.getFieldProps("email")} />
//                     {signupFormik.touched.email && signupFormik.errors.email && (
//                       <div className="error">{signupFormik.errors.email}</div>
//                     )}
//                   </div>
//                   <div className="input-group mb-4">
//                     <input type="password" placeholder="Password" {...signupFormik.getFieldProps("password")} />
//                     {signupFormik.touched.password && signupFormik.errors.password && (
//                       <div className="error">{signupFormik.errors.password}</div>
//                     )}
//                   </div>
//                    {/* Image Upload */}
//                   <div className="input-group mb-2">
//                     <label className="image-upload-label">Profile Image</label>
//                     <input type="file" accept="image/*" onChange={handleImageChange} />
//                     {selectedImage && (
//                       <div className="image-preview">
//                         <img src={selectedImage} alt="Preview" className="preview-img" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="input-group mb-2">
//                     <select {...signupFormik.getFieldProps("role")}>
//                       <option value="user">User</option>
//                       <option value="writer">Writer</option>
//                     </select>
//                     {signupFormik.touched.role && signupFormik.errors.role && (
//                       <div className="error">{signupFormik.errors.role}</div>
//                     )}
//                   </div>
//                   <button type="submit" className="submit-button">Sign Up</button>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </AnimationWrapper>
//   );
// }


"use client";

import React, { useContext, useState } from "react";
import "./LoginPage.scss";
import AnimationWrapper from "../../providers/AnimationWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeContext } from "@/context/ThemeContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { login } = useContext(AuthContext); // Use login from AuthContext

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set preview
        signupFormik.setFieldValue("image", reader.result); // Store Base64 for API
      };
      reader.readAsDataURL(file);
    }
  };

  // // Login API Call
  // const handleLogin = async (values) => {
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/auth/sign-in", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Login Failed");
  //     console.log("Login Success:", data);
  //     resetForm();

  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // // Register API Call
  // const handleRegister = async (values) => {
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/auth/sign-up", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: values.username, // Map username to name
  //         email: values.email,
  //         password: values.password,
  //         image: values.image || "/fallback-image.png", // Default image
  //         role: values.role || "user", // Default role
  //       }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Registration failed");

  //     console.log("Registration Success:", data);
  //     resetForm();
  //     setSelectedImage(null);
  //   } catch (err) {
  //     console.error("Registration Error:", err.message);
  //     setError(err.message);
  //   }
  // };

const handleLogin = async (values, resetForm) => {
  setError(null);
  try {
    const { success, error } = await login(values.email, values.password); // Call login function

    if (!success) throw new Error(error || "Login Failed");

    console.log("Login Success");
    resetForm(); 
    router.push("/"); 
  } catch (err) {
    setError(err.message);
  }
};

  // const handleLogin = async (values, resetForm) => {
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/auth/sign-in", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values),
  //       credentials: "include",
  //     });
  
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Login Failed");
  
  //     console.log("Login Success:", data);
  //     router.push("/dashboard");
  //     resetForm(); // Clear the form after successful login
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  
  const handleRegister = async (values, resetForm) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password,
          image: values.image || "/fallback-image.png",
          role: values.role || "user",
        }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
  
      console.log("Registration Success:", data);
      resetForm(); // Reset the form after successful registration
      setSelectedImage(null); // Clear image preview
    } catch (err) {
      setError(err.message);
    }
  };
  

  // // Login Formik
  // const loginFormik = useFormik({
  //   initialValues: { email: "", password: "" },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email("Invalid email").required("Email is required"),
  //     password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  //   }),
  //   onSubmit: handleLogin,
  // });

  // // Signup Formik
  // const signupFormik = useFormik({
  //   initialValues: { username: "", email: "", password: "", image: "", role: "user" },
  //   validationSchema: Yup.object({
  //     username: Yup.string().min(3, "Min 3 characters").required("Username is required"),
  //     email: Yup.string().email("Invalid email").required("Email is required"),
  //     password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  //   }),
  //   onSubmit: handleRegister,
  // });

  // Login Formik
const loginFormik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  }),
  onSubmit: (values, { resetForm }) => handleLogin(values, resetForm),
});

// Signup Formik
const signupFormik = useFormik({
  initialValues: { username: "", email: "", password: "", image: "", role: "user" },
  validationSchema: Yup.object({
    username: Yup.string().min(3, "Min 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    image: Yup.string().url("Invalid URL"), // Optional
    role: Yup.string().oneOf(["user", "writer"], "Invalid role"),
  }),
  onSubmit: (values, { resetForm }) => handleRegister(values, resetForm),
});


  return (
    <AnimationWrapper keyValue={activeTab}>
      <div className={`login-page ${theme === "dark" ? "dark" : "light"}`}>
        <div className={`login-container shadow`}>
          <h1 className="app-title">Outlook Story</h1>

          <div className="tab-buttons">
            <button className={activeTab === "login" ? "active" : ""} onClick={() => handleTabChange("login")}>
              Login
            </button>
            <button className={activeTab === "signup" ? "active" : ""} onClick={() => handleTabChange("signup")}>
              Sign Up
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <AnimatePresence mode="wait">
            {activeTab === "login" && (
              <motion.div
                key="login"
                className="form-container"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <button className="oauth-button google">Sign in with Google</button>
                <div className="divider">OR</div>
                <form onSubmit={loginFormik.handleSubmit} >
                  <div className="input-group mb-2">
                    <input type="email" placeholder="Email" {...loginFormik.getFieldProps("email")} />
                  </div>
                  <div className="input-group mb-4">
                    <input type="password" placeholder="Password" {...loginFormik.getFieldProps("password")} />
                  </div>
                  <button type="submit" className="submit-button">Login</button>
                </form>
              </motion.div>
            )}

            {activeTab === "signup" && (
              <motion.div
                key="signup"
                className="form-container"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <button className="oauth-button google">Sign up with Google</button>
                <div className="divider">OR</div>
                <form onSubmit={signupFormik.handleSubmit}>
                  <div className="input-group mb-2">
                    <input type="text" placeholder="Username" {...signupFormik.getFieldProps("username")} />
                  </div>
                  <div className="input-group mb-2">
                    <input type="email" placeholder="Email" {...signupFormik.getFieldProps("email")} />
                  </div>
                  <div className="input-group mb-4">
                    <input type="password" placeholder="Password" {...signupFormik.getFieldProps("password")} />
                  </div>
                  {/* Image Upload */}
                  <div className="input-group mb-2">
                    <label className="image-upload-label">Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {selectedImage && (
                      <div className="image-preview">
                        <img src={selectedImage} alt="Preview" className="preview-img" />
                      </div>
                    )}
                  </div>
                  <div className="input-group mb-2">
                    <select {...signupFormik.getFieldProps("role")}>
                      <option value="user">User</option>
                      <option value="writer">Writer</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-button">Sign Up</button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimationWrapper>
  );
}
