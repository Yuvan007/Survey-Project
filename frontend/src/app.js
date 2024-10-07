import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FresherSurveyPage from './components/FresherSurveyPage';
import ExperiencedSurveyPage from './components/ExperiencedSurveyPage';
import ThankYouPage from './components/ThankYouPage';  // Import ThankYouPage
import './components/style.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/fresher-survey" element={<FresherSurveyPage />} />
                    <Route path="/experienced-survey" element={<ExperiencedSurveyPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />  
                </Routes>
            </div>
        </Router>
    );
}

export default App;
