// src/components/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const API_URL = "https://eaa0f823bdcaf00e.mokky.dev";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const u = localStorage.getItem("authUser");
      if (u && u !== "undefined") setUser(JSON.parse(u));
    }
  }, [token]);

  const loginSuccess = (userData, newToken) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    navigate("/", { replace: true });
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      loginSuccess(data.user, data.token);
      return { success: true };
    }
    return { success: false, error: data.message || "Ошибка входа" };
  };

  const register = async (email, password) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      loginSuccess(data.user, data.token);
      return { success: true };
    }
    return { success: false, error: data.message || "Ошибка регистрации" };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};