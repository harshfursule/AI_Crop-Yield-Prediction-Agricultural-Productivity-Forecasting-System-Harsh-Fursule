import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Sprout, MapPin, Droplets, Layers, RefreshCw } from "lucide-react";

function FarmManagement({ token }) {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "Green Valley Farm",
    Region: "North",
    Soil_Type: "Loam",
    Irrigation: "Drip",
    Soil_pH: 6.5,
    area_ha: 15.0
  });

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/farms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarms(res.data.farms || []);
    } catch (err) {
      console.error("Failed to load farms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleCreateFarm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/farms", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchFarms();
    } catch (err) {
      console.error("Error creating farm", err);
    }
  };

  const handleDeleteFarm = async (id) => {
    if (!window.confirm("Delete this farm plot profile?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/farms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFarms();
    } catch (err) {
      console.error("Error deleting farm", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Registered Farm Plots</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
            Manage agricultural plots, soil profiles, and regional irrigation methods
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={fetchFarms}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 600
            }}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

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
            Register New Farm Plot
          </button>
        </div>
      </div>

      {/* Farms Grid */}
      {farms.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)" }}>
          <Sprout size={48} style={{ margin: "0 auto 16px", color: "var(--border-hover)" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "8px" }}>
            No Farm Plots Registered Yet
          </h3>
          <p style={{ fontSize: "0.9rem", marginBottom: "20px" }}>
            Create your first farm plot profile to track soil health, irrigation schedules, and regional climate records.
          </p>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              background: "#10b981",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            + Register Farm Plot
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px"
        }}>
          {farms.map((f, idx) => (
            <div key={idx} className="card" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "5px solid #10b981",
              gap: "16px"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>{f.name}</h3>
                  <button
                    onClick={() => handleDeleteFarm(f.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    title="Delete Farm Plot"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <span style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <MapPin size={12} /> {f.Region} Region
                  </span>

                  <span style={{
                    background: "rgba(59, 130, 246, 0.15)",
                    color: "#3b82f6",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <Droplets size={12} /> {f.Irrigation}
                  </span>

                  <span style={{
                    background: "rgba(245, 158, 11, 0.15)",
                    color: "#f59e0b",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <Layers size={12} /> {f.Soil_Type}
                  </span>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  background: "var(--bg-primary)",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "0.85rem"
                }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>SOIL PH</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginTop: "2px" }}>{f.Soil_pH} pH</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>PLOT AREA</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginTop: "2px" }}>{f.area_ha} ha</div>
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>ID: {f.id?.slice(0, 8)}...</span>
                <span>Active Cultivation Plot</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE FARM MODAL */}
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
          <form onSubmit={handleCreateFarm} className="card" style={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)"
          }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>Register New Farm Plot</h3>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Farm / Plot Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Region</label>
                <select
                  value={form.Region}
                  onChange={(e) => setForm({ ...form, Region: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="North">North Region</option>
                  <option value="South">South Region</option>
                  <option value="East">East Region</option>
                  <option value="West">West Region</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Soil Texture</label>
                <select
                  value={form.Soil_Type}
                  onChange={(e) => setForm({ ...form, Soil_Type: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Loam">Loam Soil</option>
                  <option value="Clay">Clay Soil</option>
                  <option value="Sandy">Sandy Soil</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Irrigation</label>
                <select
                  value={form.Irrigation}
                  onChange={(e) => setForm({ ...form, Irrigation: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                >
                  <option value="Drip">Drip</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood">Flood</option>
                  <option value="None">Rainfed</option>
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

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Area (ha)</label>
                <input
                  type="number"
                  step="0.5"
                  value={form.area_ha}
                  onChange={(e) => setForm({ ...form, area_ha: parseFloat(e.target.value) })}
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
                Save Farm Plot
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FarmManagement;
