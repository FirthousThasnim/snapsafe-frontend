import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/alerts";
const USERS_API = "http://localhost:5000/api/users";

// Get token from localStorage
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
    await axios.post(API, { userId, location, message, status: "active" }, getToken());
    setUserId(""); setLocation(""); setMessage("");
    fetchAlerts();
  };

  const deleteAlert = async (id) => {
    await axios.delete(`${API}/${id}`, getToken());
    fetchAlerts();
  };

  return (
    <div>
      <h2 style={{ color: "#1a1a2e" }}>🚨 SOS Alerts</h2>

      {/* Create Form */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h3>Create SOS Alert</h3>
        <select value={userId} onChange={e => setUserId(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
          <option value="">Select User</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <button onClick={createAlert} style={{ padding: "8px 20px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send SOS</button>
      </div>

      {/* Alerts List */}
      {alerts.map(alert => (
        <div key={alert._id} style={{ background: "white", padding: "15px", borderRadius: "10px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>📍 {alert.location}</strong>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{alert.message}</p>
            <p style={{ margin: 0, color: alert.status === "active" ? "red" : "green", fontSize: "12px", fontWeight: "bold" }}>
              Status: {alert.status}
            </p>
            <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>
              User: {alert.userId?.name || "N/A"}
            </p>
          </div>
          <button onClick={() => deleteAlert(alert._id)} style={{ padding: "6px 15px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Alerts;