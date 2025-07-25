// now it is not in use it is very first/test deshboard, not link with any link
import { useState } from "react";
import { Link } from "react-router-dom";

function TeacherPortal() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "login":
        return <Login />;
      case "signup":
        return <Signup />;
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "students":
        return <Students />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="flex justify-between bg-white p-4 shadow-md rounded-xl">
        {/* <h1 className="text-xl font-bold">TutorMatch</h1> */}
        <a href="/">
            <img
              src="src/assets/logo.png"
              alt="Logo image"
              className="w-20 h-auto"
            />
          </a>
        <div>
          <button onClick={() => setCurrentPage("login")} className="mr-4">Login</button>
          <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
        </div>
      </nav>
      <div>
        <button onClick={() => setCurrentPage("dashboard")} className="mt-4">Go to Dashboard</button>
      </div>
      {renderPage()}
    </div>
  );
}

function Home() {
  return <div className="text-center mt-10">Welcome to TutorMatch!</div>;
}

function Login() {
  return <div className="text-center mt-10">Login Page</div>;
}

function Signup() {
  return <div className="text-center mt-10">Signup Page</div>;
}

function Dashboard() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <button onClick={() => setCurrentPage("profile")} className="block mt-2">Manage Profile</button>
      <button onClick={() => setCurrentPage("Students")} className="block mt-2">Search for sStudents</button>
      <button className="block mt-2">Payments Management</button>
    </div>
  );
}

function Profile() {
  return <div className="text-center mt-10">Manage Profile Page</div>;
}

function Students() {
  return (
    <div className="text-center mt-10">
      <h2>Search for Studentss</h2>
      <p>View Student Profiles & Message Students</p>
    </div>
  );
}

export default TeacherPortal;
