import React, { useState } from 'react';
import { registerUser } from '../service/AuthService'; // Import the registerUser function directly
import './signup.css'; // Add relevant styles

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const result = await registerUser(username, password, role);
            if (result.success) {
                setMessage(`🎉 ${result.message}`);
            } else {
                setMessage(`❌ ${result.message || 'Registration failed. Please try again.'}`);
            }
        } catch (error) {
            setMessage('❌ An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <div className="signup__container">
                <h2 className="signup__title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="signup__form">
                    <div className="signup__form-group">
                        <label htmlFor="username" className="signup__label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="signup__input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            aria-label="Username"
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="password" className="signup__label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="signup__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            placeholder="Enter a secure password"
                            aria-label="Password"
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="role" className="signup__label">Role</label>
                        <select
                            id="role"
                            className="signup__select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            aria-label="Role"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`signup__button ${loading ? 'signup__button--loading' : ''}`}
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>
                {message && (
                    <p
                        className={`signup__message ${
                            message.startsWith('🎉') ? 'signup__message--success' : 'signup__message--error'
                        }`}
                        role="alert"
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Signup;
