import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, DollarSign } from 'lucide-react';

const SalaryManagement = () => {
  const [salaries] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      baseSalary: 25000000,
      bonus: 5000000,
      deduction: 0,
      total: 30000000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Trần Thị B',
      baseSalary: 20000000,
      bonus: 3000000,
      deduction: 0,
      total: 23000000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Lê Văn C',
      baseSalary: 30000000,
      bonus: 7000000,
      deduction: 0,
      total: 37000000,
      month: '01/2026',
      status: 'pending'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Phạm Thị D',
      baseSalary: 22000000,
      bonus: 4000000,
      deduction: 0,
      total: 26000000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Hoàng Văn E',
      baseSalary: 23000000,
      bonus: 4500000,
      deduction: 0,
      total: 27500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      employeeName: 'Vũ Thị F',
      baseSalary: 18000000,
      bonus: 2500000,
      deduction: 0,
      total: 20500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 7,
      employeeId: 'EMP007',
      employeeName: 'Đỗ Văn G',
      baseSalary: 26000000,
      bonus: 5500000,
      deduction: 0,
      total: 31500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 8,
      employeeId: 'EMP008',
      employeeName: 'Bùi Thị H',
      baseSalary: 19000000,
      bonus: 3000000,
      deduction: 0,
      total: 22000000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 9,
      employeeId: 'EMP009',
      employeeName: 'Đinh Văn I',
      baseSalary: 28000000,
      bonus: 6000000,
      deduction: 0,
      total: 34000000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 10,
      employeeId: 'EMP010',
      employeeName: 'Mai Thị K',
      baseSalary: 27000000,
      bonus: 5500000,
      deduction: 0,
      total: 32500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 11,
      employeeId: 'EMP011',
      employeeName: 'Lý Văn L',
      baseSalary: 21000000,
      bonus: 4000000,
      deduction: 500000,
      total: 24500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 12,
      employeeId: 'EMP012',
      employeeName: 'Trương Thị M',
      baseSalary: 24000000,
      bonus: 4500000,
      deduction: 0,
      total: 28500000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 13,
      employeeId: 'EMP013',
      employeeName: 'Phan Văn N',
      baseSalary: 23500000,
      bonus: 4200000,
      deduction: 0,
      total: 27700000,
      month: '01/2026',
      status: 'paid'
    },
    {
      id: 14,
      employeeId: 'EMP014',
      employeeName: 'Cao Thị O',
      baseSalary: 29000000,
      bonus: 6500000,
      deduction: 0,
      total: 35500000,
      month: '01/2026',
      status: 'pending'
    },
    {
      id: 15,
      employeeId: 'EMP015',
      employeeName: 'Tô Văn P',
      baseSalary: 24500000,
      bonus: 5000000,
      deduction: 0,
      total: 29500000,
      month: '01/2026',
      status: 'pending'
    },
  ]);

  const totalSalary = salaries.reduce((sum, s) => sum + s.total, 0);
  const totalBonus = salaries.reduce((sum, s) => sum + s.bonus, 0);
  const paidCount = salaries.filter(s => s.status === 'paid').length;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Lương Thưởng</h1>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Tính Lương</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10" />
            </div>
            <p className="text-sm opacity-90 mb-1">Tổng Lương Tháng Này</p>
            <p className="text-3xl font-bold">{totalSalary.toLocaleString()} VNĐ</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10" />
            </div>
            <p className="text-sm opacity-90 mb-1">Tổng Thưởng</p>
            <p className="text-3xl font-bold">{totalBonus.toLocaleString()} VNĐ</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10" />
            </div>
            <p className="text-sm opacity-90 mb-1">Đã Thanh Toán</p>
            <p className="text-3xl font-bold">{paidCount}/{salaries.length}</p>
          </div>
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Bảng Lương Tháng 01/2026</h2>
          </div>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Mã NV</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Họ Tên</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Lương Cơ Bản</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thưởng</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Khấu Trừ</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Tổng Cộng</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salaries.map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{salary.employeeId}</td>
                  <td className="py-4 px-6">{salary.employeeName}</td>
                  <td className="py-4 px-6">{salary.baseSalary.toLocaleString()} VNĐ</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">
                    +{salary.bonus.toLocaleString()} VNĐ
                  </td>
                  <td className="py-4 px-6 text-red-600">
                    {salary.deduction > 0 ? `-${salary.deduction.toLocaleString()} VNĐ` : '-'}
                  </td>
                  <td className="py-4 px-6 font-bold text-blue-600">
                    {salary.total.toLocaleString()} VNĐ
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      salary.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {salary.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 mb-2">Tổng chi phí lương tháng này</p>
              <p className="text-2xl font-bold text-blue-600">{totalSalary.toLocaleString()} VNĐ</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Thanh Toán Tất Cả
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalaryManagement;
