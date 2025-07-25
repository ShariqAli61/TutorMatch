import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaCog,
  FaMoneyBill,
  FaChalkboardTeacher,
  FaComments,
  FaHeadset,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

function Sidebar({ themeColor = "blue", navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const colorThemes = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    default: "bg-gray-600",
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="p-3 text-2xl fixed top-1 left-4 z-50 text-white bg-gray-800 rounded-md shadow-md"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 p-4 z-40 shadow-lg text-white transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-72"
        } ${colorThemes[themeColor]}`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="mt-8 space-y-6 text-lg">
          <li>
            <Link
              to="/TeacherDashboard/home"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaHome className="mr-3" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaUser className="mr-3" /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/AssignedStudent"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaChalkboardTeacher className="mr-3" /> Assigned Student
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/chat"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaComments className="mr-3" /> Chat
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/payments"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaMoneyBill className="mr-3" /> Payments
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaCog className="mr-3" /> Settings
            </Link>
          </li>
          <li>
            <Link
              to="/TeacherDashboard/support"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:opacity-80"
            >
              <FaHeadset className="mr-3" /> Support
            </Link>
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("teacherData");
              navigate("/TutorLogin");
            }}
            className="flex items-center text-red-300 hover:text-red-500 cursor-pointer"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
