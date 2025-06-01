import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import BooksPage from "./Pages/BooksPage";
import HomePage from "./Pages/HomePage";
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./Context/Authprovider";
import ProfilePage from "./Pages/ProfilePage";
import ReadBook from "./Components/ReadBook";
import SearchResults from "./Components/SearchResults";

// Import các components Admin mới
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminUsers from './Components/Admin/AdminUsers';
import AdminBooks from './Components/Admin/AdminBooks';
import DebugAdmin from './Components/Admin/DebugAdmin';
import { useEffect } from "react";
import API_URL from "./config";

export default function App() {
  const [auth] = useAuth();
  
  // Log API URL khi ứng dụng khởi động
  useEffect(() => {
    console.log("App initialized with API_URL:", API_URL);
    console.log("Current auth state:", auth);
    
    // Test backend connection
    const checkBackend = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Backend connection test:", data);
      } catch (error) {
        console.error("Backend connection failed:", error);
      }
    };
    
    checkBackend();
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={auth ? <BooksPage /> : <Navigate to={'/login'} />} />
          <Route
            path="/profile"
            element={auth ? <ProfilePage /> : <Navigate to={'/login'} />} />
          <Route
            path="/read/:id"
            element={auth ? <ReadBook /> : <Navigate to={'/login'} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/debug" element={<DebugAdmin />} /> {/* Route này không yêu cầu authentication */}

          {/* Admin Routes - đảm bảo không phụ thuộc vào auth từ context */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="debug" element={<DebugAdmin />} />
          </Route>
          
          {/* Fallback cho đường dẫn không tồn tại */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-3xl font-bold mb-4">404 - Trang không tồn tại</h1>
              <p className="mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
              <Link to="/" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                Quay về trang chủ
              </Link>
            </div>
          } />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}