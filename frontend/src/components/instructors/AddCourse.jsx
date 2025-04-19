import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addCousreAPI } from "../../services/courses/courseServices";
import AlertMessage from "../Alert/AlertMessage";
import { useSelector } from "react-redux";


// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  duration: Yup.number().required("Duration is required"),
});

const AddCourse = () => {
// use selector to get the user data
const userData = useSelector((state) => state?.auth?.user);  
// console.log(userData?.token);
const token = userData?.token;
//mutation
  const mutation = useMutation({ mutationFn: addCousreAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      difficulty: "",
      duration: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const courseData = {
      ...values,
      token,  
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
    <div className="flex flex-wrap pb-2">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center py-2 max-w-md mx-auto h-full bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add Course
            </h1>
          </div>
          <p className="text-gray-700 mb-6 text-center">
            Add a new course that you want your students to keep track of their
            progress.
          </p>
          <form onSubmit={formik.handleSubmit} className="p-6">
            {/* Alert messages */}
            {mutation.isPending && (
              <AlertMessage type="loading" message="Loading..." />
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
                message="Account created successfully"
              />
            )}

            {/* Title input */}
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="textInput1"
            >
              Title
            </label>
            <input
              className="w-full rounded-lg p-3 outline-none border border-gray-300 shadow-sm placeholder-gray-500 focus:ring focus:ring-orange-300 transition duration-200 mb-4"
              type="text"
              placeholder="Enter title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}

            {/* Description input */}
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="textInput2"
            >
              Description
            </label>
            <textarea
              className="w-full rounded-lg p-3 outline-none border border-gray-300 shadow-sm placeholder-gray-500 focus:ring focus:ring-orange-300 transition duration-200 mb-4"
              placeholder="Enter description"
              {...formik.getFieldProps("description")}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}

            {/* Difficulty select */}
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <select
              className="w-full rounded-lg p-3 outline-none border border-gray-300 shadow-sm placeholder-gray-500 focus:ring focus:ring-orange-300 transition duration-200 mb-4"
              id="difficulty"
              {...formik.getFieldProps("difficulty")}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.difficulty}
              </div>
            )}

            {/* Duration input */}
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              className="w-full rounded-lg p-3 outline-none border border-gray-300 shadow-sm placeholder-gray-500 focus:ring focus:ring-orange-300 transition duration-200 mb-4"
              type="number"
              placeholder="Enter duration"
              {...formik.getFieldProps("duration")}
            />
            {formik.touched.duration && formik.errors.duration && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.duration}
              </div>
            )}

            {/* Submit button */}
            <button
              className="h-12 w-full flex items-center justify-center py-2 px-4 text-white font-semibold rounded-lg bg-indigo-500 border border-indigo-600 shadow hover:bg-indigo-400 focus:ring focus:ring-orange-300 transition duration-200"
              type="submit"
            >
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
