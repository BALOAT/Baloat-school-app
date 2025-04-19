import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaLayerGroup,
  FaBookOpen,
  FaUser,
  FaUsers,
  FaStar,
  FaEdit,
  FaTrash,
  FaListUl,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaPlay,
  FaPlus,
  FaTrophy,
  FaChartLine,
  FaBookReader,
  FaPlusCircle,
} from "react-icons/fa";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  deleteCourseAPI,
  getSingleCourseAPI,
} from "../../../reactQuery/courses/coursesAPI";
import AlertMessage from "../../Alert/AlertMessage";

const AdminCourseDetails = ({ course }) => {
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

  return (
    <>
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
            {/* Instructor and course details */}
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
                {/* Total students */}
                <p className="flex items-center">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>{courseData?.students?.length} Students</span>
                </p>
                {/* Total sections */}
                <p className="flex items-center">
                  <FaLayerGroup className="text-blue-500 mr-2" />
                  <span>{courseData?.sections?.length} Sections</span>
                </p>
                {/* Difficulty level */}
                <p className="flex items-center">
                  <span className="font-medium text-blue-500">
                    {courseData?.difficulty}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Alert messages */}
        <div className="container mx-auto p-4">
          {mutation.isPending && (
            <AlertMessage type="loading" message="Deleting course..." />
          )}
          {mutation.isError && (
            <AlertMessage
              type="error"
              message={
                mutation?.error?.response?.data?.message ||
                mutation?.error?.message
              }
            />
          )}
          {mutation.isSuccess && (
            <AlertMessage
              type="success"
              message="Course deleted successfully"
            />
          )}
        </div>
        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            to={`/students-position/${courseId}`}
          >
            <FaTrophy className="mr-2" /> Students Ranking
          </Link>

          <Link
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            to={`/instructor-add-course-sections/${courseId}`}
          >
            <FaPlusCircle className="mr-2" /> Add Course Section
          </Link>

          <Link
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            to={`/instructor-update-course/${courseId}`}
          >
            <FaEdit className="mr-2" /> Update Course
          </Link>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleDelete}
          >
            <FaTrash className="mr-2" /> Delete Course
          </button>

          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            to={`/instructor-course-sections/${courseId}`}
          >
            <FaListUl className="mr-2" /> View Course Sections
          </Link>
        </div>
      </div>

      {/* Course sections */}
      {/* {courseData?.sections?.length > 0 ? (
        <div className="container mx-auto mt-4 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Sections</h2>
          <div className="space-y-4">
            {courseData?.sections?.map((section) => (
              <div
                key={section._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
              >
                <p className="text-xl font-semibold text-gray-800">
                  {section.sectionName}
                </p>
                <div className="space-x-2">
                  <Link to={`/update-course-section/${section._id}`}>
                    <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200">
                      <FiEdit2 />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(section._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-200"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-2xl font-bold mb-2">No sections found</h2>
        </div>
      )} */}
    </>
  );
};

export default AdminCourseDetails;
