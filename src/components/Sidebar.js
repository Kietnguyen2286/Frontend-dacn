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
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

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
    <>
      <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white min-h-screen flex flex-col shadow-2xl`}>
        <div className="p-6 border-b border-indigo-500 flex items-center justify-between">
          {isOpen && (
            <div className="animate-slideIn">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-200 to-indigo-100 bg-clip-text text-transparent">Quản Lý</h2>
              <p className="text-xs text-indigo-200 mt-1 truncate">{user?.name}</p>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-indigo-500 rounded-lg transition-all duration-200"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-white text-indigo-700 shadow-lg font-semibold' 
                    : 'hover:bg-indigo-500 text-indigo-100'
                }`}
                style={{
                  animationDelay: `${idx * 50}ms`
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-indigo-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500 text-indigo-100 hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Đăng Xuất</span>}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
