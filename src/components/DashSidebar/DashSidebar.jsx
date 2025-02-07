'use client';

import { useState, useEffect } from 'react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie } from 'react-icons/hi';
import { SignOutButton } from '@clerk/nextjs'; // Assuming you're using Clerk for authentication
import { useUser } from '@clerk/nextjs'; // Same as above for Clerk user management
import Link from 'next/link'; // Correct Link import for Next.js

const DashSidebar = () => {
  const [tab, setTab] = useState('');
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(window.location.search).get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        {/* Sidebar Items */}
        <ul className="nav flex-column">
          {user?.publicMetadata?.isAdmin && (
            <li className="nav-item">
              <Link href="/dashboard?tab=dash" className={`nav-link ${tab === 'dash' || !tab ? 'active' : ''}`}>
                <HiChartPie className="me-2" />
                Dashboard
              </Link>
            </li>
          )}
          
          <li className="nav-item">
            <Link href="/dashboard?tab=profile" className={`nav-link ${tab === 'profile' ? 'active' : ''}`}>
              <HiUser className="me-2" />
              {user?.publicMetadata?.isAdmin ? 'Admin' : 'User'} Profile
            </Link>
          </li>

          {user?.publicMetadata?.isAdmin && (
            <li className="nav-item">
              <Link href="/dashboard?tab=posts" className={`nav-link ${tab === 'posts' ? 'active' : ''}`}>
                <HiDocumentText className="me-2" />
                Posts
              </Link>
            </li>
          )}

          {user?.publicMetadata?.isAdmin && (
            <li className="nav-item">
              <Link href="/dashboard?tab=users" className={`nav-link ${tab === 'users' ? 'active' : ''}`}>
                <HiOutlineUserGroup className="me-2" />
                Users
              </Link>
            </li>
          )}

          {/* Sign Out Button */}
          <li className="nav-item mt-auto">
            <div className="nav-link cursor-pointer">
              <HiArrowSmRight className="me-2" />
              <SignOutButton />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashSidebar;
