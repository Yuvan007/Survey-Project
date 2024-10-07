import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function ThankYouPage() {
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="thankyou-container">
      <h2>Thank you for submitting the survey!</h2>
      <button onClick={goBackToHome}>Back to Home</button>
    </div>
  );
}

export default ThankYouPage;
