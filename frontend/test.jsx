// import { useState } from "react";
// import TeacherDashboard from "./Teacher"; // Import the dashboard

// function TutorRegistration() {
//   const [registered, setRegistered] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     confirmEmail: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     bio: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     levels: [],
//     education: "",
//     timeZone: "",
//     availability: [],
//     subjects: [],
//     instruments: [],
//     studentStatus: "",
//     consent: false,
//   });

//   const levelsList = ["Adult", "College", "High School", "Middle School", "Elementary"];
//     const educationLevels = ["High School", "Bachelor’s Degree", "Master’s Degree", "PHD"];
//   const subjectsList = [
//     "ELA", "Math", "Science", "History", "Algebra 1", "Algebra 2", "Calculus",
//     "Chemistry", "Earth Science", "Geometry", "Global History and Geography",
//     "Living Environment (Biology)", "Statistics", "Physics", "Precalculus",
//     "U.S. History and Government", "GED", "SAT", "GMAT", "GRE", "French", "Spanish"
//   ];

//   const instrumentsList = [
//     "None", "Clarinet", "Flute", "French Horn", "Guitar", "Percussion",
//     "Piano", "Saxophone", "Trombone", "Trumpet", "Tuba", "Violin", "Voice"
//   ];
//   const availabilityList = [
//     "Mondays: mornings", "Mondays: afternoons", "Mondays: evenings",
//     "Tuesdays: mornings", "Tuesdays: afternoons", "Tuesdays: evenings",
//     "Wednesdays: mornings", "Wednesdays: afternoons", "Wednesdays: evenings",
//     "Thursdays: mornings", "Thursdays: afternoons", "Thursdays: evenings",
//     "Fridays: mornings", "Fridays: afternoons", "Fridays: evenings",
//     "Saturdays: mornings", "Saturdays: afternoons", "Saturdays: evenings",
//     "Sundays: mornings", "Sundays: afternoons", "Sundays: evenings"
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;   
//     if (type === "checkbox") {
//       if (name === "consent") {
//         setFormData({ ...formData, [name]: checked });
//       } else {
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: checked
//             ? [...prevState[name], value]
//             : prevState[name].filter((item) => item !== value),
//         }));
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.email !== formData.confirmEmail) {
//       alert("Emails do not match!");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     if (!formData.consent) {
//       alert("You must consent to the background check.");
//       return;
//     }
//     setRegistered(true);
//   };

//   if (registered) {
//     return <TeacherDashboard />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-center mb-6">Tutor Registration</h2>

//         {/* Name & Contact */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="firstName" placeholder="First Name *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="lastName" placeholder="Last Name *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="email" name="email" placeholder="Email Address *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="email" name="confirmEmail" placeholder="Confirm Email Address *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="phone" placeholder="Cell Number *" required className="p-2 border rounded" onChange={handleChange} />
//         </div>

//         {/* Address */}
//         <div className="mt-4">
//           <input type="text" name="address" placeholder="Street Address *" required className="w-full p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="city" placeholder="City *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//           <input type="text" name="state" placeholder="State *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//           <input type="text" name="zip" placeholder="Zip Code *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//         </div>

//         {/* Profile & Credentials */}
//         <div className="mt-4">
//           <input type="file" name="profilePicture" className="w-full p-2 border rounded" />
//           <textarea name="bio" placeholder="Your Bio" className="w-full p-2 border rounded mt-2" onChange={handleChange}></textarea>
//         </div>

//         {/* Username & Password */}
//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <input type="text" name="username" placeholder="Username *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="password" name="password" placeholder="Password *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="password" name="confirmPassword" placeholder="Confirm Password *" required className="p-2 border rounded" onChange={handleChange} />
//         </div>

//         {/* Levels */}
//         <div className="mt-4">
//           <h3 className="font-bold">What levels do you tutor?</h3>
//           {levelsList.map((level) => (
//             <label key={level} className="block">
//               <input type="checkbox" name="levels" value={level} onChange={handleChange} /> {level}
//             </label>
//           ))}
//         </div>

//         {/* Subjects & Instruments */}
//         <div className="mt-4">
//           <h3 className="font-bold">Subjects You Tutor:</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {subjectsList.map((subject) => (
//               <label key={subject}>
//                 <input type="checkbox" name="subjects" value={subject} onChange={handleChange} /> {subject}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Availability */}
//         <div className="mt-4">
//           <h3 className="font-bold">Availability:</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {availabilityList.map((time) => (
//               <label key={time}>
//                 <input type="checkbox" name="availability" value={time} onChange={handleChange} /> {time}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Consent */}
//         <div className="mt-4">
//           <label>
//             <input type="checkbox" name="consent" onChange={handleChange} required /> By checking this box, you consent to a background check.
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">Register</button>
//       </form>
//     </div>
//   );
// }

// export default TutorRegistration;




// import { useState } from "react";
// import TeacherDashboard from "./Teacher"; // Import the teacher dashboard

// function TutorRegistration() {
//   const [registered, setRegistered] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     confirmEmail: "",
//     phone: "",
//     cnic: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     bio: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     levels: [],
//     education: "",
//     timeZone: "",
//     availability: [],
//     subjects: [],
//     instruments: [],
//     studentStatus: "",
//     consent: false,
//   });
//   const levelsList = ["Adult", "College", "High School", "Middle School", "Elementary"];
//   const educationLevels = ["High School", "Bachelor’s Degree", "Master’s Degree", "PHD"];
//   const subjectsList = [
//     "ELA", "Math", "Science", "History", "Algebra 1", "Algebra 2", "Calculus",
//     "Chemistry", "Earth Science", "Geometry", "Global History and Geography",
//     "Living Environment (Biology)", "Statistics", "Physics", "Precalculus",
//     "U.S. History and Government", "GED", "SAT", "GMAT", "GRE", "French", "Spanish"
//   ];
//   const instrumentsList = [
//     "None", "Clarinet", "Flute", "French Horn", "Guitar", "Percussion",
//     "Piano", "Saxophone", "Trombone", "Trumpet", "Tuba", "Violin", "Voice"
//   ];
//   const availabilityList = [
//     "Mondays: mornings", "Mondays: afternoons", "Mondays: evenings",
//     "Tuesdays: mornings", "Tuesdays: afternoons", "Tuesdays: evenings",
//     "Wednesdays: mornings", "Wednesdays: afternoons", "Wednesdays: evenings",
//     "Thursdays: mornings", "Thursdays: afternoons", "Thursdays: evenings",
//     "Fridays: mornings", "Fridays: afternoons", "Fridays: evenings",
//     "Saturdays: mornings", "Saturdays: afternoons", "Saturdays: evenings",
//     "Sundays: mornings", "Sundays: afternoons", "Sundays: evenings"
//   ];
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: checked
//           ? [...prevState[name], value]
//           : prevState[name].filter((item) => item !== value),
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.email !== formData.confirmEmail) {
//       alert("Emails do not match!");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     if (!formData.consent) {
//       alert("You must consent to the background check.");
//       return;
//     }
//     setRegistered(true);
//   };
//   if (registered) {
//     return <TeacherDashboard />;
//   }
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-center mb-6">Tutor Registration</h2>
//         {/* Name & Contact */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="firstName" placeholder="First Name *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="lastName" placeholder="Last Name *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="email" name="email" placeholder="Email Address *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="email" name="confirmEmail" placeholder="Confirm Email Address *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="phone" placeholder="Cell Number *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="cnic" placeholder="CNIC Number *" required className="p-2 border rounded" onChange={handleChange} />
//         </div>
//         {/* Address */}
//         <div className="mt-4">
//           <input type="text" name="address" placeholder="Street Address *" required className="w-full p-2 border rounded" onChange={handleChange} />
//           <input type="text" name="city" placeholder="City *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//           <input type="text" name="state" placeholder="State *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//           <input type="text" name="zip" placeholder="Zip Code *" required className="w-full p-2 border rounded mt-2" onChange={handleChange} />
//         </div>
//         {/* Profile & Credentials */}
//         <div className="mt-4">
//           <input type="file" name="profilePicture" className="w-full p-2 border rounded" />
//           <textarea name="bio" placeholder="Your Bio" className="w-full p-2 border rounded mt-2" onChange={handleChange}></textarea>
//         </div>
//         {/* Username & Password */}
//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <input type="text" name="username" placeholder="Username *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="password" name="password" placeholder="Password *" required className="p-2 border rounded" onChange={handleChange} />
//           <input type="password" name="confirmPassword" placeholder="Confirm Password *" required className="p-2 border rounded" onChange={handleChange} />
//         </div>
//         {/* Levels */}
//         <div className="mt-4">
//           <h3 className="font-bold">What levels do you tutor?</h3>
//           {levelsList.map((level) => (
//             <label key={level} className="block">
//               <input type="checkbox" name="levels" value={level} onChange={handleChange} /> {level}
//             </label>
//           ))}
//         </div>
//         {/* subjects */}
//         <div className="mt-4">
//           <h3 className="font-bold">What levels do you tutor?</h3>
//           {subjectsList.map((level) => (
//             <label key={level} className="block">
//               <input type="checkbox" name="subjects" value={level} onChange={handleChange} /> {level}
//             </label>
//           ))}
//         </div>
//         {/* availabilityList */}
//         <div className="mt-4">
//           <h3 className="font-bold">What levels do you tutor?</h3>
//           {availabilityList.map((level) => (
//             <label key={level} className="block">
//               <input type="checkbox" name="availability" value={level} onChange={handleChange} /> {level}
//             </label>
//           ))}
//         </div>
//         {/* Education */}
//         <div className="mt-4">
//           <h3 className="font-bold">Highest level of education completed:</h3>
//           {educationLevels.map((level) => (
//             <label key={level} className="block">
//               <input type="radio" name="education" value={level} onChange={handleChange} /> {level}
//             </label>
//           ))}
//         </div>
//         {/* Student Status */}
//         <div className="mt-4">
//           <h3 className="font-bold">Are you currently a student?</h3>
//           <label><input type="radio" name="studentStatus" value="Yes" onChange={handleChange} /> Yes</label>
//           <label><input type="radio" name="studentStatus" value="No" onChange={handleChange} className="ml-4" /> No</label>
//         </div>
//         {/* Consent */}
//         <div className="mt-4">
//           <label>
//             <input type="checkbox" name="consent" onChange={handleChange} required /> By checking this box, you consent to a background check.
//           </label>
//         </div>
//         {/* Submit Button */}
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">Register</button>
//       </form>
//     </div>
//   );
// }
// export default TutorRegistration;