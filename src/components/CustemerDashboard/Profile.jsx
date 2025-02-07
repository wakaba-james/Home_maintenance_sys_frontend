import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/solid';

const Profile = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/api/auth/user/profile", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCustomerData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customer data");
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-50 text-red px-6 py-4 rounded-lg shadow-lg max-w-sm text-center">
          <h3 className="text-xl font-semibold">Oops!</h3>
          <p className="mt-2 text-lg">{error}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate(-1)} 
              className="mt-3 px-6 py-2 bg-blue-100 text-white rounded-full hover:bg-blue-700 focus:outline-none"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <ChevronLeftIcon className="h-6 w-6 mr-2" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex justify-center">
        <img
          className="w-32 h-32 rounded-full border-4 border-gray-200"
          src={customerData.profile_picture || 'https://via.placeholder.com/150/808080/808080?text=Avatar'}
          alt="Customer Profile"
        />
      </div>
      <h1 className="text-3xl font-semibold text-center mt-4">{customerData.name}</h1>
      <p className="text-center text-gray-500">{customerData.email}</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-semibold text-blue-800">Personal Information</h2>
          <p><strong>Name:</strong> {customerData.name}</p>
          <p><strong>Email:</strong> {customerData.email}</p>
          
        </div>
{/* 
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
          <p><strong>Member Since:</strong> {new Date(customerData.created_at).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {customerData.is_active ? 'Active' : 'Inactive'}</p>
        </div> */}
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
