import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to YieldSense AI</h1>
      <p>AI-Powered Crop Yield Prediction Platform</p>

      <Link to="/login">
        Login
      </Link>

      <br />

      <Link to="/register">
        Create Account
      </Link>
    </div>
  );
};

export default Landing;
