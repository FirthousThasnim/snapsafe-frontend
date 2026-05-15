import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/contacts";
const USERS_API = "http://localhost:5000/api/users";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(USERS_API);
    setUsers(res.data);
  };

  useEffect(() => { fetchContacts(); fetchUsers(); }, []);

  const createContact = async () => {
    await axios.post(API, { userId, name, phone, relationship });
    setName(""); setPhone(""); setRelationship(""); setUserId("");
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchContacts();
  };

  return (
    <div>
      <h2 style={{ color: "#1a1a2e" }}>📞 Emergency Contacts</h2>

      {/* Create Form */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h3>Add New Contact</h3>
        <select value={userId} onChange={e => setUserId(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
          <option value="">Select User</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <input placeholder="Relationship" value={relationship} onChange={e => setRelationship(e.target.value)} style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
        <button onClick={createContact} style={{ padding: "8px 20px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add</button>
      </div>

      {/* Contacts List */}
      {contacts.map(contact => (
        <div key={contact._id} style={{ background: "white", padding: "15px", borderRadius: "10px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>{contact.name}</strong>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{contact.phone} | {contact.relationship}</p>
            <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>User: {contact.userId?.name || "N/A"}</p>
          </div>
          <button onClick={() => deleteContact(contact._id)} style={{ padding: "6px 15px", background: "#cc0000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Contacts;