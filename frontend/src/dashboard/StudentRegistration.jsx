// this is my StudentRegistration.jsx
import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // Import axios to make HTTP requests
// import StudentDashboard from "./student"; // Student Dashboard component
import Login2 from "../home/components/Login2"
import { Link, useNavigate } from "react-router-dom";

function StudentRegistration() {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    username: "",
    password: "",
    confirmPassword: "",
    Grade: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const navigate = useNavigate(); // For navigating to different routes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send form data to backend (replace with your backend URL)
      const response = await axios.post("http://localhost:5000/api/students/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        username: formData.username,
        password: formData.password,
        Grade: formData.Grade,
      });
      

      // Handle the response (e.g., display success message)
      if (response.status === 201) {
        setRegistered(true);
        // setTimeout(() => {
        //   navigate("/student-dashboard"); // Redirect to Student Dashboard after successful registration
        // }, 2000); // Delay for 2 seconds to allow user to see the success message
      }
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

  if (registered) {
    return <Login2 />; // Redirect to Student Dashboard after registration
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6 flex items-center justify-center">
      <div className="absolute left-5 right-5 top-0 flex h-16 w-auto items-center justify-between md:h-18">
          <div className="left-10"><a href="/">
            <img src="src/assets/logo.png" alt="Logo text" className="w-32 h-auto " />
          </a></div>
          <div className="inline-flex gap-x-1">
            <p className="hidden md:block text-yellow-700">
              If you are a tutor, go to tutor login
            </p>
            <Link to="/TutorLogin" className="underline text-blue-700">Tutor Login</Link>
          </div>
        </div>
      <form
        onSubmit={handleSubmit} method="Post"
        className="bg-white p-8 shadow-xl rounded-xl border border-gray-300 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">Student Registration</h2>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-3"
          onChange={handleChange}
        />
        <input
          type="email"
          name="confirmEmail"
          placeholder="Confirm Email Address"
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Cell Number"
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-3"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Grade"
          placeholder="class/Grade"
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-3"
          onChange={handleChange}
        />

        <input type="file" name="profilePicture" className="mt-4 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

        <div className="grid grid-cols-2 gap-4 mt-3">
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <input
            type="text"
            name="state"
            placeholder="State"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="username"
          placeholder="User Name"
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-3"
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4 mt-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 mt-6 rounded-xl font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
        >
          Register
        </button>

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default StudentRegistration;
