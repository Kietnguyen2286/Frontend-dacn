import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Clock, LogIn, LogOut, Calendar } from 'lucide-react';

const TimeTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [todayHours, setTodayHours] = useState(0);

  // Update current time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (checkInTime) {
        const diff = (new Date() - checkInTime) / 1000 / 60 / 60;
        setTodayHours(diff.toFixed(2));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [checkInTime]);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
    alert(`Chấm công vào lúc ${now.toLocaleTimeString('vi-VN')}`);
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;
    const now = new Date();
    const hours = ((now - checkInTime) / 1000 / 60 / 60).toFixed(2);
    alert(`Chấm công ra lúc ${now.toLocaleTimeString('vi-VN')}\nTổng thời gian làm việc: ${hours} giờ`);
    setIsCheckedIn(false);
    setCheckInTime(null);
    setTodayHours(0);
  };

  const weekStats = [
    { day: 'Thứ 2', hours: '8.5', checkIn: '08:00', checkOut: '17:30', status: 'complete' },
    { day: 'Thứ 3', hours: '8.0', checkIn: '08:15', checkOut: '17:15', status: 'complete' },
    { day: 'Thứ 4', hours: '9.0', checkIn: '08:00', checkOut: '18:00', status: 'complete' },
    { day: 'Thứ 5', hours: '8.25', checkIn: '08:00', checkOut: '17:15', status: 'complete' },
    { day: 'Thứ 6', hours: '7.5', checkIn: '08:30', checkOut: '17:00', status: 'complete' },
  ];

  const totalWeekHours = weekStats.reduce((sum, day) => sum + parseFloat(day.hours), 0);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Chấm Công</h1>

        {/* Current Time Display */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90 mb-2">Thời Gian Hiện Tại</p>
              <p className="text-3xl font-bold mb-2">
                {currentTime.toLocaleTimeString('vi-VN')}
              </p>
              <p className="text-sm opacity-90">
                {currentTime.toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Clock className="w-16 h-16 opacity-80" />
          </div>
        </div>

        {/* Check In/Out Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 transition ${
              isCheckedIn 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <LogIn className="w-12 h-12" />
            <span className="text-xl font-bold">Chấm Công Vào</span>
            {isCheckedIn && checkInTime && (
              <span className="text-xs">
                Đã vào lúc: {checkInTime.toLocaleTimeString('vi-VN')}
              </span>
            )}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={!isCheckedIn}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 transition ${
              !isCheckedIn 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <LogOut className="w-12 h-12" />
            <span className="text-xl font-bold">Chấm Công Ra</span>
            {isCheckedIn && todayHours > 0 && (
              <span className="text-xs">
                Đã làm việc: {todayHours} giờ
              </span>
            )}
          </button>
        </div>

        {/* Today Stats */}
        {isCheckedIn && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-lg">
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="font-semibold text-gray-800">Đang làm việc</p>
                <p className="text-gray-600">
                  Bắt đầu lúc: {checkInTime?.toLocaleTimeString('vi-VN')} - 
                  Thời gian: {todayHours} giờ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Week Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tổng Kết Tuần Này</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Tổng giờ làm việc</p>
              <p className="text-2xl font-bold text-blue-600">{totalWeekHours.toFixed(1)} giờ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weekStats.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-800 mb-2">{day.day}</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>Vào: {day.checkIn}</p>
                  <p>Ra: {day.checkOut}</p>
                  <p className="font-bold text-blue-600">{day.hours} giờ</p>
                </div>
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Hoàn thành
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Giờ Làm Tháng Này</p>
            <p className="text-3xl font-bold text-blue-600">168.5 giờ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Ngày Công</p>
            <p className="text-3xl font-bold text-green-600">21/22 ngày</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Đi Muộn</p>
            <p className="text-3xl font-bold text-red-600">2 lần</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeTracking;
