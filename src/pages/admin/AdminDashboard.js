import React from 'react';
import Layout from '../../components/Layout';
import { Users, Calendar, DollarSign, CheckCircle, TrendingUp, Target, Award } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Tổng Nhân Viên', 
      value: '15', 
      icon: Users, 
      color: 'bg-blue-500',
      change: '+3 tháng này'
    },
    { 
      title: 'Đơn Nghỉ Phép', 
      value: '18', 
      icon: Calendar, 
      color: 'bg-yellow-500',
      change: '6 chờ duyệt'
    },
    { 
      title: 'Chi Phí Tháng Này', 
      value: '142M', 
      icon: DollarSign, 
      color: 'bg-green-500',
      change: '+8% so với tháng trước'
    },
    { 
      title: 'Lương Đã Thanh Toán', 
      value: '89%', 
      icon: CheckCircle, 
      color: 'bg-purple-500',
      change: '13/15 nhân viên'
    },
  ];

  const recentLeaves = [
    { id: 1, name: 'Nguyễn Văn A', type: 'Nghỉ phép', date: '10/01 - 12/01', status: 'pending' },
    { id: 2, name: 'Trần Thị B', type: 'Nghỉ ốm', date: '08/01 - 09/01', status: 'approved' },
    { id: 3, name: 'Lê Văn C', type: 'Nghỉ phép', date: '15/01 - 20/01', status: 'pending' },
    { id: 4, name: 'Phạm Thị D', type: 'Nghỉ việc riêng', date: '07/01', status: 'approved' },
    { id: 5, name: 'Hoàng Văn E', type: 'Nghỉ phép', date: '20/01 - 25/01', status: 'pending' },
    { id: 6, name: 'Vũ Thị F', type: 'Nghỉ ốm', date: '05/01 - 06/01', status: 'approved' },
    { id: 7, name: 'Đỗ Văn G', type: 'Nghỉ phép', date: '12/01 - 14/01', status: 'pending' },
    { id: 8, name: 'Bùi Thị H', type: 'Nghỉ việc riêng', date: '09/01', status: 'pending' },
  ];

  const kpiSummary = {
    overallPercentage: 102,
    completedCount: 10,
    totalEmployees: 12,
    trend: '+5%'
  };

  return (
    <Layout>
      <div className="animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Dashboard Quản Trị</h1>
          <p className="text-gray-600">Tổng quan hệ thống quản lý nhân viên</p>
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
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">{stat.change}</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* KPI Summary Section */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tổng Quan KPI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Hiệu suất chung</p>
                  <p className="text-4xl font-bold text-blue-600 mt-3">{kpiSummary.overallPercentage}%</p>
                  <p className="text-green-600 text-xs font-semibold mt-2">{kpiSummary.trend} so với quý trước</p>
                </div>
                <TrendingUp className="w-14 h-14 text-blue-300" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300">
              <div>
                <p className="text-gray-600 text-sm font-medium">Chỉ tiêu hoàn thành</p>
                <p className="text-4xl font-bold text-green-600 mt-3">{kpiSummary.completedCount}/{kpiSummary.totalEmployees}</p>
                <p className="text-gray-600 text-xs font-medium mt-2">Nhân viên đạt/vượt mục tiêu</p>
              </div>
              <Award className="w-14 h-14 text-green-300 absolute right-6 top-6 opacity-50" />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 relative">
              <div>
                <p className="text-gray-600 text-sm font-medium">Trạng thái hiệu suất</p>
                <p className="text-3xl font-bold text-purple-600 mt-3">
                  {kpiSummary.overallPercentage >= 100 ? '🎯 Vượt chỉ tiêu' : '📊 Trong kế hoạch'}
                </p>
                <p className="text-gray-600 text-xs font-medium mt-2">Tổng thể toàn công ty</p>
              </div>
              <Target className="w-14 h-14 text-purple-300 absolute right-6 top-6 opacity-50" />
            </div>
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Đơn Nghỉ Phép Gần Đây</h2>
            <p className="text-gray-500 text-sm">Danh sách các đơn chờ xử lý</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Nhân Viên</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Loại</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Ngày</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave, idx) => (
                  <tr key={leave.id} className="border-b hover:bg-gradient-to-r hover:from-indigo-50 to-purple-50 transition-all duration-200 transform hover:scale-101"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{leave.name}</td>
                    <td className="py-3 px-4 text-gray-600">{leave.type}</td>
                    <td className="py-3 px-4 text-gray-600">{leave.date}</td>
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

export default AdminDashboard;
