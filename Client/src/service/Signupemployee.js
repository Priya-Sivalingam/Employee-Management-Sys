import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/signup'; // Adjust base URL if needed

// Function to register a new user
const registerUser = async (username, password, role) => {
    try {
        const userData = {
            username: username,
            password: password,
            role: [role]  // Role should be passed as an array
        };

        const response = await axios.post(API_URL, userData);
        return response.data; // Return success message
    } catch (error) {
        if (error.response) {
            // Return error message from the backend
            return error.response.data;
        } else {
            return { message: 'An error occurred while processing your request.' };
        }
    }
};

export default {
    registerUser,
};
