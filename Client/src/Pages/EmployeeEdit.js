import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeEdit = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  
  // Set default state values for the employee object
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    position: "",
    roles: [],
  });
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch employee details on component mount or when 'id' changes
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting the form

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: token
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee updated successfully!");
        navigate("/"); // Redirect to employee list after update
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      alert("Error updating employee: " + error.message);
    } finally {
      setLoading(false); // Set loading state to false after form submission
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Employee</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={employee.position}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Roles:</label>
          <input
              type="text"
              value={Array.isArray(employee.roles) ? employee.roles.map(role => role.name).join(", ") : ""}
              onChange={(e) =>
                  setEmployee({
                      ...employee,
                      roles: e.target.value.split(",").map(name => ({ id: null, name: name.trim() }))
                  })
              }
          />
      </div>

        <button type="submit" disabled={loading}>Save</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
