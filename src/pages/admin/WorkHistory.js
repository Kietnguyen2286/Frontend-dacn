import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Plus, Eye, Check, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const WorkHistory = () => {
  const [workHistories, setWorkHistories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    employee_id: '',
    event_type: 'promotion',
    from_position: '',
    to_position: '',
    reason: '',
    salary_change: '',
    status: 'pending'
  });

  const itemsPerPage = 8;

  useEffect(() => {
    fetchWorkHistories();
    fetchEmployees();
  }, []);

  const fetchWorkHistories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/work-history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setWorkHistories(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching work histories:', error);
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateHistory = async () => {
    if (!createForm.employee_id || !createForm.from_position || !createForm.to_position) {
      setMessage('❌ Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/work-history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_id: parseInt(createForm.employee_id),
          event_type: createForm.event_type,
          from_position: createForm.from_position,
          to_position: createForm.to_position,
          reason: createForm.reason,
          salary_change: createForm.salary_change,
          status: 'pending'
        })
      });

      if (response.ok) {
        setMessage('✅ Tạo lịch sử công tác thành công!');
        setShowCreateModal(false);
        setCreateForm({
          employee_id: '',
          event_type: 'promotion',
          from_position: '',
          to_position: '',
          reason: '',
          salary_change: '',
          status: 'pending'
        });
        fetchWorkHistories();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error creating work history:', error);
      setMessage('❌ Lỗi: ' + error.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/work-history/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        setMessage('✅ Đã duyệt lịch sử công tác');
        fetchWorkHistories();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error approving:', error);
      setMessage('❌ Lỗi khi duyệt');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/work-history/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      if (response.ok) {
        setMessage('❌ Đã từ chối lịch sử công tác');
        fetchWorkHistories();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error rejecting:', error);
      setMessage('❌ Lỗi khi từ chối');
    }
  };

  const filteredHistories = workHistories.filter(hist =>
    (hist.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (hist.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (hist.employee_id?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHistories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedHistories = filteredHistories.slice(startIdx, endIdx);

  const getStatusBadge = (status) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'approved' ? 'bg-green-100 text-green-800' :
        status === 'rejected' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {status === 'approved' ? 'Đã Duyệt' :
         status === 'rejected' ? 'Từ Chối' : 'Chờ Duyệt'}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Lịch Sử Công Tác</h1>
            <p className="text-gray-600 mt-2">Xem, tạo và duyệt lịch sử thay đổi công việc nhân viên</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium transition"
          >
            <Plus className="w-5 h-5" />
            <span>Tạo Mới</span>
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            {message}
          </div>
        )}

        {/* Search */}
        <div className="mb-6 flex items-center gap-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, ID..."
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
              <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">ID</th>
                  <th className="py-4 px-6 text-left font-semibold">Nhân Viên</th>
                  <th className="py-4 px-6 text-left font-semibold">Từ - Đến</th>
                  <th className="py-4 px-6 text-left font-semibold">Trạng Thái</th>
                  <th className="py-4 px-6 text-left font-semibold">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedHistories.length > 0 ? (
                  paginatedHistories.map(hist => (
                    <tr key={hist.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm font-medium">{hist.employee_id}</td>
                      <td className="py-4 px-6 text-sm font-medium">
                        {hist.first_name} {hist.last_name}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <div className="text-gray-600">{hist.previous_position}</div>
                        <div className="text-gray-800 font-medium">→ {hist.current_position}</div>
                      </td>
                      <td className="py-4 px-6 text-sm">{getStatusBadge('pending')}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedHistory(hist);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleApprove(hist.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Duyệt"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(hist.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
                    <td colSpan="5" className="py-8 px-6 text-center text-gray-500">
                      Không có lịch sử công tác nào
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
              Hiển thị {paginatedHistories.length > 0 ? startIdx + 1 : 0}-{Math.min(endIdx, filteredHistories.length)} / {filteredHistories.length}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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
                        ? 'bg-indigo-600 text-white'
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
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-t-lg">
                <h3 className="text-xl font-bold text-white">Chi Tiết Lịch Sử Công Tác</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm text-gray-600">Nhân Viên</p>
                  <p className="text-lg font-bold">{selectedHistory.first_name} {selectedHistory.last_name}</p>
                  <p className="text-sm text-gray-500">{selectedHistory.employee_id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Từ</p>
                    <p className="text-sm font-medium mt-1">{selectedHistory.previous_position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Đến</p>
                    <p className="text-sm font-medium mt-1">{selectedHistory.current_position}</p>
                  </div>
                </div>

                {selectedHistory.reason && (
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Lý Do</p>
                    <p className="text-sm mt-1">{selectedHistory.reason}</p>
                  </div>
                )}

                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-lg">
                <h3 className="text-xl font-bold text-white">Tạo Lịch Sử Công Tác Mới</h3>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhân Viên</label>
                  <select
                    name="employee_id"
                    value={createForm.employee_id}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Chọn nhân viên --</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.first_name} {emp.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vị Trí Cũ</label>
                  <input
                    type="text"
                    name="from_position"
                    value={createForm.from_position}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vị Trí Mới</label>
                  <input
                    type="text"
                    name="to_position"
                    value={createForm.to_position}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lý Do</label>
                  <textarea
                    name="reason"
                    value={createForm.reason}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleCreateHistory}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Tạo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WorkHistory;
