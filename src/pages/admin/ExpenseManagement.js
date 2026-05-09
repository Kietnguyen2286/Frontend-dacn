import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Search, ChevronLeft, ChevronRight, DollarSign, Check, X } from 'lucide-react';

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setExpenses(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        setMessage('✅ Đã duyệt chi phí');
        fetchExpenses();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error approving expense:', error);
      setMessage('❌ Lỗi khi duyệt');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      if (response.ok) {
        setMessage('❌ Đã từ chối chi phí');
        fetchExpenses();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error rejecting expense:', error);
      setMessage('❌ Lỗi khi từ chối');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredExpenses = expenses.filter(exp =>
    (exp.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (exp.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (exp.status?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);

  const stats = {
    total: expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0),
    approved: expenses.filter(exp => exp.status === 'approved').reduce((sum, exp) => sum + (exp.amount || 0), 0),
    pending: expenses.filter(exp => exp.status === 'pending').length,
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Chi Phí</h1>
        <p className="text-gray-600 mb-8">Quản lý và duyệt các chi phí hoạt động của công ty</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng Chi Phí</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(stats.total)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Đã Duyệt</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.approved)}</p>
              </div>
              <Check className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Chờ Duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-500" />
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
            placeholder="Tìm kiếm theo danh mục, mô tả, trạng thái..."
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
                  <th className="py-4 px-6 text-left font-semibold">Danh Mục</th>
                  <th className="py-4 px-6 text-left font-semibold">Mô Tả</th>
                  <th className="py-4 px-6 text-left font-semibold">Ngày</th>
                  <th className="py-4 px-6 text-left font-semibold">Số Tiền</th>
                  <th className="py-4 px-6 text-left font-semibold">Trạng Thái</th>
                  <th className="py-4 px-6 text-left font-semibold">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedExpenses.length > 0 ? (
                  paginatedExpenses.map(exp => (
                    <tr key={exp.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm font-medium text-gray-700">{exp.category}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">{exp.description}</td>
                      <td className="py-4 px-6 text-sm">
                        {new Date(exp.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {formatCurrency(exp.amount)}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.status === 'approved' ? 'bg-green-100 text-green-800' :
                          exp.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {exp.status === 'approved' ? 'Đã Duyệt' :
                           exp.status === 'rejected' ? 'Từ Chối' : 'Chờ Duyệt'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {exp.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(exp.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Duyệt"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(exp.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Từ chối"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 px-6 text-center text-gray-500">
                      Không có chi phí nào
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
              Hiển thị {paginatedExpenses.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredExpenses.length)} / {filteredExpenses.length} chi phí
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
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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

export default ExpenseManagement;
