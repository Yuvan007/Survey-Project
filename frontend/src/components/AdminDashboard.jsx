import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>
        <button
          className="nav-button"
          onClick={() => navigate("/create-survey")}
        >
          Create Survey
        </button>
        <span></span>
        <button
          className="nav-button"
          onClick={() => navigate("/view-responses")}
        >
          View Responses
        </button>
        <button
          className="back-btn"
          onClick={() => {
            navigate("/admin-login");
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
