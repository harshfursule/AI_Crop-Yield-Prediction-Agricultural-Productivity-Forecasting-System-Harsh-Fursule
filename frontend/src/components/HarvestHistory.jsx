import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, History, Sprout, Award, RefreshCw, Layers } from "lucide-react";

function HarvestHistory({ token, activity, onRefreshActivity }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    farm_id: "FARM-01",
    Crop: "Wheat",
    Previous_Crop: "Legumes",
    Yield_ton_per_ha: 4.8,
    Planting_Density: 50,
    Fertilizer_Used_kg: 140,
    Pesticides_Used_kg: 12,
    season_year: 2025
  });

  const fetchHarvestHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/crops/history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("Error loading harvest history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHarvestHistory();
  }, []);

  const handleAddHarvest = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/crops/history", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchHarvestHistory();
    } catch (err) {
      console.error("Error adding harvest log", err);
    }
  };

  const handleDeleteHarvest = async (id) => {
    if (!window.confirm("Delete this historical harvest record?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/crops/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHarvestHistory();
    } catch (err) {
      console.error("Error deleting harvest log", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* 1. Harvest Log CRUD Section */}
      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px"
        }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Historical Harvest Yield & Cultivation Records</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "2px 0 0" }}>
              Permanent seasonal yield logs, fertilizer applications, and crop rotation history
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={fetchHarvestHistory}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
                fontSize: "0.85rem"
              }}
            >
              <RefreshCw size={14} />
              Refresh
            </button>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 700,
                fontSize: "0.85rem",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
              }}
            >
              <Plus size={16} />
              Log Seasonal Harvest
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 20px" }}>Season Year</th>
                <th style={{ padding: "12px 20px" }}>Crop</th>
                <th style={{ padding: "12px 20px" }}>Previous Crop</th>
                <th style={{ padding: "12px 20px" }}>Yield (ton/ha)</th>
                <th style={{ padding: "12px 20px" }}>Fertilizer (kg)</th>
                <th style={{ padding: "12px 20px" }}>Pesticides (kg)</th>
                <th style={{ padding: "12px 20px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                    No seasonal harvest logs recorded yet. Click <strong>Log Seasonal Harvest</strong> to save permanent yield records!
                  </td>
                </tr>
              ) : (
                history.map((h, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 700 }}>{h.season_year}</td>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "#10b981" }}>{h.Crop}</td>
                    <td style={{ padding: "12px 20px", color: "var(--text-secondary)" }}>{h.Previous_Crop}</td>
                    <td style={{ padding: "12px 20px", fontWeight: 800 }}>{h.Yield_ton_per_ha} ton/ha</td>
                    <td style={{ padding: "12px 20px" }}>{h.Fertilizer_Used_kg} kg</td>
                    <td style={{ padding: "12px 20px" }}>{h.Pesticides_Used_kg} kg</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>
                      <button
                        onClick={() => handleDeleteHarvest(h.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: "4px"
                        }}
                        title="Delete Harvest Log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. AI Prediction Log Section */}
      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Recent AI Yield Prediction Logs</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "2px 0 0" }}>
              ML inference executions run during this session
            </p>
          </div>
          <button
            onClick={onRefreshActivity}
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
            Refresh Predictions
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 20px" }}>Crop</th>
                <th style={{ padding: "12px 20px" }}>Region</th>
                <th style={{ padding: "12px 20px" }}>Soil pH</th>
                <th style={{ padding: "12px 20px" }}>Predicted Yield</th>
                <th style={{ padding: "12px 20px" }}>AI Confidence</th>
                <th style={{ padding: "12px 20px" }}>Productivity</th>
                <th style={{ padding: "12px 20px" }}>AI Insights</th>
              </tr>
            </thead>
            <tbody>
              {!activity?.recent_predictions || activity.recent_predictions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                    No AI yield predictions recorded yet in this session
                  </td>
                </tr>
              ) : (
                activity.recent_predictions.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "#10b981" }}>{p.result.crop || "Wheat"}</td>
                    <td style={{ padding: "12px 20px", color: "var(--text-secondary)" }}>{p.result.region || "North"}</td>
                    <td style={{ padding: "12px 20px" }}>{p.input?.Soil_pH || 6.5} pH</td>
                    <td style={{ padding: "12px 20px", fontWeight: 800, color: "#10b981" }}>
                      {p.result.predicted_yield_ton_per_ha} tons/ha
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#10b981",
                        padding: "4px 10px",
                        borderRadius: "14px",
                        fontSize: "0.8rem",
                        fontWeight: 700
                      }}>
                        {p.result.confidence_score || p.result.confidence_pct || 95}%
                      </span>
                    </td>
                    <td style={{ padding: "12px 20px", fontWeight: 700 }}>{p.result.productivity_score} / 100</td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{
                        background: "rgba(59, 130, 246, 0.15)",
                        color: "#3b82f6",
                        padding: "4px 10px",
                        borderRadius: "14px",
                        fontSize: "0.8rem",
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

      {/* MODAL TO ADD HARVEST LOG */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <form onSubmit={handleAddHarvest} className="card" style={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)"
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>Log Completed Seasonal Harvest</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Crop Harvested</label>
                <select
                  value={form.Crop}
                  onChange={(e) => setForm({ ...form, Crop: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Barley">Barley</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Season Year</label>
                <input
                  type="number"
                  value={form.season_year}
                  onChange={(e) => setForm({ ...form, season_year: parseInt(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Actual Yield (tons/ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.Yield_ton_per_ha}
                  onChange={(e) => setForm({ ...form, Yield_ton_per_ha: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Previous Crop</label>
                <select
                  value={form.Previous_Crop}
                  onChange={(e) => setForm({ ...form, Previous_Crop: e.target.value })}
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Fertilizer Used (kg)</label>
                <input
                  type="number"
                  value={form.Fertilizer_Used_kg}
                  onChange={(e) => setForm({ ...form, Fertilizer_Used_kg: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Pesticides Used (kg)</label>
                <input
                  type="number"
                  value={form.Pesticides_Used_kg}
                  onChange={(e) => setForm({ ...form, Pesticides_Used_kg: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#10b981",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Save Harvest Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HarvestHistory;
