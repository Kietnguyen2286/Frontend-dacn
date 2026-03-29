import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Users, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation trước khi gửi
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate(`/${result.user.role}`);
      } else {
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDemo = (role) => {
    const creds = role === 'admin' 
      ? { username: 'admin', password: 'admin123' }
      : { username: 'employee', password: 'emp123' };
    setUsername(creds.username);
    setPassword(creds.password);
    setTimeout(() => {
      const result = login(creds.username, creds.password);
      if (result.success) {
        navigate(`/${result.user.role}`);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 animate-fadeInScale">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Đăng Nhập</h1>
        <p className="text-center text-gray-500 mb-8">Hệ thống Quản lý Nhân viên</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="group">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold transform hover:scale-105 active:scale-95"
          >
            Đăng Nhập
          </button>
        </form>

        {/* Demo Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4 font-medium">Tài khoản mẫu:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemo('admin')}
              className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-700 rounded-lg hover:shadow-md transition-all duration-200 font-semibold text-sm transform hover:scale-105"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemo('employee')}
              className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 rounded-lg hover:shadow-md transition-all duration-200 font-semibold text-sm transform hover:scale-105"
            >
              Nhân viên
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
