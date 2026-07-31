import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, CheckCircle2, Sparkles, RefreshCw, Layers } from "lucide-react";

function SoilHealthLab({ token }) {
  const [soilType, setSoilType] = useState("Loam");
  const [ph, setPh] = useState(6.5);
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [testLogs, setTestLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    farm_id: "FARM-01",
    Soil_Type: "Loam",
    Soil_pH: 6.5,
    Fertilizer_Used_kg: 140,
    test_date: new Date().toISOString().split("T")[0]
  });

  const fetchSoilAnalysis = async () => {
    try {
      const [anRes, recRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/soil/analysis?soil_type=${soilType}&ph=${ph}`),
        axios.get(`http://localhost:8000/api/soil/recommendations?soil_type=${soilType}&ph=${ph}`)
      ]);
      setAnalysis(anRes.data);
      setRecommendations(recRes.data.recommendations || []);
    } catch (err) {
      console.error("Error fetching soil analysis", err);
    }
  };

  const fetchTestLogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/soil/tests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestLogs(res.data.tests || []);
    } catch (err) {
      console.error("Error fetching soil tests", err);
    }
  };

  useEffect(() => {
    fetchSoilAnalysis();
  }, [soilType, ph]);

  useEffect(() => {
    fetchTestLogs();
  }, []);

  const handleAddTestLog = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/soil/tests", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchTestLogs();
    } catch (err) {
      console.error("Error logging soil test", err);
    }
  };

  const handleDeleteTestLog = async (id) => {
    if (!window.confirm("Delete this soil test record?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/soil/tests/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestLogs();
    } catch (err) {
      console.error("Error deleting soil test", err);
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
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Soil Health Lab & Fertility Analyzer</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
            Evaluate soil pH balance, nutrient retention capacity, amendment prescriptions, and soil test logs
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
          }}
        >
          <Plus size={18} />
          Log Soil Test Report
        </button>
      </div>

      {/* Interactive Soil Analyzer */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <Layers size={22} color="#10b981" />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Soil Profile Settings</h3>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Texture Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
            >
              <option value="Loam">Loam (Optimal Fertility)</option>
              <option value="Clay">Clay (High Retention / Drainage Needs)</option>
              <option value="Sandy">Sandy (Fast Drainage / Needs Compost)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              Soil pH Level: {ph} ({analysis?.ph_status || "Optimal"})
            </label>
            <input
              type="range"
              min="4.5"
              max="8.5"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#10b981" }}
            />
          </div>

          <div style={{
            background: "var(--bg-primary)",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "4px" }}>
              Amendments Required:
            </div>
            <div style={{ fontSize: "0.9rem", color: "#10b981", fontWeight: 700 }}>
              {analysis?.amendments_required || "None (Optimal pH)"}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.08))",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "16px"
          }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                SOIL FERTILITY INDEX
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>
                {analysis?.fertility_index || 88} / 100
              </div>
            </div>

            <span style={{
              background: "#10b981",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700
            }}>
              {analysis?.ph_status || "Optimal"}
            </span>
          </div>

          <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "10px" }}>
            Agronomic Soil Amendment Advice
          </h4>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Soil Test Logs Table */}
      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Recorded Soil Test Log Reports</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{testLogs.length} Records</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 20px" }}>Test Date</th>
                <th style={{ padding: "12px 20px" }}>Farm ID</th>
                <th style={{ padding: "12px 20px" }}>Soil Type</th>
                <th style={{ padding: "12px 20px" }}>Soil pH</th>
                <th style={{ padding: "12px 20px" }}>Fertilizer (kg)</th>
                <th style={{ padding: "12px 20px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                    No soil test reports recorded yet. Click <strong>Log Soil Test Report</strong> above to record your first sample!
                  </td>
                </tr>
              ) : (
                testLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 600 }}>{log.test_date}</td>
                    <td style={{ padding: "12px 20px", color: "var(--text-secondary)" }}>{log.farm_id}</td>
                    <td style={{ padding: "12px 20px" }}>{log.Soil_Type}</td>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "#10b981" }}>{log.Soil_pH} pH</td>
                    <td style={{ padding: "12px 20px" }}>{log.Fertilizer_Used_kg} kg</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>
                      <button
                        onClick={() => handleDeleteTestLog(log.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: "4px"
                        }}
                        title="Delete Soil Test Log"
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

      {/* LOG SOIL TEST MODAL */}
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
          <form onSubmit={handleAddTestLog} className="card" style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)"
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>Log New Soil Test Report</h3>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Farm / Plot ID</label>
              <input
                type="text"
                required
                value={form.farm_id}
                onChange={(e) => setForm({ ...form, farm_id: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Type</label>
                <select
                  value={form.Soil_Type}
                  onChange={(e) => setForm({ ...form, Soil_Type: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Loam">Loam</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil pH</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.Soil_pH}
                  onChange={(e) => setForm({ ...form, Soil_pH: parseFloat(e.target.value) })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
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
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Test Date</label>
                <input
                  type="date"
                  value={form.test_date}
                  onChange={(e) => setForm({ ...form, test_date: e.target.value })}
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
                Save Test Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SoilHealthLab;
