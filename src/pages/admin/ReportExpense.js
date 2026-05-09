import React, { useState } from 'react';
import { Download, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const ReportExpense = () => {
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
        `${process.env.REACT_APP_API_URL}/api/expenses/report/monthly?month=${month}&year=${year}`,
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
      currency: 'VND'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const exportToCSV = () => {
    if (!report) return;

    let csv = 'Chi Phí Tháng ' + month + ' Năm ' + year + '\n\n';
    csv += 'Tóm Tắt Theo Loại Chi Phí\n';
    csv += 'Loại Chi Phí,Số lượng,Tổng tiền,Đã duyệt,Chờ duyệt,Bị từ chối\n';

    report.summary.forEach(item => {
      csv += `"${item.category}",${item.count},${item.total_amount},${item.approved_amount},${item.pending_amount},${item.rejected_amount}\n`;
    });

    csv += '\n\nChiết Kế\n';
    csv += 'Nhân viên,Mã NV,Bộ phận,Loại Chi Phí,Mô tả,Số tiền,Ngày,Trạng thái\n';

    report.details.forEach(expense => {
      csv += `"${expense.first_name} ${expense.last_name}","${expense.employee_id}","${expense.department}","${expense.category}","${expense.description}",${expense.amount},"${formatDate(expense.date)}","${expense.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chi_phi_${month}_${year}.csv`;
    link.click();
  };

  // Pagination for details
  const totalPages = report ? Math.ceil(report.details.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDetails = report ? report.details.slice(startIndex, startIndex + itemsPerPage) : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Báo Cáo Chi Phí</h1>
          <p className="text-gray-600">Xem và xuất báo cáo chi phí theo tháng/năm</p>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-blue-600 font-semibold text-sm mb-1">Tổng chi phí</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(report.total.total_amount)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-green-600 font-semibold text-sm mb-1">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(report.total.approved_total)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                <p className="text-yellow-600 font-semibold text-sm mb-1">Chờ duyệt</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {formatCurrency(report.total.pending_total)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                <p className="text-red-600 font-semibold text-sm mb-1">Bị từ chối</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(report.total.rejected_total)}
                </p>
              </div>
            </div>

            {/* Summary by Category */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm Tắt Theo Loại Chi Phí</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Loại Chi Phí</th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-700">Số Lượng</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Tổng Tiền</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Đã Duyệt</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Chờ Duyệt</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Bị Từ Chối</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.summary.map((item, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 font-medium text-gray-800">{item.category}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{item.count}</td>
                        <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                          {formatCurrency(item.total_amount)}
                        </td>
                        <td className="px-6 py-4 text-right text-green-700 font-medium">
                          {formatCurrency(item.approved_amount)}
                        </td>
                        <td className="px-6 py-4 text-right text-yellow-700 font-medium">
                          {formatCurrency(item.pending_amount)}
                        </td>
                        <td className="px-6 py-4 text-right text-red-700 font-medium">
                          {formatCurrency(item.rejected_amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed List */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Chi Tiết Chi Phí</h2>
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium"
                >
                  <Download className="w-5 h-5" />
                  Xuất CSV
                </button>
              </div>

              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Nhân Viên</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Bộ Phận</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Loại</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Mô Tả</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-700">Số Tiền</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Ngày</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDetails.map((expense, index) => (
                      <tr key={expense.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {expense.first_name} {expense.last_name}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{expense.department}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{expense.description}</td>
                        <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                          {formatCurrency(expense.amount)}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{formatDate(expense.date)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                            expense.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {expense.status === 'approved' ? 'Đã duyệt' :
                             expense.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                          </span>
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
                    Hiển thị {paginatedDetails.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, report.details.length)} trong {report.details.length} bản ghi
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

export default ReportExpense;
