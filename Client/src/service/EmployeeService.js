const fetchEmployees = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch("http://localhost:8080/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
      timeout: 10000,
    });

    if (response.ok) {
      const employees = await response.json();
      console.log("Employees:", employees);
    } else {
      console.error("Failed to fetch employees:", response.status);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

// View a single employee
const viewEmployee = async (id) => {
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
      const employee = await response.json();
      console.log("Employee details:", employee);
    } else {
      console.error("Failed to fetch employee details:", response.status);
    }
  } catch (error) {
    console.error("Error viewing employee:", error);
  }
};

// Update an employee
const updateEmployee = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`http://localhost:8080/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const updatedEmployee = await response.json();
      console.log("Employee updated:", updatedEmployee);
    } else {
      console.error("Failed to update employee:", response.status);
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};

// Delete an employee
const deleteEmployee = async (id) => {
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
      console.log("Employee deleted successfully");
    } else {
      console.error("Failed to delete employee:", response.status);
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

