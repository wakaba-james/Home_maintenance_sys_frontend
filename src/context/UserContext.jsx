// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';


// Create the context
export const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Save user data to state
  };

  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('token'); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the context
export const useUserContext = () => useContext(UserContext);
