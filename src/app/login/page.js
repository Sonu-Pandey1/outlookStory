"use client"

import React, { useState } from 'react';
import './LoginPage.scss';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="app-title">Dream Machine</h1>

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

        {activeTab === 'login' && (
          <div className="form-container">
            <button className="oauth-button google">Sign in with Google</button>
            <button className="oauth-button apple">Sign in with Apple</button>
            <div className="divider">OR</div>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="submit-button">Login</button>
            </form>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="form-container">
            <button className="oauth-button google">Sign up with Google</button>
            <button className="oauth-button apple">Sign up with Apple</button>
            <div className="divider">OR</div>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}