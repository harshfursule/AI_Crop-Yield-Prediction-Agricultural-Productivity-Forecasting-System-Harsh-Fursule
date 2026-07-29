import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import UserProfileModal from "../components/UserProfileModal";
import {
  Sprout, TrendingUp, CloudRain, Thermometer, Droplets,
  AlertTriangle, CheckCircle2, Award, History, Sparkles, Sliders, Bell, UserCheck
} from "lucide-react";

function Dashboard() {
  const { user, token } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [activeTab, setActiveTab] = useState("predictor"); // 'predictor' | 'history'

  // Predictor Form State
  const [formData, setFormData] = useState({
    Crop: "Wheat",
    Region: "North",
    Soil_Type: "Loam",
    Irrigation: "Drip",
    Previous_Crop: "Legumes",
    Soil_pH: 6.5,
    Rainfall_mm: 850,
    Temperature_C: 24,
    Humidity_pct: 65,
    Fertilizer_Used_kg: 140,
    Pesticides_Used_kg: 12,
    Planting_Density: 50
  });

  const fetchUserActivity = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/activity", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivity(res.data);
    } catch (err) {
      console.error("Failed to load user activity", err);
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, []);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictionResult(null);

    try {
      const res = await axios.post("http://localhost:8000/api/predict", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPredictionResult(res.data);
      fetchUserActivity();
    } catch (err) {
      console.error("Prediction error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Welcome Header & Quick Stats */}
        <div style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.08))",
          border: "1px solid var(--border-color)",
          borderRadius: "24px",
          padding: "32px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <h1 style={{ fontSize: "2.1rem", fontWeight: 800, margin: 0 }}>
                Welcome back, {user?.name || "Farmer"}!
              </h1>
              <span style={{
                background: "rgba(16, 185, 129, 0.2)",
                color: "#10b981",
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "12px",
                fontWeight: 700
              }}>
                ACTIVE FARMER
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Ready to calculate crop yield predictions and analyze weather & soil health metrics?
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setIsProfileOpen(true)} className="btn btn-secondary">
              Edit Profile
            </button>
            <button onClick={() => setActiveTab("predictor")} className="btn btn-primary">
              <Sparkles size={18} /> New Prediction
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border-color)", marginBottom: "28px" }}>
          <button
            onClick={() => setActiveTab("predictor")}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom: activeTab === "predictor" ? "3px solid var(--brand-green)" : "3px solid transparent",
              color: activeTab === "predictor" ? "var(--brand-green)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Sliders size={18} /> AI Yield Predictor Engine
          </button>

          <button
            onClick={() => setActiveTab("history")}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom: activeTab === "history" ? "3px solid var(--brand-green)" : "3px solid transparent",
              color: activeTab === "history" ? "var(--brand-green)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <History size={18} /> Prediction History Feed ({activity?.total_predictions || 0})
          </button>
        </div>

        {/* TAB 1: PREDICTOR ENGINE */}
        {activeTab === "predictor" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
            
            {/* Left Column: Form */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.15)", color: "var(--brand-green)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Sprout size={20} />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Farm & Field Parameters</h3>
              </div>

              <form onSubmit={handlePredict} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                
                {/* Crop */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Crop Type</label>
                  <select
                    value={formData.Crop}
                    onChange={(e) => setFormData({ ...formData, Crop: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    {["Wheat", "Rice", "Maize", "Soybean", "Cotton", "Sugarcane", "Potato"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Region</label>
                  <select
                    value={formData.Region}
                    onChange={(e) => setFormData({ ...formData, Region: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    {["North", "South", "East", "West", "Central"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Soil Type */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Soil Type</label>
                  <select
                    value={formData.Soil_Type}
                    onChange={(e) => setFormData({ ...formData, Soil_Type: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    {["Loam", "Clay", "Sandy", "Silt", "Peat"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Irrigation */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Irrigation Method</label>
                  <select
                    value={formData.Irrigation}
                    onChange={(e) => setFormData({ ...formData, Irrigation: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    {["Drip", "Sprinkler", "Flood", "Rainfed"].map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* Soil pH Slider */}
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>
                    <span>Soil pH ({formData.Soil_pH})</span>
                    <span style={{ color: "var(--text-muted)" }}>Target: 6.0 - 7.5</span>
                  </div>
                  <input
                    type="range" min="4.0" max="9.0" step="0.1"
                    value={formData.Soil_pH}
                    onChange={(e) => setFormData({ ...formData, Soil_pH: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "var(--brand-green)" }}
                  />
                </div>

                {/* Rainfall */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Rainfall (mm)</label>
                  <input
                    type="number" value={formData.Rainfall_mm}
                    onChange={(e) => setFormData({ ...formData, Rainfall_mm: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                {/* Temperature */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Temperature (°C)</label>
                  <input
                    type="number" value={formData.Temperature_C}
                    onChange={(e) => setFormData({ ...formData, Temperature_C: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                {/* Fertilizer */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Fertilizer (kg/ha)</label>
                  <input
                    type="number" value={formData.Fertilizer_Used_kg}
                    onChange={(e) => setFormData({ ...formData, Fertilizer_Used_kg: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                {/* Pesticides */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Pesticides (kg/ha)</label>
                  <input
                    type="number" value={formData.Pesticides_Used_kg}
                    onChange={(e) => setFormData({ ...formData, Pesticides_Used_kg: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: "span 2", padding: "12px", marginTop: "10px" }}>
                  {loading ? "Running AI Prediction..." : "Predict Crop Yield Tonnage"} <TrendingUp size={18} />
                </button>

              </form>
            </div>

            {/* Right Column: Prediction Results Card */}
            <div>
              {predictionResult ? (
                <div className="card animate-fade-in" style={{ border: "2px solid var(--brand-green)" }}>
                  
                  {/* Result Header */}
                  <div style={{ textAlign: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--brand-green)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                      AI Model Prediction Output
                    </span>
                    <div style={{ fontSize: "3.2rem", fontWeight: 800, color: "var(--text-primary)", margin: "8px 0" }}>
                      {predictionResult.predicted_yield_ton_per_ha}{" "}
                      <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-secondary)" }}>tons / ha</span>
                    </div>
                    <div style={{ display: "inline-flex", gap: "12px", alignItems: "center" }}>
                      <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700 }}>
                        Productivity Score: {predictionResult.productivity_score} / 100
                      </span>
                      <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700 }}>
                        {predictionResult.confidence_pct}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Risks Alerts */}
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <AlertTriangle size={16} color="#f59e0b" /> Risk & Climate Impact Assessment
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {predictionResult.risks.map((risk, idx) => (
                        <div key={idx} style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          background: risk.level === "High" ? "rgba(239, 68, 68, 0.12)" : risk.level === "Warning" ? "rgba(245, 158, 11, 0.12)" : "rgba(16, 185, 129, 0.12)",
                          color: risk.level === "High" ? "#ef4444" : risk.level === "Warning" ? "#f59e0b" : "#10b981"
                        }}>
                          <strong style={{ display: "block" }}>{risk.title} ({risk.level})</strong>
                          {risk.msg}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actionable Recommendations */}
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <CheckCircle2 size={16} color="#10b981" /> Actionable Agronomic Recommendations
                    </h4>
                    <ul style={{ paddingLeft: "20px", fontSize: "0.875rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {predictionResult.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              ) : (
                <div className="card" style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)" }}>
                  <Sparkles size={48} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                    No Prediction Calculated Yet
                  </h3>
                  <p style={{ fontSize: "0.875rem" }}>
                    Adjust parameters on the left and click <strong>Predict Crop Yield Tonnage</strong> to see AI inference results!
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: HISTORY FEED */}
        {activeTab === "history" && (
          <div className="card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", fontWeight: 700 }}>
              Your Recent Yield Prediction History
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                    <th style={{ padding: "12px 20px" }}>Crop</th>
                    <th style={{ padding: "12px 20px" }}>Region</th>
                    <th style={{ padding: "12px 20px" }}>Soil pH</th>
                    <th style={{ padding: "12px 20px" }}>Predicted Yield</th>
                    <th style={{ padding: "12px 20px" }}>Productivity</th>
                  </tr>
                </thead>
                <tbody>
                  {!activity?.recent_predictions || activity.recent_predictions.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                        No prediction history recorded yet
                      </td>
                    </tr>
                  ) : (
                    activity.recent_predictions.map((p, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px 20px", fontWeight: 600 }}>{p.result.crop || "Wheat"}</td>
                        <td style={{ padding: "12px 20px", color: "var(--text-secondary)" }}>{p.result.region || "North"}</td>
                        <td style={{ padding: "12px 20px" }}>{p.input?.Soil_pH || 6.5}</td>
                        <td style={{ padding: "12px 20px", fontWeight: 700, color: "var(--brand-green)" }}>
                          {p.result.predicted_yield_ton_per_ha} tons/ha
                        </td>
                        <td style={{ padding: "12px 20px" }}>{p.result.productivity_score} / 100</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
