import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Target, TrendingUp, Award, Calendar, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const EmployeeKPI = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1-2026');
  const [expanded, setExpanded] = useState({});

  const kpiHistory = [
    {
      period: 'Q1-2026',
      kpis: [
        {
          name: 'Hoàn thành dự án',
          target: 5,
          targetDesc: 'Hoàn thành 5 dự án: Website thương mại điện tử, App mobile banking, Hệ thống CRM, API Gateway, Dashboard analytics',
          actual: 4,
          actualDesc: 'Hoàn thành 4 dự án: Website thương mại điện tử, App mobile banking, Hệ thống CRM, API Gateway (Dashboard analytics pending)',
          unit: 'dự án',
          weight: 30,
          score: 80
        },
        {
          name: 'Chất lượng code',
          target: 90,
          targetDesc: 'Đạt 90% code review passed, coverage trên 80%, bug density < 5/1000LOC',
          actual: 88,
          actualDesc: '88% code review passed, coverage 78%, bug density 6/1000LOC',
          unit: '%',
          weight: 25,
          score: 98
        },
        {
          name: 'Đúng deadline',
          target: 95,
          targetDesc: 'Hoàn thành 95% tasks đúng hạn, không có delay > 2 ngày',
          actual: 90,
          actualDesc: '90% tasks đúng hạn, một số thay đổi yêu cầu gây trễ 1-2 ngày',
          unit: '%',
          weight: 20,
          score: 95
        },
        {
          name: 'Hỗ trợ team',
          target: 80,
          targetDesc: 'Support 20 PRs/tháng, giải đáp 15 issue, tổ chức 2 buổi chia sẻ',
          actual: 85,
          actualDesc: 'Support 22 PRs, giải đáp 18 issue, tổ chức 2 buổi chia sẻ',
          unit: '%',
          weight: 15,
          score: 100
        },
        {
          name: 'Học tập nâng cao',
          target: 2,
          targetDesc: 'Hoàn thành 2 khóa học nội bộ về React/Node',
          actual: 2,
          actualDesc: 'Hoàn thành 2 khóa: React nâng cao, Testing với Jest',
          unit: 'khóa',
          weight: 10,
          score: 100
        }
      ],
      totalScore: 92,
      rating: 'Tốt',
      feedback: 'Làm việc tốt, cần cải thiện về tiến độ dự án.',
      manager: 'Lê Văn C',
      reviewDate: '05/01/2026'
    },
    {
      period: 'Q4-2025',
      kpis: [
        {
          name: 'Hoàn thành dự án',
          target: 4,
          targetDesc: 'Hoàn thành 4 dự án chính trong quý',
          actual: 5,
          actualDesc: 'Hoàn thành 5 dự án, tăng 1 dự án so với kế hoạch',
          unit: 'dự án',
          weight: 30,
          score: 100
        },
        {
          name: 'Chất lượng code',
          target: 90,
          targetDesc: 'Code review pass trên 90%',
          actual: 92,
          actualDesc: '92% code review passed',
          unit: '%',
          weight: 25,
          score: 100
        },
        {
          name: 'Đúng deadline',
          target: 95,
          targetDesc: 'Hoàn thành 95% tasks đúng hạn',
          actual: 94,
          actualDesc: '94% tasks đúng hạn',
          unit: '%',
          weight: 20,
          score: 99
        },
        {
          name: 'Hỗ trợ team',
          target: 80,
          targetDesc: 'Hỗ trợ team và review PR đều đặn',
          actual: 82,
          actualDesc: 'Hỗ trợ 82% yêu cầu team',
          unit: '%',
          weight: 15,
          score: 100
        },
        {
          name: 'Học tập nâng cao',
          target: 2,
          targetDesc: 'Hoàn thành 2 buổi học nội bộ',
          actual: 1,
          actualDesc: 'Tham gia 1 buổi, thiếu 1 buổi do bận dự án',
          unit: 'buổi',
          weight: 10,
          score: 50
        }
      ],
      totalScore: 94,
      rating: 'Tốt',
      feedback: 'Xuất sắc trong quý này, tiếp tục phát huy.',
      manager: 'Lê Văn C',
      reviewDate: '05/10/2025'
    },
    {
      period: 'Q3-2025',
      kpis: [
        {
          name: 'Hoàn thành dự án',
          target: 4,
          targetDesc: 'Hoàn thành các mục tiêu dự án theo scope',
          actual: 4,
          actualDesc: 'Đã hoàn thành đúng scope',
          unit: 'dự án',
          weight: 30,
          score: 100
        },
        {
          name: 'Chất lượng code',
          target: 85,
          targetDesc: 'Quality score >85%',
          actual: 90,
          actualDesc: 'Quality score 90%',
          unit: '%',
          weight: 25,
          score: 100
        },
        {
          name: 'Đúng deadline',
          target: 90,
          targetDesc: 'Hoàn thành 90% tasks đúng hạn',
          actual: 88,
          actualDesc: '88% tasks đúng hạn',
          unit: '%',
          weight: 20,
          score: 98
        },
        {
          name: 'Hỗ trợ team',
          target: 75,
          targetDesc: 'Hỗ trợ team, mentoring',
          actual: 80,
          actualDesc: 'Hỗ trợ và mentoring tốt',
          unit: '%',
          weight: 15,
          score: 100
        },
        {
          name: 'Học tập nâng cao',
          target: 1,
          targetDesc: 'Hoàn thành 1 khóa chuyên môn',
          actual: 2,
          actualDesc: 'Hoàn thành 2 khóa',
          unit: 'khóa',
          weight: 10,
          score: 100
        }
      ],
      totalScore: 99,
      rating: 'Xuất sắc',
      feedback: 'Hiệu suất làm việc xuất sắc, đạt mọi chỉ tiêu.',
      manager: 'Lê Văn C',
      reviewDate: '05/07/2025'
    }
  ];

  const currentKPI = kpiHistory.find(k => k.period === selectedPeriod) || kpiHistory[0];

  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Xuất sắc':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Tốt':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Cần cải thiện':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const avgScore = (kpiHistory.reduce((sum, item) => sum + item.totalScore, 0) / kpiHistory.length).toFixed(1);
  const trend = kpiHistory[0].totalScore - kpiHistory[1].totalScore;

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">KPI Của Tôi</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10" />
            </div>
            <p className="text-sm opacity-90 mb-1">Điểm KPI Hiện Tại</p>
            <p className="text-4xl font-bold">{currentKPI.totalScore}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Điểm Trung Bình</p>
            <p className="text-3xl font-bold text-gray-800">{avgScore}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-10 h-10 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Xếp Hạng</p>
            <p className="text-2xl font-bold text-gray-800">{currentKPI.rating}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className={`w-10 h-10 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <p className="text-gray-600 text-sm mb-1">Xu Hướng</p>
            <p className={`text-3xl font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>{trend > 0 ? '+' : ''}{trend}</p>
          </div>
        </div>

        {/* Period Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Kỳ đánh giá:</label>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              {kpiHistory.map((item) => (
                <option key={item.period} value={item.period}>{item.period}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Current KPI Details (compact) */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Đánh Giá {currentKPI.period}</h2>
              <p className="text-sm text-gray-600 mt-1">Người đánh giá: {currentKPI.manager} | Ngày: {currentKPI.reviewDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Tổng điểm</p>
              <p className={`text-5xl font-bold ${getScoreColor(currentKPI.totalScore)}`}>{currentKPI.totalScore}</p>
              <span className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium border-2 ${getRatingColor(currentKPI.rating)}`}>{currentKPI.rating}</span>
            </div>
          </div>

          {/* Compact KPI list with expand for details */}
          <div className="space-y-3">
            {currentKPI.kpis.map((kpi, index) => {
              const achieved = kpi.actual >= kpi.target;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${achieved ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-semibold text-gray-800">{kpi.name}</div>
                        <div className="text-xs text-gray-500">Mục tiêu: {kpi.target} {kpi.unit} • Thực tế: <span className={achieved ? 'text-green-600' : 'text-red-600'}>{kpi.actual} {kpi.unit}</span></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`text-lg font-bold ${getScoreColor(kpi.score)}`}>{kpi.score}</div>
                      <button onClick={() => toggleExpand(index)} className="p-1 rounded hover:bg-gray-100">
                        {expanded[index] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {expanded[index] && (
                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-700 font-semibold mb-1">Mô tả Mục tiêu</p>
                      <p className="text-sm text-gray-600 mb-2">{kpi.targetDesc}</p>
                      <p className="text-sm text-gray-700 font-semibold mb-1">Mô tả Thực tế</p>
                      <p className="text-sm text-gray-600 mb-2">{kpi.actualDesc}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>Trọng số: {kpi.weight}%</div>
                        <div>Tỷ lệ hoàn thành: {Math.min(Math.round((kpi.actual / kpi.target) * 100), 100)}%</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">Nhận xét từ quản lý</p>
                <p className="text-gray-700">{currentKPI.feedback}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Xu Hướng Hiệu Suất</h2>
          <div className="space-y-4">
            {kpiHistory.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.period}</p>
                  <p className="text-sm text-gray-600">{item.reviewDate}</p>
                </div>
                <div className="text-center">
                  <p className={`text-3xl font-bold ${getScoreColor(item.totalScore)}`}>{item.totalScore}</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium border ${getRatingColor(item.rating)}`}>{item.rating}</span>
                </div>
                <div className="w-32">
                  <div className="relative w-full bg-gray-200 rounded-full h-3">
                    <div className={`h-3 rounded-full ${item.totalScore >= 95 ? 'bg-green-500' : item.totalScore >= 85 ? 'bg-blue-500' : item.totalScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${item.totalScore}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeKPI;
