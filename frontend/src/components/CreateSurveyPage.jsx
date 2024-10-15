import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateSurveyPage.css";

function CreateSurveyPage() {
  const [level, setLevel] = useState("Fresher"); 
  const [questions, setQuestions] = useState([""]); // List of questions
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send survey to server
    const response = await fetch("http://localhost:3000/admin/create-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, questions }), 
    });
    const result = await response.json();
    if (result.status === "Success") {
      alert("Survey created successfully");
    } else {
      alert("Error creating survey");
    }
  };

  const addQuestion = () => setQuestions([...questions, ""]); // Add new question
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value; // Update question
    setQuestions(newQuestions);
  };

  return (
    <div>
      <div className="form-container">
        <h2>Create Survey</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>

          {questions.map((q, idx) => (
            <input
              key={idx}
              type="text"
              value={q}
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              placeholder={`Question ${idx + 1}`}
              required
            />
          ))}

          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          <button type="submit">Create Survey</button>
        </form>
      </div>
      <button
        className="back-btn"
        onClick={() => {
          navigate("/admin-dashboard");
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}

export default CreateSurveyPage;
