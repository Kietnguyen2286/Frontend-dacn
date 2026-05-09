import React, { useState } from 'react';
import { Download, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const ReportSalary = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchReport = async () => {
    if (!month || !year) {
      alert('Vui lòng chọn tháng và năm');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/salaries/report/monthly?month=${month}&year=${year}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setReport(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching report:', error);
      alert('Lỗi khi tải báo cáo');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const exportToCSV = () => {
    if (!report) return;

    let csv = 'BÁO CÁO LƯƠNG THÁNG ' + month + ' NĂM ' + year + '\n';
    csv += 'Ngày xuất: ' + new Date().toLocaleDateString('vi-VN') + '\n\n';

    csv += 'TÓM TẮT\n';
    csv += `Tổng nhân viên,${report.totals.count}\n`;
    csv += `Tổng lương cơ bản,${report.totals.total_base}\n`;
    csv += `Tổng phụ cấp,${report.totals.total_allowances}\n`;
    csv += `Tổng khấu trừ,${report.totals.total_deductions}\n`;
    csv += `Tổng lương gross,${report.totals.total_gross}\n`;
    csv += `Tổng lương net,${report.totals.total_net}\n\n`;

    csv += 'CHI TIẾT\n';
    csv += 'Mã NV,Họ Tên,Bộ Phận,Chức Vụ,Lương Cơ Bản,Phụ Cấp,Khấu Trừ,Gross,Net\n';

    report.employees.forEach(emp => {
      const gross = (emp.gross_salary || 0);
      const net = (emp.net_salary || 0);
      csv += `"${emp.employee_id}","${emp.first_name} ${emp.last_name}","${emp.department}","${emp.position}",${emp.base_salary || 0},${emp.allowances || 0},${emp.deductions || 0},${gross},${net}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `luong_${month}_${year}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    if (!report) return;
    // In a real application, use a library like jspdf or pdfkit
    alert('Tính năng xuất PDF sẽ được cập nhật');
  };

  // Pagination
  const totalPages = report ? Math.ceil(report.employees.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = report ? report.employees.slice(startIndex, startIndex + itemsPerPage) : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Báo Cáo Lương</h1>
          <p className="text-gray-600">Xem và xuất báo cáo lương chi tiết theo tháng/năm</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tháng</label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Năm</label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const yr = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div></div>
            <button
              onClick={fetchReport}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2 font-medium"
            >
              <Calendar className="w-5 h-5" />
              {loading ? 'Đang tải...' : 'Xem Báo Cáo'}
            </button>
          </div>
        </div>

        {report && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-blue-600 font-semibold text-sm mb-1">Tổng Lương Gross</p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatCurrency(report.totals.total_gross)}
                </p>
                <p className="text-xs text-blue-700 mt-2">{report.totals.count} nhân viên</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-green-600 font-semibold text-sm mb-1">Tổng Lương Net</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatCurrency(report.totals.total_net)}
                </p>
                <p className="text-xs text-green-700 mt-2">Sau khấu trừ</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <p className="text-purple-600 font-semibold text-sm mb-1">Tổng Khấu Trừ</p>
                <p className="text-3xl font-bold text-purple-900">
                  {formatCurrency(report.totals.total_deductions)}
                </p>
                <p className="text-xs text-purple-700 mt-2">BHXH, BHYT, Thuế...</p>
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm Tắt Lương</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Số nhân viên</p>
                  <p className="text-2xl font-bold text-gray-800">{report.totals.count}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Tổng lương cơ bản</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(report.totals.total_base)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Tổng phụ cấp</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(report.totals.total_allowances)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Tổng khấu trừ</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(report.totals.total_deductions)}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-600 text-xs font-semibold">Bình quân/NV</p>
                  <p className="text-lg font-bold text-blue-900">
                    {formatCurrency(report.totals.total_net / (report.totals.count || 1))}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed List */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Chi Tiết Lương Nhân Viên</h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportToCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Xuất CSV
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Xuất PDF
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Mã NV</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Họ Tên</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Bộ Phận</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Chức Vụ</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Lương Cơ Bản</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Phụ Cấp</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Khấu Trừ</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Gross</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEmployees.map((emp, index) => (
                      <tr key={emp.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 font-medium text-gray-800">{emp.employee_id}</td>
                        <td className="px-4 py-3 text-gray-700">{emp.first_name} {emp.last_name}</td>
                        <td className="px-4 py-3 text-gray-700">{emp.department || '-'}</td>
                        <td className="px-4 py-3 text-gray-700">{emp.position || '-'}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(emp.base_salary)}</td>
                        <td className="px-4 py-3 text-right text-green-700 font-medium">+{formatCurrency(emp.allowances)}</td>
                        <td className="px-4 py-3 text-right text-red-700 font-medium">-{formatCurrency(emp.deductions)}</td>
                        <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                          {formatCurrency(emp.gross_salary)}
                        </td>
                        <td className="px-4 py-3 text-right text-blue-900 font-bold">
                          {formatCurrency(emp.net_salary)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Hiển thị {paginatedEmployees.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, report.employees.length)} trong {report.employees.length} bản ghi
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
          </>
        )}

        {!report && !loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Chọn tháng/năm và nhấn "Xem Báo Cáo" để hiển thị dữ liệu</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportSalary;
