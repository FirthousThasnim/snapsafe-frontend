import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";
const getToken = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(API, getToken());
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const createUser = async () => {
    if (!name || !email || !phone) return alert("All fields required!");
    await axios.post(API, { name, email, phone }, getToken());
    setName(""); setEmail(""); setPhone("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`${API}/${id}`, getToken());
    fetchUsers();
  };

  return (
    <div>
      {/* Stats Card */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: "15px", padding: "20px 30px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontSize: "40px" }}>👤</span>
        <div>
          <h2 style={{ color: "white", margin: 0 }}>Users</h2>
          <p style={{ color: "#aaa", margin: 0, fontSize: "13px" }}>{users.length} total users registered</p>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ background: "white", borderRadius: "15px", padding: "25px", marginBottom: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
        <h3 style={{ color: "#1a1a2e", marginBottom: "15px", fontSize: "16px" }}>➕ Add New User</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <input
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <button
            onClick={createUser}
            style={{ padding: "12px 25px", background: "linear-gradient(135deg, #cc0000, #ff4d4d)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 15px rgba(204,0,0,0.3)" }}
          >
            Add User
          </button>
        </div>
      </div>

      {/* Users List */}
      {users.map((user, index) => (
        <div key={user._id} style={{ background: "white", borderRadius: "12px", padding: "18px 25px", marginBottom: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #cc0000" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ background: "linear-gradient(135deg, #cc0000, #ff4d4d)", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px" }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style={{ fontSize: "15px", color: "#1a1a2e" }}>{user.name}</strong>
              <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>✉️ {user.email} &nbsp;|&nbsp; 📞 {user.phone}</p>
            </div>
          </div>
          <button
            onClick={() => deleteUser(user._id)}
            style={{ padding: "8px 18px", background: "#fff0f0", color: "#cc0000", border: "2px solid #ffcccc", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
          >
            🗑 Delete
          </button>
        </div>
      ))}

      {users.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "#aaa" }}>
          <p style={{ fontSize: "40px" }}>👤</p>
          <p>No users found. Add one above!</p>
        </div>
      )}
    </div>
  );
}

export default Users;