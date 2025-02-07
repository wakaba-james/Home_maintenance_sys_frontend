import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
function AddListing() {
    const [formData, setFormData] = useState({
        customer: '', 
        phone: '', // Added phone field
        title: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        description: '',
        service_type: 'ELECTRICAL', // Default service type
        image: null,
        is_published: false,
    });

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('userEmail');
        if (loggedInEmail) {
            setFormData((prevState) => ({
                ...prevState,
                customer: loggedInEmail,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const currentDate = new Date().toISOString(); // Generate the date_created on form submission
        setFormData((prevState) => ({
            ...prevState,
            date_created: currentDate, // Include current date
        }));
    
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'image' && formData[key]) {
                data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });
    
        const token = localStorage.getItem('access_token'); 
    
        if (!token) {
            alert('You must be logged in to post a listing.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/listing/manage', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: data,
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert('Listing added successfully');
                setFormData({
                    customer: '',
                    phone: '', // Reset the phone number
                    title: '',
                    address: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    description: '',
                    service_type: 'ELECTRICAL',
                    image: null,
                    is_published: false,
                });
            } else {
                alert('Error adding listing');
            }
        } catch (error) {
            console.error('Error posting form data:', error);
            alert('Failed to submit listing');
        }
    };

    // Function to handle going back to the previous page
    const goBack = () => {
        window.history.back(); 
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            
            <button 
                onClick={goBack} 
                className="flex items-center text-blue-600 mb-4 hover:underline">
                <ChevronLeftIcon className="w-5 h-5 mr-2" /> Go Back
            </button>

            <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Add New Job Request</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="customer">Customer Email:</label>
                    <input
                        type="email"
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="(\+?\d{1,2}\s?)?(\(?\d{3}\)?|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 555-5555"
                        required
                    />
                    <small className="text-gray-500">Format: (555) 555-5555</small>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Removed slug field as it's auto-generated */}
                
                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="city">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="state">State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="zipcode">Zipcode:</label>
                    <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="service_type">Service Type:</label>
                    <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="PLUMBING">Plumbing</option>
                        <option value="ELECTRICAL">Electrical work</option>
                        <option value="AIR_CONDITIONING">Air conditioning</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>



                <div className="flex flex-col">
                    <label className="text-gray-700 font-small mb-2" htmlFor="image">Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center col-span-3">
                    <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700">Published</label>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Submit Listing
                </button>
            </form>
        </div>
    );
}

export default AddListing;
