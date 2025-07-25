import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";

import StudentHome from "./pages/studenthome";
import Profile from "./pages/profile";
import AssignedTeacher from "./pages/AssignedTeacher"
import Chat from "./pages/Chat";
import Payments from "./pages/Payments";  
import Settings from "./pages/Settings";
import Support from "./pages/Support";
// import SearchTeachers from "./pages/SearchTeacher";
function StudentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState("blue");
  const navigate = useNavigate();

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-all duration-300`}>
      <TopBar setDarkMode={setDarkMode} darkMode={darkMode} setThemeColor={setThemeColor} themeColor={themeColor} />
      <div className="flex">
        <Sidebar themeColor={themeColor} navigate={navigate} />
        <main className="flex-1 p-4">
          <Routes>


            <Route path="home" element={<StudentHome />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="SearchTeacher" element={<SearchTeachers />} /> */}
            <Route path="AssignedTeacher" element={<AssignedTeacher />} />
            <Route path="chat" element={<Chat />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
