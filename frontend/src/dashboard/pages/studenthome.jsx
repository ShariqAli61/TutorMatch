import { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaClock,
  FaCalendarAlt,
  FaBell,
  FaUserPlus,
  
} from "react-icons/fa";
import SearchTeachers from "./SearchTeacher";

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-4 rounded-xl text-white shadow-md flex items-center space-x-4 ${color}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  </div>
);

export default function StudentHome() {
  const [student, setStudent] = useState(null);
  const [stats, setStats] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [teacherRequests, setTeacherRequests] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/student/${studentId}`);
        const data = await res.json();

        setStudent({ name: data.studentName || "Student" });

        setStats([
          {
            label: "Total Classes",
            value: data.totalClasses,
            icon: <FaChalkboardTeacher />,
            color: "bg-blue-500",
          },
          {
            label: "Total Earnings",
            value: `${data.totalEarnings}`,
            icon: <FaDollarSign />,
            color: "bg-green-500",
          },
          {
            label: "Pending Requests",
            value: data.pendingRequests.length,
            icon: <FaClock />,
            color: "bg-yellow-500",
          },
        ]);

        setSessions(
          data.upcomingSessions.map((session) => ({
            title: `Session with Teacher ${session.teacherId}`,
            date: session.date?.split("T")[0],
            time: session.time,
          }))
        );

        setNotifications(data.notifications.map((n) => n.message));

        setTeacherRequests(
          data.teacherRequests.map((req) => ({
            studentName: req.studentName,
            date: req.date?.split("T")[0],
            time: req.time,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">
        Welcome, {student?.name}
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" /> Upcoming Sessions
        </h2>
        {sessions.length > 0 ? (
          <ul className="list-disc list-inside">
            {sessions.map((session, index) => (
              <li key={index}>
                {session.title} on {session.date} at {session.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming sessions.</p>
        )}
      </div>

      {/* Teacher Requests */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2 flex items-center">
          <FaUserPlus className="mr-2" /> Teacher Requests
        </h2>
        {teacherRequests.length > 0 ? (
          <ul className="list-disc list-inside">
            {teacherRequests.map((req, index) => (
              <li key={index}>
                Request from {req.studentName} for class on {req.date} at {req.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No teacher requests found.</p>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2 flex items-center">
          <FaBell className="mr-2" /> Notifications
        </h2>
        {notifications.length > 0 ? (
          <ul className="list-disc list-inside">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
      </div>

      {/* Search Teachers */}
      <div >
      <SearchTeachers/>
      </div>

    </div>
  );
}
