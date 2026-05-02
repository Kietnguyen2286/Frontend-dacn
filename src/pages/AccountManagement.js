import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Camera, Save, X, Upload, LogOut, Edit2 } from 'lucide-react';

const AccountManagement = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const saved = localStorage.getItem('userAvatar');
    return saved ? parseInt(saved) : 0;
  });
  const [customAvatarUrl, setCustomAvatarUrl] = useState(() => {
    return localStorage.getItem('customAvatarUrl') || null;
  });
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
    console.log('Saving:', formData);
    setIsEditing(false);
  };

  const handleAvatarSelect = (idx) => {
    setSelectedAvatar(idx);
    setCustomAvatarUrl(null);
    localStorage.setItem('userAvatar', idx.toString());
    localStorage.removeItem('customAvatarUrl');
    setShowAvatarModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setCustomAvatarUrl(base64Url);
        localStorage.setItem('customAvatarUrl', base64Url);
        localStorage.setItem('userAvatar', '-1');
        setShowAvatarModal(false);
        console.log('✅ Custom avatar uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentAvatarUrl = () => {
    return customAvatarUrl || avatarOptions[selectedAvatar];
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Thông Tin Tài Khoản</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Edit2 className="w-5 h-5" />
              <span>Chỉnh Sửa</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 text-center sticky top-6">
              <h2 className="text-lg font-bold mb-6 text-gray-800">Ảnh Đại Diện</h2>
              
              <div className="mb-6">
                <button
                  onClick={() => setShowAvatarModal(true)}
                  className="relative inline-block group w-full text-center"
                >
                  <img 
                    src={getCurrentAvatarUrl()}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mx-auto cursor-pointer hover:opacity-80 transition"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-1/2 translate-x-16 bg-blue-600 text-white p-3 rounded-full shadow-lg group-hover:bg-blue-700">
                      <Camera className="w-5 h-5" />
                    </div>
                  )}
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  {isEditing ? 'Click ảnh để thay đổi' : 'Ảnh đại diện'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 mb-6">
                <p className="text-2xl font-bold text-gray-800">{user?.name}</p>
                <p className="text-indigo-600 font-semibold capitalize text-lg mt-1">{user?.role}</p>
                <p className="text-gray-500 text-sm mt-2">@{user?.username}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng Xuất</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông Tin Cá Nhân</h2>
              
              <div className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-base"
                  />
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-base"
                  />
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed capitalize text-base"
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-6 border-t">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 font-medium transition"
                    >
                      <Save className="w-5 h-5" />
                      <span>Lưu Thay Đổi</span>
                    </button>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <h3 className="font-bold text-gray-800 mb-4">Bảo Mật</h3>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
                    <span className="font-medium text-gray-700">Thay Đổi Mật Khẩu</span>
                    <span className="text-gray-400">&gt;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Chọn Ảnh Đại Diện</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <p className="font-semibold text-gray-800 mb-4">Chọn từ danh sách có sẵn:</p>
                <div className="grid grid-cols-5 gap-4">
                  {avatarOptions.map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAvatarSelect(idx)}
                      className={`rounded-full border-4 transition-all transform hover:scale-110 ${
                        selectedAvatar === idx && !customAvatarUrl ? 'border-blue-500 ring-4 ring-blue-300' : 'border-gray-300'
                      }`}
                    >
                      <img 
                        src={avatar}
                        alt={`avatar-${idx}`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="font-semibold text-gray-800 mb-4">Hoặc tải lên ảnh từ máy:</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-3 font-medium">Kéo thả ảnh tại đây hoặc click để chọn</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer font-medium transition"
                  >
                    Chọn Ảnh
                  </label>
                </div>
                {customAvatarUrl && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Ảnh tải lên thành công</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AccountManagement;
