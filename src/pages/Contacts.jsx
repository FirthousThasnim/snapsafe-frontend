import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/contacts";
const USERS_API = "http://localhost:5000/api/users";
const getToken = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  const fetchContacts = async () => {
    const res = await axios.get(API, getToken());
    setContacts(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(USERS_API, getToken());
    setUsers(res.data);
  };

  useEffect(() => { fetchContacts(); fetchUsers(); }, []);

  const createContact = async () => {
    if (!userId || !name || !phone || !relationship) return alert("All fields required!");
    await axios.post(API, { userId, name, phone, relationship }, getToken());
    setName(""); setPhone(""); setRelationship(""); setUserId("");
    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await axios.delete(`${API}/${id}`, getToken());
    fetchContacts();
  };

  const relationshipColors = {
    "Sister": "#9b59b6",
    "Brother": "#2980b9",
    "Mother": "#e91e8c",
    "Father": "#e67e22",
    "Friend": "#27ae60",
  };

  return (
    <div>
      {/* Stats Card */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: "15px", padding: "20px 30px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontSize: "40px" }}>📞</span>
        <div>
          <h2 style={{ color: "white", margin: 0 }}>Emergency Contacts</h2>
          <p style={{ color: "#aaa", margin: 0, fontSize: "13px" }}>{contacts.length} emergency contacts registered</p>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ background: "white", borderRadius: "15px", padding: "25px", marginBottom: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
        <h3 style={{ color: "#1a1a2e", marginBottom: "15px", fontSize: "16px" }}>➕ Add Emergency Contact</h3>
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
            placeholder="Contact Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <input
            placeholder="Relationship"
            value={relationship}
            onChange={e => setRelationship(e.target.value)}
            style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "2px solid #eee", fontSize: "14px", minWidth: "150px" }}
          />
          <button
            onClick={createContact}
            style={{ padding: "12px 25px", background: "linear-gradient(135deg, #cc0000, #ff4d4d)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 15px rgba(204,0,0,0.3)" }}
          >
            Add Contact
          </button>
        </div>
      </div>

      {/* Contacts List */}
      {contacts.map(contact => (
        <div key={contact._id} style={{ background: "white", borderRadius: "12px", padding: "18px 25px", marginBottom: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #9b59b6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ background: relationshipColors[contact.relationship] || "#9b59b6", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px" }}>
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style={{ fontSize: "15px", color: "#1a1a2e" }}>{contact.name}</strong>
              <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>📞 {contact.phone} &nbsp;|&nbsp; 💛 {contact.relationship}</p>
              <p style={{ margin: 0, color: "#bbb", fontSize: "12px" }}>👤 {contact.userId?.name || "N/A"}</p>
            </div>
          </div>
          <button
            onClick={() => deleteContact(contact._id)}
            style={{ padding: "8px 18px", background: "#fff0f0", color: "#cc0000", border: "2px solid #ffcccc", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
          >
            🗑 Delete
          </button>
        </div>
      ))}

      {contacts.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "#aaa" }}>
          <p style={{ fontSize: "40px" }}>📞</p>
          <p>No contacts found. Add one above!</p>
        </div>
      )}
    </div>
  );
}

export default Contacts;