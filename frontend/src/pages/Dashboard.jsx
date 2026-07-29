import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07110b",
        color: "white",
        padding: "50px",
      }}
    >
      <h1>🌱 YieldSense AI</h1>

      <h2>
        Welcome, {userName || "Farmer"} 👋
      </h2>

      <p>
        AI-Powered Crop Yield Prediction Platform
      </p>

      <button
        onClick={() => alert("Prediction feature coming soon")}
      >
        🌾 Predict Crop Yield
      </button>

      <button
        onClick={handleLogout}
        style={{ marginLeft: "15px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
