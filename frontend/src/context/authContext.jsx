import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Check URL parameters for OAuth 2.0 callback params
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      const userData = {
        user_id: params.get("user_id"),
        name: params.get("name"),
        email: params.get("email"),
        role: params.get("role") || "user",
        avatar: params.get("avatar") || `https://api.dicebear.com/7.x/avataaars/svg?seed=${params.get("name")}`
      };
      localStorage.setItem("yieldsense_token", urlToken);
      localStorage.setItem("yieldsense_user", JSON.stringify(userData));
      // Clean query string from browser URL bar
      window.history.replaceState({}, document.title, window.location.pathname);
      return urlToken;
    }
    return localStorage.getItem("yieldsense_token");
  });

  const [user, setUser] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
      return {
        user_id: params.get("user_id"),
        name: params.get("name"),
        email: params.get("email"),
        role: params.get("role") || "user",
        avatar: params.get("avatar") || `https://api.dicebear.com/7.x/avataaars/svg?seed=${params.get("name")}`
      };
    }
    const saved = localStorage.getItem("yieldsense_user");
    return saved ? JSON.parse(saved) : null;
  });

  const saveAuthData = (data) => {
    const accessToken = data.access_token;
    const userData = {
      user_id: data.user_id,
      name: data.name,
      email: data.email,
      role: data.role || "user",
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    };

    localStorage.setItem("yieldsense_token", accessToken);
    localStorage.setItem("yieldsense_user", JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
  };

  const login = (data) => {
    saveAuthData(data);
  };

  const updateUserProfileState = (updatedFields) => {
    setUser((prev) => {
      const newObj = { ...prev, ...updatedFields };
      localStorage.setItem("yieldsense_user", JSON.stringify(newObj));
      return newObj;
    });
  };

  const logout = () => {
    localStorage.removeItem("yieldsense_token");
    localStorage.removeItem("yieldsense_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role: user?.role || "user",
        isAdmin: user?.role === "admin",
        login,
        logout,
        updateUserProfileState,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
