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
      // Save token
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#1a1a2e" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "10px", width: "350px", textAlign: "center" }}>
        <h1 style={{ color: "#cc0000" }}>🚨 SnapSafe</h1>
        <p style={{ color: "#666" }}>Admin Login</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "10px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;