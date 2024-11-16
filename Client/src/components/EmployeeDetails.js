// src/components/EmployeeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/AuthService';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/employees/${id}`, {
                    headers: { Authorization: `Bearer ${AuthService.getToken()}` }
                });
                setEmployee(response.data);
            } catch (err) {
                setError('Failed to fetch employee');
            }
        };

        fetchEmployee();
    }, [id]);

    return (
        <div>
            {error && <div>{error}</div>}
            {employee ? (
                <div>
                    <h2>{employee.name}</h2>
                    <p>Username: {employee.username}</p>
                    <p>Email: {employee.email}</p>
                    <p>Role: {employee.role}</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default EmployeeDetails;
