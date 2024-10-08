import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function ExperiencedSurveyPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thank-you");
  };

  return (
    <div>
      <div className="survey-container">
        <h2>Survey for Experienced Professionals</h2>
        <form onSubmit={handleSubmit}>
          <p>Question 1: How has your experience shaped your skills?</p>
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

export default ExperiencedSurveyPage;
