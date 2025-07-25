import React from "react";
import { Toaster } from 'react-hot-toast';  // Import Toaster
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css"; // Import your main CSS file
import TutorPage from "./tutors/Tutor";
import AboutPage from "./about-us/About";
import ContactPage from "./contact-us/Contact"
import TutorLogin from "./home/components/TutorLogin"
import EducatorPage from "./for-educators/Educators";
import { Login2 } from "./home/components/Login2";
import ParentPage from "./parent-portal/ParentPortal";
import TutorProfilePage from "./tutor-profile/TutorProfile";
// import StudentDashboard from "./dashboard/student"
import TeacherDashboard from "./dashboard/TeacherDashboard";
import TutorRegistration from "./dashboard/TutorRegistration";
import StudentRegistration from "./dashboard/StudentRegistration";
import PrivateRoute from "./dashboard/components/PrivateRoute";
import StudentDashboard from "./dashboard/student";

// home page imports
import { Navbar2 } from "./home/components/Navbar2";
import { Header1 } from "./home/components/Header1";
import { Layout101 } from "./home/components/Layout101";
import { Layout240 } from "./home/components/Layout240";
import { Layout42 } from "./home/components/Layout42";
import { Cta25 } from "./home/components/Cta25";
import { Testimonial5 } from "./home/components/Testimonial5";
import { Contact22 } from "./home/components/Contact22";
import { Footer2 } from "./home/components/Footer2";

import { Product2 } from './tutors/components/Product2'; // Import Product2 component
import TeacherProfile from './tutors/components/TeacherProfile'; // You'll create this next

// import


export default function App() {
  return (
    <Router>
      <Toaster />  {/* This is necessary for toasts to appear */}
      {/* <Navbar2 /> */}
       {/* Navbar appears on all pages */}

      <Routes>
      {/* <Navbar2 /> */}
        {/* Home Page - Shows all home components */}
        <Route
          path="/"
          element={
            <>
              <Navbar2 />
              <Header1 />
              <Layout101 />
              <Layout240 />
              <Layout42 />
              <Cta25 />
              <Testimonial5 />
              <Contact22 />
              <Footer2 />
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/TutorLogin" element={<TutorLogin />} />
        <Route path="/educators" element={<EducatorPage />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/parentportal" element={<ParentPage />} />
        <Route path="/TutorProfile" element={<TutorProfilePage />} />
        <Route path="/studentRegistration/*" element={<StudentRegistration />} />

        <Route path="/student/*" element={ <PrivateRoute> <StudentDashboard /> </PrivateRoute>} />
        {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> { /*experimental remove this and uncomment upper one  */}

        <Route path="/TeacherDashboard/*" element={<TeacherDashboard />} />
        <Route path="/TutorRegistration/*" element={<TutorRegistration />} />



        <Route path="/" element={<Product2 />} />
        <Route path="/teacher/:id" element={<TeacherProfile />} />
      </Routes>
    </Router>
  );
}

