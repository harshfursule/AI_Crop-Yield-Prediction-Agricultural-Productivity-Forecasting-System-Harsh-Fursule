import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { ShieldCheck, Mail, Lock, KeyRound, ArrowRight, AlertCircle, Sun, Moon } from "lucide-react";

function AdminLogin() {
  const [email, setEmail] = useState("admin@yieldsense.ai");
  const [password, setPassword] = useState("Admin@123");
  const [passkey, setPasskey] = useState("ADMIN123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/admin-login", {
        email,
        password,
        passkey
      });

      login(response.data);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.detail || "Admin authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top right, #1e1b4b 0%, #090d16 100%)",
      color: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px"
    }}>
      <div style={{
        position: "absolute",
        top: "20px",
        right: "24px"
      }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            padding: "8px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            fontSize: "0.85rem"
          }}
        >
          {theme === "dark" ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#3b82f6" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div style={{
        maxWidth: "460px",
        width: "100%",
        background: "rgba(17, 24, 39, 0.9)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        borderRadius: "24px",
        padding: "40px 36px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
      }} className="animate-fade-in">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "52px",
            height: "52px",
            margin: "0 auto 12px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)"
          }}>
            <ShieldCheck size={30} />
          </div>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
            Administrator Portal
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            Restricted access for system management & audit trails
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "0.875rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239, 68, 68, 0.15)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.3)"
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
              <input
                type="email"
                placeholder="admin@yieldsense.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  borderRadius: "12px",
                  border: "1px solid #374151",
                  background: "#111827",
                  color: "#ffffff",
                  fontSize: "0.95rem"
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
              Admin Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  borderRadius: "12px",
                  border: "1px solid #374151",
                  background: "#111827",
                  color: "#ffffff",
                  fontSize: "0.95rem"
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
              Portal Passkey / MFA Code
            </label>
            <div style={{ position: "relative" }}>
              <KeyRound size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8b5cf6" }} />
              <input
                type="text"
                placeholder="ADMIN123"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  borderRadius: "12px",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  background: "#111827",
                  color: "#a78bfa",
                  fontSize: "0.95rem",
                  fontFamily: "monospace",
                  letterSpacing: "2px"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)"
            }}
          >
            {loading ? "Authenticating Admin..." : "Authenticate Admin"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link to="/login" style={{ color: "#9ca3af", fontSize: "0.85rem", textDecoration: "none" }}>
            ← Return to Standard User Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
