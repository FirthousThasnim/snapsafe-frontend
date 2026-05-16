import { useState } from "react";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import Alerts from "./pages/Alerts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState("users");

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🚨</span>
          <div>
            <h1 style={{ color: "#ff4d4d", margin: 0, fontSize: "22px" }}>SnapSafe</h1>
            <p style={{ color: "#aaa", margin: 0, fontSize: "11px" }}>Emergency Contact & SOS Alert Management</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#aaa", fontSize: "13px" }}>👤 Admin | 2022/ICT/102</span>
          <button onClick={handleLogout} style={{
            padding: "8px 18px",
            background: "#cc0000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}>Logout</button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: "white",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        display: "flex",
        gap: "5px"
      }}>
        {[
          { id: "users", label: "👤 Users" },
          { id: "contacts", label: "📞 Contacts" },
          { id: "alerts", label: "🚨 SOS Alerts" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            style={{
              padding: "15px 25px",
              background: "none",
              border: "none",
              borderBottom: page === tab.id ? "3px solid #cc0000" : "3px solid transparent",
              color: page === tab.id ? "#cc0000" : "#666",
              cursor: "pointer",
              fontWeight: page === tab.id ? "bold" : "normal",
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
        {page === "users" && <Users />}
        {page === "contacts" && <Contacts />}
        {page === "alerts" && <Alerts />}
      </div>

    </div>
  );
}

export default App;