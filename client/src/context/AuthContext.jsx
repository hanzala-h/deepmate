import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // { id, username }
  const [loading, setLoading] = useState(true);

  // Automatically load user on app start
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("deepmate_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Auth check failed:", err.message);
        localStorage.removeItem("deepmate_token");
        localStorage.removeItem("deepmate_user_id");
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;
    localStorage.setItem("deepmate_token", token);
    localStorage.setItem("deepmate_user_id", user.id);
    setUser(user);
    return user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("deepmate_token");
    localStorage.removeItem("deepmate_user_id");
    setUser(null);
    navigate("/login");
  };

  // Signup
  const register = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData
    );
    const { token, user } = res.data;
    localStorage.setItem("deepmate_token", token);
    localStorage.setItem("deepmate_user_id", user.id);
    setUser(user);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
