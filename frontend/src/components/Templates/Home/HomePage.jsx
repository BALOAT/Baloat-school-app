import React from "react";
import {
  FaLaptopCode,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

const Homepage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center p-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to the Learning Platform
        </h1>
        <p className="text-xl mb-6">
          Empower your skills with our comprehensive courses
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-bold">
          Explore Courses
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl text-center font-bold mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <FaLaptopCode className="text-blue-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Latest Technologies</h3>
            <p>
              Learn with the latest tools and technologies in the field of web
              development.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <FaUserGraduate className="text-green-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
            <p>
              Guidance from industry professionals with real-world experience.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <FaChalkboardTeacher className="text-red-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
            <p>
              Engaging and interactive lessons to enhance your learning
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100 text-center py-12">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Learning Journey Today
        </h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold">
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Homepage;