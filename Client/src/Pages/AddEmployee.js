import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    position: "",
    roles: [],
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Predefined roles with IDs
  const predefinedRoles = [
    { id: 1, name: "ROLE_USER" },
    { id: 3, name: "ROLE_ADMIN" },
  ];

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedRoles = selectedOptions.map((option) => ({
      id: parseInt(option.value),
      name: option.text,
    }));
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      roles: selectedRoles,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        console.log("Employee added successfully!");
        navigate("/home");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add employee.");
      }
    } catch (err) {
      setError("An error occurred while adding the employee.");
      console.error(err);
    }
  };

  return (
    <div className="add-employee-container">
      <h1>Add New Employee</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-employee-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roles">Roles:</label>
          <select
            id="roles"
            name="roles"
            multiple
            onChange={handleRoleChange}
            required
          >
            {predefinedRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <small>Hold Ctrl (or Cmd) to select multiple roles.</small>
        </div>
        <button type="submit" className="submit-btn">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
