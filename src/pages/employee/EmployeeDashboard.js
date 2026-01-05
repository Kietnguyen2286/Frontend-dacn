import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CheckCircle, Clock, FileText } from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Nghỉ Phép Còn Lại', 
      value: '14', 
      icon: Calendar, 
      color: 'bg-blue-500',
      unit: 'ngày'
    },
    { 
      title: 'Đơn Chờ Duyệt', 
      value: '2', 
      icon: Clock, 
      color: 'bg-yellow-500',
      unit: 'đơn'
    },
    { 
      title: 'Đơn Đã Duyệt', 
      value: '8', 
      icon: CheckCircle, 
      color: 'bg-green-500',
      unit: 'đơn'
    },
    { 
      title: 'Tổng Đơn', 
      value: '10', 
      icon: FileText, 
      color: 'bg-purple-500',
      unit: 'đơn'
    },
  ];

  const recentLeaves = [
    { id: 1, type: 'Nghỉ phép', date: '15/12/2025 - 20/12/2025', days: 6, status: 'approved' },
    { id: 2, type: 'Nghỉ ốm', date: '05/11/2025 - 06/11/2025', days: 2, status: 'approved' },
    { id: 3, type: 'Nghỉ phép', date: '10/01/2026 - 12/01/2026', days: 3, status: 'pending' },
    { id: 4, type: 'Nghỉ phép', date: '20/01/2026 - 25/01/2026', days: 6, status: 'pending' },
    { id: 5, type: 'Nghỉ việc riêng', date: '20/10/2025', days: 1, status: 'approved' },
  ];

  return (
    <Layout>
      <div className="animate-fadeIn">
        <div className="mb-8 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl border border-indigo-200">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Xin chào, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Chào mừng bạn trở lại với hệ thống quản lý</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 100}ms backwards`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.unit}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Đơn Nghỉ Phép Gần Đây</h2>
            <p className="text-gray-500 text-sm">Danh sách các đơn của bạn</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Loại Nghỉ</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Thời Gian</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Số Ngày</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave, idx) => (
                  <tr key={leave.id} className="border-b hover:bg-gradient-to-r hover:from-indigo-50 to-purple-50 transition-all duration-200 transform hover:scale-101">
                    <td className="py-3 px-4 font-medium text-gray-800">{leave.type}</td>
                    <td className="py-3 px-4 text-gray-600">{leave.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">{leave.days} ngày</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 inline-block ${
                        leave.status === 'approved' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                          : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {leave.status === 'approved' ? '✓ Đã duyệt' : '⏳ Chờ duyệt'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default EmployeeDashboard;
