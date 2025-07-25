//this is profile.jsx
import { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaLock,
  FaCamera,
  FaSave
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = ({ userType }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    qualifications: '',
    username: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    profilePicture: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    Grade: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);

  // move fetchProfile outside useEffect so it can be reused
  const fetchProfile = async () => {
    try {
      // const userId = localStorage.getItem('userId');
      const token = localStorage.getItem("token"); // Assuming you store token on login
      const userType = "student"; // ✅ Hardcoded for now or pass via props
      console.log("Token:", token); // ✅ Should log a valid token
      // const response = await axios.get(`http://localhost:5000/api/${userType}/profile`, {
      const response = await axios.get(`http://localhost:5000/api/profile/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // params: { userId }
      });
      console.log("PROFILE RESPONSE:", response.data);
      setProfile(prev => ({
        ...prev,
        ...response.data,
        email: response.data.email || '',
        username: response.data.username || '',
        Grade: response.data.Grade || '',
        name: `${response.data.firstName} ${response.data.lastName}`,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      // if (response.data.profilePicture) {
      //   setPreviewImage(response.data.profilePicture);
      // }
          setPreviewImage('');
    } catch (error) {
      toast.error('Failed to load profile');
      console.error("Profile fetch error:", error.response?.data || error.message);
      console.error("Fetch profile error", error);

    } finally {
      setLoading(false);
    }
  };

  // useEffect just calls it initially
  useEffect(() => {
    fetchProfile();
  }, [userType]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('username', profile.username);
      formData.append('address', profile.address);
      formData.append('city', profile.city);
      formData.append('state', profile.state);
      formData.append('zip', profile.zip);
      formData.append('Grade', profile.Grade);

      if (profile.profilePicture) {
        formData.append('profilePicture', profile.profilePicture);
      }

      const response = await axios.put(`http://localhost:5000/api/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Update error:", error);
      let errorMessage = 'Failed to update profile';

      if (error.response) {
        // Server responded with an error status code
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server';
      }

      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/profile/change-password`, {
        userId: localStorage.getItem('userId'),
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Password changed successfully');
      console.log('Password changed successfully');
      setProfile({
        ...profile,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Password change error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={
                previewImage ||
                (profile.profilePicture
                  ? `http://localhost:5000${profile.profilePicture}`
                  : '/default-profile.png')
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-200"
              onError={(e) => {
                e.target.src = '/default-profile.png';
              }}
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaUser className="mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center disabled:opacity-50"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Full Name"
                    required
                  />
                ) : (
                  <p className="text-gray-700">{profile.name}</p>
                )}
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>


              {/* here */}
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Username"
                  />
                ) : (
                  <p className="text-gray-700">{profile.username || 'Not provided'}</p>
                )}
              </div>

              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Address"
                  />
                ) : (
                  <p className="text-gray-700">{profile.address || 'Not provided'}</p>
                )}
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="Grade"
                    value={profile.Grade}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Grade"
                  />
                ) : (
                  <p className="text-gray-700">{profile.Grade || 'Not provided'}</p>
                )}
              </div>

              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="City"
                  />
                ) : (
                  <p className="text-gray-700">{profile.city || 'Not provided'}</p>
                )}
              </div>

              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="State"
                  />
                ) : (
                  <p className="text-gray-700">{profile.state || 'Not provided'}</p>
                )}
              </div>

              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="zip"
                    value={profile.zip}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Zip Code"
                  />
                ) : (
                  <p className="text-gray-700">{profile.zip || 'Not provided'}</p>
                )}
              </div>

              {/* here */}


              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Phone Number"
                  />
                ) : (
                  <p className="text-gray-700">{profile.phone || 'Not provided'}</p>
                )}
              </div>

              {userType === 'teacher' && (
                <div className="flex items-start">
                  <FaGraduationCap className="text-gray-500 mr-3 mt-1" />
                  {isEditing ? (
                    <textarea
                      name="qualifications"
                      value={profile.qualifications}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Qualifications"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {profile.qualifications || 'No qualifications added'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="flex items-center">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="currentPassword"
                  value={profile.currentPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Current Password"
                  required
                />
              </div>

              <div className="flex items-center">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="New Password (min 6 characters)"
                  required
                  minLength="6"
                />
              </div>

              <div className="flex items-center">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Confirm New Password"
                  required
                  minLength="6"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
              >
                <FaLock className="mr-2" /> Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
