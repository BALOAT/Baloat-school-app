import axios from "axios";
import { BASE_API } from "../../utils/utils";



// ! ----- Addcourse API ----- ! //
export const addCousreAPI = async (courseData) => {
    // console.log(courseData);
    const response = await axios.post(
        `${BASE_API}/courses/create`,
         courseData , {
            headers: {
                Authorization: `Bearer ${courseData.token}`,
            },
        }
    );
    // Return a promise
    return response.data;
};

// ! ----- fetch all course API ----- ! //
export const getAllCoursesAPI = async () => {

    const response = await axios.get(`${BASE_API}/courses/lists`);
    // Return a promise
    return response.data;
};

// ! ----- fetch single course API ----- ! //
export const getSingleCourseAPI = async (id) => {

    const response = await axios.get(`${BASE_API}/courses/${id}`);
    // Return a promise
    return response.data;
}

