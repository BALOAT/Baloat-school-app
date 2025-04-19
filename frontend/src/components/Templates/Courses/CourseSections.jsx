import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaLayerGroup,
  FaStar,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaPlay,
  FaPlus,
  FaTrophy,
  FaChartLine,
  FaBookReader,
  FaPlusCircle,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  deleteCourseAPI,
  getSingleCourseAPI,
} from "../../../reactQuery/courses/coursesAPI";
import AlertMessage from "../../Alert/AlertMessage";

const CourseSections = () => {
  //get the course id from params
  const { courseId } = useParams();

  //navigate hook
  const navigate = useNavigate();

  //query to fetch single course
  const {
    data: courseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getSingleCourseAPI(courseId),
  });
  //delete course mutation
  const mutation = useMutation({ mutationFn: deleteCourseAPI });
  //handle delete
  const handleDelete = () => {
    mutation
      .mutateAsync(courseId)
      .then((data) => {
        console.log("data", data);
        navigate("/admin-courses");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  console.log("courseData", courseData);
  return (
    <div className="container mx-auto p-4">
      {/* show message */}
      {mutation.isPending && (
        <AlertMessage type="loading" message="Deleting course..." />
      )}
      {/* show error */}
      {mutation.isError && (
        <AlertMessage
          type="error"
          message={
            mutation?.error?.response?.data?.message || mutation?.error?.message
          }
        />
      )}
      {/* show success */}
      {mutation.isSuccess && (
        <AlertMessage type="success" message="Course deleted successfully" />
      )}

      <div className="container mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-6xl font-black text-gray-900 mb-8">
          {courseData?.title}
        </h1>
        <p className="text-gray-800 text-lg mb-8">{courseData?.description}</p>

        <div className="mb-10">
          <h2 className="text-4xl font-semibold text-gray-900 mb-5">
            Instructor & Course Info
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* instructor and course details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Instructor
              </h3>
              <div className="flex items-center text-gray-800">
                <FaUser className="text-blue-500 mr-3 text-xl" />
                <span className="text-lg">{courseData?.user?.username}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Stats
              </h3>
              <div className="space-y-3">
                {/* total students */}
                <p className="flex items-center">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>{courseData?.students?.length} Students</span>
                </p>
                {/* total sections */}
                <p className="flex items-center">
                  <FaLayerGroup className="text-blue-500 mr-2" />
                  <span>{courseData?.sections?.length} Sections</span>
                </p>
                {/* difficulty level */}
                <p className="flex items-center">
                  <span className="font-medium text-blue-500">
                    {courseData?.difficulty}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* check if it has sections */}
      {courseData?.sections?.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Course Sections ({courseData?.sections?.length})
          </h2>
          <div className="divide-y divide-gray-200">
            {courseData?.sections?.map((section) => (
              <div
                key={section._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {section.sectionName}
                </h3>
                <div className="flex items-center space-x-2">
                  <Link to={`/update-course-section/${section._id}`}>
                    <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200">
                      <FiEdit2 className="text-lg" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(section._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-200"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-900">
            No Sections Found
          </h2>
          <p className="text-gray-600 mt-2">
            There are no sections added to this course yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSections;
