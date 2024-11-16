// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const user = AuthService.getCurrentUser();
    const isAdmin = AuthService.isAdmin();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8080/employees', {
                    headers: { Authorization: `Bearer ${AuthService.getToken()}` }
                });
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees');
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (isAdmin) {
            try {
                await axios.delete(`http://localhost:8080/employees/delete/${id}`, {
                    headers: { Authorization: `Bearer ${AuthService.getToken()}` }
                });
                setEmployees(employees.filter(emp => emp.id !== id));
            } catch (err) {
                setError('Failed to delete employee');
            }
        }
    };

    return (
        <div>
            <h2>Employees</h2>
            {error && <div>{error}</div>}
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} ({employee.username})
                        {isAdmin && (
                            <>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
