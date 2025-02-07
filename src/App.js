import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from "./context/UserContext";  // Import context provider and hook
import CustomerDashboard from "./components/CustemerDashboard/CustomerDashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import TechnicianDashboard from "./components/TechnicianDashboard/TechnicianDashboard";
import TechnicianNavBar from "./components/NavBarComponent/TechnicianNavBar"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddListing from "./components/CustemerDashboard/AddListing";
import ShowAllJobs from "./components/CustemerDashboard/ShowAllJobs";
import AssignedJobs from "./components/TechnicianDashboard/AssignedJobs";
import Profile from "./components/CustemerDashboard/Profile";
import Payments from "./components/CustemerDashboard/Payments";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();  // Access the user context

  if (!user) {
    return <Navigate to="/login" replace />;  // Redirect to login if no user is authenticated
  }

  return children;
};

const Dashboard = () => {
  const { user } = useUserContext();  // Access the user context

  if (!user) {
    return <Navigate to="/login" replace />;  // Redirect to login if no user is authenticated
  }

  // Conditional rendering based on the user's role
  if (user.is_customer===true) {
    return <CustomerDashboard />;  // Redirect to customer dashboard if the user is a customer
  } else{
    return <TechnicianDashboard />
  }

  
   // Redirect to manager dashboard (adjust as needed for role-based navigation)
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/add-listing" element = {<AddListing/>} />
          <Route path ="/show-my-listings" element = {<ShowAllJobs/>} />
          <Route path ="/assigned-jobs" element = {<AssignedJobs/>} />
          <Route  path ="/user/profile" element ={<Profile/>} />
          <Route path ="/payments" element={<Payments/>} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
                
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager-dashboard"
            element={
              <ProtectedRoute>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician-dashboard"
            element={
              <ProtectedRoute>
                <TechnicianDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
