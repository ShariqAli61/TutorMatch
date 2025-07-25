// function Settings() {
//     return <div className="text-center mt-10">Settings Page</div>;
//   }
  
//   export default Settings;
  

// src/dashboard/pages/Settings.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    notifications: true,
    privacy: "public",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/student/settings/12345") // replace with actual ID
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.put("http://localhost:5000/api/student/settings/12345", formData)
      .then(() => alert("Settings updated successfully!"))
      .catch(err => console.error(err));
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">⚙️ Account Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+92 3xx xxxxxxx"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">New Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="mr-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Notifications</label>
        </div>

        {/* Privacy */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Privacy Setting</label>
          <select
            name="privacy"
            value={formData.privacy}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
