import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaLayerGroup,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { privateProfileAPI } from "../../services/users/userServices";
import { useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";



const InstructorPrivateProfile = () => {
  const userData =useSelector((state) => state.auth);
  const token = userData?.user?.token;
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => privateProfileAPI(token),
  });

  // show loading
  if (isLoading) {
    return <AlertMessage type="loading"
    message="Loading courses..." />
  }
 if (isError) {
  return(
    <AlertMessage 
    type="error"
    message={error?.response?.data?.message || error?.message}
    />
  );
 }

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h2 className="text-6xl font-extrabold mb-12 text-center text-gray-800">
        Explore Our Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Check if user has courses */}
        {data?.courses?.length <= 0 && <h2>No Cours Found</h2>}
        {data?.courses?.map((course) => (
          <Link
            key={course._id}
            to={`/instructor-courses/${course._id}`}
            className="no-underline transform hover:scale-105 transition duration-300"
          >
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="p-8">
                <div className="text-center">
                  <FaBookOpen className="mx-auto text-blue-500 text-7xl mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">
                    {course?.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{course.description}</p>
                </div>
                <div className="text-sm space-y-4">
                  {/* instructor */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUser className="text-blue-500" />
                      <span>{course?.user?.username}</span>
                    </span>
                    <span className="text-blue-600 font-medium">
                      {course?.difficulty}
                    </span>
                  </div>
                  {/* total students */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUsers className="text-blue-500" />
                      <span>{course?.students?.length} Students</span>
                    </span>
                    <span className="text-blue-600 font-medium">
                      {new Date(course?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* total sections */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaLayerGroup className="text-blue-500" />
                      <span>{course?.sections?.length} Sections</span>
                    </span>
                    <span className="text-green-600 font-bold cursor-pointer hover:text-green-700 transition-colors duration-300">
                      View More
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstructorPrivateProfile;
