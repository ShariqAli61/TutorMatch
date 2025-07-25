//this is my login2.jsx
"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoApple, BiLogoFacebook, BiLogoGoogle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      toast.error( "Something went wrong.");
    } else {
      // Save data properly
      localStorage.setItem("studentId", data.student.id);
      localStorage.setItem("studentName", data.student.name); // use 'name', not 'fullName'
      localStorage.setItem("userId", data.student.id);
      localStorage.setItem("token", data.token);
      
      toast.success("Login successful!");
      setTimeout(() => {
          navigate("/student/home"); // Redirect to Student Dashboard after successful registration
        }, 2000);
      // Redirect to student dashboard
      // navigate("/student/home");
    } 
  } catch (err) {
    setError("Server error. Please try again later.");
    console.error(err);
  }
};


  return (
    <section id="relume" className="bodycolor  px-[5%]" >
      <div className="relative flex min-h-svh flex-col justify-center overflow-auto py-24 lg:py-20">
        <ToastContainer position="top-center" autoClose={2000} />
        <div className="absolute left-0 right-0 top-0 flex h-16 w-full items-center justify-between md:h-18">
          <a href="/">
            <img src="src/assets/logo.png" alt="Logo text" className="w-32 h-auto" />
          </a>
          <div className="inline-flex gap-x-1">
            <p className="hidden md:block text-yellow-700">
              If you are a tutor, go to tutor login
            </p>
            <Link to="/TutorLogin" className="underline text-blue-700">Tutor Login</Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center md:mb-10 lg:mb-12">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl text-yellow-700">
              Log In
            </h1>
            <p className="md:text-md text-yellow-700">
              Access your Student account to find the best tutors.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid grid-cols-1 gap-1">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 mt-1 rounded-xl font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
            >
              Log In
            </Button>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          </form>

          <div className="mt-5 w-full text-center md:mt-6">
            <a href="#" className="underline">Forgot your password?</a>
          </div>
        </div>
        <footer className="absolute bottom-0 left-0 right-0 flex h-16 w-full items-center justify-center md:h-18">
          <p className="text-sm">© 2024 TutorMatch</p>
        </footer>
      </div>
    </section>
  );
}
export default Login2;