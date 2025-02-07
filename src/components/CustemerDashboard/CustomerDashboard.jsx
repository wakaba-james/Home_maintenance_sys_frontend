import React, { useState } from "react";
import Navbar from "../NavBarComponent/NavBar";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  // State to manage sidebar visibility on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-64 bg-gray-100 sticky top-0 h-screen p-6 transition-all duration-300 md:block`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-blue-500 hover:text-blue-700">Home</a>
          </li>
          <li>
          <Link
          to="/show-my-listings"
          className="text-blue-500 hover:text-blue-700"
        >
          Show My Listings
        </Link>
          </li>
          <li>
          <Link
          to="/payments"
          className="text-blue-500 hover:text-blue-700"
        >
          Payments requested
        </Link>
          </li>
          <li>
          <Link
          to="/user/profile"
          className="text-blue-500 hover:text-blue-700"
        >
          Profile
        </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <Navbar />  {/* Navbar Component */}

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome to Customer Dashboard</h2>
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
