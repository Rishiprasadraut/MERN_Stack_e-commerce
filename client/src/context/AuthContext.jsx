import { createContext, useState, useEffect } from "react";

import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

const register = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    const profile = await api.get("/auth/me");
    setUser(profile.data);
  } catch (err) {
    console.error("Registration error:", err);
    
    // Better error message handling
    if (err.response) {
      // Server responded with error
      alert(err.response.data?.message || `Error: ${err.response.status}`);
    } else if (err.request) {
      // Request made but no response (network issue)
      alert("Cannot connect to server. Please check your connection.");
    } else {
      // Something else happened
      alert("Registration failed: " + err.message);
    }
    throw err;
  }
};


  const login = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);

      const profile = await api.get("/auth/me");
      setUser(profile.data);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
