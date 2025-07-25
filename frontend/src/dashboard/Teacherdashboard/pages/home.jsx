import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaClock,
  FaUserPlus,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-4 rounded-xl text-white shadow-md flex items-center space-x-4 ${color}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  </div>
);

export default function TeacherHome() {
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [handledRequests, setHandledRequests] = useState([]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teacherId = localStorage.getItem("teacherId");
        const res = await fetch(`http://localhost:5000/api/teacher/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setTeacher({ name: data.name || "Teacher" });

        setStats([
          {
            label: "Total Sessions",
            value: data.stats.totalSessions,
            icon: <FaChalkboardTeacher />,
            color: "bg-blue-500",
          },
          {
            label: "Total Earnings",
            value: data.stats.earnings,
            icon: <FaDollarSign />,
            color: "bg-green-500",
          },
          {
            label: "Upcoming Sessions",
            value: data.stats.upcomingSessions,
            icon: <FaClock />,
            color: "bg-yellow-500",
          },
        ]);

        setSessions(data.upcomingSessions || []);
        setRequests(data.studentRequests || []);
        // setStudentRequests(data.studentRequests); // <-- Show in UI
        // setNotifications(data.notifications.map((n) => n.message) || []);
        setNotifications(Array.isArray(data.notifications) ? data.notifications.map((n) => n.message) : []);

        
      } catch (err) {
        console.error("Error fetching teacher data:", err);
      }
    };

    fetchTeacherData();
  }, []);

  const handleRequestAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/teacher/request/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ status: action }),
        body: JSON.stringify({ action })

      });

      if (!res.ok) throw new Error("Failed to update request");

      const updatedRequest = await res.json();
      // setHandledRequests((prev) => [...prev, updatedRequest]);
      setHandledRequests((prev) => [...prev, updatedRequest.booking]);

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
      console.log("API response:", updatedRequest); // Inspect structure
      toast.success(`Request ${action} successfully!`);
    } catch (err) {
      console.error("Error handling request:", err);
      toast.error("Something went wrong.");
    }
  };

  

  return (
    <div className="max-w-6xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} />
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome, {teacher?.name}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" /> Upcoming Sessions
        </h2>
        {sessions.length > 0 ? (
          <ul className="list-disc list-inside">
            {sessions.map((session, index) => (
              <li key={index}>
                Session with {session.studentName} on {session.date} at {session.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming sessions.</p>
        )}
      </div>

      {/* Student Requests */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2 flex items-center">
          <FaUserPlus className="mr-2" /> Student Requests
        </h2>
        {requests.length > 0 ? (
          <ul className="space-y-3">
            {requests.map((req, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded-lg">
                <div className="text-sm mb-2 sm:mb-0">
                  <strong>{req.studentName}</strong> - {req.subjects || 'N/A'}, {req.message || ' '} ({req.status})
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestAction(req._id, "accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(req._id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No student requests.</p>
        )}
      </div>

      {/* Handled Requests */}
      {handledRequests.length > 0 && (
        <div className="bg-white shadow-md p-4 rounded-xl mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Handled Requests</h2>
          <ul className="space-y-2">
            {handledRequests.map((req, index) => (
              <li key={index} className="text-sm border p-2 rounded-lg">
                {req.studentName} - {req.subjects} {req.message} ({req.status})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-600 mb-2 flex items-center">
          <FaBell className="mr-2" /> Notifications
        </h2>
        {notifications.length > 0 ? (
          <ul className="list-disc list-inside">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        ) : (
          <p>No notifications.</p>
        )}
      </div>
    </div>
  );
}
