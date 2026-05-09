import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Search, ChevronLeft, ChevronRight, Plus, Eye, Edit2, Trash2, X, Save } from 'lucide-react';

const KPIManagement = () => {
  const [kpis, setKpis] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [editForm, setEditForm] = useState({
    target: '',
    actual: ''
  });
  const [createForm, setCreateForm] = useState({
    employee_id: '',
    metric: '',
    target: '',
    actual: '',
    period: ''
  });
  const itemsPerPage = 8;

  useEffect(() => {
    fetchKPIs();
    fetchEmployees();
  }, []);

  const fetchKPIs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kpis`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setKpis(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
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
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateKPI = async () => {
    if (!createForm.employee_id || !createForm.metric || !createForm.target || !createForm.period) {
      setMessage('❌ Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kpis`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_id: parseInt(createForm.employee_id),
          metric: createForm.metric,
          target: parseFloat(createForm.target),
          actual: parseFloat(createForm.actual) || 0,
          period: createForm.period
        })
      });

      if (response.ok) {
        setMessage('✅ Tạo KPI thành công!');
        setShowCreateModal(false);
        setCreateForm({ employee_id: '', metric: '', target: '', actual: '', period: '' });
        fetchKPIs();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Lỗi khi tạo KPI');
      }
    } catch (error) {
      console.error('Error creating KPI:', error);
      setMessage('❌ Lỗi: ' + error.message);
    }
  };

  const handleViewDetail = async (kpi) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kpis/detail/${kpi.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSelectedKPI(data);
      setEditForm({
        target: data.target,
        actual: data.actual || 0
      });
      setIsEditMode(false);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching KPI detail:', error);
      setMessage('❌ Lỗi khi tải thông tin KPI');
    }
  };

  const handleUpdateKPI = async () => {
    if (!editForm.target || editForm.actual === '') {
      setMessage('❌ Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kpis/${selectedKPI.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: parseFloat(editForm.target),
          actual: parseFloat(editForm.actual)
        })
      });

      if (response.ok) {
        setMessage('✅ Cập nhật KPI thành công!');
        setIsEditMode(false);
        fetchKPIs();
        setTimeout(() => {
          setShowDetailModal(false);
          setMessage('');
        }, 1500);
      } else {
        setMessage('❌ Lỗi khi cập nhật KPI');
      }
    } catch (error) {
      console.error('Error updating KPI:', error);
      setMessage('❌ Lỗi: ' + error.message);
    }
  };

  const handleDeleteKPI = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa KPI này?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kpis/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage('✅ Xóa KPI thành công!');
        fetchKPIs();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting KPI:', error);
      setMessage('❌ Lỗi khi xóa KPI');
    }
  };

  const filteredKPIs = kpis.filter(kpi =>
    (kpi.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (kpi.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (kpi.employee_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (kpi.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (kpi.period?.includes(searchTerm) || false) ||
    (kpi.metric?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredKPIs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedKPIs = filteredKPIs.slice(startIdx, endIdx);

  const getStatusBadge = (achievement) => {
    if (achievement >= 100) {
      return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Vượt chỉ tiêu ({achievement}%)</span>;
    }
    if (achievement >= 90) {
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Tốt ({achievement}%)</span>;
    }
    return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Cần cải thiện ({achievement}%)</span>;
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
      <div>
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${message.includes('✅') 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'}`}>
            <p className={message.includes('✅') ? 'text-green-800' : 'text-red-800'}>
              {message}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý KPI</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium transition"
          >
            <Plus className="w-5 h-5" />
            <span>Tạo KPI Mới</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã NV, phòng ban, quý, chỉ tiêu..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* KPI Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Mã NV</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Tên Nhân Viên</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Phòng Ban</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Kỳ</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Chỉ Tiêu</th>
                  <th className="text-center py-3 px-6 text-gray-600 font-semibold">Mục Tiêu</th>
                  <th className="text-center py-3 px-6 text-gray-600 font-semibold">Thực Tế</th>
                  <th className="text-left py-3 px-6 text-gray-600 font-semibold">Hoàn Thành</th>
                  <th className="text-center py-3 px-6 text-gray-600 font-semibold">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedKPIs.map((kpi) => {
                  const achievement = kpi.target > 0 ? Math.round((kpi.actual / kpi.target) * 100) : 0;
                  return (
                    <tr key={kpi.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{kpi.employee_id}</td>
                      <td className="py-4 px-6">{kpi.first_name} {kpi.last_name}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {kpi.department || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">{kpi.period}</td>
                      <td className="py-4 px-6">{kpi.metric}</td>
                      <td className="py-4 px-6 text-center font-medium">{kpi.target}</td>
                      <td className="py-4 px-6 text-center font-medium text-blue-600">{kpi.actual || 0}</td>
                      <td className="py-4 px-6">{getStatusBadge(achievement)}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleViewDetail(kpi)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteKPI(kpi.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-600">
            Hiển thị {paginatedKPIs.length > 0 ? startIdx + 1 : 0}-{Math.min(endIdx, filteredKPIs.length)} / {filteredKPIs.length} KPI
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
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
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

        {/* Create KPI Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-between rounded-t-lg">
                <h3 className="text-xl font-bold text-white">Tạo KPI Mới</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-blue-500 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhân Viên</label>
                  <select
                    name="employee_id"
                    value={createForm.employee_id}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn nhân viên --</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.first_name} {emp.last_name} ({emp.employee_id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chỉ Tiêu</label>
                  <input
                    type="text"
                    name="metric"
                    value={createForm.metric}
                    onChange={handleCreateChange}
                    placeholder="VD: Doanh số, Số dự án, ..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mục Tiêu</label>
                  <input
                    type="number"
                    name="target"
                    value={createForm.target}
                    onChange={handleCreateChange}
                    placeholder="VD: 50, 100, ..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thực Tế (Tùy chọn)</label>
                  <input
                    type="number"
                    name="actual"
                    value={createForm.actual}
                    onChange={handleCreateChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kỳ</label>
                  <input
                    type="text"
                    name="period"
                    value={createForm.period}
                    onChange={handleCreateChange}
                    placeholder="VD: Q1 2025, Q4 2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleCreateKPI}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Tạo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail KPI Modal */}
        {showDetailModal && selectedKPI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex items-center justify-between rounded-t-lg">
                <h3 className="text-xl font-bold text-white">{isEditMode ? 'Chỉnh Sửa KPI' : 'Chi Tiết KPI'}</h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setIsEditMode(false);
                  }}
                  className="p-2 hover:bg-blue-500 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">Nhân viên</p>
                  <p className="text-lg font-bold text-gray-800">{selectedKPI.first_name} {selectedKPI.last_name}</p>
                  <p className="text-sm text-gray-500">{selectedKPI.employee_id} • {selectedKPI.department}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Chỉ Tiêu</p>
                  <p className="text-lg font-bold text-gray-800">{selectedKPI.metric}</p>
                </div>

                {isEditMode ? (
                  <div className="space-y-3 border-t pt-4">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">Mục Tiêu</label>
                      <input
                        type="number"
                        value={editForm.target}
                        onChange={(e) => setEditForm(prev => ({ ...prev, target: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">Thực Tế</label>
                      <input
                        type="number"
                        value={editForm.actual}
                        onChange={(e) => setEditForm(prev => ({ ...prev, actual: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Mục Tiêu</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedKPI.target}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Thực Tế</p>
                      <p className="text-2xl font-bold text-green-600">{selectedKPI.actual || 0}</p>
                    </div>
                  </div>
                )}

                {!isEditMode && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Hoàn Thành</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${Math.min(((selectedKPI.actual || 0) / selectedKPI.target * 100), 100)}%` }}
                        >
                          {Math.round((selectedKPI.actual || 0) / selectedKPI.target * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Kỳ</p>
                  <p className="text-lg font-medium text-gray-800">{selectedKPI.period}</p>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  {isEditMode ? (
                    <>
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleUpdateKPI}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Lưu
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-5 h-5" />
                        Chỉnh Sửa
                      </button>
                      <button
                        onClick={() => setShowDetailModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                      >
                        Đóng
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default KPIManagement;
