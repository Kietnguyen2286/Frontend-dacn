import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: 'Văn phòng phẩm',
      amount: 5000000,
      date: '05/01/2026',
      description: 'Mua máy in, giấy A4, bút viết',
      status: 'approved'
    },
    {
      id: 2,
      category: 'Điện nước',
      amount: 8000000,
      date: '01/01/2026',
      description: 'Hóa đơn tháng 12/2025',
      status: 'approved'
    },
    {
      id: 3,
      category: 'Marketing',
      amount: 15000000,
      date: '03/01/2026',
      description: 'Chi phí quảng cáo Facebook Ads',
      status: 'pending'
    },
    {
      id: 4,
      category: 'Đào tạo',
      amount: 12000000,
      date: '02/01/2026',
      description: 'Khóa học React Advanced cho team Dev',
      status: 'approved'
    },
    {
      id: 5,
      category: 'Văn phòng phẩm',
      amount: 3500000,
      date: '04/01/2026',
      description: 'Mua bàn ghế văn phòng mới',
      status: 'approved'
    },
    {
      id: 6,
      category: 'Marketing',
      amount: 20000000,
      date: '06/01/2026',
      description: 'Chi phí quảng cáo Google Ads',
      status: 'pending'
    },
    {
      id: 7,
      category: 'Khác',
      amount: 6000000,
      date: '01/01/2026',
      description: 'Thuê dịch vụ vệ sinh văn phòng',
      status: 'approved'
    },
    {
      id: 8,
      category: 'Điện nước',
      amount: 7500000,
      date: '01/01/2026',
      description: 'Tiền internet và điện thoại',
      status: 'approved'
    },
    {
      id: 9,
      category: 'Đào tạo',
      amount: 8000000,
      date: '03/01/2026',
      description: 'Workshop về UI/UX Design',
      status: 'approved'
    },
    {
      id: 10,
      category: 'Marketing',
      amount: 18000000,
      date: '05/01/2026',
      description: 'Tổ chức sự kiện khách hàng',
      status: 'pending'
    },
    {
      id: 11,
      category: 'Văn phòng phẩm',
      amount: 4200000,
      date: '04/01/2026',
      description: 'Mua laptop phụ kiện',
      status: 'approved'
    },
    {
      id: 12,
      category: 'Khác',
      amount: 10000000,
      date: '02/01/2026',
      description: 'Bảo hiểm văn phòng',
      status: 'approved'
    },
    {
      id: 13,
      category: 'Đào tạo',
      amount: 15000000,
      date: '06/01/2026',
      description: 'Khóa học AWS Cloud Practitioner',
      status: 'pending'
    },
    {
      id: 14,
      category: 'Marketing',
      amount: 9000000,
      date: '04/01/2026',
      description: 'In tờ rơi, banner quảng cáo',
      status: 'approved'
    },
    {
      id: 15,
      category: 'Khác',
      amount: 5500000,
      date: '05/01/2026',
      description: 'Sửa chữa máy lạnh văn phòng',
      status: 'approved'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'pending'
    };
    setExpenses([...expenses, newExpense]);
    setShowModal(false);
    setFormData({ category: '', amount: '', date: '', description: '' });
    alert('Đã thêm chi phí mới');
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const approvedExpenses = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Chi Phí</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm Chi Phí</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Tổng Chi Phí Tháng Này</p>
            <p className="text-3xl font-bold text-blue-600">
              {totalExpenses.toLocaleString()} VNĐ
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Chi Phí Đã Duyệt</p>
            <p className="text-3xl font-bold text-green-600">
              {approvedExpenses.toLocaleString()} VNĐ
            </p>
          </div>
        </div>

        {/* Expense Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Ngày</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Danh Mục</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Số Tiền</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Mô Tả</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Trạng Thái</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{expense.date}</td>
                  <td className="py-4 px-6 font-medium">{expense.category}</td>
                  <td className="py-4 px-6 text-blue-600 font-semibold">
                    {expense.amount.toLocaleString()} VNĐ
                  </td>
                  <td className="py-4 px-6">{expense.description}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      expense.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Expense Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Thêm Chi Phí Mới</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh Mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Văn phòng phẩm">Văn phòng phẩm</option>
                    <option value="Điện nước">Điện nước</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Đào tạo">Đào tạo</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Tiền (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô Tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Thêm
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

export default ExpenseManagement;
