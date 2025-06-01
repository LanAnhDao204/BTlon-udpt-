import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const DebugAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userInfo = localStorage.getItem("User");
        if (!userInfo) {
          setError("No user info in localStorage");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userInfo);
        if (!user.id) {
          setError("User object has no ID");
          setLoading(false);
          return;
        }

        setUserData({
          fromStorage: user
        });

        // Fetch actual data from API
        const response = await axios.get(`${API_URL}/user/profile/${user.id}`);
        setUserData(prev => ({
          ...prev,
          fromAPI: response.data
        }));
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (loading) return <div>Đang kiểm tra thông tin người dùng...</div>;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Debug Admin Access</h2>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded mb-4 text-red-800 dark:text-red-200">
          <h3 className="font-bold">Lỗi:</h3>
          <p>{error}</p>
        </div>
      )}

      {userData && (
        <div>
          <h3 className="font-semibold mb-2">User từ localStorage:</h3>
          <pre className="bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-auto max-h-40 mb-4">
            {JSON.stringify(userData.fromStorage, null, 2)}
          </pre>
          
          {userData.fromAPI && (
            <>
              <h3 className="font-semibold mb-2">User từ API:</h3>
              <pre className="bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-auto max-h-40">
                {JSON.stringify(userData.fromAPI, null, 2)}
              </pre>
              
              <div className="mt-4 p-3 border border-gray-300 dark:border-gray-600 rounded">
                <p><strong>Role:</strong> {userData.fromAPI.role}</p>
                <p><strong>Is Admin:</strong> {userData.fromAPI.role?.toLowerCase() === 'admin' ? 'Yes ✅' : 'No ❌'}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugAdmin;
