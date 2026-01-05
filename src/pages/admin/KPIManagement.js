import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Target, TrendingUp, Award, Calendar, Plus, Edit, Eye, X, Save, AlertCircle, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const KPIManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1-2026');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKPIData, setSelectedKPIData] = useState(null);
  const [editingKPI, setEditingKPI] = useState(null);

  const kpiData = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      department: 'IT',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Hoàn thành dự án', 
          target: 5, 
          targetDesc: 'Hoàn thành 5 dự án: Website thương mại điện tử, App mobile banking, Hệ thống CRM, API Gateway, Dashboard analytics',
          actual: 6, 
          actualDesc: 'Đã hoàn thành 6 dự án: Website thương mại điện tử, App mobile banking, Hệ thống CRM, API Gateway, Dashboard analytics, Hệ thống báo cáo',
          unit: 'dự án', 
          weight: 30, 
          score: 100 
        },
        { 
          name: 'Chất lượng code', 
          target: 90, 
          targetDesc: 'Đạt 90% code review passed, giảm bug xuống dưới 5 lỗi/1000 dòng code, coverage test trên 80%',
          actual: 95, 
          actualDesc: '95% code review passed, chỉ có 3 lỗi/1000 dòng code, coverage test đạt 88%',
          unit: '%', 
          weight: 25, 
          score: 100 
        },
        { 
          name: 'Đúng deadline', 
          target: 95, 
          targetDesc: 'Hoàn thành 95% tasks đúng hạn, không có task nào trễ quá 2 ngày',
          actual: 92, 
          actualDesc: '92% tasks hoàn thành đúng hạn, có 2 tasks trễ 1-2 ngày do thay đổi yêu cầu',
          unit: '%', 
          weight: 20, 
          score: 97 
        },
        { 
          name: 'Hỗ trợ team', 
          target: 80, 
          targetDesc: 'Tham gia code review 20 PR/tháng, hỗ trợ giải quyết 15 vấn đề kỹ thuật, chia sẻ kiến thức 2 buổi/tháng',
          actual: 88, 
          actualDesc: 'Review 25 PR/tháng, giải quyết 18 vấn đề kỹ thuật, tổ chức 3 buổi sharing session',
          unit: '%', 
          weight: 15, 
          score: 100 
        },
        { 
          name: 'Đào tạo junior', 
          target: 2, 
          targetDesc: 'Đào tạo và mentor 2 junior developers về React, Node.js và best practices',
          actual: 3, 
          actualDesc: 'Đã đào tạo 3 junior developers về React, Node.js, TypeScript và hướng dẫn làm 2 dự án thực tế',
          unit: 'người', 
          weight: 10, 
          score: 100 
        }
      ],
      totalScore: 99,
      rating: 'Xuất sắc',
      feedback: 'Nhân viên xuất sắc, vượt mọi chỉ tiêu đề ra. Tiếp tục duy trì và phát huy.',
      strengths: ['Kỹ năng lập trình tốt', 'Làm việc nhóm hiệu quả', 'Chủ động trong công việc'],
      improvements: ['Cần cải thiện kỹ năng thuyết trình'],
      manager: 'Lê Văn C',
      reviewDate: '05/01/2026'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Trần Thị B',
      department: 'Design',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Hoàn thành design', 
          target: 20, 
          targetDesc: 'Thiết kế 20 giao diện: 8 landing pages, 6 app screens, 4 banner campaigns, 2 UI systems',
          actual: 22, 
          actualDesc: 'Hoàn thành 22 designs: 9 landing pages, 7 app screens, 4 banner campaigns, 2 UI systems',
          unit: 'design', 
          weight: 35, 
          score: 100 
        },
        { 
          name: 'Đánh giá khách hàng', 
          target: 85, 
          targetDesc: 'Đạt 85% khách hàng hài lòng, điểm đánh giá trung bình trên 4.2/5 sao',
          actual: 90, 
          actualDesc: '90% khách hàng hài lòng, điểm đánh giá trung bình 4.5/5 sao, nhận 8 reviews 5 sao',
          unit: '%', 
          weight: 30, 
          score: 100 
        },
        { 
          name: 'Đúng thời hạn', 
          target: 90, 
          targetDesc: 'Giao 90% designs đúng deadline, không trễ quá 1 ngày',
          actual: 88, 
          actualDesc: '88% designs giao đúng hạn, có 2 designs trễ 1 ngày do chỉnh sửa yêu cầu',
          unit: '%', 
          weight: 20, 
          score: 98 
        },
        { 
          name: 'Sáng tạo', 
          target: 85, 
          targetDesc: 'Đề xuất 10 ý tưởng sáng tạo mới, áp dụng 3 design trends, tạo 2 design systems',
          actual: 92, 
          actualDesc: 'Đề xuất 12 ý tưởng sáng tạo, áp dụng 4 design trends mới, tạo 3 design systems hoàn chỉnh',
          unit: '%', 
          weight: 15, 
          score: 100 
        }
      ],
      totalScore: 99,
      rating: 'Xuất sắc',
      feedback: 'Khả năng thiết kế xuất sắc, sáng tạo và đáp ứng tốt yêu cầu khách hàng.',
      strengths: ['Khả năng thiết kế sáng tạo', 'Tinh thần trách nhiệm cao', 'Kỹ năng giao tiếp tốt'],
      improvements: ['Cần học thêm về animation'],
      manager: 'Lê Văn C',
      reviewDate: '05/01/2026'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Lê Văn C',
      department: 'Management',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Quản lý dự án', 
          target: 3, 
          targetDesc: 'Quản lý 3 dự án lớn: ERP system, Mobile app, E-commerce platform. Đảm bảo tiến độ, chất lượng và ngân sách',
          actual: 3, 
          actualDesc: 'Quản lý thành công 3 dự án: ERP hoàn thành sớm 5 ngày, Mobile app đúng hạn với quality 95%, E-commerce vượt kỳ vọng khách hàng',
          unit: 'dự án', 
          weight: 30, 
          score: 100 
        },
        { 
          name: 'Đạt KPI team', 
          target: 85, 
          targetDesc: 'Team đạt 85% KPI: 90% tasks hoàn thành đúng hạn, quality score trên 4/5, 0 incident nghiêm trọng',
          actual: 92, 
          actualDesc: 'Team đạt 92% KPI: 95% tasks đúng hạn, quality score 4.6/5, 0 incidents, velocity tăng 15%',
          unit: '%', 
          weight: 35, 
          score: 100 
        },
        { 
          name: 'Kiểm soát ngân sách', 
          target: 95, 
          targetDesc: 'Kiểm soát 95% ngân sách dự án, không vượt chi phí, báo cáo tài chính đúng hạn',
          actual: 98, 
          actualDesc: 'Kiểm soát 98% ngân sách, tiết kiệm được 50 triệu, báo cáo tài chính đầy đủ và đúng hạn',
          unit: '%', 
          weight: 20, 
          score: 100 
        },
        { 
          name: 'Hài lòng team', 
          target: 80, 
          targetDesc: 'Đạt 80% team satisfaction: môi trường làm việc tốt, hỗ trợ kịp thời, phát triển career path',
          actual: 85, 
          actualDesc: '85% team hài lòng, tổ chức 4 team building, coaching 8 thành viên, 2 người được thăng tiến',
          unit: '%', 
          weight: 15, 
          score: 100 
        }
      ],
      totalScore: 100,
      rating: 'Xuất sắc',
      feedback: 'Quản lý dự án xuất sắc, kiểm soát tốt mọi khía cạnh. Đội nhóm rất hài lòng.',
      strengths: ['Kỹ năng quản lý tốt', 'Kiểm soát ngân sách chặt chẽ', 'Lãnh đạo hiệu quả'],
      improvements: ['Có thể cải thiện kỹ năng đàm phán'],
      manager: 'Giám đốc điều hành',
      reviewDate: '05/01/2026'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Phạm Thị D',
      department: 'IT',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Phát triển API', 
          target: 15, 
          targetDesc: 'Phát triển 15 RESTful APIs: User management, Payment gateway, Notification service, File upload, Analytics',
          actual: 14, 
          actualDesc: 'Hoàn thành 14 APIs: User management, Payment gateway, Notification, File upload. Analytics API đang trong giai đoạn testing',
          unit: 'API', 
          weight: 35, 
          score: 93 
        },
        { 
          name: 'Fix bug', 
          target: 90, 
          targetDesc: 'Giải quyết 90% bugs trong vòng 48h, 100% critical bugs trong 24h, maintain bug backlog dưới 20 items',
          actual: 88, 
          actualDesc: 'Fix 88% bugs trong 48h, 100% critical bugs trong 24h, bug backlog còn 15 items',
          unit: '%', 
          weight: 25, 
          score: 98 
        },
        { 
          name: 'Code review', 
          target: 80, 
          targetDesc: 'Review 80% PRs trong ngày, feedback constructive, maintain code quality standards',
          actual: 85, 
          actualDesc: 'Review 85% PRs trong ngày, đưa ra 120 feedbacks hữu ích, giúp team cải thiện code quality 20%',
          unit: '%', 
          weight: 20, 
          score: 100 
        },
        { 
          name: 'Documentation', 
          target: 75, 
          targetDesc: 'Viết 75% API documentation, technical specs, và user guides đầy đủ',
          actual: 70, 
          actualDesc: 'Hoàn thành 70% documentation: 10 API docs, 5 technical specs, còn thiếu 2 user guides',
          unit: '%', 
          weight: 20, 
          score: 93 
        }
      ],
      totalScore: 96,
      rating: 'Tốt',
      feedback: 'Hiệu suất làm việc tốt. Cần cải thiện khả năng viết tài liệu kỹ thuật.',
      strengths: ['Kỹ năng backend vững', 'Xử lý vấn đề tốt', 'Code review kỹ lưỡng'],
      improvements: ['Cần viết documentation đầy đủ hơn', 'Cải thiện soft skills'],
      manager: 'Lê Văn C',
      reviewDate: '05/01/2026'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Hoàng Văn E',
      department: 'IT',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Phát triển tính năng', 
          target: 12, 
          targetDesc: 'Phát triển 12 tính năng frontend: Dashboard, User profile, Shopping cart, Payment flow, Search, Filters, Notifications, Chat',
          actual: 13, 
          actualDesc: 'Hoàn thành 13 tính năng: Dashboard, User profile, Shopping cart, Payment, Search, Filters, Notifications, Chat, Wishlist',
          unit: 'tính năng', 
          weight: 35, 
          score: 100 
        },
        { 
          name: 'UI/UX quality', 
          target: 85, 
          targetDesc: 'Đạt 85% UI/UX quality: Design consistent, UX flow mượt mà, accessibility standards, user feedback tích cực',
          actual: 90, 
          actualDesc: '90% quality score: Design 100% consistent, UX flow tối ưu, WCAG AA compliant, user feedback 4.7/5',
          unit: '%', 
          weight: 30, 
          score: 100 
        },
        { 
          name: 'Responsive design', 
          target: 90, 
          targetDesc: 'Đảm bảo 90% trang responsive tốt trên mobile, tablet, desktop. Test trên 5 browsers',
          actual: 92, 
          actualDesc: '92% trang responsive hoàn hảo, test trên 6 browsers, fix all mobile issues, performance score >90',
          unit: '%', 
          weight: 20, 
          score: 100 
        },
        { 
          name: 'Performance', 
          target: 80, 
          targetDesc: 'Tối ưu 80% pages: Load time <3s, FCP <1.5s, TTI <3.5s, Lighthouse score >85',
          actual: 75, 
          actualDesc: 'Tối ưu 75% pages: Load time <3s, FCP 1.8s, TTI 3.8s, Lighthouse 82. Còn 3 pages cần optimize',
          unit: '%', 
          weight: 15, 
          score: 94 
        }
      ],
      totalScore: 98,
      rating: 'Xuất sắc',
      feedback: 'Frontend developer xuất sắc, giao diện đẹp và chuyên nghiệp.',
      strengths: ['UI/UX xuất sắc', 'Responsive design tốt', 'Cập nhật công nghệ mới'],
      improvements: ['Cần tối ưu performance nhiều hơn'],
      manager: 'Lê Văn C',
      reviewDate: '05/01/2026'
    },
    {
      id: 6,
      employeeId: 'EMP010',
      employeeName: 'Mai Thị K',
      department: 'Marketing',
      period: 'Q1-2026',
      kpis: [
        { 
          name: 'Chiến dịch marketing', 
          target: 4, 
          targetDesc: 'Triển khai 4 chiến dịch: Tết sale campaign, Summer promotion, Product launch, Brand awareness',
          actual: 5, 
          actualDesc: 'Triển khai 5 chiến dịch: Tết sale (reach 2M), Summer promo (reach 1.5M), Product launch (10k conversions), Brand awareness, Flash sale',
          unit: 'chiến dịch', 
          weight: 30, 
          score: 100 
        },
        { 
          name: 'Tăng trưởng khách hàng', 
          target: 15, 
          targetDesc: 'Tăng 15% new customers: Chạy ads hiệu quả, content marketing, email campaigns, partnership',
          actual: 18, 
          actualDesc: 'Tăng 18% customers (5,400 users mới): Facebook ads +2,000, Google ads +1,800, organic +1,600',
          unit: '%', 
          weight: 35, 
          score: 100 
        },
        { 
          name: 'ROI marketing', 
          target: 200, 
          targetDesc: 'Đạt ROI 200%: Chi phí marketing 500 triệu, doanh thu mục tiêu 1 tỷ',
          actual: 250, 
          actualDesc: 'ROI 250%: Chi phí 480 triệu, doanh thu 1.2 tỷ, lợi nhuận 720 triệu',
          unit: '%', 
          weight: 25, 
          score: 100 
        },
        { 
          name: 'Tương tác mạng xã hội', 
          target: 5000, 
          targetDesc: 'Đạt 5,000 engagements/tháng: Đăng 20 posts, 15 stories, 4 live sessions, reply 100% comments',
          actual: 4500, 
          actualDesc: 'Đạt 4,500 engagements: Đăng 18 posts, 15 stories, 3 live sessions, reply 95% comments. Thiếu 1 live session',
          unit: 'lượt', 
          weight: 10, 
          score: 90 
        }
      ],
      totalScore: 98,
      rating: 'Xuất sắc',
      feedback: 'Chiến lược marketing hiệu quả, ROI cao và tăng trưởng khách hàng vượt kỳ vọng.',
      strengths: ['Chiến lược marketing sáng tạo', 'ROI cao', 'Quản lý ngân sách tốt'],
      improvements: ['Cần tăng tương tác trên mạng xã hội'],
      manager: 'Giám đốc Marketing',
      reviewDate: '05/01/2026'
    },
  ];

  const employees = [
    { id: 'all', name: 'Tất cả nhân viên' },
    { id: 'EMP001', name: 'Nguyễn Văn A' },
    { id: 'EMP002', name: 'Trần Thị B' },
    { id: 'EMP003', name: 'Lê Văn C' },
    { id: 'EMP004', name: 'Phạm Thị D' },
    { id: 'EMP005', name: 'Hoàng Văn E' },
    { id: 'EMP010', name: 'Mai Thị K' },
  ];

  const filteredData = selectedEmployee === 'all'
    ? kpiData
    : kpiData.filter(item => item.employeeId === selectedEmployee);

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

  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const stats = {
    avgScore: (kpiData.reduce((sum, item) => sum + item.totalScore, 0) / kpiData.length).toFixed(1),
    excellent: kpiData.filter(item => item.rating === 'Xuất sắc').length,
    good: kpiData.filter(item => item.rating === 'Tốt').length,
    needImprovement: kpiData.filter(item => item.rating === 'Cần cải thiện').length,
  };

  const handleViewDetail = (employee) => {
    setSelectedKPIData(employee);
    setShowDetailModal(true);
  };

  const handleEdit = (employee) => {
    setEditingKPI({ ...employee });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // In real application, this would call an API to save the data
    alert('Cập nhật KPI thành công!');
    setShowEditModal(false);
  };

  const handleKPIChange = (index, field, value) => {
    const newKPIs = [...editingKPI.kpis];
    newKPIs[index] = { ...newKPIs[index], [field]: parseFloat(value) || 0 };
    
    // Recalculate score
    const kpi = newKPIs[index];
    const achievementRate = (kpi.actual / kpi.target) * 100;
    kpi.score = Math.min(Math.round(achievementRate), 100);
    
    // Recalculate total score
    const totalScore = newKPIs.reduce((sum, k) => sum + (k.score * k.weight / 100), 0);
    
    setEditingKPI({
      ...editingKPI,
      kpis: newKPIs,
      totalScore: Math.round(totalScore)
    });
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý KPI</h1>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Thêm KPI Mới</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Điểm TB Toàn Công Ty</p>
            <p className="text-3xl font-bold text-blue-600">{stats.avgScore}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Xuất Sắc</p>
                <p className="text-3xl font-bold text-green-600">{stats.excellent}</p>
              </div>
              <Award className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tốt</p>
                <p className="text-3xl font-bold text-blue-600">{stats.good}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Cần Cải Thiện</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.needImprovement}</p>
              </div>
              <Target className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Kỳ đánh giá:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Q1-2026">Q1 - 2026</option>
                <option value="Q4-2025">Q4 - 2025</option>
                <option value="Q3-2025">Q3 - 2025</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Nhân viên:</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="space-y-6">
          {filteredData.map((employee) => {
            const achievedCount = employee.kpis.filter(k => k.actual >= k.target).length;
            const totalKPIs = employee.kpis.length;
            
            return (
            <div key={employee.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6 border-l-4" style={{
              borderLeftColor: 
                employee.totalScore >= 95 ? '#22c55e' :
                employee.totalScore >= 85 ? '#3b82f6' :
                employee.totalScore >= 70 ? '#eab308' : '#ef4444'
            }}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{employee.employeeName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getRatingColor(employee.rating)}`}>
                      {employee.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {employee.employeeId} • {employee.department} • {employee.period}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {achievedCount}/{totalKPIs} chỉ tiêu đạt
                    </span>
                    <span className="text-gray-500">
                      Người đánh giá: <strong>{employee.manager}</strong>
                    </span>
                  </div>
                </div>
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 min-w-[140px] border-2 border-blue-200">
                  <p className="text-sm text-gray-600 font-medium mb-1">Tổng Điểm KPI</p>
                  <p className={`text-5xl font-bold ${getScoreColor(employee.totalScore)}`}>
                    {employee.totalScore}
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          employee.totalScore >= 95 ? 'bg-green-500' :
                          employee.totalScore >= 85 ? 'bg-blue-500' :
                          employee.totalScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${employee.totalScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Điểm Trung Bình</p>
                  <p className="text-xl font-bold text-gray-800">
                    {(employee.kpis.reduce((sum, k) => sum + k.score, 0) / employee.kpis.length).toFixed(1)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Số Chỉ Tiêu</p>
                  <p className="text-xl font-bold text-gray-800">{totalKPIs}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Tỷ Lệ Đạt</p>
                  <p className="text-xl font-bold text-green-600">
                    {((achievedCount / totalKPIs) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Ngày Đánh Giá</p>
                  <p className="text-sm font-semibold text-gray-700">{employee.reviewDate}</p>
                </div>
              </div>

              {/* KPI Summary List - Simplified */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Tổng Quan Các Chỉ Số KPI:</h4>
                {employee.kpis.map((kpi, index) => {
                  const isExceeded = kpi.actual >= kpi.target;
                  
                  return (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition">
                    <div className="flex items-center space-x-3 flex-1">
                      {isExceeded ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{kpi.name}</h5>
                        <p className="text-xs text-gray-500">
                          Mục tiêu: {kpi.target} {kpi.unit} • Thực tế: <span className={isExceeded ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{kpi.actual} {kpi.unit}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24">
                        <div className="relative w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              kpi.score >= 95 ? 'bg-green-500' :
                              kpi.score >= 85 ? 'bg-blue-500' :
                              kpi.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((kpi.actual / kpi.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <p className={`text-2xl font-bold ${getScoreColor(kpi.score)}`}>
                          {kpi.score}
                        </p>
                        <p className="text-xs text-gray-500">điểm</p>
                      </div>
                    </div>
                  </div>
                );})}
              </div>

              {/* Quick Feedback Preview */}
              {employee.feedback && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    <strong className="text-blue-700">Nhận xét:</strong> {employee.feedback}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handleViewDetail(employee)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition shadow-md hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">Xem Chi Tiết</span>
                </button>
                <button 
                  onClick={() => handleEdit(employee)}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition shadow-md hover:shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                  <span className="font-medium">Cập Nhật</span>
                </button>
              </div>
            </div>
          );})}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedKPIData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Chi Tiết KPI</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedKPIData.employeeName} - {selectedKPIData.employeeId}
                  </p>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">Tổng Điểm KPI</p>
                    <p className="text-4xl font-bold mt-2">{selectedKPIData.totalScore}</p>
                    <p className="text-sm opacity-90 mt-1">/ 100 điểm</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Xếp Hạng</p>
                    <p className={`text-2xl font-bold mt-2 ${getScoreColor(selectedKPIData.totalScore)}`}>
                      {selectedKPIData.rating}
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Kỳ Đánh Giá</p>
                    <p className="text-xl font-bold mt-2 text-gray-800">{selectedKPIData.period}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedKPIData.reviewDate}</p>
                  </div>
                </div>

                {/* Detailed KPI Analysis */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Phân Tích Chi Tiết Các Chỉ Số
                  </h3>
                  <div className="space-y-4">
                    {selectedKPIData.kpis.map((kpi, index) => {
                      const achievementRate = ((kpi.actual / kpi.target) * 100).toFixed(1);
                      const isExceeded = kpi.actual >= kpi.target;
                      
                      return (
                        <div key={index} className="border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-gray-800 text-xl">{kpi.name}</h4>
                                {isExceeded ? (
                                  <span className="flex items-center text-green-600 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Đạt mục tiêu
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-600 text-sm font-semibold bg-red-100 px-3 py-1 rounded-full">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Chưa đạt
                                  </span>
                                )}
                              </div>
                              
                              {/* Target Description */}
                              <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <p className="text-xs text-blue-800 font-semibold mb-1">MỤC TIÊU ({kpi.target} {kpi.unit}):</p>
                                <p className="text-sm text-gray-700">{kpi.targetDesc}</p>
                              </div>
                              
                              {/* Actual Description */}
                              <div className={`mb-3 p-3 border-l-4 rounded ${isExceeded ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                                <p className={`text-xs font-semibold mb-1 ${isExceeded ? 'text-green-800' : 'text-red-800'}`}>
                                  THỰC TẾ ({kpi.actual} {kpi.unit}):
                                </p>
                                <p className="text-sm text-gray-700">{kpi.actualDesc}</p>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3 text-sm">
                                <div className="bg-gray-100 rounded p-2">
                                  <p className="text-gray-500 text-xs">Trọng số</p>
                                  <p className="font-semibold text-gray-800">{kpi.weight}%</p>
                                </div>
                                <div className="bg-blue-100 rounded p-2">
                                  <p className="text-gray-500 text-xs">Đóng góp điểm</p>
                                  <p className="font-semibold text-blue-700">
                                    {(kpi.score * kpi.weight / 100).toFixed(1)} điểm
                                  </p>
                                </div>
                                <div className="bg-purple-100 rounded p-2">
                                  <p className="text-gray-500 text-xs">Tỷ lệ hoàn thành</p>
                                  <p className={`font-semibold ${isExceeded ? 'text-green-700' : 'text-red-700'}`}>
                                    {achievementRate}%
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <p className={`text-5xl font-bold ${getScoreColor(kpi.score)}`}>
                                {kpi.score}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">điểm</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="relative w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                              <div
                                className={`h-5 rounded-full transition-all flex items-center justify-end pr-3 ${
                                  kpi.score >= 95 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                  kpi.score >= 85 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                  kpi.score >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                                  'bg-gradient-to-r from-red-400 to-red-600'
                                }`}
                                style={{ width: `${Math.min(parseFloat(achievementRate), 100)}%` }}
                              >
                                {parseFloat(achievementRate) > 15 && (
                                  <span className="text-white text-sm font-bold drop-shadow">
                                    {achievementRate}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {isExceeded ? (
                            <div className="mt-3 flex items-center text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Vượt mục tiêu {(parseFloat(achievementRate) - 100).toFixed(1)}%
                            </div>
                          ) : (
                            <div className="mt-3 flex items-center text-red-600 text-sm">
                              <XCircle className="w-4 h-4 mr-2" />
                              Chưa đạt mục tiêu {(100 - parseFloat(achievementRate)).toFixed(1)}%
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Nhận Xét Từ Quản Lý
                  </h3>
                  <p className="text-gray-700 mb-4">{selectedKPIData.feedback}</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Điểm Mạnh
                      </h4>
                      <ul className="space-y-1">
                        {selectedKPIData.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Cần Cải Thiện
                      </h4>
                      <ul className="space-y-1">
                        {selectedKPIData.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm text-yellow-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600">
                      <strong>Người đánh giá:</strong> {selectedKPIData.manager}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Ngày đánh giá:</strong> {selectedKPIData.reviewDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingKPI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Cập Nhật KPI</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {editingKPI.employeeName} - {editingKPI.employeeId}
                  </p>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Current Score Display */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Tổng Điểm KPI</p>
                      <p className="text-5xl font-bold mt-2">{editingKPI.totalScore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Xếp Hạng</p>
                      <p className="text-2xl font-bold mt-2">
                        {editingKPI.totalScore >= 95 ? 'Xuất sắc' :
                         editingKPI.totalScore >= 85 ? 'Tốt' :
                         editingKPI.totalScore >= 70 ? 'Trung bình' : 'Cần cải thiện'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editable KPI Fields */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Chỉnh Sửa Các Chỉ Số</h3>
                  <div className="space-y-5">
                    {editingKPI.kpis.map((kpi, index) => (
                      <div key={index} className="border-2 border-gray-300 rounded-lg p-5 hover:border-blue-400 transition bg-white">
                        <h4 className="font-bold text-gray-800 mb-4 text-lg">{kpi.name}</h4>
                        
                        {/* Target Description */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả Mục tiêu
                          </label>
                          <textarea
                            value={kpi.targetDesc || ''}
                            onChange={(e) => {
                              const newKPIs = [...editingKPI.kpis];
                              newKPIs[index] = { ...newKPIs[index], targetDesc: e.target.value };
                              setEditingKPI({ ...editingKPI, kpis: newKPIs });
                            }}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Nhập mô tả chi tiết về mục tiêu cần đạt..."
                          />
                        </div>
                        
                        {/* Actual Description */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả Thực tế
                          </label>
                          <textarea
                            value={kpi.actualDesc || ''}
                            onChange={(e) => {
                              const newKPIs = [...editingKPI.kpis];
                              newKPIs[index] = { ...newKPIs[index], actualDesc: e.target.value };
                              setEditingKPI({ ...editingKPI, kpis: newKPIs });
                            }}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Nhập mô tả chi tiết về kết quả đã đạt được..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mục tiêu ({kpi.unit})
                            </label>
                            <input
                              type="number"
                              value={kpi.target}
                              onChange={(e) => handleKPIChange(index, 'target', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Thực tế ({kpi.unit})
                            </label>
                            <input
                              type="number"
                              value={kpi.actual}
                              onChange={(e) => handleKPIChange(index, 'actual', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Trọng số (%)
                            </label>
                            <input
                              type="number"
                              value={kpi.weight}
                              onChange={(e) => handleKPIChange(index, 'weight', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Điểm
                            </label>
                            <div className={`w-full px-3 py-2 border-2 rounded-lg font-bold text-center ${
                              kpi.score >= 95 ? 'border-green-500 text-green-600 bg-green-50' :
                              kpi.score >= 85 ? 'border-blue-500 text-blue-600 bg-blue-50' :
                              kpi.score >= 70 ? 'border-yellow-500 text-yellow-600 bg-yellow-50' :
                              'border-red-500 text-red-600 bg-red-50'
                            }`}>
                              {kpi.score}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="relative w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                kpi.score >= 95 ? 'bg-green-500' :
                                kpi.score >= 85 ? 'bg-blue-500' :
                                kpi.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min((kpi.actual / kpi.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 text-right">
                            Hoàn thành: {((kpi.actual / kpi.target) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận Xét
                  </label>
                  <textarea
                    value={editingKPI.feedback || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, feedback: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập nhận xét chi tiết về hiệu suất làm việc..."
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition"
                >
                  <Save className="w-5 h-5" />
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default KPIManagement;
