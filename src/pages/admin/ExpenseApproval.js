import React, { useState, useEffect } from 'react';
import { Check, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Layout from '../../components/Layout';

const ExpenseApproval = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPendingExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [searchTerm, expenses]);

  const fetchPendingExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/approval/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const filterExpenses = () => {
    const filtered = expenses.filter(expense =>
      expense.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpenses(filtered);
    setCurrentPage(1);
  };

  const handleApprove = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        setMessage('✅ Chi phí đã được duyệt!');
        fetchPendingExpenses();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error approving expense:', error);
      setMessage('❌ Lỗi khi duyệt chi phí');
    }
  };

  const handleReject = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      if (response.ok) {
        setMessage('✅ Chi phí đã bị từ chối!');
        fetchPendingExpenses();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error rejecting expense:', error);
      setMessage('❌ Lỗi khi từ chối chi phí');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    pending: expenses.filter(e => e.status === 'pending').length,
    total: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
    pending_amount: expenses
      .filter(e => e.status === 'pending')
      .reduce((sum, e) => sum + (e.amount || 0), 0)
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Duyệt Chi Phí</h1>
          <p className="text-gray-600">Quản lý và duyệt các yêu cầu chi phí từ nhân viên</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${message.includes('✅') 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'}`}>
            <p className={message.includes('✅') ? 'text-green-800' : 'text-red-800'}>
              {message}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <p className="text-blue-600 font-semibold text-sm mb-1">Chi phí chờ duyệt</p>
            <p className="text-3xl font-bold text-blue-900">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
            <p className="text-indigo-600 font-semibold text-sm mb-1">Tổng tiền chờ</p>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(stats.pending_amount)}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <p className="text-purple-600 font-semibold text-sm mb-1">Tổng tất cả chi phí</p>
            <p className="text-2xl font-bold text-purple-900">{formatCurrency(stats.total)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã nhân viên, loại chi phí, mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nhân Viên</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mã NV</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Loại Chi Phí</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mô Tả</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số Tiền</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.length > 0 ? (
                  paginatedExpenses.map((expense, index) => (
                    <tr key={expense.id} className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {expense.first_name} {expense.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{expense.employee_id}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{expense.description}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleApprove(expense.id)}
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                            title="Duyệt"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(expense.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
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
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Không có chi phí nào chờ duyệt
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Hiển thị {paginatedExpenses.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredExpenses.length)} trong {filteredExpenses.length} bản ghi
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
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
                    className={`px-3 py-2 rounded-lg transition ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
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

export default ExpenseApproval;
