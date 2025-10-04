import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">BookPlatform</div>

      <div>
        {!user ? (
          <>
            <button onClick={() => navigate("/signup")} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Signup</button>
            <button onClick={() => navigate("/login")} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 ml-2">Login</button>
          </>
        ) : (
          <button onClick={() => { logout(); navigate("/login"); }} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
