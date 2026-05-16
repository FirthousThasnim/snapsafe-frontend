import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "50px 40px",
        borderRadius: "20px",
        width: "400px",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        {/* Logo */}
        <div style={{ fontSize: "50px", marginBottom: "10px" }}>🚨</div>
        <h1 style={{ color: "#cc0000", fontSize: "32px", marginBottom: "5px" }}>SnapSafe</h1>
        <p style={{ color: "#999", marginBottom: "30px", fontSize: "14px" }}>Emergency Management System</p>

        {/* Error */}
        {error && (
          <div style={{ background: "#ffe0e0", color: "#cc0000", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {/* Username */}
        <input
          placeholder="👤 Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "2px solid #eee",
            fontSize: "15px",
            boxSizing: "border-box"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "2px solid #eee",
            fontSize: "15px",
            boxSizing: "border-box"
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #cc0000, #ff4d4d)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0 4px 15px rgba(204,0,0,0.3)"
          }}
        >
          Login →
        </button>

        <p style={{ color: "#ccc", fontSize: "12px", marginTop: "20px" }}>
          SnapSafe Admin Portal • 2022/ICT/102
        </p>
      </div>
    </div>
  );
}

export default Login;