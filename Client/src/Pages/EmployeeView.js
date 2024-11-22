import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EmployeeView.css';

const EmployeeView = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch(`http://localhost:8080/employees/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
          setLoading(false);
        } else if (response.status === 401) {
          setError("Unauthorized. Please login again.");
          localStorage.removeItem("jwtToken");
          window.location.href = "/login";
        } else {
          setError("Failed to fetch employees.");
        }
      } catch (err) {
        setError("An error occurred while fetching employees.");
        console.error(err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      {employee ? (
        <div>
          <p><span>ID:</span> {employee.id}</p>
          <p><span>Name:</span> {employee.name}</p>
          <p><span>Department:</span> {employee.department}</p>
          <p><span>Position:</span> {employee.position}</p>
          <p><span>Roles:</span> {employee.roles.map(role => role.name) ? employee.roles.map(role => role.name).join(", ") : "No roles assigned"}</p>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default EmployeeView;
