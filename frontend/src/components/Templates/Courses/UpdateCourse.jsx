import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../Alert/AlertMessage";
import { registerAPI } from "../../../reactQuery/user/usersAPI";
import {
  addCourseAPI,
  getSingleCourseAPI,
  updateCourseAPI,
} from "../../../reactQuery/courses/coursesAPI";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  duration: Yup.string().required("Duration is required"),
});

const UpdateCourse = () => {
  const navigate = useNavigate();
  //get the course id from params
  const { courseId } = useParams();
  //get single course
  const { data: courseDetails, error } = useQuery({
    queryKey: ["course"],
    queryFn: () => getSingleCourseAPI(courseId),
  });
  console.log("courseDetails", courseDetails);
  //mutation
  const mutation = useMutation({ mutationFn: updateCourseAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      title: courseDetails?.title || "",
      description: courseDetails?.description || "",
      difficulty: courseDetails?.difficulty || "",
      duration: courseDetails?.duration || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const courseData = {
        ...values,
        courseId,
      };

      mutation
        .mutateAsync(courseData)
        .then((data) => {
          console.log("data", data);
          // navigate("/login");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  return (
    <div className="flex flex-wrap pb-24">
      <div className="w-full  p-4">
        <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
          <h1 className="text-4xl font-bold mb-4">Update Course</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* show message */}
            {mutation.isPending && (
              <AlertMessage type="loading" message="Loading..." />
            )}
            {/* show error */}
            {mutation.isError && (
              <AlertMessage
                type="error"
                message={
                  mutation?.error?.response?.data?.message ||
                  mutation?.error?.message
                }
              />
            )}
            {/* show success */}
            {mutation.isSuccess && (
              <AlertMessage
                type="success"
                message="Course updated successfully"
              />
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Title
            </label>
            <input
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              type="text"
              placeholder="Enter title"
              {...formik.getFieldProps("title")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {/* error */}
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 mt-1">{formik.errors.title}</div>
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Description
            </label>
            <input
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              type="text"
              placeholder="Enter description"
              {...formik.getFieldProps("description")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {/* error */}
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 mt-1">
                {formik.errors.description}
              </div>
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <select
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              id="difficulty"
              {...formik.getFieldProps("difficulty")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.difficulty}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {/* error */}
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="text-red-500 mt-1">
                {formik.errors.difficulty}
              </div>
            )}
            {/* duration */}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              type="string"
              placeholder="Enter duration"
              {...formik.getFieldProps("duration")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
            />
            <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
              type="submit"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
