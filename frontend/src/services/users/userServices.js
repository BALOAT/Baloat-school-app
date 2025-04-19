import axios from "axios";
import { BASE_API } from "../../utils/utils";


// //=======Get user profile=====
// export const getUserProfileAPI = async (courseId) => {
//     const response = await axios.get(
//       `${BASE_URL}/users/profile?courseId=${courseId}`,
//       {
//         withCredentials: true,
//       }
//     );
//     return response?.data;
//   };
  //--priavte profile
  export const privateProfileAPI = async () => {
    const response = await axios.get(`${BASE_API}/users/private-profile`, {
        withCredentials: true,
    });
    return response?.data;
  };

// ! ------- Login user from backend ---

export const loginAPI = async (userData) => {
    const response = await axios.post(`${BASE_API}/users/login`,
        {
            email: userData?.email,
            password: userData?.password
        }
    );
    // Return a promise
    return response.data;
};


// ! ------- Register user from backend ---

export const registerAPI = async (userData) => {
    const response = await axios.post(`${BASE_API}/users/register`,
        {
            email: userData?.email,
            password: userData?.password,
            username: userData?.username
        }
    );
    // Return a promise
    return response.data;
};

// // ! ----- Private user
// export const privateProfileAPI = async () => {
//     const response = await axios.get(`${BASE_URL}/courses`, {
    
//     });
//     return response?.data;
//   };