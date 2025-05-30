import axios from 'axios';
import API_URL from '../config';

export const checkBackendConnection = async () => {
  try {
    console.log("Kiểm tra kết nối tới Backend:", API_URL);
    const response = await axios.get(`${API_URL}`, { timeout: 5000 });
    console.log("Phản hồi từ backend:", response.data);
    return {
      success: true,
      message: "Kết nối backend thành công",
      data: response.data
    };
  } catch (error) {
    console.error("Lỗi kết nối backend:", error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
