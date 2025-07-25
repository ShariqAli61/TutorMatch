import { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaHome,
  FaClock,
  FaBook,
  // FaMusic, // This icon seems unused, consider removing if not needed for instruments
  FaEdit,
  FaSave,
  FaCamera,
  FaIdCard
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    bio: '',
    username: '',
    levels: [],
    education: [], // In your backend schema, this is 'educationlevels'. Ensure consistency.
    timeZone: '',
    availability: [],
    subjects: [],
    // instruments: [], // This field is in the initial state but not in the provided backend schema for Teacher.
    studentStatus: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  // New state for custom subject input
  const [newSubject, setNewSubject] = useState('');

  // Function to fetch the teacher's profile data from the backend
  const fetchProfile = async () => {
    setLoading(true); // Set loading to true at the beginning of the fetch
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }
      // CORRECTED ENDPOINT: Changed '/api/teacher/profile' to '/api/teachers/profile'
      const response = await axios.get("http://localhost:5000/api/teachers/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure array fields are initialized as arrays if they are null/undefined from backend
      const data = response.data;
      setProfile({
        ...data,
        levels: Array.isArray(data.levels) ? data.levels : [],
        availability: Array.isArray(data.availability) ? data.availability : [],
        subjects: Array.isArray(data.subjects) ? data.subjects : [],
        // instruments: Array.isArray(data.instruments) ? data.instruments : [], // Assuming instruments might be added
        // Map backend 'educationlevels' to frontend 'education' if they are different
        education: data.educationlevels || data.education || '',
      });

      if (data.profilePicture) {
        setPreviewImage(`http://localhost:5000/uploads/${data.profilePicture}`);
      } else {
        setPreviewImage('/default-profile.png'); // Set default if no picture
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load profile');
      console.error("Profile fetch error:", error);
      // Set profile to a default state or handle appropriately
      setProfile({
        firstName: '', lastName: '', email: '', phone: '', cnic: '', address: '', city: '',
        state: '', zip: '', bio: '', username: '', levels: [], education: [],
        timeZone: '', availability: [], subjects: [], instruments: [],
        studentStatus: '', profilePicture: '',
      });
      setPreviewImage('/default-profile.png');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  // Handler for general input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handler for checkbox changes (for arrays like subjects, levels, availability)
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setProfile(prev => {
      // Ensure the target array exists
      const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
      return {
        ...prev,
        [name]: checked
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value)
      };
    });
  };

  // Handler for custom subject input
  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  // Handler to add custom subject to the list
  const handleAddSubject = () => {
    if (newSubject.trim() !== '' && !profile.subjects.includes(newSubject.trim())) {
      setProfile(prev => ({
        ...prev,
        subjects: [...(Array.isArray(prev.subjects) ? prev.subjects : []), newSubject.trim()]
      }));
      setNewSubject(''); // Clear the input after adding
    }
  };

  // Handler for profile picture image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handler for submitting the profile update form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        setIsSaving(false);
        return;
      }
      const formData = new FormData();
      
      // Append all profile data to FormData
      Object.keys(profile).forEach(key => {
        if (key === 'profilePicture' && profile[key] instanceof File) {
          formData.append(key, profile[key]);
        } else if (key === 'education' && profile.education) { // Ensure backend receives 'educationlevels'
            formData.append('educationlevels', profile.education);
        } else if (Array.isArray(profile[key])) {
          // Send arrays as JSON strings if your backend expects that,
          // or append each item if it expects multiple entries with the same key.
          // For now, assuming JSON string is preferred for simplicity in backend parsing.
          // However, for file uploads (multipart/form-data), it's common to send array items individually.
          // Let's try sending them individually if the backend is set up for it.
          // If not, JSON.stringify is safer.
          // Based on your backend registration, it seems to handle arrays directly if they are simple strings.
          profile[key].forEach(item => formData.append(`${key}[]`, item)); // Standard way to send arrays
          // If the above doesn't work, try: formData.append(key, JSON.stringify(profile[key]));
        } else if (profile[key] !== null && profile[key] !== undefined) { // Avoid sending null/undefined
          formData.append(key, profile[key]);
        }
      });

      // CORRECTED ENDPOINT: Changed '/api/teacher/profile' to '/api/teachers/profile'
      const response = await axios.put("http://localhost:5000/api/teachers/profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile(); // Refresh profile data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error("Update error:", error.response ? error.response.data : error);
    } finally {
      setIsSaving(false);
    }
  };

  // Display loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-gray-600 text-xl">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Teacher Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture and Edit/Save Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={previewImage || '/default-profile.png'}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src='/default-profile.png'; }}
              />
              {isEditing && (
                <label htmlFor="profilePictureInput" className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition duration-150 ease-in-out shadow-md">
                  <FaCamera size="1.2em"/>
                  <input
                    id="profilePictureInput"
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
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                >
                  <FaSave className="mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile(); // Reset changes on cancel
                  }}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mt-2 sm:mt-0 shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Information Fields */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Personal Information</h2>
              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-3 w-5 text-center" />
                  {isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <input type="text" name="firstName" value={profile.firstName || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="First Name" required />
                      <input type="text" name="lastName" value={profile.lastName || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Last Name" required />
                    </div>
                  ) : (
                    <p className="text-gray-700">{profile.firstName} {profile.lastName}</p>
                  )}
                </div>
                {/* Email */}
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-3 w-5 text-center" />
                  {isEditing ? (
                    <input type="email" name="email" value={profile.email || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Email" required />
                  ) : (
                    <p className="text-gray-700">{profile.email}</p>
                  )}
                </div>
                {/* Phone */}
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-3 w-5 text-center" />
                  {isEditing ? (
                    <input type="tel" name="phone" value={profile.phone || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Phone" />
                  ) : (
                    <p className="text-gray-700">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
                {/* Cnic */}
                <div className="flex items-center">
                  <FaIdCard className="text-gray-500 mr-3 w-5 text-center" />
                  {isEditing ? (
                    <input type="tel" name="cnic" value={profile.cnic || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="cnic" />
                  ) : (
                    <p className="text-gray-700">{profile.cnic || 'Not provided'}</p>
                  )}
                </div>
                {/* Address */}
                <div className="flex items-start">
                  <FaHome className="text-gray-500 mr-3 mt-1 w-5 text-center" />
                  {isEditing ? (
                    <div className="w-full space-y-2">
                      <input type="text" name="address" value={profile.address || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Street Address" />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" name="city" value={profile.city || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="City" />
                        <input type="text" name="state" value={profile.state || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="State" />
                        <input type="text" name="zip" value={profile.zip || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="ZIP Code" />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      {profile.address || 'No address'}, {profile.city || 'N/A'}, {profile.state || 'N/A'} {profile.zip || ''}
                    </p>
                  )}
                </div>
                {/* Bio */}
                <div className="flex items-start">
                  <FaUser className="text-gray-500 mr-3 mt-1 w-5 text-center" /> {/* Consider a different icon for Bio, e.g., FaInfoCircle */}
                  {isEditing ? (
                    <textarea name="bio" value={profile.bio || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Tell us a bit about yourself and your teaching style..." rows="3" />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{profile.bio || 'No bio provided.'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Education & Status</h2>
              <div className="space-y-4">
                {/* Education Level */}
                <div className="flex items-center">
                  <FaGraduationCap className="text-gray-500 mr-3 w-5 text-center" />
                  {isEditing ? (
                    <select name="education" value={profile.education || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select highest education</option>
                      <option value="High School">High School Diploma/GED</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate">Doctorate (Ph.D., Ed.D., etc.)</option>
                      <option value="Professional Degree">Professional Degree (MD, JD, etc.)</option>
                      <option value="Some College">Some College (No Degree)</option>
                      <option value="Trade School">Trade School/Vocational Training</option>
                    </select>
                  ) : (
                    <p className="text-gray-700">{profile.education || 'Not specified'}</p>
                  )}
                </div>
                {/* Student Status */}
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-3 w-5 text-center" /> {/* Consider FaUserGraduate icon */}
                  {isEditing ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 mb-1">Are you currently a student?</p>
                      <label className="flex items-center mr-4">
                        <input type="radio" name="studentStatus" value="Yes" checked={profile.studentStatus === 'Yes'} onChange={handleInputChange} className="mr-2 focus:ring-blue-500"/> Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="studentStatus" value="No" checked={profile.studentStatus === 'No'} onChange={handleInputChange} className="mr-2 focus:ring-blue-500"/> No
                      </label>
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      Currently a student: {profile.studentStatus || 'Not specified'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Teaching Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Teaching Preferences</h2>
              <div className="space-y-4">
                {/* Subjects */}
                <div>
                  <h2 className="font-medium text-gray-600 mb-2 flex items-center"><FaBook className="mr-2 text-gray-500" /> Subjects You Teach</h2>
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {["Math", 
                         "English","Science",  "History", "Computer Science", "Art",  "Chemistry", "Biology", "Physics", "Web Development", "Statistics", "Geometry", "Literature", "Grammar", "Economics", "Geography", "pakistan studies"
                      ].sort().map(subject => (
                          <label key={subject} className="flex items-center text-sm">
                            <input type="checkbox" name="subjects" value={subject} checked={(profile.subjects || []).includes(subject)} onChange={handleCheckboxChange} className="mr-2 rounded focus:ring-blue-500"/>
                            {subject}
                          </label>
                        ))}
                        {/* Render dynamically added subjects */}
                        {(profile.subjects || [])
                          .filter(subject => ![
                            "Math", "English","Science",  "History", "Computer Science", "Art",  "Chemistry", "Biology", "Physics", "Web Development", "Statistics", "Geometry", "Literature", "Grammar", "Economics", "Geography", "pakistan studies"

                          ].includes(subject))
                          .sort()
                          .map(subject => (
                            <label key={subject} className="flex items-center text-sm">
                              <input type="checkbox" name="subjects" value={subject} checked={true} onChange={handleCheckboxChange} className="mr-2 rounded focus:ring-blue-500"/>
                              {subject}
                            </label>
                          ))
                        }
                      </div>
                      {/* Input for new subjects */}
                      <div className="flex mt-4">
                        <input
                          type="text"
                          value={newSubject}
                          onChange={handleNewSubjectChange}
                          placeholder="Add new subject"
                          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddSubject}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
                          disabled={newSubject.trim() === ''}
                        >
                          Add
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(profile.subjects || []).length > 0 ? (
                        profile.subjects.map(subject => (
                          <span key={subject} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{subject}</span>
                        ))
                      ) : <p className="text-gray-500 text-sm">No subjects specified.</p>}
                    </div>
                  )}
                </div>
                {/* Levels */}
                <div>
                  <h2 className="font-medium text-gray-600 mb-2 flex items-center"><FaUser className="mr-2 text-gray-500" /> Student Levels You Teach</h2> {/* Consider FaUsers icon */}
                  {isEditing ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Elementary (K-5)", "Middle School (6-8)", "High School (9-12)", "College/University", "Adult Learner", "Professional Development"].map(level => (
                        <label key={level} className="flex items-center text-sm">
                          <input type="checkbox" name="levels" value={level} checked={(profile.levels || []).includes(level)} onChange={handleCheckboxChange} className="mr-2 rounded focus:ring-blue-500"/>
                          {level}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(profile.levels || []).length > 0 ? (
                        profile.levels.map(level => (
                          <span key={level} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{level}</span>
                        ))
                      ) : <p className="text-gray-500 text-sm">No levels specified.</p>}
                    </div>
                  )}
                </div>
                {/* Availability */}
                <div>
                  <h2 className="font-medium text-gray-600 mb-2 flex items-center"><FaClock className="mr-2 text-gray-500" /> General Availability</h2>
                    {isEditing ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {/* Simplified availability options */}
                      {["Mondays: mornings", "Mondays: afternoons", "Mondays: evenings",
    "Tuesdays: mornings", "Tuesdays: afternoons", "Tuesdays: evenings",
    "Wednesdays: mornings", "Wednesdays: afternoons", "Wednesdays: evenings",
    "Thursdays: mornings", "Thursdays: afternoons", "Thursdays: evenings",
    "Fridays: mornings", "Fridays: afternoons", "Fridays: evenings",
    "Saturdays: mornings", "Saturdays: afternoons", "Saturdays: evenings",
    "Sundays: mornings", "Sundays: afternoons", "Sundays: evenings"].map(time => (
                        <label key={time} className="flex items-center text-sm">
                          <input type="checkbox" name="availability" value={time} checked={(profile.availability || []).includes(time)} onChange={handleCheckboxChange} className="mr-2 rounded focus:ring-blue-500"/>
                          {time}
                        </label>
                      ))}
                    </div>
                  ) : (
                      <div className="flex flex-wrap gap-2">
                        {(profile.availability || []).length > 0 ? (
                          profile.availability.map(time => (
                            <span key={time} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">{time}</span>
                          ))
                        ) : <p className="text-gray-500 text-sm">No availability specified.</p>}
                      </div>
                    )}
                </div>
                  {/* Time Zone */}
                <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-3 mt-1 w-5 text-center" /> {/* Or FaGlobeAmericas */}
                    {isEditing ? (
                        <input 
                            type="text" 
                            name="timeZone" 
                            value={profile.timeZone || ''} 
                            onChange={handleInputChange} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="e.g., EST, PST, GMT+5" 
                        />
                    ) : (
                        <p className="text-gray-700">Time Zone: {profile.timeZone || 'Not specified'}</p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherProfile;