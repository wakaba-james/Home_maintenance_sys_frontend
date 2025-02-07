import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; // Assuming UserContext is used to get user data
import TechnicianNavBar from "../NavBarComponent/TechnicianNavBar";
import { Link } from "react-router-dom";

const AssignedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [assignedJobs, setAssignedJobs] = useState([]); // State to hold assigned jobs
  const [error, setError] = useState(""); // Error state for handling issues during data fetch
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job to update status
  const { user } = useContext(UserContext); // Assuming user data is stored in context
  const navigate = useNavigate();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch assigned jobs from the API
  useEffect(() => {
    const fetchAssignedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listing/assigned-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.data) {
          // Set the assigned jobs data in state and initialize their status as "Pending"
          const jobsWithStatus = response.data.map((job) => ({
            ...job,
            status: "Pending", // Initially, set job status to "Pending"
          }));
          setAssignedJobs(jobsWithStatus);
        }
      } catch (err) {
        setError("Error fetching assigned jobs. Please try again later.");
      }
    };

    fetchAssignedJobs();
  }, []);

  // Handle job status update
  const updateJobStatus = async () => {
    try {
      // Call the API to update the job status
      const response = await axios.patch(
        `http://localhost:8000/api/listing/update/${selectedJob.id}/`,
        { job_status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Job status updated");
        alert("Job status updated");
  
        // Update the local state to reflect the new status
        setAssignedJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob.id ? { ...job, status: "Completed" } : job
          )
        );
  
        // Close the modal
        setShowModal(false);
      } else {
        console.error("Failed to update job status");
        alert("Failed to complete update. Please try again.");
      }
    } catch (error) {
      console.error("Error during status update:", error);
      alert("An error occurred while updating the job status. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-64 bg-green-100 sticky top-0 h-screen p-6 transition-all duration-300 md:block`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Technician Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-green-500 hover:text-green-700">Home</a>
          </li>
          <li>
          <Link
          to="/user/profile"
          className="text-blue-500 hover:text-blue-700"
        >
          Assigned  Jobs
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
        <TechnicianNavBar /> {/* Navbar Component */}

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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Assigned Jobs
          </h2>

          {/* Error message if any */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Jobs Table */}
          <table className="min-w-full table-auto mt-4 border-collapse border border-gray-300">
  <thead>
    <tr className="bg-green-200 text-sm font-semibold text-gray-700">
      <th className="px-4 py-2 border border-gray-300 text-left">Service Request Title</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Service Type</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Address</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Completion Date</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Job Status</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Action</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-600">
    {assignedJobs.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center py-4 border border-gray-300">
          No jobs assigned.
        </td>
      </tr>
    ) : (
      assignedJobs.map((job) => (
        <tr
          key={job.id}
          className="hover:bg-gray-100 transition-colors border-b border-gray-300"
        >
          <td className="px-4 py-2 border border-gray-300">{job.service_request_title}</td>
          <td className="px-4 py-2 border border-gray-300">{job.service_type}</td>
          <td className="px-4 py-2 border border-gray-300">{job.address}</td>
          <td className="px-4 py-2 border border-gray-300">{job.completion_date}</td>
          <td
            className={`px-4 py-2 border border-gray-300 ${
              job.status === "Pending" ? "text-red-500" : "text-green-500"
            }`}
          >
            {job.status}
          </td>
          <td className="px-4 py-2 border border-gray-300 text-center">
            <button
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Status
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-bold text-center mb-4">Update Job Status</h2>
            <p className="text-center mb-4">Are you sure you want to update this job's status to "Completed"?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={updateJobStatus}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Yes, Mark as Finished
              </button>
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedJobs;
