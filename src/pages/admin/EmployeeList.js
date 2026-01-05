import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UserPlus, Search, Eye, Trash2 } from 'lucide-react';

const EmployeeList = () => {
  const [employees] = useState([
    { 
      id: 1, 
      name: 'Nguyễn Văn A', 
      employeeId: 'EMP001', 
      position: 'Developer', 
      department: 'IT',
      email: 'nguyenvana@example.com',
      phone: '0912345678'
    },
    { 
      id: 2, 
      name: 'Trần Thị B', 
      employeeId: 'EMP002', 
      position: 'Designer', 
      department: 'Design',
      email: 'tranthib@example.com',
      phone: '0987654321'
    },
    { 
      id: 3, 
      name: 'Lê Văn C', 
      employeeId: 'EMP003', 
      position: 'Manager', 
      department: 'Management',
      email: 'levanc@example.com',
      phone: '0923456789'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Nhân Viên</h1>
          <Link
            to="/admin/employees/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Thêm Nhân Viên</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã NV, phòng ban..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Mã NV</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Họ Tên</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Chức Vụ</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Phòng Ban</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Liên Hệ</th>
                <th className="text-left py-3 px-6 text-gray-600 font-semibold">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{employee.employeeId}</td>
                  <td className="py-4 px-6">{employee.name}</td>
                  <td className="py-4 px-6">{employee.position}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {employee.department}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{employee.email}</div>
                      <div className="text-gray-500">{employee.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/employees/${employee.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
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
      </div>
    </Layout>
  );
};

export default EmployeeList;
