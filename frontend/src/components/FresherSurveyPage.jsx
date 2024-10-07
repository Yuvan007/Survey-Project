import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function FresherSurveyPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (if needed)
        navigate('/thank-you');
    };

    return (
        <div className="survey-container">
            <h2>Survey for Freshers</h2>
            <form onSubmit={handleSubmit}>
                {/* Add your survey questions here */}
                <p>Question 1: What are your expectations as a fresher?</p>
                <textarea required></textarea>
                
                {/* Continue with more questions as needed */}
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FresherSurveyPage;
