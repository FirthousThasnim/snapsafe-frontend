import { useState } from "react";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import Alerts from "./pages/Alerts";

function App() {
  const [page, setPage] = useState("users");

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      
      {/* Header */}
      <div style={{ background: "#1a1a2e", color: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ margin: 0, color: "#ff4d4d" }}>🚨 SnapSafe</h1>
        <p style={{ margin: 0, color: "#aaa" }}>Emergency Contact & SOS Alert Management</p>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setPage("users")} style={{ padding: "10px 20px", background: page === "users" ? "#cc0000" : "#eee", color: page === "users" ? "white" : "black", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          👤 Users
        </button>
        <button onClick={() => setPage("contacts")} style={{ padding: "10px 20px", background: page === "contacts" ? "#cc0000" : "#eee", color: page === "contacts" ? "white" : "black", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          📞 Contacts
        </button>
        <button onClick={() => setPage("alerts")} style={{ padding: "10px 20px", background: page === "alerts" ? "#cc0000" : "#eee", color: page === "alerts" ? "white" : "black", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          🚨 SOS Alerts
        </button>
      </div>

      {/* Pages */}
      {page === "users" && <Users />}
      {page === "contacts" && <Contacts />}
      {page === "alerts" && <Alerts />}

    </div>
  );
}

export default App;