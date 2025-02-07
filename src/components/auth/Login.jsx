import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/user/login", { email, password });

      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("email", email);
        login({ ...response.data.user, token: response.data.access_token });

        if (response.data.user.is_customer === false) {
          navigate("/technician-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 0.7 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-2xl font-small text-center mb-5"
        >
          User Login
        </motion.h2>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4"
          >
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <motion.input
              whileFocus={{ scale: 1.05, borderColor: "bg-fuchsia-500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-fuchsia-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-4"
          >
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <motion.input
              whileFocus={{ scale: 1.05, borderColor:"bg-fuchsia-500" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-fuchsia-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
              required
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-sm mb-4"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          >
            Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              Register
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
