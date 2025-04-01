import React from "react";
// import { Fimail, Filock } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import {data, Link} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../services/users/userServices";
import { loginAction } from "../../redux/slices/authSlice";
import AlertMessage from "../Alert/AlertMessage";



// ! Validation Schema
const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
  // ! Dispatch redux
    const dispatch = useDispatch();
        //! Mutation logic
        const mutation = useMutation({
            mutationFn: loginAPI,
            mutationKey:["login"],
        })
    //! Handle form using formik
    const formik = useFormik({
        initialValues:{
            email: "balogunat@gmail.com",
            password: "12345",
        },
        validationSchema,
        onSubmit: (values)=>{
            // Make http request
            // console.log(values);
            mutation.mutateAsync(values).then((data)=>{
              console.log(data);
            // ! Save the user into local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
          // ! Dispatch the login to redux store
          dispatch(loginAction(data));
          }
              ).catch((e)=>console.log(e));
            },
    });
    // console.log(formik);
// console.log(mutation);

    return (
        <div className="flex flex-wrap">
          <div className="w-full  p-4">
            <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
              <form onSubmit={formik.handleSubmit}>
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4 ">
                    Sign In
                    </h1>
                    {/* {mutation.isPending && <p>Login plese wait....</p>}
                    {mutation.isSuccess && <p>Login success</p>}
                    {mutation.isError && <p>{mutation?.error?.respnse?.data?.message || "Invalid email or password"} </p>} */}
                
                {/* display error */}
               {mutation.isError && (
                  <AlertMessage
                    type="error"
                    message={mutation.error.response?.data?.message || "Invalid email or password"}
                  />
                )} 
    
                {/* display success */}
                {mutation.isSuccess && (
                  <AlertMessage
                    type="success"
                    message="Login success you will be redirected soon..."
                  />
                )} 

                  {/* display pending or redirect */}
                  {mutation.isPending && (
                  <AlertMessage
                    type="success"
                    message="Loading please wait..."
                  />
                )} 

                <Link
                  to="/register"
                  className="inline-block text-gray-500 hover: transition duration-200 mb-8"
                >
                  <span>New to Baloat Blog? </span>
                  <span />
                  <span className="font-bold font-heading">Create new account</span>
                </Link>
                {/* Email */}
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-1"
                  placeholder="baloat@gmail.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 mb-4 mt-1">
                    {formik.errors.email}
                  </div>
                )}
                {/* Pssword */}
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="flex items-center gap-1 w-full rounded-full p-4 border border-gray-100 shadow mb-3">
                  <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps("password")}
                    className="outline-none flex-1 placeholder-gray-500 "
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                      fill="#A3A3A3"
                    />
                    <path
                      d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 mt-1">{formik.errors.password}</div>
                )}
                <div className="mb-8 flex justify-end">
                  <Link
                    to={"/forgot-password"}
                    className="inline-block text-orange-500 hover:text-orange-600 transition duration-200 text-sm font-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-blue-800 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Login