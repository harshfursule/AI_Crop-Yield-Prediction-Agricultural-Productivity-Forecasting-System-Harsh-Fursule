import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sprout, TrendingUp, CloudRain, Cpu, ShieldCheck, ArrowRight, Sun, Moon, CheckCircle2, Users, Database, Layers } from "lucide-react";

function Landing() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header style={{
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-surface-glass)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff"
          }}>
            <Sprout size={24} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700 }}>
            YieldSense <span style={{ color: "var(--brand-green)" }}>AI</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            {theme === "dark" ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>

          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>
                User Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: "0.875rem" }}>
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px 60px",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "20px",
          background: "var(--brand-green-light)",
          color: "var(--brand-green-dark)",
          fontSize: "0.85rem",
          fontWeight: 700,
          marginBottom: "24px"
        }}>
          <Cpu size={16} /> AI-Powered Crop Yield & Agricultural Forecasting
        </div>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "3.5rem",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-1.5px",
          color: "var(--text-primary)",
          marginBottom: "24px"
        }}>
          Predict Crop Yields with <br />
          <span style={{
            background: "linear-gradient(135deg, #10b981, #059669, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Data-Driven Machine Learning
          </span>
        </h1>

        <p style={{
          fontSize: "1.15rem",
          color: "var(--text-secondary)",
          maxWidth: "720px",
          margin: "0 auto 36px",
          lineHeight: 1.6
        }}>
          YieldSense AI empowers farmers, agricultural cooperatives, and researchers to forecast yield tonnage, analyze soil pH & nutrients, evaluate weather risks, and maximize seasonal productivity.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1.05rem" }}>
            Start Free Prediction <ArrowRight size={20} />
          </Link>
          <Link to="/admin-login" className="btn btn-secondary" style={{ padding: "14px 24px", fontSize: "1.05rem" }}>
            <ShieldCheck size={20} /> Admin Portal
          </Link>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "80px",
          textAlign: "left"
        }}>
          <div className="card" style={{ padding: "28px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "var(--brand-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <TrendingUp size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>98% Accuracy Models</h3>
            <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
              Trained on extensive FAOSTAT and regional dataset features including rainfall, soil pH, temperature, and fertilizer levels.
            </p>
          </div>

          <div className="card" style={{ padding: "28px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(59, 130, 246, 0.15)",
              color: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <CloudRain size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>Weather & Climate Risk</h3>
            <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
              Real-time drought, waterlogging, and heat stress alerts to protect your seasonal crops before damage occurs.
            </p>
          </div>

          <div className="card" style={{ padding: "28px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(139, 92, 246, 0.15)",
              color: "#8b5cf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>Dual-Role RBAC & Audit</h3>
            <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
              Dedicated Administrator Operations Center with user status toggles, role management, and live audit trail security logs.
            </p>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-color)",
        padding: "32px",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "var(--text-muted)"
      }}>
        YieldSense AI — Internship Project by Harsh Fursule | Powered by FastAPI, React & Machine Learning
      </footer>
    </div>
  );
}

export default Landing;
