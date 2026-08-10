import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sprout, Sun, Moon, LogOut, ShieldCheck, User, LayoutDashboard, Settings } from "lucide-react";

function Navbar({ onOpenProfile }) {
  const { user, role, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{
      background: "var(--bg-surface-glass)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-color)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "12px 24px"
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
          }}>
            <Sprout size={24} />
          </div>
          <div>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.5px"
            }}>
              YieldSense <span style={{ color: "var(--brand-green)" }}>AI</span>
            </span>
            <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "-3px" }}>
              Agricultural Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {user && (
            <>
              <Link to="/dashboard" style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: location.pathname === "/dashboard" ? "var(--brand-green)" : "var(--text-secondary)",
                background: location.pathname === "/dashboard" ? "var(--brand-green-light)" : "transparent"
              }}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              {isAdmin && (
                <Link to="/admin" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: location.pathname.startsWith("/admin") ? "#8b5cf6" : "var(--text-secondary)",
                  background: location.pathname.startsWith("/admin") ? "rgba(139, 92, 246, 0.15)" : "transparent"
                }}>
                  <ShieldCheck size={18} />
                  Admin Panel
                </Link>
              )}
            </>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            {theme === "dark" ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>

          {/* User Profile Badge */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid var(--border-color)", paddingLeft: "16px" }}>
              <div 
                onClick={onOpenProfile} 
                style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                title="View & Edit Profile"
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%", border: "2px solid var(--brand-green)",
                  display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)"
                }}>
                  <User size={18} color="var(--brand-green)" />
                </div>
                <div style={{ textAlign: "left", display: "none", smDisplay: "block" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>{user.name}</div>
                  <span style={{
                    fontSize: "0.68rem",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    background: isAdmin ? "rgba(139, 92, 246, 0.2)" : "rgba(16, 185, 129, 0.2)",
                    color: isAdmin ? "#a78bfa" : "#34d399"
                  }}>
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/login" className="btn btn-secondary" style={{ fontSize: "0.85rem", padding: "8px 14px" }}>
                User Login
              </Link>
              <Link to="/admin-login" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "8px 14px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
                Admin Portal
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
