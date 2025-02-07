import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'; 
const Navbar = () => {


   // if you're using react-router for navigation

   const navigate = useNavigate(); // Use useNavigate inside the component

   const handleLogout = () => {
     // Clear user session (example using localStorage)
     localStorage.removeItem('token');
 
     // Show a logout alert message
     alert("You have been logged out!");
 
     // Redirect to the login page using navigate
     navigate('/login'); 
   };
 

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="text-white text-xl font-bold">Customer Dashboard</div>
      <div className="flex space-x-4">
      <Link
                    to="/add-listing"
                    className="text-blue-500 hover:text-blue-700"
                    >
                  Create job request
                    </Link>
                    <Link
                    to="/show-my-listings"
                    className="text-blue-500 hover:text-blue-700"
                    >
                     Show My Requests
                    </Link>
        <button
          onClick={handleLogout}
            className="text-blue-500 hover:text-blue-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
