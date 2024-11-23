import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:8080/api/auth';

// Function to register a new user
const registerUser = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            username,
            password,
            role: [role], // Role should be an array
        });
        return { success: true, message: response.data.message };
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred, please try again.' };
        }
    }
};

export default { registerUser };
