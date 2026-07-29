import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { Sprout, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Sun, Moon } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      login(response.data);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/login";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px"
    }}>
      <div style={{
        position: "absolute",
        top: "20px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            padding: "8px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600
          }}
        >
          {theme === "dark" ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#3b82f6" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div style={{
        maxWidth: "440px",
        width: "100%",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        padding: "36px 32px",
        boxShadow: "var(--shadow-lg)"
      }} className="animate-fade-in">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            margin: "0 auto 12px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 6px 16px rgba(16, 185, 129, 0.35)"
          }}>
            <Sprout size={28} />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Log in to access your agricultural insights & yield predictions
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
            background: "rgba(239, 68, 68, 0.12)",
            color: "#ef4444",
            border: "1px solid rgba(239, 68, 68, 0.25)"
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Google OAuth SSO Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
            fontSize: "0.925rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--brand-green)"}
          onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          color: "var(--text-muted)",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)" }}></div>
          or email
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)" }}></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="email"
                placeholder="farmer@yieldsense.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem"
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem"
                }}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: "12px", marginTop: "8px" }}>
            {loading ? "Logging in..." : "Sign In"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--brand-green)", fontWeight: 700, textDecoration: "none" }}>
            Sign up here
          </Link>
        </div>

        {/* Portal Switcher to Admin */}
        <div style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center"
        }}>
          <Link to="/admin-login" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.825rem",
            color: "#8b5cf6",
            fontWeight: 600,
            textDecoration: "none"
          }}>
            <ShieldCheck size={16} /> Switch to Administrator Portal
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
