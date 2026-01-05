import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const EmployeeLeaves = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      type: 'Nghỉ phép',
      startDate: '2025-12-15',
      endDate: '2025-12-20',
      days: 6,
      reason: 'Du lịch gia đình',
      status: 'approved'
    },
    {
      id: 2,
      type: 'Nghỉ ốm',
      startDate: '2025-11-05',
      endDate: '2025-11-06',
      days: 2,
      reason: 'Bị cảm',
      status: 'approved'
    },
    {
      id: 3,
      type: 'Nghỉ phép',
      startDate: '2026-01-10',
      endDate: '2026-01-12',
      days: 3,
      reason: 'Việc cá nhân',
      status: 'pending'
    },
    {
      id: 4,
      type: 'Nghỉ việc riêng',
      startDate: '2025-10-20',
      endDate: '2025-10-20',
      days: 1,
      reason: 'Đi khám bệnh định kỳ',
      status: 'approved'
    },
    {
      id: 5,
      type: 'Nghỉ phép',
      startDate: '2025-09-10',
      endDate: '2025-09-15',
      days: 6,
      reason: 'Nghỉ hè cùng gia đình',
      status: 'approved'
    },
    {
      id: 6,
      type: 'Nghỉ ốm',
      startDate: '2025-08-05',
      endDate: '2025-08-07',
      days: 3,
      reason: 'Sốt cao, đau đầu',
      status: 'approved'
    },
    {
      id: 7,
      type: 'Nghỉ phép',
      startDate: '2026-01-20',
      endDate: '2026-01-25',
      days: 6,
      reason: 'Về quê nghỉ Tết',
      status: 'pending'
    },
    {
      id: 8,
      type: 'Nghỉ việc riêng',
      startDate: '2025-07-15',
      endDate: '2025-07-15',
      days: 1,
      reason: 'Làm thủ tục hành chính',
      status: 'approved'
    },
    {
      id: 9,
      type: 'Nghỉ phép',
      startDate: '2025-06-01',
      endDate: '2025-06-05',
      days: 5,
      reason: 'Tham dự đám cưới bạn bè',
      status: 'approved'
    },
    {
      id: 10,
      type: 'Nghỉ ốm',
      startDate: '2025-05-10',
      endDate: '2025-05-11',
      days: 2,
      reason: 'Đau dạ dày',
      status: 'approved'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDays(formData.startDate, formData.endDate);

    if (editingLeave) {
      // Update existing leave
      setLeaves(leaves.map(leave => 
        leave.id === editingLeave.id 
          ? { ...leave, ...formData, days, status: 'pending' }
          : leave
      ));
      alert('Đã cập nhật đơn nghỉ phép');
    } else {
      // Create new leave
      const newLeave = {
        id: leaves.length + 1,
        ...formData,
        days,
        status: 'pending'
      };
      setLeaves([...leaves, newLeave]);
      alert('Đã tạo đơn nghỉ phép mới');
    }

    setShowModal(false);
    setEditingLeave(null);
    setFormData({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const handleEdit = (leave) => {
    if (leave.status !== 'pending') {
      alert('Chỉ có thể chỉnh sửa đơn chờ duyệt');
      return;
    }
    setEditingLeave(leave);
    setFormData({
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const leave = leaves.find(l => l.id === id);
    if (leave.status !== 'pending') {
      alert('Chỉ có thể xóa đơn chờ duyệt');
      return;
    }
    if (window.confirm('Bạn có chắc muốn xóa đơn nghỉ phép này?')) {
      setLeaves(leaves.filter(l => l.id !== id));
      alert('Đã xóa đơn nghỉ phép');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Nghỉ Phép</h1>
          <button
            onClick={() => {
              setEditingLeave(null);
              setFormData({ type: '', startDate: '', endDate: '', reason: '' });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Tạo Đơn Mới</span>
          </button>
        </div>

        {/* Leave Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Số Ngày Nghỉ Phép Còn Lại</p>
              <p className="text-4xl font-bold">12 ngày</p>
            </div>
            <Calendar className="w-16 h-16 opacity-80" />
          </div>
        </div>

        {/* Leave List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Loại Nghỉ</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Từ Ngày</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Đến Ngày</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Số Ngày</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Lý Do</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Trạng Thái</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{leave.type}</td>
                  <td className="py-4 px-6">{formatDate(leave.startDate)}</td>
                  <td className="py-4 px-6">{formatDate(leave.endDate)}</td>
                  <td className="py-4 px-6">{leave.days} ngày</td>
                  <td className="py-4 px-6 max-w-xs truncate">{leave.reason}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      leave.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : leave.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leave.status === 'approved' ? 'Đã duyệt' : 
                       leave.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {leave.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(leave)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editingLeave ? 'Chỉnh Sửa Đơn Nghỉ Phép' : 'Tạo Đơn Nghỉ Phép'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại Nghỉ
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn loại nghỉ</option>
                    <option value="Nghỉ phép">Nghỉ phép</option>
                    <option value="Nghỉ ốm">Nghỉ ốm</option>
                    <option value="Nghỉ việc riêng">Nghỉ việc riêng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Từ Ngày
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đến Ngày
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lý Do
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingLeave(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingLeave ? 'Cập Nhật' : 'Tạo Đơn'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeLeaves;
