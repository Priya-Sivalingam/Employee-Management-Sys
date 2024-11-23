import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Home.css";
import Header from "../components/header";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Fetch employees and user role on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const userRole = localStorage.getItem("userRoles");

        // Set the role for the user
        setRole(userRole);

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
          navigate("/login");
        } else {
          setError("Failed to fetch employees.");
        }
      } catch (err) {
        setError("An error occurred while fetching employees.");
        console.error(err);
      }
    };

    fetchEmployees();
  }, [navigate]);

  // Handle viewing employee details
  const handleView = (id) => {
    navigate(`/employee/${id}`);
  };

  // Handle editing employee details
  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  // Handle deleting an employee
  const handleDelete = async (id) => {
    const userRole = JSON.parse(localStorage.getItem("userRoles")); // Parse roles if stored as an array

    // Restrict deletion for ROLE_USER
    if (userRole && userRole.includes("ROLE_USER")) {
      alert("Users with the 'ROLE_USER' role cannot delete employees.");
      return;
    }

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
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id)
          );
          console.log("Deleted employee with ID:", id);
        } else {
          console.error("Failed to delete employee:", response.status);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Handle adding a new employee
  const handleAddEmployee = () => {
    navigate("/employee/add");
  };

  return (
    <div className="employee-list-container">
      <Header />
      <h1>Employee List</h1>
      <h2>{role === "ROLE_ADMIN" ? "Welcome, Admin" : `Welcome, ${role || "User"}`}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-employee-container">
        <button onClick={handleAddEmployee} className="add-employee-btn">
          Add Employee
        </button>
      </div>
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
