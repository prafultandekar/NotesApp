import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successfully");
      console.log("Token:", res.data.token);
      navigate("/create");
    } catch (err) {
      alert("Login ID or Password is incorrect");
      console.log("err", err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        padding: "20px"
      }}
    >
      <form
        onSubmit={handleClick}
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#4B0082",
            fontSize: "24px"
          }}
        >
          🔐 Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#4B0082",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
<br />
<br />

          {/* 👇 Add this below login button */}
        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{
              color: "#4B0082",
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};
