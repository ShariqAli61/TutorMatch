// this is teacherCard.jsx
import React, { useState } from "react";

const TeacherCard = ({ teacher, onBook, onMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onMessage(teacher, message);
      setMessage(""); // clear after sending
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 m-2 w-auto md:w-1/3 ">
      {/* Profile Picture */}
      {teacher.profilePicture && (
        <img
          src={`http://localhost:5000/uploads/${teacher.profilePicture}`}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
      )}

      {/* Info */}
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {teacher.firstName} {teacher.lastName}
      </h2>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Contact:</strong> {teacher.phone}</p>
      <p><strong>CNIC:</strong> {teacher.cnic}</p>
      <p><strong>Address:</strong> {teacher.address}</p>
      <p><strong>Location:</strong> {teacher.city}</p>
      <p><strong>State:</strong> {teacher.state}</p>
      <p><strong>Zip:</strong> {teacher.zip}</p>
      <p><strong>Bio:</strong> {teacher.bio}</p>
            <p><strong>Subjects:</strong> {teacher.subjects}</p>
      <p><strong>Teaching Levels:</strong> {teacher.levels?.join(", ")}</p>
      <p><strong>Education:</strong> {teacher.educationlevels}</p>
      <p><strong>Availability:</strong> {teacher.availability?.join(", ")}</p>
      <p><strong>Student Status:</strong> {teacher.studentStatus}</p>
      <p><strong>Experience:</strong> {teacher.experience}</p>

      {/* Booking Button */}
      <button
        onClick={() => onBook(teacher)}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Teacher
      </button>

      {/* Message Form */}
      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Write your message to the teacher..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
