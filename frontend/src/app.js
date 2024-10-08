import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FresherSurveyPage from "./components/FresherSurveyPage";
import ExperiencedSurveyPage from "./components/ExperiencedSurveyPage";
import ThankYouPage from "./components/ThankYouPage";
import AdminLoginPage from "./components/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard";
import CreateSurveyPage from "./components/CreateSurveyPage";
import ViewResponsesPage from "./components/ViewResponsesPage";
import "./components/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/fresher-survey" element={<FresherSurveyPage />} />
          <Route path="/experienced-survey" element={<ExperiencedSurveyPage />}/>
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-survey" element={<CreateSurveyPage />} />
          <Route path="/view-responses" element={<ViewResponsesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
