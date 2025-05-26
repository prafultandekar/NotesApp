import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/");
      console.log("Registered:", name);
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  const handleRegister = (e) => {
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
        background: "#f0f2f5",
        padding: "20px"
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#2c3e50"
          }}
        >
          📝 Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            backgroundColor: "#2c3e50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
