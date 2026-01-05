import React from 'react';
import Layout from '../../components/Layout';
import { Users, Calendar, DollarSign, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Tổng Nhân Viên', 
      value: '45', 
      icon: Users, 
      color: 'bg-blue-500',
      change: '+5 tháng này'
    },
    { 
      title: 'Đơn Nghỉ Phép', 
      value: '12', 
      icon: Calendar, 
      color: 'bg-yellow-500',
      change: '8 chờ duyệt'
    },
    { 
      title: 'Chi Phí Tháng Này', 
      value: '125M', 
      icon: DollarSign, 
      color: 'bg-green-500',
      change: '+15% so với tháng trước'
    },
    { 
      title: 'Nhiệm Vụ Hoàn Thành', 
      value: '87%', 
      icon: CheckCircle, 
      color: 'bg-purple-500',
      change: 'Tốt'
    },
  ];

  const recentLeaves = [
    { id: 1, name: 'Nguyễn Văn A', type: 'Nghỉ phép', date: '10/01 - 12/01', status: 'pending' },
    { id: 2, name: 'Trần Thị B', type: 'Nghỉ ốm', date: '08/01 - 09/01', status: 'approved' },
    { id: 3, name: 'Lê Văn C', type: 'Nghỉ phép', date: '15/01 - 20/01', status: 'pending' },
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

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
                <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.change}</p>
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
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Nhân Viên</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Loại</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Ngày</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{leave.name}</td>
                    <td className="py-3 px-4">{leave.type}</td>
                    <td className="py-3 px-4">{leave.date}</td>
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

export default AdminDashboard;
