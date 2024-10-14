import { Link, useNavigate } from "react-router-dom";
import '../style/AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>
        <Link to="/create-survey">Create Survey</Link>
        <br />
        <Link to="/view-responses">View Responses</Link>
        <button
        className="back-btn"
        onClick={() => {
          navigate("/admin-login");
        }}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      </div>
      
    </div>
  );
}

export default AdminDashboard;
