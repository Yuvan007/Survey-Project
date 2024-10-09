import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewResponsesPage() {
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResponses() {
      // Fetch user responses from the server
      const response = await fetch(
        "http://localhost:3000/admin/view-responses"
      );
      const result = await response.json();
      if (result.status === "Success") {
        setResponses(result.data); // Set responses data
      } else {
        alert("Error fetching responses");
      }
    }
    fetchResponses();
  }, []);

  return (
    <div>
      <div className="response-container">
        <h2>View Responses</h2>
        {responses.length > 0 ? (
          <ul>
           
            {responses.map((r, index) => (
              <li key={index}>
                <strong>Level: </strong> {r.level} <br />
                <strong>Question: </strong> {r.question} <br />
                <strong>Answer: </strong> {r.answer}
              </li>
            ))}
          </ul>
        ) : (
          <p>No responses found</p>
        )}
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

export default ViewResponsesPage;
