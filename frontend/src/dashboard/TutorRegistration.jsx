//this is TutorRegistration.jsx
import { useState } from "react";
import axios from 'axios'; // Add this line
import { ToastContainer, toast } from 'react-toastify'; // Add this line
import 'react-toastify/dist/ReactToastify.css'; // Add this for toast styles
// import TeacherDashboard from "./Teacher"; // Import the dashboard
// import Login2 from "../home/components/Login2"; // Import the login component
import TutorLogin from "../home/components/TutorLogin";


function TutorRegistration() {
  const [registered, setRegistered] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    cnic: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    profilePicture: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    levels: [],
    educationlevels: "",
    timeZone: "",
    availability: [],
    subjects: [],
    // instruments: [],
    studentStatus: "",
    consent: false,
  });

  const levelsList = ["university", "College", "High School", "Middle School", "Elementary"];
  const educationlevels = ["High School", "Bachelor’s Degree", "Master’s Degree", "PHD"];
  const subjectsList = [
    "Math", "Science", "History", "Algebra 1", "Algebra 2", "Calculus",
    "Chemistry", "Earth Science", "Geometry",
    "Statistics", "Physics", "web development"
  ];

  // const instrumentsList = [
  //   "None", "Clarinet", "Flute", "French Horn", "Guitar", "Percussion",
  //   "Piano", "Saxophone", "Trombone", "Trumpet", "Tuba", "Violin", "Voice"
  // ];
  const availabilityList = [
    "Mondays: mornings", "Mondays: afternoons", "Mondays: evenings",
    "Tuesdays: mornings", "Tuesdays: afternoons", "Tuesdays: evenings",
    "Wednesdays: mornings", "Wednesdays: afternoons", "Wednesdays: evenings",
    "Thursdays: mornings", "Thursdays: afternoons", "Thursdays: evenings",
    "Fridays: mornings", "Fridays: afternoons", "Fridays: evenings",
    "Saturdays: mornings", "Saturdays: afternoons", "Saturdays: evenings",
    "Sundays: mornings", "Sundays: afternoons", "Sundays: evenings"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "consent") {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in formData) {
    if (Array.isArray(formData[key])) {
      formData[key].forEach(item => form.append(key, item));
    } else {
      form.append(key, formData[key]);
    }
  }

    // Validation checks
    if (formData.email !== formData.confirmEmail) {
      toast.error("Emails don't match!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    if (!formData.consent) {
      toast.error("You must consent to the background check");
      return;
    }

     // Attach profile picture
    if (profilePictureFile) {
      form.append('profilePicture', profilePictureFile);
    }

    try {
      // Remove confirm fields before sending
      const { confirmEmail, confirmPassword, consent, ...registrationData } = formData;

      const response = await axios.post(
        'http://localhost:5000/api/teachers/register',
        registrationData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'

          }
        }
      );

      toast.success('Registration successful!');
      setRegistered(true);

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // Server responded with a status code that falls out of 2xx
        toast.error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // Request was made but no response received
        toast.error('No response from server');
      } else {
        // Something happened in setting up the request
        toast.error('Error setting up registration request');
      }
    }
  };

  if (registered) {
    return <TutorLogin />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6 flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={2000} />
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-xl border border-gray-300 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">Tutor Registration</h2>

        {/* Name & Contact */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="email" name="confirmEmail" placeholder="Confirm Email Address *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Cell Number *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="text" name="cnic" placeholder="CNIC Number *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="mt-4">
          <input type="text" name="address" placeholder="Street Address *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4" onChange={handleChange} />
          <input type="text" name="city" placeholder="City *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4" onChange={handleChange} />
          <input type="text" name="state" placeholder="State *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4" onChange={handleChange} />
          <input type="text" name="zip" placeholder="Zip Code *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4" onChange={handleChange} />
        </div>

        {/* Profile & Credentials */}
        <div className="mt-4">
          <input type="file" name="profilePicture" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={(e) => setProfilePictureFile(e.target.files[0])}/>
          <textarea name="bio" placeholder="Your Bio" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4" onChange={handleChange}></textarea>
        </div>

        {/* Username & Password */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <input type="text" name="username" placeholder="Username *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password *" required className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400" onChange={handleChange} />
        </div>

        {/* Levels */}
        <div className="mt-4">
          <h3 className="font-bold"><h7>What levels do you tutor?</h7></h3>
          {levelsList.map((level) => (
            <label key={level} className="block">
              <input type="checkbox" name="levels" value={level} onChange={handleChange} /> {level}
            </label>
          ))}
        </div>
        {/* education Levels */}
        <div className="mt-4">
          <h3 className="font-bold"><h7>What is the highest level of education that you have completed? </h7></h3>
          {educationlevels.map((level) => (
            <label key={level} className="block">
              <input
                type="radio"
                name="educationlevels" // ✅ Match backend
                value={level}
                onChange={handleChange}
              />
              {level}
            </label>
          ))}
        </div>

        {/* Subjects & Instruments */}
        <div className="mt-4">
          <h3 className="font-bold"><h7>Which subjects do you tutor?</h7></h3>
          <div className="grid grid-cols-2 gap-2">
            {subjectsList.map((subject) => (
              <label key={subject}>
                <input type="checkbox" name="subjects" value={subject} onChange={handleChange} /> {subject}
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-4">
          <h3 className="font-bold"><h7>What days and times are you available to tutor?</h7></h3>
          <div className="grid grid-cols-2 gap-2">
            {availabilityList.map((time) => (
              <label key={time}>
                <input type="checkbox" name="availability" value={time} onChange={handleChange} /> {time}
              </label>
            ))}
          </div>
        </div>
        {/* Student Status */}
        <div className="mt-4">
          <h3 className="font-bold"><h7>Are you currently a student?</h7></h3>
          <label><input type="radio" name="studentStatus" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="studentStatus" value="No" onChange={handleChange} className="ml-4" /> No</label>
        </div>

        {/* Consent */}
        <div className="mt-4">
          <label>
            <input type="checkbox" name="consent" onChange={handleChange} required /> By checking this box, you consent to a background check.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-yellow-500 text-white p-3 mt-6 rounded-xl font-semibold hover:bg-yellow-600 transition duration-300 shadow-md">Register</button>
      </form>
    </div>
  );
}

export default TutorRegistration;