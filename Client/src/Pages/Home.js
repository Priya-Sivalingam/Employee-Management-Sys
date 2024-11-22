import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; 
import "./Home.css"; 
import Header from "../components/header";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch("http://localhost:8080/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
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

    fetchEmployees();
  }, []);

  // Handle View Employee
  const handleView = (id) => {
    console.log("Viewing employee with ID:", id);
    navigate(`/employee/${id}`);
    // Navigate to a detailed view page or display a modal
    // Example: window.location.href = `/employee/${id}`;
  };

  // Handle Edit Employee
  const handleEdit = (id) => {
    console.log("Editing employee with ID:", id);
    navigate(`/employee/edit/${id}`);
    // Navigate to an edit page or toggle edit form
    // Example: window.location.href = `/employee/edit/${id}`;
  };

  // Handle Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch(`http://localhost:8080/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          setEmployees(employees.filter((employee) => employee.id !== id));
          console.log("Deleted employee with ID:", id);
        } else {
          console.error("Failed to delete employee:", response.status);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="employee-list-container">
      <Header />
      <h1>Employee List</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  {employee.roles.map((role, index) => (
                    <span key={role.id}>
                      {role.name}
                      {index < employee.roles.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => handleView(employee.id)}
                    className="action-btn view-btn"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="action-btn edit-btn"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="action-btn delete-btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
