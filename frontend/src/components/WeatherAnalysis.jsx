import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloudRain, Thermometer, Droplets, AlertTriangle, Sparkles, RefreshCw, Sun } from "lucide-react";

function WeatherAnalysis() {
  const [region, setRegion] = useState("North");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  // Anomaly Calculator state
  const [impactInput, setImpactInput] = useState({
    crop: "Wheat",
    rainfall_mm: 800,
    temp_c: 25.0
  });
  const [impactResult, setImpactResult] = useState(null);

  const fetchWeather = async (r) => {
    setLoading(true);
    try {
      const [curRes, trendRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/weather/current?region=${r}`),
        axios.get(`http://localhost:8000/api/weather/trends?region=${r}`)
      ]);
      setCurrentWeather(curRes.data.weather);
      setTrends(trendRes.data.seasonal_trend || []);
    } catch (err) {
      console.error("Failed to load weather data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(region);
  }, [region]);

  const handleCalculateImpact = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8000/api/weather/impact?crop=${impactInput.crop}&rainfall_mm=${impactInput.rainfall_mm}&temp_c=${impactInput.temp_c}`
      );
      setImpactResult(res.data);
    } catch (err) {
      console.error("Error calculating weather impact", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header & Region Switcher */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Regional Weather & Climate Center</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
            Real-time agro-climatic profile, seasonal precipitation patterns, and weather impact modeling
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", background: "var(--bg-card)", padding: "6px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          {["North", "South", "East", "West"].map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: region === r ? "#3b82f6" : "transparent",
                color: region === r ? "#fff" : "var(--text-secondary)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {r} Region
            </button>
          ))}
        </div>
      </div>

      {/* Weather Profile Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px"
      }}>
        <div className="card" style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.05))",
          borderLeft: "4px solid #3b82f6"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(59, 130, 246, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3b82f6"
          }}>
            <Thermometer size={28} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
              AIR TEMPERATURE
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#3b82f6" }}>
              {currentWeather?.temperature_c || 25.0}°C
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Optimal Growth Range</div>
          </div>
        </div>

        <div className="card" style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.05))",
          borderLeft: "4px solid #10b981"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#10b981"
          }}>
            <CloudRain size={28} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
              SEASONAL RAINFALL
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981" }}>
              {currentWeather?.rainfall_mm || 800} mm
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Cumulative Annual</div>
          </div>
        </div>

        <div className="card" style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(147, 51, 234, 0.05))",
          borderLeft: "4px solid #a855f7"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(168, 85, 247, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a855f7"
          }}>
            <Droplets size={28} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
              RELATIVE HUMIDITY
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#a855f7" }}>
              {currentWeather?.humidity_pct || 65}%
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Agro-Climatic Status: {currentWeather?.status || "Standard"}</div>
          </div>
        </div>
      </div>

      {/* Seasonal Trend Comparison */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Seasonal Monthly Climate Patterns (May — September)</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Region: {region}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
          {trends.map((t, idx) => (
            <div key={idx} style={{
              background: "var(--bg-primary)",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid var(--border-color)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-secondary)", marginBottom: "8px" }}>
                {t.month}
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#3b82f6" }}>
                {t.rainfall_mm} mm
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                Avg Temp: {t.avg_temp_c}°C
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Anomaly Impact Calculator */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        <form onSubmit={handleCalculateImpact} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <AlertTriangle size={22} color="#f59e0b" />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Weather Anomaly Impact Calculator</h3>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>Crop</label>
            <select
              value={impactInput.crop}
              onChange={(e) => setImpactInput({ ...impactInput, crop: e.target.value })}
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
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                Rainfall: {impactInput.rainfall_mm} mm
              </label>
              <input
                type="range"
                min="200"
                max="1800"
                step="20"
                value={impactInput.rainfall_mm}
                onChange={(e) => setImpactInput({ ...impactInput, rainfall_mm: parseFloat(e.target.value) })}
                style={{ width: "100%", accentColor: "#3b82f6" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                Temperature: {impactInput.temp_c}°C
              </label>
              <input
                type="range"
                min="10"
                max="42"
                step="0.5"
                value={impactInput.temp_c}
                onChange={(e) => setImpactInput({ ...impactInput, temp_c: parseFloat(e.target.value) })}
                style={{ width: "100%", accentColor: "#ef4444" }}
              />
            </div>
          </div>

          <button
            type="submit"
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
              gap: "8px"
            }}
          >
            <Sparkles size={20} />
            Calculate Climate Stress Impact
          </button>
        </form>

        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          {impactResult ? (
            <div style={{ width: "100%", padding: "16px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "6px" }}>
                CLIMATE STRESS IMPACT SCORE
              </div>
              <div style={{
                fontSize: "3rem",
                fontWeight: 800,
                color: impactResult.impact_score >= 80 ? "#10b981" : (impactResult.impact_score >= 55 ? "#f59e0b" : "#ef4444")
              }}>
                {impactResult.impact_score} / 100
              </div>
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: "20px",
                background: impactResult.impact_score >= 80 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                color: impactResult.impact_score >= 80 ? "#10b981" : "#f59e0b",
                fontWeight: 700,
                marginTop: "8px"
              }}>
                {impactResult.status}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "16px" }}>
                Based on {impactResult.rainfall_mm} mm annual rainfall and {impactResult.temp_c}°C average air temperature for {impactResult.crop}.
              </p>
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)" }}>
              <Sun size={48} style={{ margin: "0 auto 12px", color: "var(--border-hover)" }} />
              <div style={{ fontWeight: 600 }}>Adjust parameters on the left and calculate anomaly impact.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherAnalysis;
