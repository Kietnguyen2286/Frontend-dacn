import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      leaveType: 'Nghỉ phép',
      startDate: '10/01/2026',
      endDate: '12/01/2026',
      days: 3,
      reason: 'Du lịch gia đình',
      status: 'pending',
      requestDate: '05/01/2026'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Trần Thị B',
      leaveType: 'Nghỉ ốm',
      startDate: '08/01/2026',
      endDate: '09/01/2026',
      days: 2,
      reason: 'Bị cảm',
      status: 'approved',
      requestDate: '06/01/2026'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Lê Văn C',
      leaveType: 'Nghỉ phép',
      startDate: '15/01/2026',
      endDate: '20/01/2026',
      days: 6,
      reason: 'Nghỉ dưỡng sức',
      status: 'pending',
      requestDate: '04/01/2026'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Phạm Thị D',
      leaveType: 'Nghỉ việc riêng',
      startDate: '07/01/2026',
      endDate: '07/01/2026',
      days: 1,
      reason: 'Đi giải quyết việc cá nhân',
      status: 'approved',
      requestDate: '03/01/2026'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Hoàng Văn E',
      leaveType: 'Nghỉ phép',
      startDate: '20/01/2026',
      endDate: '25/01/2026',
      days: 6,
      reason: 'Về quê nghỉ Tết',
      status: 'pending',
      requestDate: '05/01/2026'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      employeeName: 'Vũ Thị F',
      leaveType: 'Nghỉ ốm',
      startDate: '05/01/2026',
      endDate: '06/01/2026',
      days: 2,
      reason: 'Đau dạ dày',
      status: 'approved',
      requestDate: '04/01/2026'
    },
    {
      id: 7,
      employeeId: 'EMP007',
      employeeName: 'Đỗ Văn G',
      leaveType: 'Nghỉ phép',
      startDate: '12/01/2026',
      endDate: '14/01/2026',
      days: 3,
      reason: 'Tham gia hội thảo',
      status: 'pending',
      requestDate: '06/01/2026'
    },
    {
      id: 8,
      employeeId: 'EMP008',
      employeeName: 'Bùi Thị H',
      leaveType: 'Nghỉ việc riêng',
      startDate: '09/01/2026',
      endDate: '09/01/2026',
      days: 1,
      reason: 'Đi khám bệnh',
      status: 'pending',
      requestDate: '07/01/2026'
    },
    {
      id: 9,
      employeeId: 'EMP009',
      employeeName: 'Đinh Văn I',
      leaveType: 'Nghỉ phép',
      startDate: '18/01/2026',
      endDate: '22/01/2026',
      days: 5,
      reason: 'Nghỉ thăm gia đình',
      status: 'approved',
      requestDate: '02/01/2026'
    },
    {
      id: 10,
      employeeId: 'EMP010',
      employeeName: 'Mai Thị K',
      leaveType: 'Nghỉ ốm',
      startDate: '03/01/2026',
      endDate: '04/01/2026',
      days: 2,
      reason: 'Sốt cao',
      status: 'approved',
      requestDate: '02/01/2026'
    },
    {
      id: 11,
      employeeId: 'EMP011',
      employeeName: 'Lý Văn L',
      leaveType: 'Nghỉ phép',
      startDate: '25/01/2026',
      endDate: '30/01/2026',
      days: 6,
      reason: 'Nghỉ Tết Nguyên Đán',
      status: 'pending',
      requestDate: '05/01/2026'
    },
    {
      id: 12,
      employeeId: 'EMP012',
      employeeName: 'Trương Thị M',
      leaveType: 'Nghỉ việc riêng',
      startDate: '11/01/2026',
      endDate: '11/01/2026',
      days: 1,
      reason: 'Đi làm thủ tục hành chính',
      status: 'rejected',
      requestDate: '08/01/2026'
    },
    {
      id: 13,
      employeeId: 'EMP013',
      employeeName: 'Phan Văn N',
      leaveType: 'Nghỉ phép',
      startDate: '16/01/2026',
      endDate: '17/01/2026',
      days: 2,
      reason: 'Tham dự đám cưới',
      status: 'approved',
      requestDate: '04/01/2026'
    },
    {
      id: 14,
      employeeId: 'EMP014',
      employeeName: 'Cao Thị O',
      leaveType: 'Nghỉ ốm',
      startDate: '02/01/2026',
      endDate: '03/01/2026',
      days: 2,
      reason: 'Đau răng',
      status: 'approved',
      requestDate: '01/01/2026'
    },
    {
      id: 15,
      employeeId: 'EMP015',
      employeeName: 'Tô Văn P',
      leaveType: 'Nghỉ phép',
      startDate: '22/01/2026',
      endDate: '28/01/2026',
      days: 7,
      reason: 'Du lịch nước ngoài',
      status: 'pending',
      requestDate: '06/01/2026'
    },
  ]);

  const [filter, setFilter] = useState('all');

  const handleApprove = (id) => {
    setLeaveRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'approved' } : req)
    );
    alert('Đã chấp nhận đơn nghỉ phép');
  };

  const handleReject = (id) => {
    setLeaveRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req)
    );
    alert('Đã từ chối đơn nghỉ phép');
  };

  const filteredRequests = filter === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status === filter);

  const stats = {
    pending: leaveRequests.filter(r => r.status === 'pending').length,
    approved: leaveRequests.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.filter(r => r.status === 'rejected').length,
  };

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Quản Lý Nghỉ Phép</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-50 rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Chờ Duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Đã Duyệt</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Từ Chối</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Chờ Duyệt
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Đã Duyệt
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Từ Chối
            </button>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Nhân Viên</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Loại</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thời Gian</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Số Ngày</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Lý Do</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Trạng Thái</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{request.employeeName}</div>
                      <div className="text-sm text-gray-500">{request.employeeId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{request.leaveType}</td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{request.startDate}</div>
                      <div className="text-gray-500">đến {request.endDate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{request.days} ngày</td>
                  <td className="py-4 px-6 max-w-xs truncate">{request.reason}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : request.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status === 'approved' ? 'Đã duyệt' : 
                       request.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveManagement;
