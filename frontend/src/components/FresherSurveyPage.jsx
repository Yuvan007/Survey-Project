import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/FresherSurveyPage.css";

function FresherSurveyPage() {
  const [questions, setQuestions] = useState([]); // Store questions
  const [answers, setAnswers] = useState([]); // Store answers
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(
        "http://localhost:3000/survey/fresher-questions"
      );
      const result = await response.json();
      if (result.status === "Success") {
        setQuestions(result.data);
        setAnswers(Array(result.data.length).fill("")); // Initialize answers
      } else {
        alert("Error fetching questions");
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value; // Update answer
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/survey/submit-answers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "Fresher", answers }),
      }
    );
    const result = await response.json();
    if (result.status === "Success") {
      navigate("/thank-you"); // Redirect after submission
    } else {
      alert("Error submitting answers");
    }
  };

  return (
    <div>
      <div className="survey-container">
      <h2>Survey for Freshers</h2>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? (
          questions.map((question, idx) => (
            <div key={idx}>
              <p>
                Question {idx + 1}: {question}
              </p>
              <textarea
                value={answers[idx]}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                required
              ></textarea>
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
        <button type="submit">Submit</button>
      </form>
      </div>
      <button className="btn back-btn" onClick={() => navigate("/")}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}

export default FresherSurveyPage;
