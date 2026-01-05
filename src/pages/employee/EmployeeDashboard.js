import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CheckCircle, Clock, FileText } from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Nghỉ Phép Còn Lại', 
      value: '12', 
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
  ];

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Xin chào, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Chào mừng bạn trở lại với hệ thống quản lý</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stat.value} <span className="text-lg text-gray-500">{stat.unit}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Đơn Nghỉ Phép Gần Đây</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Loại Nghỉ</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Thời Gian</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Số Ngày</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{leave.type}</td>
                    <td className="py-3 px-4">{leave.date}</td>
                    <td className="py-3 px-4">{leave.days} ngày</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        leave.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {leave.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
