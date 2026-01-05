import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const AttendanceHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState('01/2026');

  const attendanceData = [
    { 
      id: 1, 
      date: '06/01/2026', 
      day: 'Thứ 2',
      checkIn: '08:00', 
      checkOut: '17:30', 
      hours: '8.5',
      overtime: '0.5',
      status: 'Đúng giờ'
    },
    { 
      id: 2, 
      date: '05/01/2026', 
      day: 'Chủ Nhật',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ'
    },
    { 
      id: 3, 
      date: '04/01/2026', 
      day: 'Thứ 7',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ'
    },
    { 
      id: 4, 
      date: '03/01/2026', 
      day: 'Thứ 6',
      checkIn: '08:15', 
      checkOut: '17:15', 
      hours: '8.0',
      overtime: '0',
      status: 'Đúng giờ'
    },
    { 
      id: 5, 
      date: '02/01/2026', 
      day: 'Thứ 5',
      checkIn: '08:00', 
      checkOut: '18:00', 
      hours: '9.0',
      overtime: '1.0',
      status: 'Đúng giờ'
    },
    { 
      id: 6, 
      date: '01/01/2026', 
      day: 'Thứ 4',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ lễ'
    },
    { 
      id: 7, 
      date: '31/12/2025', 
      day: 'Thứ 3',
      checkIn: '08:30', 
      checkOut: '17:30', 
      hours: '8.0',
      overtime: '0',
      status: 'Đi muộn'
    },
    { 
      id: 8, 
      date: '30/12/2025', 
      day: 'Thứ 2',
      checkIn: '08:00', 
      checkOut: '17:00', 
      hours: '8.0',
      overtime: '0',
      status: 'Đúng giờ'
    },
    { 
      id: 9, 
      date: '29/12/2025', 
      day: 'Chủ Nhật',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ'
    },
    { 
      id: 10, 
      date: '28/12/2025', 
      day: 'Thứ 7',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ'
    },
    { 
      id: 11, 
      date: '27/12/2025', 
      day: 'Thứ 6',
      checkIn: '08:45', 
      checkOut: '17:15', 
      hours: '7.5',
      overtime: '0',
      status: 'Đi muộn'
    },
    { 
      id: 12, 
      date: '26/12/2025', 
      day: 'Thứ 5',
      checkIn: '08:00', 
      checkOut: '17:30', 
      hours: '8.5',
      overtime: '0.5',
      status: 'Đúng giờ'
    },
    { 
      id: 13, 
      date: '25/12/2025', 
      day: 'Thứ 4',
      checkIn: '-', 
      checkOut: '-', 
      hours: '0',
      overtime: '0',
      status: 'Nghỉ lễ'
    },
    { 
      id: 14, 
      date: '24/12/2025', 
      day: 'Thứ 3',
      checkIn: '08:00', 
      checkOut: '19:00', 
      hours: '10.0',
      overtime: '2.0',
      status: 'Đúng giờ'
    },
    { 
      id: 15, 
      date: '23/12/2025', 
      day: 'Thứ 2',
      checkIn: '08:10', 
      checkOut: '17:20', 
      hours: '8.17',
      overtime: '0.17',
      status: 'Đúng giờ'
    },
  ];

  const monthlyStats = {
    totalDays: 22,
    workDays: 18,
    leaveDays: 2,
    lateDays: 2,
    totalHours: 144,
    overtime: 4,
    avgHoursPerDay: 8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đúng giờ':
        return 'bg-green-100 text-green-800';
      case 'Đi muộn':
        return 'bg-yellow-100 text-yellow-800';
      case 'Nghỉ':
        return 'bg-gray-100 text-gray-800';
      case 'Nghỉ lễ':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Lịch Sử Chấm Công</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Tháng
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="01/2026">Tháng 1/2026</option>
              <option value="12/2025">Tháng 12/2025</option>
              <option value="11/2025">Tháng 11/2025</option>
              <option value="10/2025">Tháng 10/2025</option>
            </select>
          </div>
        </div>

        {/* Monthly Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Số Ngày Công</p>
            <p className="text-3xl font-bold text-gray-800">
              {monthlyStats.workDays}/{monthlyStats.totalDays}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Tổng Giờ Làm</p>
            <p className="text-3xl font-bold text-gray-800">{monthlyStats.totalHours}h</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Giờ Làm Thêm</p>
            <p className="text-3xl font-bold text-gray-800">{monthlyStats.overtime}h</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Đi Muộn</p>
            <p className="text-3xl font-bold text-gray-800">{monthlyStats.lateDays} lần</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Chi Tiết Chấm Công</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Ngày</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thứ</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Giờ Vào</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Giờ Ra</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Số Giờ</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Làm Thêm</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{record.date}</td>
                    <td className="py-4 px-6">{record.day}</td>
                    <td className="py-4 px-6">{record.checkIn}</td>
                    <td className="py-4 px-6">{record.checkOut}</td>
                    <td className="py-4 px-6 font-semibold text-blue-600">{record.hours}h</td>
                    <td className="py-4 px-6 text-purple-600">{record.overtime}h</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Trung Bình Giờ/Ngày</p>
              <p className="text-2xl font-bold text-blue-600">{monthlyStats.avgHoursPerDay}h</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày Nghỉ Phép</p>
              <p className="text-2xl font-bold text-green-600">{monthlyStats.leaveDays} ngày</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tỷ Lệ Đi Làm</p>
              <p className="text-2xl font-bold text-purple-600">
                {((monthlyStats.workDays / monthlyStats.totalDays) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceHistory;
