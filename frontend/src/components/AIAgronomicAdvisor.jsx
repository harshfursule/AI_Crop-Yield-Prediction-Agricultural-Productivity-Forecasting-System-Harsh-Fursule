import React, { useState } from "react";
import axios from "axios";
import {
  Sparkles, Sprout, TrendingUp, AlertTriangle, CheckCircle2,
  Thermometer, CloudRain, ShieldAlert, Award, ArrowRight, RefreshCw
} from "lucide-react";

function AIAgronomicAdvisor({ token }) {
  const [activeSection, setActiveSection] = useState("crop"); // 'crop' | 'chemical' | 'risk'
  const [loading, setLoading] = useState(false);

  // 1. Crop Recommender State
  const [cropInput, setCropInput] = useState({
    Region: "North",
    Soil_Type: "Loam",
    Soil_pH: 6.5,
    Rainfall_mm: 850,
    Temperature_C: 24,
    Previous_Crop: "Legumes"
  });
  const [cropResult, setCropResult] = useState(null);

  // 2. Chemical Input Optimizer State
  const [chemInput, setChemInput] = useState({
    Crop: "Wheat",
    Soil_Type: "Loam",
    Soil_pH: 6.5,
    target_yield_ton_per_ha: 4.5
  });
  const [chemResult, setChemResult] = useState(null);

  // 3. Environmental Risk Assessment State
  const [riskInput, setRiskInput] = useState({
    Crop: "Wheat",
    Soil_Type: "Loam",
    Soil_pH: 6.5,
    Rainfall_mm: 850,
    Temperature_C: 24,
    Humidity_pct: 65,
    Irrigation: "Drip"
  });
  const [riskResult, setRiskResult] = useState(null);

  const handleRecommendCrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/recommend/crop", cropInput, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCropResult(res.data);
    } catch (err) {
      console.error("Crop recommendation error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeChemicals = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/recommend/fertilizer-pesticide", chemInput, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChemResult(res.data);
    } catch (err) {
      console.error("Chemical optimization error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssessRisks = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/risk-assessment", riskInput, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRiskResult(res.data);
    } catch (err) {
      console.error("Risk assessment error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Sub-Navigation for AI Advisor */}
      <div style={{
        display: "flex",
        gap: "12px",
        background: "var(--bg-card)",
        padding: "8px",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => setActiveSection("crop")}
          style={{
            flex: "1 1 200px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: activeSection === "crop" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
            color: activeSection === "crop" ? "#fff" : "var(--text-secondary)",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <Sprout size={18} />
          Optimal Crop Recommender
        </button>

        <button
          onClick={() => setActiveSection("chemical")}
          style={{
            flex: "1 1 200px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: activeSection === "chemical" ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "transparent",
            color: activeSection === "chemical" ? "#fff" : "var(--text-secondary)",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <Sparkles size={18} />
          Fertilizer & Pesticide Optimizer
        </button>

        <button
          onClick={() => setActiveSection("risk")}
          style={{
            flex: "1 1 200px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: activeSection === "risk" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "transparent",
            color: activeSection === "risk" ? "#fff" : "var(--text-secondary)",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <ShieldAlert size={18} />
          Environmental Risk Assessment
        </button>
      </div>

      {/* SECTION 1: CROP RECOMMENDER */}
      {activeSection === "crop" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <form onSubmit={handleRecommendCrop} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <Sprout size={22} color="#10b981" />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Regional Soil & Climate Profile</h3>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Geographic Region</label>
              <select
                value={cropInput.Region}
                onChange={(e) => setCropInput({ ...cropInput, Region: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option value="North">North Region</option>
                <option value="South">South Region</option>
                <option value="East">East Region</option>
                <option value="West">West Region</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Texture</label>
                <select
                  value={cropInput.Soil_Type}
                  onChange={(e) => setCropInput({ ...cropInput, Soil_Type: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Loam">Loam Soil</option>
                  <option value="Clay">Clay Soil</option>
                  <option value="Sandy">Sandy Soil</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil pH: {cropInput.Soil_pH}</label>
                <input
                  type="range"
                  min="4.5"
                  max="8.5"
                  step="0.1"
                  value={cropInput.Soil_pH}
                  onChange={(e) => setCropInput({ ...cropInput, Soil_pH: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#10b981" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Rainfall (mm)</label>
                <input
                  type="number"
                  value={cropInput.Rainfall_mm}
                  onChange={(e) => setCropInput({ ...cropInput, Rainfall_mm: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Temp (°C)</label>
                <input
                  type="number"
                  value={cropInput.Temperature_C}
                  onChange={(e) => setCropInput({ ...cropInput, Temperature_C: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Previous Season Crop</label>
              <select
                value={cropInput.Previous_Crop}
                onChange={(e) => setCropInput({ ...cropInput, Previous_Crop: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option value="Legumes">Legumes (Nitrogen Fixing)</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="None">None / Fallow</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                marginTop: "8px"
              }}
            >
              <Sparkles size={20} />
              {loading ? "Analyzing Agronomic Suitability..." : "Run AI Crop Recommender"}
            </button>
          </form>

          {/* Result Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {cropResult ? (
              <div>
                <div style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))",
                  padding: "24px",
                  borderRadius: "18px",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "4px" }}>
                    AI RECOMMENDED CROP TO PLANT
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                    <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#10b981", margin: 0 }}>
                      {cropResult.top_recommendation}
                    </h2>
                    <span style={{
                      background: "#10b981",
                      color: "#fff",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 700
                    }}>
                      Top Choice
                    </span>
                  </div>
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}>
                  Ranked Agronomic Suitability Comparison
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cropResult.ranked_crops?.map((item, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "var(--bg-primary)",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)"
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{item.crop}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          Expected: {item.expected_yield_ton_per_ha} ton/ha • {item.rotation_benefit}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 800, fontSize: "1.1rem", color: idx === 0 ? "#10b981" : "var(--text-primary)" }}>
                          {item.suitability_score}%
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Suitability</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)" }}>
                <Sprout size={48} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                  No Crop Recommendation Generated
                </h3>
                <p style={{ fontSize: "0.875rem" }}>
                  Configure your soil and regional climate inputs on the left to see AI crop ranking and expected yield projections.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: CHEMICAL OPTIMIZER */}
      {activeSection === "chemical" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <form onSubmit={handleOptimizeChemicals} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <Sparkles size={22} color="#3b82f6" />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Target Yield & Chemical Inputs</h3>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Target Crop</label>
              <select
                value={chemInput.Crop}
                onChange={(e) => setChemInput({ ...chemInput, Crop: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Barley">Barley</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Texture</label>
                <select
                  value={chemInput.Soil_Type}
                  onChange={(e) => setChemInput({ ...chemInput, Soil_Type: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Loam">Loam</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil pH: {chemInput.Soil_pH}</label>
                <input
                  type="range"
                  min="4.5"
                  max="8.5"
                  step="0.1"
                  value={chemInput.Soil_pH}
                  onChange={(e) => setChemInput({ ...chemInput, Soil_pH: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#3b82f6" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                Target Seasonal Yield Goal: {chemInput.target_yield_ton_per_ha} tons/ha
              </label>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.1"
                value={chemInput.target_yield_ton_per_ha}
                onChange={(e) => setChemInput({ ...chemInput, target_yield_ton_per_ha: parseFloat(e.target.value) })}
                style={{ width: "100%", accentColor: "#3b82f6" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                marginTop: "8px"
              }}
            >
              <Sparkles size={20} />
              {loading ? "Optimizing Input Dosage..." : "Calculate Optimal Fertilizer & Pesticides"}
            </button>
          </form>

          {/* Chemical Results */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {chemResult ? (
              <div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    padding: "20px",
                    borderRadius: "16px",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                      OPTIMAL FERTILIZER
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "#3b82f6", marginTop: "4px" }}>
                      {chemResult.optimal_fertilizer_kg} kg/ha
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Targeting {chemResult.target_yield_ton_per_ha} tons/ha</div>
                  </div>

                  <div style={{
                    background: "rgba(168, 85, 247, 0.1)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    padding: "20px",
                    borderRadius: "16px",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                      OPTIMAL PESTICIDE
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "#a855f7", marginTop: "4px" }}>
                      {chemResult.optimal_pesticides_kg} kg/ha
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Integrated Pest Mgmt</div>
                  </div>
                </div>

                <div style={{
                  background: "var(--bg-primary)",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "4px" }}>
                    Efficiency Rating: {chemResult.efficiency_rating}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    Balanced dosage prevents nutrient runoff and soil acidity degradation.
                  </div>
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}>
                  Recommended 3-Stage Split Application Schedule
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {chemResult.split_schedule?.map((step, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background: "var(--bg-primary)",
                      borderRadius: "10px",
                      border: "1px solid var(--border-color)"
                    }}>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{step.stage}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3b82f6" }}>
                        {step.fertilizer_pct}% Fert • {step.pesticide_pct}% Pest
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)" }}>
                <Sparkles size={48} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                  No Chemical Prescription Calculated
                </h3>
                <p style={{ fontSize: "0.875rem" }}>
                  Adjust target yield tonnage and soil pH on the left to generate an optimal fertilizer & pesticide application schedule.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: ENVIRONMENTAL RISK ASSESSMENT */}
      {activeSection === "risk" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <form onSubmit={handleAssessRisks} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
              <ShieldAlert size={22} color="#f59e0b" />
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Environmental & Stress Factors</h3>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Crop in Plot</label>
              <select
                value={riskInput.Crop}
                onChange={(e) => setRiskInput({ ...riskInput, Crop: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Barley">Barley</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil pH: {riskInput.Soil_pH}</label>
                <input
                  type="range"
                  min="4.5"
                  max="8.5"
                  step="0.1"
                  value={riskInput.Soil_pH}
                  onChange={(e) => setRiskInput({ ...riskInput, Soil_pH: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#f59e0b" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Irrigation Method</label>
                <select
                  value={riskInput.Irrigation}
                  onChange={(e) => setRiskInput({ ...riskInput, Irrigation: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler System</option>
                  <option value="Flood">Flood / Gravity</option>
                  <option value="None">Rainfed (None)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Rain (mm)</label>
                <input
                  type="number"
                  value={riskInput.Rainfall_mm}
                  onChange={(e) => setRiskInput({ ...riskInput, Rainfall_mm: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Temp (°C)</label>
                <input
                  type="number"
                  value={riskInput.Temperature_C}
                  onChange={(e) => setRiskInput({ ...riskInput, Temperature_C: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Humid (%)</label>
                <input
                  type="number"
                  value={riskInput.Humidity_pct}
                  onChange={(e) => setRiskInput({ ...riskInput, Humidity_pct: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.35)",
                marginTop: "8px"
              }}
            >
              <ShieldAlert size={20} />
              {loading ? "Evaluating Agronomic Risks..." : "Run AI Risk Assessment"}
            </button>
          </form>

          {/* Risk Results */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {riskResult ? (
              <div>
                <div style={{
                  background: riskResult.status_label === "OPTIMAL" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  border: `1px solid ${riskResult.status_label === "OPTIMAL" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                  padding: "24px",
                  borderRadius: "18px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                      AGRONOMIC HEALTH INDEX SCORE
                    </div>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, color: riskResult.status_label === "OPTIMAL" ? "#10b981" : "#ef4444" }}>
                      {riskResult.overall_health_index} / 100
                    </div>
                  </div>
                  <span style={{
                    background: riskResult.status_label === "OPTIMAL" ? "#10b981" : "#ef4444",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 700
                  }}>
                    {riskResult.status_label}
                  </span>
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}>
                  Environmental Stress Breakdown
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  {Object.entries(riskResult.risk_breakdown || {}).map(([key, val], idx) => (
                    <div key={idx} style={{
                      padding: "12px",
                      background: "var(--bg-primary)",
                      borderRadius: "10px",
                      border: "1px solid var(--border-color)"
                    }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 600 }}>
                        {key.replace(/_/g, " ")}
                      </div>
                      <div style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: val === "HIGH" ? "#ef4444" : (val === "MODERATE" ? "#f59e0b" : "#10b981"),
                        marginTop: "4px"
                      }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "10px" }}>
                  Actionable Mitigation Strategy
                </h4>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {riskResult.mitigation_actions?.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)" }}>
                <ShieldAlert size={48} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                  No Risk Assessment Completed
                </h3>
                <p style={{ fontSize: "0.875rem" }}>
                  Input your environmental and soil parameters on the left to detect drought, waterlogging, and acidity risks.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAgronomicAdvisor;
