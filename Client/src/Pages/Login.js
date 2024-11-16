import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/AuthService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('Username', username);
            navigate('/home');
        } catch (error) {
            setError('Invalid credentials');
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
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input"
                    />
                    <button type="submit" className="button">Login</button>
                    {error && <p className="error-text">{error}</p>}
                </form>
                
            </div>
        </div>
    );
}

export default Login;