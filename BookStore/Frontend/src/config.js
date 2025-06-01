// Config for backend API URL
const API_URL = "https://bs-noqz.onrender.com";

// Log API URL khi file config được import
console.log("Backend API URL loaded:", API_URL);

// Thêm function kiểm tra API URL
const checkApiUrl = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Backend API ping successful:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Backend API ping failed:", error);
    return { success: false, error };
  }
};

// Tự động kiểm tra kết nối khi file được import
checkApiUrl();

export default API_URL;