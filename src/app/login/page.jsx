"use client";

import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.scss";
import AnimationWrapper from "../../providers/AnimationWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { theme } = useContext(ThemeContext);
  const { data: session, status } = useSession();
  // // console.log(session, status); 
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (status === "loading") {
    return <div className="d-flex justify-content-center align-content-center align-self-center">Loading...</div>;
  }

  return (
    <>
      <AnimationWrapper keyValue={activeTab}>
        <div className={`login-page ${theme === "dark" ? "dark" : "light"}`}>
          <div className={`login-container shadow`}>
            <div>
              <h1 className="app-title">Outlook Story</h1>
            </div>

            <div className="tab-buttons">
              <button
                className={activeTab === "login" ? "active" : ""}
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
              <button
                className={activeTab === "signup" ? "active" : ""}
                onClick={() => handleTabChange("signup")}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence exitBeforeEnter>
              {activeTab === "login" && (
                <motion.div
                  key="login"
                  className="form-container"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={() => signIn("google")}
                    className="oauth-button google"
                  >
                    Sign in with Google
                  </button>
                  <div className="divider">OR</div>
                  <form>
                    <div className="input-group mb-2">
                      <input type="email" placeholder="Email" required />
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="submit-button">
                      Login
                    </button>
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
                  <button className="oauth-button google">
                    Sign up with Google
                  </button>
                  <div className="divider">OR</div>
                  <form>
                    <div className="input-group mb-2">
                      <input type="text" placeholder="Username" required />
                    </div>
                    <div className="input-group mb-2">
                      <input type="email" placeholder="Email" required />
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="submit-button">
                      Sign Up
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
}

// import React from 'react'

// export default function page() {
//   return (
//     <div>
      
//     </div>
//   )
// }
