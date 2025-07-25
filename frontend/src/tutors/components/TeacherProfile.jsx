import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacher1 = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/teachers/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching teacher profile');
        console.error(err);
      }
    };

    fetchTeacher1();
  }, [id]);

  if (error) return <div className="p-5 text-red-600">{error}</div>;
  if (!teacher) return <div className="p-5">Loading teacher profile...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4">{teacher.firstName} {teacher.lastName}</h2>
      <img
        src={teacher.profilePicture || "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"}
        alt={teacher.firstName}
        className="w-full max-h-[300px] object-cover rounded mb-4"
      />
      <p className="mb-2"><strong>Subjects:</strong> {teacher.subjects?.join(', ') || 'N/A'}</p>
      <p className="mb-2"><strong>Rate:</strong> ${teacher.rate}</p>
      <p className="mb-2"><strong>Bio:</strong> {teacher.bio || "No bio available."}</p>
    </div>
  );
}

export default TeacherProfile;
