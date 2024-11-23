import axios from "axios";

export async function loginUser(username, password) {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/signin", {
      username,
      password,
    });

    const { token, type, id, roles } = response.data;

    if (!token) {
      return { success: false, message: "No token received from the server" };
    }

    // Store token in localStorage
    localStorage.setItem("jwtToken", `${type} ${token}`);
    localStorage.setItem("userRoles", JSON.stringify(roles));

    console.log("Login successful!");
    console.log(`Token: ${token}`);
    console.log(`User ID: ${id}`);
    console.log(`Roles: ${roles.join(", ")}`);

    return { success: true, token, type, id, roles };

  } catch (error) {
    console.error("Login error: ", error);
    
    // Return failure status and error message
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
}
// Function to register a user
export async function registerUser(username, password, role) {
  try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
          username,
          password,
          role,
      });

      return {
          success: true,
          message: response.data.message || "User registered successfully!",
      };
  } catch (error) {
      return {
          success: false,
          message: error.response?.data?.message || "Registration failed.",
      };
  }
}