import React, { createContext, useState } from "react";

const generateId = () => {
  return Math.random() * Date.now();
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setUser({ name: "admin", id: generateId() });
      return true;
    } else {
      setUser({ name: "user", id: generateId() });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
