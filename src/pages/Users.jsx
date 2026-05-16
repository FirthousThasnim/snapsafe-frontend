import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

// Get token from localStorage
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
    await axios.post(API, { name, email, phone }, getToken());
    setName(""); setEmail(""); setPhone("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`, getToken());
    fetchUsers();
  };

  return (
    <div>
      <h2 style={{ color: "#1a1a2e" }}>👤 Users</h2>

      {/* Create Form */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h3>Add New User</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <button onClick={createUser} style={{ padding: "8px 20px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add</button>
      </div>

      {/* Users List */}
      {users.map(user => (
        <div key={user._id} style={{ background: "white", padding: "15px", borderRadius: "10px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>{user.name}</strong>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{user.email} | {user.phone}</p>
          </div>
          <button onClick={() => deleteUser(user._id)} style={{ padding: "6px 15px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Users;