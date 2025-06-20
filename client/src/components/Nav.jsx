import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return null; // Prevents flicker

  return (
    <nav className="flex gap-4 p-4 bg-white border-b shadow-sm">
      {user ? (
        <>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/predictions"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Predictions
          </Link>
          <button
            onClick={logout}
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
