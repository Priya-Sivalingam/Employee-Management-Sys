// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (AuthService.isAdmin()) {
            try {
                const response = await axios.post('http://localhost:8080/employees', {
                    name, username, email, role
                }, {
                    headers: { Authorization: `Bearer ${AuthService.getToken()}` }
                });
                // Handle success (redirect, show success message, etc.)
            } catch (err) {
                setError('Failed to add employee');
            }
        } else {
            setError('You do not have permission to add employees');
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
