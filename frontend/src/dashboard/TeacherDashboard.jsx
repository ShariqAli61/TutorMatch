//this is Teacher.jsx
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Teacherdashboard/components/sidebar";
import TopBar from "./Teacherdashboard/components/topbar";

import TeacherHome from "./Teacherdashboard/pages/home";
// import Profile from "./pages/profile";
// import AssignedTeacher from "./pages/AssignedTeacher"
import Chat from "./Teacherdashboard/pages/Chat";
// import Payments from "./pages/Payments";  
// import Settings from "./pages/Settings";
// import Support from "./pages/Support";
import TeacherProfile from "./Teacherdashboard/pages/profile";



function TeacherDashboard() {
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


            <Route path="home" element={<TeacherHome />} />
            <Route path="profile" element={<TeacherProfile />} />
            {/* <Route path="AssignedTeacher" element={<AssignedTeacher />} /> */}
            <Route path="chat" element={<Chat />} />
            {/* <Route path="payments" element={<Payments />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
            {/* <Route path="support" element={<Support />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
