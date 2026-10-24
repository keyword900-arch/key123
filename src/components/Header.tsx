import React, { useState, useEffect } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { ActiveTab } from '../types/honeymoon';
import { Heart, User, RefreshCw, Sparkles, Calendar, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenTripModal: () => void;
  onOpenExchangeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTripModal, onOpenExchangeModal }) => {
  const { activeTab, setActiveTab, coupleInfo } = useHoneymoon();

  // Calculate live D-day
  const [dDayStr, setDDayStr] = useState<string>('D-328');

  useEffect(() => {
    const calculateDDay = () => {
      const target = new Date('2027-01-24T17:00:00+01:00').getTime();
      const now = new Date().getTime();
      const diff = target - now;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDDayStr(days > 0 ? `D-${days}` : days === 0 ? 'D-DAY' : `D+${Math.abs(days)}`);
    };
    calculateDDay();
    const interval = setInterval(calculateDDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'itinerary', label: '전체 일정' },
    { id: 'reservations', label: '예약 관리' },
    { id: 'checklist', label: '체크리스트' },
    { id: 'places', label: '장소 라이브러리' },
    { id: 'budget', label: '예산 관리' },
    { id: 'routes', label: '이동 경로 & 지도' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f7f8f8]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top metadata row */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/50">
          {/* Logo & couple info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b382b] flex items-center justify-center text-white shadow-xs">
              <Heart className="w-4 h-4 fill-emerald-300 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                  {coupleInfo.groomKo.split(' ')[0]} <span className="text-rose-500 font-normal">♥</span> {coupleInfo.brideKo.split(' ')[0]}의 이탈리아 신혼여행
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  Honeymoon 2027
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                {coupleInfo.startDate} - {coupleInfo.endDate} · {coupleInfo.nights}박 {coupleInfo.days}일 · Rome IN / OUT
              </p>
            </div>
          </div>

          {/* Right pills */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* D-Day badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 text-xs font-bold text-rose-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{dDayStr}</span>
              <span className="text-stone-400 font-normal ml-0.5">2027.01.24</span>
            </div>

            {/* Exchange rate */}
            <button
              onClick={onOpenExchangeModal}
              title="환율 계산기 열기"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 hover:border-emerald-500 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition-colors shadow-2xs cursor-pointer"
            >
              <span>1 EUR ≈ {coupleInfo.exchangeRate.toLocaleString()} KRW</span>
              <RefreshCw className="w-3 h-3 text-stone-400" />
            </button>

            {/* Profile pill */}
            <button
              onClick={onOpenTripModal}
              title="여행 및 커플 정보 수정"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b382b] text-white hover:bg-[#152e23] transition-colors text-xs font-medium shadow-2xs cursor-pointer"
            >
              <span className="hidden sm:inline">김동환 & 왕나경 2인 전용 플래너</span>
              <span className="sm:hidden">2인 플래너</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Tab Navigation row */}
        <nav className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2 no-scrollbar">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1b382b] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
