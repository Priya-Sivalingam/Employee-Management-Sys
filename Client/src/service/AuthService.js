// Function to log in the user and retrieve a JWT token
export const loginUser = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();

        // Ensure the server response includes the token
        const jwtToken = data.jwtToken;
        if (!jwtToken) {
            throw new Error('No token received from the server');
        }

        // Store the token in localStorage for future API calls
        localStorage.setItem('token', jwtToken);

        return data; // Return the full response data if needed elsewhere
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

// Function to fetch employees using the stored JWT token
export const fetchEmployees = async () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await fetch('http://localhost:8080/api/employees', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid or expired token.');
            }
            throw new Error('Failed to fetch employees.');
        }

        // Parse and return the response data
        return await response.json();
    } catch (error) {
        console.error('Fetch employees error:', error.message);
        throw error;
    }
};
