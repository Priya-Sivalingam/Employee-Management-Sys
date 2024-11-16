import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../service/AuthService';
import Header from '../components/header';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getEmployees();
    }, []);

    return (
        <div>
           <Header />
            <h1>Employee Table</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employees.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                    <button>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default EmployeeTable;
