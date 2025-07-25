// mockApi.js
export const mockProfileData = {
    student: {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      profilePicture: ""
    },
    teacher: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      qualifications: "MSc in Computer Science, PhD in Education",
      profilePicture: ""
    }
  };
  
  export const mockApi = {
    get: (url) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userType = url.split('/')[2];
          resolve({ data: mockProfileData[userType] });
        }, 500);
      });
    },
    put: (url, data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Mock API update:", url, data);
          resolve({ data: { success: true } });
        }, 500);
      });
    }
  };