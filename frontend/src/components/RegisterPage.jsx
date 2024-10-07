import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [level, setLevel] = useState('Fresher');
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, level })
        });
        const result = await response.json();
        if (result.status === 'Success') {
            alert(result.message);
            navigate('/');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            <p>Already registered? <Link to="/">Click here to login</Link></p> 
        </div>
    );
}

export default RegisterPage;
