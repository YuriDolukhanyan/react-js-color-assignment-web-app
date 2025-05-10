import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Toast from "./Toast";
import "../styles/enter.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }
    const success = login(username, password);
    if (success) {
      console.log("Logged as ADMIN...");
      showToast("Successfully Logged as ADMIN...")
    } else {
      setError("Invalid credentials.");
      showToast("Invalid credentials for LOGIN...")
    }
  };

  return (
    <>
      {toastMessage && (
        <Toast
          key={toastMessage}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <form onSubmit={handleSubmit}>
        <h2>Login Area (FOR ADMIN RESET BUTTON):</h2>
        <h2>{"{log: 'admin', pass: 'admin'}"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        &nbsp;
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        &nbsp;
        <button className="submit-button" type="submit">
          Enter!
        </button>
      </form>
    </>
  );
};

export default Login;
