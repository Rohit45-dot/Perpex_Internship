import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://127.0.0.1:8000"; // Django backend

  // Register
  const register = async () => {
    try {
      await axios.post(`${API_URL}/register/`, { username, password, role });
      alert("Registered successfully!");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed!");
    }
  };

  // Login
  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login/`, {
        username,
        password,
      });
      setToken(res.data.access);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed!");
    }
  };

  // Get Orders (protected)
  const getOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Unauthorized - please login.");
    }
  };

  // Get Payments (protected)
  const getPayments = async () => {
    try {
      const res = await axios.get(`${API_URL}/payments/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Unauthorized - please login.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🍽️ Restaurant Management System</h2>

      {/* Register Section */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Register</h3>
        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select style={styles.select} onChange={(e) => setRole(e.target.value)}>
          <option value="waiter">Waiter</option>
          <option value="cashier">Cashier</option>
          <option value="manager">Manager</option>
        </select>
        <button style={styles.button} onClick={register}>
          Register
        </button>
      </div>

      {/* Login Section */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Login</h3>
        <button style={styles.button} onClick={login}>
          Login
        </button>
      </div>

      {/* Protected APIs */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Protected APIs</h3>
        <button style={styles.button} onClick={getOrders}>
          Get Orders
        </button>
        <button style={styles.button} onClick={getPayments}>
          Get Payments
        </button>
        <h4 style={styles.response}>Response: {message}</h4>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    color: "#444",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    background: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "8px",
    transition: "background 0.3s",
  },
  response: {
    marginTop: "10px",
    color: "#555",
    fontStyle: "italic",
  },
};

export default App;
