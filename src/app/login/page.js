"use client"

import React, { useState } from 'react';
import './LoginPage.scss';
import AnimationWrapper from '../../../Components/AnimationWrapper';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
   <>

     <AnimationWrapper keyValue={activeTab}>
      <div className="login-page">
        <div className="login-container">
          <div><h1 className="app-title">Outlook Story</h1></div>

          <div className="tab-buttons">
            <button
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button
              className={activeTab === 'signup' ? 'active' : ''}
              onClick={() => handleTabChange('signup')}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence exitBeforeEnter>
            {activeTab === 'login' && (
              <motion.div
                key="login"
                className="form-container"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <button className="oauth-button google">Sign in with Google</button>
                {/* <button className="oauth-button apple">Sign in with Apple</button> */}
                <div className="divider">OR</div>
                <form>
                  <div className="input-group">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="input-group">
                    <input type="password" placeholder="Password" required />
                  </div>
                  <button type="submit" className="submit-button">Login</button>
                </form>
              </motion.div>
            )}

            {activeTab === 'signup' && (
              <motion.div
                key="signup"
                className="form-container"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <button className="oauth-button google">Sign up with Google</button>
                {/* <button className="oauth-button apple">Sign up with Apple</button> */}
                <div className="divider">OR</div>
                <form>
                  <div className="input-group">
                    <input type="text" placeholder="Username" required />
                  </div>
                  <div className="input-group">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="input-group">
                    <input type="password" placeholder="Password" required />
                  </div>
                  <button type="submit" className="submit-button">Sign Up</button>
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


