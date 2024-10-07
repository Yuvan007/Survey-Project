import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [level, setLevel] = useState('Fresher');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, level })
        });
        const result = await response.json();
        if (result.status === 'Success') {
            navigate(`/${result.redirectTo}`);
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                </select>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default LoginPage;
