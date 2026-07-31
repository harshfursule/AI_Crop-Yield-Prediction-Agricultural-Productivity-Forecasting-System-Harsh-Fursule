import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart3, TrendingUp, Award, Layers, RefreshCw, FileText, CheckCircle2 } from "lucide-react";

function AnalyticsCompare({ token }) {
  const [trends, setTrends] = useState([]);
  const [crop1, setCrop1] = useState("Wheat");
  const [crop2, setCrop2] = useState("Rice");
  const [comparison, setComparison] = useState(null);
  const [exportMsg, setExportMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/analytics/seasonal-trends", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrends(res.data.trends || []);
    } catch (err) {
      console.error("Error fetching seasonal trends", err);
    }
  };

  const fetchComparison = async (c1, c2) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/analytics/compare?crop1=${c1}&crop2=${c2}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComparison(res.data.comparison || null);
    } catch (err) {
      console.error("Error fetching comparison", err);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  useEffect(() => {
    fetchComparison(crop1, crop2);
  }, [crop1, crop2]);

  const handleExportReport = async () => {
    setLoading(true);
    setExportMsg(null);
    try {
      const res = await axios.get("http://localhost:8000/api/reports/export/PREDICTION-1001", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExportMsg(res.data);
    } catch (err) {
      console.error("Error exporting report", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Seasonal Analytics & Crop Comparison</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
            Multi-season yield trends, efficiency benchmarks, and side-by-side agronomic crop comparisons
          </p>
        </div>

        <button
          onClick={handleExportReport}
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
          }}
        >
          <FileText size={18} />
          {loading ? "Generating..." : "Export Analytics Report"}
        </button>
      </div>

      {exportMsg && (
        <div style={{
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          padding: "16px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 color="#10b981" size={22} />
            <div>
              <div style={{ fontWeight: 700, color: "#10b981" }}>{exportMsg.title} Generated Successfully!</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Report ID: {exportMsg.report_id} • Format: {exportMsg.format}
              </div>
            </div>
          </div>
          <button
            onClick={() => setExportMsg(null)}
            style={{
              background: "transparent",
              border: "1px solid var(--border-color)",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem"
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Multi-Season Productivity Trend Cards */}
      <div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "12px" }}>
          Multi-Season Farm Productivity Trends (2023 — 2025)
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}>
          {trends.map((t, idx) => (
            <div key={idx} className="card" style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              borderTop: "4px solid #10b981"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>SEASON</span>
                <span style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}>
                  +{t.efficiency - 80}% Gain
                </span>
              </div>

              <div style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                Season {t.season}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>AVERAGE YIELD</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#10b981" }}>
                    {t.avg_yield_ton_per_ha} <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>ton/ha</span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>EFFICIENCY</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{t.efficiency}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Crop Comparison Tool */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Side-by-Side Crop Suitability & Input Comparison</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
              Compare expected yields, irrigation water requirements, and soil fertility demands
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={crop1}
              onChange={(e) => setCrop1(e.target.value)}
              style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontWeight: 700 }}
            >
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Barley">Barley</option>
            </select>

            <span style={{ fontWeight: 800, color: "var(--text-muted)" }}>VS</span>

            <select
              value={crop2}
              onChange={(e) => setCrop2(e.target.value)}
              style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontWeight: 700 }}
            >
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Barley">Barley</option>
            </select>
          </div>
        </div>

        {comparison ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            {/* Crop 1 Card */}
            <div style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02))",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "16px",
              padding: "24px"
            }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                PRIMARY CROP PROFILE
              </div>
              <h4 style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", margin: "4px 0 16px" }}>
                {crop1}
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Expected Yield</span>
                  <strong style={{ color: "#10b981" }}>{comparison[crop1]?.avg_yield_ton_per_ha} tons/ha</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Water Requirement</span>
                  <strong>{comparison[crop1]?.water_requirement_mm} mm / season</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Fertility Demand</span>
                  <strong>{comparison[crop1]?.fertility_demand}</strong>
                </div>
              </div>
            </div>

            {/* Crop 2 Card */}
            <div style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02))",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "16px",
              padding: "24px"
            }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                COMPARISON CROP PROFILE
              </div>
              <h4 style={{ fontSize: "2rem", fontWeight: 800, color: "#3b82f6", margin: "4px 0 16px" }}>
                {crop2}
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Expected Yield</span>
                  <strong style={{ color: "#3b82f6" }}>{comparison[crop2]?.avg_yield_ton_per_ha} tons/ha</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Water Requirement</span>
                  <strong>{comparison[crop2]?.water_requirement_mm} mm / season</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Fertility Demand</span>
                  <strong>{comparison[crop2]?.fertility_demand}</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            Loading comparison metrics...
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsCompare;
