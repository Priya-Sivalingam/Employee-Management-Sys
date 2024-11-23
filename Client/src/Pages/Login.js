import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/AuthService';
import "./Login.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const response = await loginUser(username, password);

        if (response.success) {
            navigate('/home');
        } else {
            setError(response.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="input"
                        autoComplete="username"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input"
                        autoComplete="current-password"
                    />
                    <button type="submit" className="button">Login</button>
                    {error && <p className="error-text">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
