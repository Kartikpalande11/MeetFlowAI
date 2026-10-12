const API_URL = "http://localhost:8081/api/auth";


export const registerUser = async (user) => {

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        }
    );

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return await response.text();
};


export const loginUser = async (loginData) => {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        }
    );

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return await response.json();
};