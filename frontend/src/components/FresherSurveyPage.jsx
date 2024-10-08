import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function FresherSurveyPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (if needed)
    navigate("/thank-you");
  };

  return (
    <div>
      <div className="survey-container">
        <h2>Survey for Freshers</h2>
        <form onSubmit={handleSubmit}>
          <p>Question 1: What are your expectations as a fresher?</p>
          <textarea required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <button
        className="btn back-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}

export default FresherSurveyPage;
