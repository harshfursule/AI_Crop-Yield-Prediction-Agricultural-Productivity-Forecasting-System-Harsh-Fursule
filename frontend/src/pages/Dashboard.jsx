import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import UserProfileModal from "../components/UserProfileModal";
import AIAgronomicAdvisor from "../components/AIAgronomicAdvisor";
import FarmManagement from "../components/FarmManagement";
import WeatherAnalysis from "../components/WeatherAnalysis";
import SoilHealthLab from "../components/SoilHealthLab";
import AnalyticsCompare from "../components/AnalyticsCompare";
import HarvestHistory from "../components/HarvestHistory";
import {
  Sprout, TrendingUp, CloudRain, Thermometer, Droplets,
  AlertTriangle, CheckCircle2, Award, History, Sparkles, Sliders,
  Bell, UserCheck, MapPin, Layers, BarChart3
} from "lucide-react";

function Dashboard() {
  const { user, token } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [activeTab, setActiveTab] = useState("predictor"); // 'predictor' | 'advisor' | 'farms' | 'weather' | 'soil' | 'analytics' | 'history'

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

  const navTabs = [
    { id: "predictor", label: "AI Yield Predictor", icon: Sprout, color: "#10b981" },
    { id: "advisor", label: "AI Agronomic Advisor", icon: Sparkles, color: "#3b82f6" },
    { id: "farms", label: "Farm Plots & Land", icon: MapPin, color: "#10b981" },
    { id: "weather", label: "Weather & Climate", icon: CloudRain, color: "#06b6d4" },
    { id: "soil", label: "Soil Health Lab", icon: Layers, color: "#f59e0b" },
    { id: "analytics", label: "Analytics & Compare", icon: BarChart3, color: "#8b5cf6" },
    { id: "history", label: "Harvest & Logs", icon: History, color: "#ec4899" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <main style={{ maxWidth: "1360px", margin: "0 auto", padding: "28px 24px" }}>
        {/* Hero Welcome Header & Quick Stats */}
        <div style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "24px",
          padding: "28px 32px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "var(--shadow-md)"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>
                YieldSense <span style={{ color: "#10b981" }}>Precision AI</span>
              </h1>
              <span style={{
                background: "rgba(16, 185, 129, 0.2)",
                color: "#10b981",
                fontSize: "0.75rem",
                padding: "4px 12px",
                borderRadius: "14px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <CheckCircle2 size={12} />
                Live API Connected
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>
              Welcome back, <strong>{user?.name || "Farmer"}</strong>! Access 7 AI agronomic engines, farm plot management, and real-time weather analytics.
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{
              background: "var(--bg-surface)",
              padding: "12px 18px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              minWidth: "140px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                AI MODELS ACTIVE
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#10b981", marginTop: "2px" }}>
                7 Modules
              </div>
            </div>

            <div style={{
              background: "var(--bg-surface)",
              padding: "12px 18px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              minWidth: "140px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                USER ROLE
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#3b82f6", marginTop: "2px", textTransform: "capitalize" }}>
                {user?.role || "Farmer"}
              </div>
            </div>
          </div>
        </div>

        {/* 7-TAB RESPONSIVE NAVIGATION BAR */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "var(--bg-card)",
          padding: "8px",
          borderRadius: "18px",
          border: "1px solid var(--border-color)",
          marginBottom: "28px",
          overflowX: "auto",
          boxShadow: "var(--shadow-sm)"
        }}>
          {navTabs.map((t) => {
            const IconComp = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  flex: "1 0 auto",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background: active ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
                  color: active ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  boxShadow: active ? "0 4px 14px rgba(16, 185, 129, 0.3)" : "none"
                }}
              >
                <IconComp size={18} color={active ? "#fff" : t.color} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: AI YIELD PREDICTOR */}
        {/* ======================================================== */}
        {activeTab === "predictor" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* INPUT FORM CARD */}
            <form onSubmit={handlePredict} className="card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
                <Sprout size={24} color="#10b981" />
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>Agronomic Prediction Parameters</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                    12-feature Random Forest inference engine
                  </p>
                </div>
              </div>

              {/* 1. Basic Crop Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Crop</label>
                  <select
                    value={formData.Crop}
                    onChange={(e) => setFormData({ ...formData, Crop: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Barley">Barley</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Region</label>
                  <select
                    value={formData.Region}
                    onChange={(e) => setFormData({ ...formData, Region: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="North">North Region</option>
                    <option value="South">South Region</option>
                    <option value="East">East Region</option>
                    <option value="West">West Region</option>
                  </select>
                </div>
              </div>

              {/* 2. Soil & Irrigation */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Type</label>
                  <select
                    value={formData.Soil_Type}
                    onChange={(e) => setFormData({ ...formData, Soil_Type: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="Loam">Loam</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Irrigation</label>
                  <select
                    value={formData.Irrigation}
                    onChange={(e) => setFormData({ ...formData, Irrigation: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="Drip">Drip</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Flood">Flood</option>
                    <option value="None">Rainfed (None)</option>
                  </select>
                </div>
              </div>

              {/* 3. Soil pH & Previous Crop */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil pH: {formData.Soil_pH}</label>
                  <input
                    type="range"
                    min="4.5"
                    max="8.5"
                    step="0.1"
                    value={formData.Soil_pH}
                    onChange={(e) => setFormData({ ...formData, Soil_pH: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "#10b981" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Previous Crop</label>
                  <select
                    value={formData.Previous_Crop}
                    onChange={(e) => setFormData({ ...formData, Previous_Crop: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="Legumes">Legumes</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              {/* 4. Weather Sliders */}
              <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    <span>Seasonal Rainfall</span>
                    <strong style={{ color: "#3b82f6" }}>{formData.Rainfall_mm} mm</strong>
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="1800"
                    step="20"
                    value={formData.Rainfall_mm}
                    onChange={(e) => setFormData({ ...formData, Rainfall_mm: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "#3b82f6" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    <span>Temperature</span>
                    <strong style={{ color: "#ef4444" }}>{formData.Temperature_C} °C</strong>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="42"
                    step="0.5"
                    value={formData.Temperature_C}
                    onChange={(e) => setFormData({ ...formData, Temperature_C: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "#ef4444" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    <span>Relative Humidity</span>
                    <strong style={{ color: "#10b981" }}>{formData.Humidity_pct}%</strong>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    step="1"
                    value={formData.Humidity_pct}
                    onChange={(e) => setFormData({ ...formData, Humidity_pct: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "#10b981" }}
                  />
                </div>
              </div>

              {/* 5. Inputs (Fertilizer, Pesticide, Density) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>Fertilizer (kg)</label>
                  <input
                    type="number"
                    value={formData.Fertilizer_Used_kg}
                    onChange={(e) => setFormData({ ...formData, Fertilizer_Used_kg: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>Pesticides (kg)</label>
                  <input
                    type="number"
                    value={formData.Pesticides_Used_kg}
                    onChange={(e) => setFormData({ ...formData, Pesticides_Used_kg: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>Density (/m²)</label>
                  <input
                    type="number"
                    value={formData.Planting_Density}
                    onChange={(e) => setFormData({ ...formData, Planting_Density: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 6px 18px rgba(16, 185, 129, 0.4)",
                  marginTop: "8px"
                }}
              >
                <Sparkles size={22} />
                {loading ? "Calculating AI Prediction..." : "Predict Crop Yield Tonnage"}
              </button>
            </form>

            {/* PREDICTION RESULTS DISPLAY */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {predictionResult ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* MAIN YIELD CARD */}
                  <div className="card" style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px"
                  }}>
                    <div>
                      <div style={{ fontSize: "0.85rem", opacity: 0.9, fontWeight: 700, letterSpacing: "0.5px" }}>
                        PREDICTED HARVEST YIELD
                      </div>
                      <div style={{ fontSize: "3.2rem", fontWeight: 800, margin: "6px 0 2px" }}>
                        {predictionResult.predicted_yield_ton_per_ha}
                        <span style={{ fontSize: "1.4rem", fontWeight: 600, marginLeft: "8px" }}>tons/ha</span>
                      </div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.95 }}>
                        Crop: <strong>{predictionResult.crop}</strong> • Region: <strong>{predictionResult.region}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                      <div>
                        <div style={{ fontSize: "0.85rem", opacity: 0.9, fontWeight: 700 }}>PRODUCTIVITY INDEX</div>
                        <div style={{ fontSize: "2.4rem", fontWeight: 800 }}>{predictionResult.productivity_score}/100</div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                        <span style={{
                          background: "rgba(255,255,255,0.22)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: 700
                        }}>
                          {predictionResult.productivity_score >= 80 ? "Optimal" : "Moderate"}
                        </span>
                        <span style={{
                          background: "#ffffff",
                          color: "#10b981",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                        }}>
                          ⚡ {predictionResult.confidence_score || predictionResult.confidence_pct || 95}% Confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI INSIGHTS CARD */}
                  {predictionResult.ai_insights && predictionResult.ai_insights.length > 0 && (
                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                        <Sparkles color="#3b82f6" size={22} />
                        <div>
                          <h4 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>
                            AI Agronomic Insights & Diagnostics
                          </h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                            Data-driven environmental and crop suitability analysis
                          </p>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
                        {predictionResult.ai_insights.map((ins, idx) => (
                          <div key={idx} style={{
                            background: "var(--bg-primary)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "14px",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                                {ins.category}
                              </span>
                              <span style={{
                                background: ins.status === "Optimal" || ins.status === "Positive" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                                color: ins.status === "Optimal" || ins.status === "Positive" ? "#10b981" : "#f59e0b",
                                padding: "2px 10px",
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                fontWeight: 700
                              }}>
                                {ins.status}
                              </span>
                            </div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                              {ins.title}
                            </div>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.45 }}>
                              {ins.insight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RECOMMENDATIONS CARD */}
                  <div className="card">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <Award color="#10b981" size={22} />
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                        AI Agronomic Actionable Recommendations
                      </h4>
                    </div>

                    <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
                      {predictionResult.recommendations?.map((rec, idx) => (
                        <li key={idx} style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RISK ALERT CARD */}
                  {predictionResult.productivity_score < 70 && (
                    <div className="card" style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start"
                    }}>
                      <AlertTriangle color="#ef4444" size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#ef4444", margin: "0 0 6px" }}>
                          Agronomic Stress Alert
                        </h4>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
                          The projected productivity score is below optimal thresholds. Consider running the <strong>AI Agronomic Advisor</strong> tab to optimize fertilizer NPK balance or adjust irrigation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card" style={{ textAlign: "center", padding: "80px 24px", color: "var(--text-muted)" }}>
                  <Sparkles size={56} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Ready for Yield Forecast
                  </h3>
                  <p style={{ fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto" }}>
                    Configure your soil, climate, and fertilizer parameters on the left and click <strong>Predict Crop Yield Tonnage</strong> to execute AI inference!
                  </p>
                </div>
              )}

              {/* RECENT AI YIELD PREDICTION HISTORY LOGS ON PREDICTOR TAB */}
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--border-color)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 800, margin: 0 }}>Recent AI Prediction History & Confidence Log</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                      Session prediction history with ensemble confidence scores and AI insights
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchUserActivity}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: "0.8rem"
                    }}
                  >
                    Refresh History
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                        <th style={{ padding: "10px 16px" }}>Crop</th>
                        <th style={{ padding: "10px 16px" }}>Region</th>
                        <th style={{ padding: "10px 16px" }}>Soil pH</th>
                        <th style={{ padding: "10px 16px" }}>Predicted Yield</th>
                        <th style={{ padding: "10px 16px" }}>AI Confidence</th>
                        <th style={{ padding: "10px 16px" }}>Productivity</th>
                        <th style={{ padding: "10px 16px" }}>AI Insights</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!activity?.recent_predictions || activity.recent_predictions.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: "28px", textAlign: "center", color: "var(--text-muted)" }}>
                            No AI yield predictions recorded yet in this session
                          </td>
                        </tr>
                      ) : (
                        activity.recent_predictions.map((p, idx) => (
                          <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: "10px 16px", fontWeight: 700, color: "#10b981" }}>{p.result.crop || "Wheat"}</td>
                            <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>{p.result.region || "North"}</td>
                            <td style={{ padding: "10px 16px" }}>{p.input?.Soil_pH || 6.5} pH</td>
                            <td style={{ padding: "10px 16px", fontWeight: 800, color: "#10b981" }}>
                              {p.result.predicted_yield_ton_per_ha} tons/ha
                            </td>
                            <td style={{ padding: "10px 16px" }}>
                              <span style={{
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10b981",
                                padding: "3px 10px",
                                borderRadius: "14px",
                                fontSize: "0.75rem",
                                fontWeight: 700
                              }}>
                                {p.result.confidence_score || p.result.confidence_pct || 95}%
                              </span>
                            </td>
                            <td style={{ padding: "10px 16px", fontWeight: 700 }}>{p.result.productivity_score} / 100</td>
                            <td style={{ padding: "10px 16px" }}>
                              <span style={{
                                background: "rgba(59, 130, 246, 0.15)",
                                color: "#3b82f6",
                                padding: "3px 10px",
                                borderRadius: "14px",
                                fontSize: "0.75rem",
                                fontWeight: 700
                              }}>
                                {p.result.ai_insights ? `${p.result.ai_insights.length} Insights` : "Random Forest AI"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: AI AGRONOMIC ADVISOR */}
        {/* ======================================================== */}
        {activeTab === "advisor" && (
          <AIAgronomicAdvisor token={token} />
        )}

        {/* ======================================================== */}
        {/* TAB 3: FARM PLOTS & LAND MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === "farms" && (
          <FarmManagement token={token} />
        )}

        {/* ======================================================== */}
        {/* TAB 4: WEATHER & CLIMATE CENTER */}
        {/* ======================================================== */}
        {activeTab === "weather" && (
          <WeatherAnalysis />
        )}

        {/* ======================================================== */}
        {/* TAB 5: SOIL HEALTH LAB */}
        {/* ======================================================== */}
        {activeTab === "soil" && (
          <SoilHealthLab token={token} />
        )}

        {/* ======================================================== */}
        {/* TAB 6: ANALYTICS & COMPARE */}
        {/* ======================================================== */}
        {activeTab === "analytics" && (
          <AnalyticsCompare token={token} />
        )}

        {/* ======================================================== */}
        {/* TAB 7: HARVEST HISTORY & ACTIVITY LOGS */}
        {/* ======================================================== */}
        {activeTab === "history" && (
          <HarvestHistory token={token} activity={activity} onRefreshActivity={fetchUserActivity} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
