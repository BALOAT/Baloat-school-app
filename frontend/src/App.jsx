import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Users/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "./redux/slices/authSlice";
import Register from "./components/Users/Register";
import HomePage from "./components/Home/HomePage";
// import PublicNavbar from "./components/Navbar/PublicNavbar";
// import StudentsNavbar from "./components/Navbar/StudentsNavbar";
 import InstructorNavbar from "./components/Navbar/instructorNavbar";



// const HomePage = () => <h1>Welcome</h1>;
export default function App() {
  // ! Dispatch redux
  const dispatch = useDispatch();


  useEffect(() => {
dispatch(loginAction(JSON.parse(localStorage.getItem("token"))));
  }, [dispatch]);
  return (
    <BrowserRouter>
    {/* Navbar here */}
    <PublicNavbar/>
    <StudentsNavbar/>
    <InstructorNavbar/>    
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}