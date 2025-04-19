import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Users/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slices/authSlice";
import Register from "./components/Users/Register";
import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import StudentsNavbar from "./components/Navbar/StudentsNavbar";
import InstructorNavbar from "./components/Navbar/instructorNavbar";
import AddCourse from "./components/instructors/AddCourse";
import Courses from "./components/Courses/Courses";
import InstructorPrivateProfile from "./components/instructors/InstructorPrivateProfile";
import InstructorCourseDetails from "./components/instructors/InstructorCourseDetails";

// const HomePage = () => <h1>Welcome</h1>;
export default function App() {
  // ! Dispatch redux
  const dispatch = useDispatch();
  // !UseSelector
  const userData = useSelector((state) => state.auth?.user);
  console.log(userData);
  useEffect(() => {
    dispatch(loginAction(JSON.parse(localStorage.getItem("userInfo"))));
  }, [dispatch]);
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {/* <PublicNavbar />
      <StudentsNavbar />
      <InstructorNavbar /> */}
      {userData?.role === "student" ? (
        <StudentsNavbar />
      ) : userData?.role === "instructor" ? (
        <InstructorNavbar />
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* instructor link */}
        <Route path="/instructor-add-course" element={<AddCourse />} />
        <Route path="/instructor-courses" element={< InstructorPrivateProfile/>} />
        <Route path="/instructor-courses/:coursId" element={< InstructorCourseDetails/>} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Public course */}
        <Route path="/courses" element={< Courses/>} />
      </Routes>
    </BrowserRouter>
  );
}
