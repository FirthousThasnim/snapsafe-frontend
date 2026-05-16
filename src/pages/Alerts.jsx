import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/alerts";
const USERS_API = "http://localhost:5000/api/users";
const getToken = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const fetchAlerts = async () => {
    const res = await axios.get(API, getToken());
    setAlerts(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(USERS_API, getToken());
    setUsers(res.data);
  };

  useEffect(() => { fetchAlerts(); fetchUsers(); }, []);

  const createAlert = async () => {
    if (!userId || !location || !message) return alert("All fields required!");
    await axios.post(API, { userId, location, message, status: "active" }, getToken());
    setUserId(""); setLocation(""); setMessage("");
    fetchAlerts();
  };

  const deleteAlert = async (id) => {
    if (!window.confirm("Delete this alert?")) return;
    await axios.delete(`${API}/${id}`, getToken());
    fetchAlerts();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}`, { status }, getToken());
    fetchAlerts();
  };

  return (
    <div>
      {/* Stats Card */}
      <div style={{ background: "linear-gradient(135deg, #cc0000, #ff4d4d)", borderRadius: "15px", padding: "20px 30px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontSize: "40px" }}>🚨</span>
        <div>
          <h2 style={{ color: "white", margin: 0 }}>SOS Alerts</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "13px" }}>
            {alerts.filter(a => a.status === "active").length} active &nbsp;|&nbsp; {alerts.filter(a => a.status === "resolved").length} resolved
          </p>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ background: "white", borderRadius: "15px", padding: "25px", marginBottom: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
        <h3 style={{ color: "#1a1a2e", marginBottom: "15px", fontSize: "16px" }}>🚨 Create SOS Alert</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <select
            value={userId}
            onChange={e => setUserId(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          >
            <option value="">Select User</option>
            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <input
            placeholder="📍 Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <input
            placeholder="💬 Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <button
            onClick={createAlert}
            style={{ padding: "12px 25px", background: "linear-gradient(135deg, #cc0000, #ff4d4d)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 15px rgba(204,0,0,0.3)" }}
          >
            Send SOS
          </button>
        </div>
      </div>

      {/* Alerts List */}
      {alerts.map(alert => (
        <div key={alert._id} style={{ background: "white", borderRadius: "12px", padding: "18px 25px", marginBottom: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `4px solid ${alert.status === "active" ? "#cc0000" : "#27ae60"}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
              <strong style={{ fontSize: "15px", color: "#1a1a2e" }}>📍 {alert.location}</strong>
              <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", background: alert.status === "active" ? "#ffe0e0" : "#e0ffe0", color: alert.status === "active" ? "#cc0000" : "#27ae60" }}>
                {alert.status === "active" ? "🔴 ACTIVE" : "✅ RESOLVED"}
              </span>
            </div>
            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>💬 {alert.message}</p>
            <p style={{ margin: 0, color: "#bbb", fontSize: "12px" }}>👤 {alert.userId?.name || "N/A"}</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {alert.status === "active" && (
              <button
                onClick={() => updateStatus(alert._id, "resolved")}
                style={{ padding: "8px 15px", background: "#e0ffe0", color: "#27ae60", border: "2px solid #b0ffb0", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
              >
                ✅ Resolve
              </button>
            )}
            <button
              onClick={() => deleteAlert(alert._id)}
              style={{ padding: "8px 15px", background: "#fff0f0", color: "#cc0000", border: "2px solid #ffcccc", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}

      {alerts.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "#aaa" }}>
          <p style={{ fontSize: "40px" }}>🚨</p>
          <p>No alerts found. Create one above!</p>
        </div>
      )}
    </div>
  );
}

export default Alerts;