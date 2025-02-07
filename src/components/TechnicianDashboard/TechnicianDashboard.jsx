import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Assuming UserContext is used to get user data
import TechnicianNavBar  from "../NavBarComponent/TechnicianNavBar"

const TechnicianDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useContext(UserContext); // Assuming user data is stored in context

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Set colors based on user role
  const sidebarBgColor = user?.is_customer ? "bg-gray-100" : "bg-green-100"; 
  const linkColor = user?.is_customer ? "text-blue-500" : "text-green-500"; 
  const hoverLinkColor = user?.is_customer
    ? "hover:text-blue-700"
    : "hover:text-green-700"; // Hover color based on role

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-64 ${sidebarBgColor} sticky top-0 h-screen p-6 transition-all duration-300 md:block`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Technician</h2>
        <ul className="space-y-4">
          <li>
            <a href="#"  className="text-blue-500 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <Link
              to="/assigned-jobs"
               className="text-blue-500 hover:text-blue-700"
            >
              Assigned Jobs
            </Link>
        
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
      
        <TechnicianNavBar />

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
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome to Technician Dashboard
          </h2>
         
          
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
