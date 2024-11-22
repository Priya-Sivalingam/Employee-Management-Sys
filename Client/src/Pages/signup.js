import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');  // Default role is 'user'
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const userData = {
            username: username,
            password: password,
            role: [role]  // The role should be sent as an array
        };

        try {
            const response = await axios.post('/api/auth/signup', userData);
            setMessage(response.data.message); // Display the success message
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setMessage(error.response.data.message); // Display error message from the server
            } else {
                setMessage('An error occurred, please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"  // Password must be at least 6 characters
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="mod">Moderator</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Signup;
