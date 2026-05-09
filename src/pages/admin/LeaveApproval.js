import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Check, X, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const itemsPerPage = 8;

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const fetchPendingLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/leaves/approval/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setLeaves(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/leaves/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        setMessage('✅ Đã chấp nhận đơn xin phép');
        setLeaves(leaves.filter(l => l.id !== id));
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error approving leave:', error);
      setMessage('❌ Lỗi khi duyệt đơn');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/leaves/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      if (response.ok) {
        setMessage('❌ Đã từ chối đơn xin phép');
        setLeaves(leaves.filter(l => l.id !== id));
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
      setMessage('❌ Lỗi khi từ chối đơn');
    }
  };

  const filteredLeaves = leaves.filter(leave =>
    leave.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.leave_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedLeaves = filteredLeaves.slice(startIdx, endIdx);

  const stats = {
    pending: leaves.length,
    totalDays: leaves.reduce((sum, l) => sum + (l.days || 0), 0)
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600">Đang tải dữ liệu...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Duyệt Đơn Xin Phép</h1>
        <p className="text-gray-600 mb-8">Phê duyệt hoặc từ chối các đơn xin phép của nhân viên</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 border border-yellow-100" style={{animation: 'slideUp 0.5s ease-out 0ms backwards'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Đơn Chờ Duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100" style={{animation: 'slideUp 0.5s ease-out 100ms backwards'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng Số Ngày</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalDays}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 animate-slideUp">
            {message}
          </div>
        )}

        {/* Search */}
        <div className="mb-6 flex items-center gap-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, ID, loại nghỉ, hoặc lý do..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">ID Nhân Viên</th>
                  <th className="py-4 px-6 text-left font-semibold">Tên Nhân Viên</th>
                  <th className="py-4 px-6 text-left font-semibold">Phòng Ban</th>
                  <th className="py-4 px-6 text-left font-semibold">Loại Nghỉ</th>
                  <th className="py-4 px-6 text-left font-semibold">Từ - Đến</th>
                  <th className="py-4 px-6 text-left font-semibold">Lý Do</th>
                  <th className="py-4 px-6 text-left font-semibold">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedLeaves.length > 0 ? (
                  paginatedLeaves.map(leave => (
                    <tr key={leave.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm font-medium text-gray-700">
                        {leave.employee_id}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {leave.employee_name}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {leave.department}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">{leave.leave_type}</td>
                      <td className="py-4 px-6 text-sm">
                        {new Date(leave.start_date).toLocaleDateString('vi-VN')} - {new Date(leave.end_date).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">
                        {leave.reason}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleApprove(leave.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium"
                            title="Chấp nhận"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(leave.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                            title="Từ chối"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 px-6 text-center text-gray-500">
                      Không có đơn xin phép nào chờ duyệt
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 p-4 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-600">
              Hiển thị {paginatedLeaves.length > 0 ? startIdx + 1 : 0}-{Math.min(endIdx, filteredLeaves.length)} / {filteredLeaves.length} đơn
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LeaveApproval;
