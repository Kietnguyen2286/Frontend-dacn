import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Camera, Save, X, Upload } from 'lucide-react';

const AccountManagement = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || '',
    role: user?.role || '',
  });

  const avatarOptions = Array.from({ length: 30 }, (_, i) => 
    `https://i.pravatar.cc/150?img=${i}`
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Save to backend
    console.log('Saving:', formData);
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Upload to backend
      console.log('Uploading file:', file);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Tài Khoản</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? 'Hủy' : 'Chỉnh Sửa'}
          </button>
        </div>

        {/* Avatar Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Ảnh Đại Diện</h2>
          
          <div className="flex items-center space-x-8">
            {/* Current Avatar */}
            <div className="flex flex-col items-center">
              <img 
                src={avatarOptions[selectedAvatar]}
                alt="Current Avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
              />
              <p className="mt-2 text-sm text-gray-600">Ảnh hiện tại</p>
            </div>

            {/* Avatar Selection */}
            {isEditing && (
              <div className="flex-1">
                <p className="font-semibold mb-4">Chọn ảnh đại diện</p>
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {avatarOptions.slice(0, 15).map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAvatar(idx)}
                      className={`rounded-full border-2 transition-all transform hover:scale-110 ${
                        selectedAvatar === idx ? 'border-blue-500 ring-4 ring-blue-300' : 'border-gray-300'
                      }`}
                    >
                      <img 
                        src={avatar}
                        alt={`avatar-${idx}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Upload Custom Avatar */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Hoặc tải lên ảnh của bạn</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Chọn File
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Information Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Thông Tin Tài Khoản</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên Đăng Nhập
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chức Vụ
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={true}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed capitalize"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ Tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Bảo Mật</h2>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
              <span>Thay Đổi Mật Khẩu</span>
              <span className="text-gray-400">&gt;</span>
            </button>
            <button 
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition flex justify-between items-center text-red-600"
            >
              <span>Đăng Xuất</span>
              <span className="text-gray-400">&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountManagement;
