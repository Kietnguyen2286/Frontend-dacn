import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Đang xác nhận email của bạn...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('error');
        setMessage('Liên kết không hợp lệ hoặc thiếu thông tin.');
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            email
          })
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.message);
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Không thể xác nhận email.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Lỗi kết nối: ' + (err.message || 'Không xác định'));
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {status === 'loading' && (
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
              <Mail className="w-8 h-8 text-white animate-pulse" />
            </div>
          )}
          {status === 'success' && (
            <div className="p-3 bg-green-500 rounded-full shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          )}
          {status === 'error' && (
            <div className="p-3 bg-red-500 rounded-full shadow-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {status === 'loading' && 'Đang xác nhận'}
          {status === 'success' && 'Thành công!'}
          {status === 'error' && 'Lỗi'}
        </h1>

        {/* Message */}
        <p className={`text-center mb-6 ${
          status === 'loading' ? 'text-gray-600' : 
          status === 'success' ? 'text-green-600' : 
          'text-red-600'
        }`}>
          {message}
        </p>

        {/* Status indicator */}
        {status === 'loading' && (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
            Bạn sẽ được chuyển hướng đến trang đăng nhập trong vài giây...
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {message}
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Quay lại đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
