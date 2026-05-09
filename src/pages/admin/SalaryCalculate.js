import React, { useState } from 'react';
import { Calculator, Calendar, Download } from 'lucide-react';
import Layout from '../../components/Layout';

const SalaryCalculate = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calculations, setCalculations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/salaries/calculate/monthly`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          month: parseInt(month),
          year: parseInt(year)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCalculations(data.data);
        setMessage(`✅ ${data.message}`);
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Lỗi khi tính toán lương');
      }
    } catch (error) {
      console.error('Error calculating salary:', error);
      setMessage('❌ Lỗi: ' + error.message);
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
    if (!calculations) return;

    let csv = 'TÍNH TOÁN LƯƠNG THÁNG ' + month + ' NĂM ' + year + '\n';
    csv += 'Ngày tính: ' + new Date().toLocaleDateString('vi-VN') + '\n\n';

    csv += 'Nhân viên,Mã NV,Lương Cơ Bản,Phụ Cấp,Khấu Trừ,Lương Gross,Lương Net\n';

    calculations.forEach(calc => {
      csv += `"${calc.employee_name}","${calc.employee_id}",${calc.base_salary},${calc.allowances},${calc.deductions},${calc.gross_salary},${calc.net_salary}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tinh_luong_${month}_${year}.csv`;
    link.click();
  };

  const totals = calculations ? {
    count: calculations.length,
    total_base: calculations.reduce((sum, c) => sum + c.base_salary, 0),
    total_allowances: calculations.reduce((sum, c) => sum + c.allowances, 0),
    total_deductions: calculations.reduce((sum, c) => sum + c.deductions, 0),
    total_gross: calculations.reduce((sum, c) => sum + c.gross_salary, 0),
    total_net: calculations.reduce((sum, c) => sum + c.net_salary, 0)
  } : null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tính Toán Lương Hàng Tháng</h1>
          <p className="text-gray-600">Tính toán lương tự động cho tất cả nhân viên theo tháng/năm</p>
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

        {/* Input Section */}
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
              onClick={handleCalculate}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2 font-medium"
            >
              <Calculator className="w-5 h-5" />
              {loading ? 'Đang tính...' : 'Tính Toán'}
            </button>
          </div>
        </div>

        {calculations && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-blue-600 font-semibold text-sm mb-1">Tổng Lương Gross</p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatCurrency(totals.total_gross)}
                </p>
                <p className="text-xs text-blue-700 mt-2">{totals.count} nhân viên</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-green-600 font-semibold text-sm mb-1">Tổng Lương Net</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatCurrency(totals.total_net)}
                </p>
                <p className="text-xs text-green-700 mt-2">Sau khấu trừ</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <p className="text-purple-600 font-semibold text-sm mb-1">Bình Quân/Người</p>
                <p className="text-3xl font-bold text-purple-900">
                  {formatCurrency(totals.total_net / totals.count)}
                </p>
                <p className="text-xs text-purple-700 mt-2">Lương net trung bình</p>
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm Tắt Tính Toán</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Nhân viên</p>
                  <p className="text-2xl font-bold text-gray-800">{totals.count}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Lương cơ bản</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(totals.total_base)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Phụ cấp</p>
                  <p className="text-lg font-bold text-green-700">{formatCurrency(totals.total_allowances)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-xs">Khấu trừ</p>
                  <p className="text-lg font-bold text-red-700">{formatCurrency(totals.total_deductions)}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-600 text-xs font-semibold">Gross</p>
                  <p className="text-lg font-bold text-blue-900">{formatCurrency(totals.total_gross)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-600 text-xs font-semibold">Net</p>
                  <p className="text-lg font-bold text-green-900">{formatCurrency(totals.total_net)}</p>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Kết Quả Tính Toán</h2>
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium"
                >
                  <Download className="w-5 h-5" />
                  Xuất CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Nhân Viên</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Mã NV</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Lương Cơ Bản</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Phụ Cấp</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Khấu Trừ</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Gross</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.map((calc, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 font-medium text-gray-800">{calc.employee_name}</td>
                        <td className="px-4 py-3 text-gray-700">{calc.employee_id}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(calc.base_salary)}</td>
                        <td className="px-4 py-3 text-right text-green-700 font-medium">+{formatCurrency(calc.allowances)}</td>
                        <td className="px-4 py-3 text-right text-red-700 font-medium">-{formatCurrency(calc.deductions)}</td>
                        <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                          {formatCurrency(calc.gross_salary)}
                        </td>
                        <td className="px-4 py-3 text-right text-blue-900 font-bold">
                          {formatCurrency(calc.net_salary)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Tính toán cho <strong>{totals.count}</strong> nhân viên | 
                  Tổng net: <strong>{formatCurrency(totals.total_net)}</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {!calculations && !loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Chọn tháng/năm và nhấn "Tính Toán"</p>
            <p className="text-gray-400 text-sm">Hệ thống sẽ tự động tính lương cho tất cả nhân viên</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SalaryCalculate;
