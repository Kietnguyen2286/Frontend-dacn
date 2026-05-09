import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { DollarSign, Search, ChevronLeft, ChevronRight, Edit2, X, Save } from 'lucide-react';

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    base_salary: '',
    allowances: '',
    deductions: ''
  });
  const itemsPerPage = 8;

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/salaries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSalaries(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const filteredSalaries = salaries.filter((sal) =>
    (sal.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (sal.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (sal.employee_id?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSalaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSalaries = filteredSalaries.slice(startIndex, startIndex + itemsPerPage);

  const totalSalary = salaries.reduce((sum, s) => sum + (s.base_salary || 0), 0);
  const totalBonus = salaries.reduce((sum, s) => sum + (s.allowances || 0), 0);
  const paidCount = salaries.filter((s) => (s.base_salary || 0) > 0).length;

  const handleEditClick = (salary) => {
    setSelectedEmployee(salary);
    setFormData({
      base_salary: salary.base_salary || '',
      allowances: salary.allowances || '',
      deductions: salary.deductions || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSalary = async () => {
    if (!formData.base_salary) {
      setMessage('❌ Vui lòng nhập lương cơ bản');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/salaries/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_id: selectedEmployee.employee_id,
          base_salary: parseFloat(formData.base_salary),
          allowances: parseFloat(formData.allowances) || 0,
          deductions: parseFloat(formData.deductions) || 0
        })
      });

      if (response.ok) {
        setMessage('✅ Cập nhật lương thành công!');
        setShowModal(false);
        fetchSalaries();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Lỗi khi cập nhật lương');
      }
    } catch (error) {
      console.error('Error saving salary:', error);
      setMessage('❌ Lỗi: ' + error.message);
    }
  };

  return (
    <Layout>
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Lương Thưởng</h1>
        <p className="text-gray-600 mb-8">Quản lý và thanh toán lương nhân viên</p>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100" style={{animation: 'slideUp 0.5s ease-out 0ms backwards'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng Lương Cơ Bản</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalSalary)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-100" style={{animation: 'slideUp 0.5s ease-out 100ms backwards'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng Phụ Cấp</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalBonus)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl shadow-lg p-6 border border-purple-100" style={{animation: 'slideUp 0.5s ease-out 200ms backwards'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Có Dữ Liệu Lương</p>
                <p className="text-3xl font-bold text-purple-600">{paidCount}/{salaries.length}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo nhân viên, mã NV..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 section-enter" style={{animationDelay: '0.2s'}}>
          <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Mã NV</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Họ Tên</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Lương Cơ Bản</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Phụ Cấp</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Khấu Trừ</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Tổng Cộng</th>
                  <th className="text-center py-3 px-4 text-gray-700 font-bold">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSalaries.map((salary, idx) => {
                  const gross = (salary.base_salary || 0) + (salary.allowances || 0);
                  const net = gross - (salary.deductions || 0);
                  return (
                    <tr key={salary.id} className="border-b hover:bg-gray-50 transition-all duration-200 table-row-enter" style={{animationDelay: `${idx * 40}ms`}}>
                      <td className="py-4 px-4 font-medium text-gray-800">{salary.employee_id}</td>
                      <td className="py-4 px-4 text-gray-700">{salary.first_name} {salary.last_name}</td>
                      <td className="py-4 px-4 text-gray-700">{formatCurrency(salary.base_salary)}</td>
                      <td className="py-4 px-4 text-green-600 font-semibold">+{formatCurrency(salary.allowances)}</td>
                      <td className="py-4 px-4 text-red-600">
                        {(salary.deductions || 0) > 0 ? `-${formatCurrency(salary.deductions)}` : '-'}
                      </td>
                      <td className="py-4 px-4 font-bold text-blue-600">{formatCurrency(net)}</td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleEditClick(salary)}
                          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition inline-flex items-center gap-1"
                          title="Cập nhật lương"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-lg animate-slideUp">
            <div className="text-sm text-gray-600">
              Trang {currentPage} / {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Update Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-between rounded-t-lg">
              <h3 className="text-xl font-bold text-white">Cập Nhật Lương</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-blue-500 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Nhân viên</p>
                <p className="text-lg font-bold text-gray-800">{selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                <p className="text-sm text-gray-500">{selectedEmployee.employee_id}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lương Cơ Bản (VND)
                  </label>
                  <input
                    type="number"
                    name="base_salary"
                    value={formData.base_salary}
                    onChange={handleInputChange}
                    placeholder="Nhập lương cơ bản"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phụ Cấp (VND)
                  </label>
                  <input
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleInputChange}
                    placeholder="Nhập phụ cấp"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khấu Trừ (VND)
                  </label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    placeholder="Nhập khấu trừ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-2 border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Lương Gross:</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency((parseFloat(formData.base_salary) || 0) + (parseFloat(formData.allowances) || 0))}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Lương Net:</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency((parseFloat(formData.base_salary) || 0) + (parseFloat(formData.allowances) || 0) - (parseFloat(formData.deductions) || 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveSalary}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .section-enter {
          animation: fadeIn 0.7s ease-out;
        }
        .table-row-enter {
          animation: slideInLeft 0.4s ease-out backwards;
        }
      `}</style>
    </Layout>
  );
};

export default SalaryManagement;
