import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_URL from "../config";
import { useState } from "react";
import { useAuth } from "../Context/Authprovider";
import { checkBackendConnection } from '../utils/apiCheck';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [backendStatus, setBackendStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async(data) => {
    try {
      setLoading(true);
      console.log("Attempting login with:", data);
      const userInfo = {
        email: data.email,
        password: data.password
      };
      
      // Thêm timeout lâu hơn cho kết nối backend production
      const res = await axios.post(`${API_URL}/user/login`, userInfo, { 
        timeout: 15000,
        withCredentials: false // Thử tắt credentials nếu gặp vấn đề CORS
      });
      
      console.log("Login response:", res.data);
      
      if(res.data) {
        toast.success("Login Successfully");
        
        // Lưu thông tin user vào context và localStorage
        setAuth({
          ...auth,
          user: res.data.user
        });
        
        localStorage.setItem("User", JSON.stringify(res.data.user));
        
        console.log("User role:", res.data.user.role);
        console.log("User role lowercase:", res.data.user.role ? res.data.user.role.toLowerCase() : "undefined");
        
        // Kiểm tra cả chữ hoa và chữ thường, thêm nhiều log
        if(res.data.user.role && typeof res.data.user.role === 'string' && res.data.user.role.toLowerCase() === 'admin') {
          console.log("Admin role detected, redirecting to admin page");
          navigate('/admin');
        } else {
          console.log("Not an admin, redirecting to home page");
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Login error DETAILS:", error);
      
      // Hiển thị thêm thông tin lỗi
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        toast.error(`Error (${error.response.status}): ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Server không phản hồi. Kiểm tra kết nối mạng hoặc backend.");
      } else {
        toast.error("Lỗi: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    const result = await checkBackendConnection();
    setBackendStatus(result);
    if (result.success) {
      toast.success("Kết nối backend thành công!");
    } else {
      toast.error("Không thể kết nối backend!");
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-800 text-white">
        <div className="w-[400px] md:w-[600px]">
          <div className="modal-box bg-slate-900 text-white">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
              <h3 className="font-bold text-lg">Login</h3>
              <div className="m-4">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="w-50 md:w-80 px-3 py-1 mt-2 border rounded-md outline-none bg-slate-900 text-white"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && <span className="text-sm text-red-500">Email is required</span>}
              </div>
              <div className="m-4">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password here"
                  className="w-50 md:w-80 px-3 py-1 mt-2 border rounded-md outline-none bg-slate-900 text-white"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && <span className="text-sm text-red-500">Password is required</span>}
              </div>
              <div className="flex justify-around m-2 mt-6">
                <button
                  className={`bg-pink-500 text-white rounded-md px-3 py-2 hover:bg-pink-700 duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Login'}
                </button>
                <p className="mt-1">
                  Not Registered ?{" "}
                  <Link to={"/signup"}
                    className="text-pink-500 font-semibold underline cursor-pointer hover:text-pink-700 duration-200">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
            
            {/* Thêm nút kiểm tra kết nối backend */}
            <div className="text-center mt-4">
              <button
                type="button" // Đặt type="button" để không submit form
                onClick={testBackendConnection}
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Kiểm tra kết nối backend
              </button>
              
              {backendStatus && (
                <div className={`text-xs mt-2 ${backendStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                  {backendStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login;
