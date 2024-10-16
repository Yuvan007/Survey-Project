import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/ViewResponsesPage.css';

function ViewResponsesPage() {
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResponses() {
      const response = await fetch("http://localhost:3000/admin/view-responses");
      const result = await response.json();

      if (result.status === "Success") {
        let groupedResponses = {};
        for (let r of result.data) {
          if (!groupedResponses[r.level]) {
            groupedResponses[r.level] = [];
          }
          groupedResponses[r.level].push(r);
        }
        setResponses(groupedResponses);
      } else {
        alert("Error fetching responses");
      }
    }
    fetchResponses();
  }, []);

  return (
    <div className="response-container">
      <h2>View Responses</h2>
      {Object.keys(responses).length > 0 ? (
        <div>
          {Object.keys(responses).map((level) => (
            <div key={level} className="level-section">
              <h3>{level} Level Responses</h3>
              <ul>
                {responses[level].map((r, index) => (
                  <li key={index}>
                    <strong>Question:</strong> <span>{r.question}</span><br />
                    <strong>Answer:</strong> <span>{r.answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No responses found</p>
      )}
      <button
        className="back-btn"
        onClick={() => navigate("/admin-dashboard")}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}

export default ViewResponsesPage;
