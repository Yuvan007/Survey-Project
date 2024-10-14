import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/ExperiencedSurveyPage.css'

function ExperiencedSurveyPage() {
  const [questions, setQuestions] = useState([]); // To store the fetched survey questions
  const [answers, setAnswers] = useState([]); // To store user answers
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions for experienced users from the backend
    async function fetchQuestions() {
      const response = await fetch(
        "http://localhost:3000/survey/experienced-questions"
      );
      const result = await response.json();
      if (result.status === "Success") {
        setQuestions(result.data); // Set the fetched questions
        setAnswers(Array(result.data.length).fill("")); // Initialize answers array
      } else {
        alert("Error fetching survey questions");
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value; // Update the answer for the question at 'index'
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send user answers to the backend
    const response = await fetch(
      "http://localhost:3000/survey/submit-answers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "Experienced", answers }),
      }
    );
    const result = await response.json();
    if (result.status === "Success") {
      navigate("/thank-you"); // Redirect to thank you page after submission
    } else {
      alert("Error submitting answers");
    }
  };

  return (
    <div>
      <div className="survey-container">
        <h2>Survey for Experienced Professionals</h2>
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
      <button
        className="btn back-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}

export default ExperiencedSurveyPage;
