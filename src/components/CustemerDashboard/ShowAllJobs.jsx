import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowAllJobs() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const customerEmail = localStorage.getItem("email");
                const accessToken = localStorage.getItem("access_token");
    
                if (!customerEmail) {
                    setError("No email found in localStorage. Please log in.");
                    setLoading(false);
                    return;
                }
    
                if (!accessToken) {
                    setError("No access token found. Please log in.");
                    setLoading(false);
                    return;
                }
    
                // console.log("Customer Email:", customerEmail);
    
                const response = await fetch(`http://localhost:8000/api/listing/get-listings?customer=${customerEmail}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch listings");
                }
    
                const data = await response.json();
    
                if (data.listings && Array.isArray(data.listings)) {
                    setListings(data.listings);
                } else {
                    setError("No listings found.");
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchListings();
    }, []);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="flex h-screen">
         
            <div
                className={`${
                    isSidebarOpen ? "block" : "hidden"
                } md:block w-64 bg-gray-100 sticky top-0 h-screen p-6 transition-all duration-300`}
            >
                <h2 className="text-2xl font-bold text-gray-800">Job Request History</h2>
                <ul className="mt-6 space-y-4">
                    <li>
                    <Link
                    to="/customer-dashboard"
                    className="text-blue-500 hover:text-blue-700"
                    >
                    Dashboard
                    </Link>
                    </li>
                    <li>
                    <Link
                    to="/show-my-listings"
                    className="text-blue-500 hover:text-blue-700"
                    >
                    Show All Listings
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
            <div className="flex-1 p-6 overflow-auto">
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

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Job Requests</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto text-sm text-gray-800">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Service Type</th>
                                <th className="px-6 py-3 text-left">City</th>
    
                                <th className="px-6 py-3 text-left">Scheduled Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                                        No listings available
                                    </td>
                                </tr>
                            ) : (
                                listings.map((listing) => (
                                    <tr key={listing.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{listing.title}</td>
                                        <td className="px-6 py-4">{listing.customer}</td>
                                        <td className="px-6 py-4">{listing.service_type}</td>
                                       
                                        <td className="px-6 py-4">{listing.state}</td>
                                        <td className="px-6 py-4">
                                            {new Date(listing.completion_date).toLocaleDateString()
                                            }
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShowAllJobs;
