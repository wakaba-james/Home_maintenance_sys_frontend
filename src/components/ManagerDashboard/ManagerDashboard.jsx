import React from "react";

const ManagerDashboard = () => {
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800">Super Admin Dashboard</h1>
      <p className="mt-4">Manage the entire application:</p>
      <ul className="list-disc list-inside mt-4">
        <li>Manage users and roles</li>
        <li>View analytics and reports</li>
        <li>Access admin tools</li>
      </ul>
    </div>
  );
};

export default ManagerDashboard;
