import axios from "axios";

// ! ------- Login user from backend ---

export const loginAPI = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/v1/users/login",
        {
            email: userData?.email,
            password: userData?.password
        }
    );
    // Return a promise
    return response.data;
};


// ! ------- Login user from backend ---

export const registerAPI = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/v1/users/register",
        {
            email: userData?.email,
            password: userData?.password,
            username: userData?.username
        }
    );
    // Return a promise
    return response.data;
}