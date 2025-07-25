// this is SearchTeacher.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import TeacherCard from "../components/TeacherCard";
// import { FaSearch } from "react-icons/fa";

const SearchTeacher = () => {
    const [subject, setSubject] = useState("");
    const [levels, setlevels] = useState("");
    const [location, setLocation] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:5000/api/teachers/search?subject=${subject}&location=${location}&levels=${levels}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResults(response.data);
        } catch (error) {
            console.error("Search error", error);
        }
    };

    // import axios from 'axios';

const handleBookTeacher = async (teacher) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/api/teachers/book',
      { teacherId: teacher._id,
        sessionDate: new Date(), // or user-picked date
        subjects: teacher.subjects // or a selected subject
       }, // your payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Booking successful:', response.data);
  } catch (error) {
    console.error('Booking failed', error);
  }
};


const handleSendMessage = async (teacher, message) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/api/messages/send',
      { teacherId: teacher._id, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Message send failed', error);
  }
};

// // In your JSX map
// <TeacherCard
//   teacher={teacher}
//   onBook={handleBookTeacher}
//   onMessage={handleSendMessage}
// />


    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white shadow-md p-4 rounded-xl mb-6">
                <h2 className="text-xl font-semibold text-yellow-600 mb-2 flex items-center">
                    <FaSearch className="mr-2" /> Search Teachers
                </h2>
                <div className="mb-4 flex flex-wrap gap-2">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter Subject"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter City"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        value={levels}
                        onChange={(e) => setlevels(e.target.value)}
                        placeholder="levels"
                        className="border p-2 rounded"
                    />
                    <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap ">
                {results.length > 0 ? (
                    results.map((teacher) => (
                        <TeacherCard key={teacher._id} teacher={teacher} onBook={handleBookTeacher} onMessage={handleSendMessage} />
                    ))
                ) : (
                    <p>No teachers found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchTeacher;
