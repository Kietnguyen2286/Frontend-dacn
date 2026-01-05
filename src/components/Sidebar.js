import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  Wallet, 
  LogOut,
  Clock,
  History,
  Briefcase,
  Target,
  MessageCircle
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = user?.role === 'admin' 
    ? [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/employees', icon: Users, label: 'Nhân Viên' },
        { path: '/admin/leaves', icon: Calendar, label: 'Nghỉ Phép' },
        { path: '/admin/expenses', icon: Wallet, label: 'Chi Phí' },
        { path: '/admin/salary', icon: DollarSign, label: 'Lương Thưởng' },
        { path: '/admin/work-history', icon: Briefcase, label: 'Lịch Sử Công Tác' },
        { path: '/admin/kpi', icon: Target, label: 'Quản Lý KPI' },
        { path: '/support/chatbot', icon: MessageCircle, label: 'Chatbot Hỗ trợ' },
      ]
    : [
        { path: '/employee', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/employee/leaves', icon: Calendar, label: 'Nghỉ Phép' },
        { path: '/employee/time-tracking', icon: Clock, label: 'Chấm Công' },
        { path: '/employee/attendance-history', icon: History, label: 'Lịch Sử Chấm Công' },
        { path: '/employee/kpi', icon: Target, label: 'KPI Của Tôi' },
        { path: '/support/chatbot', icon: MessageCircle, label: 'Chatbot Hỗ trợ' },
      ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Quản Lý Nhân Viên</h2>
        <p className="text-sm text-gray-400 mt-1">{user?.name}</p>
        <p className="text-xs text-gray-500">
          {user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 w-full text-left text-gray-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng Xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
