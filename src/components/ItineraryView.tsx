import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { ScheduleItem } from '../types/honeymoon';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  ExternalLink,
  Edit3,
  Printer,
  Plus,
  AlertTriangle,
  Info,
  ChevronRight,
  Plane,
  Train,
  Coffee,
  Building,
  ShoppingBag,
  Sparkles,
  CloudSun,
  Umbrella,
  Wind
} from 'lucide-react';

interface ItineraryViewProps {
  onOpenAddScheduleModal: () => void;
  onOpenEditScheduleModal: (item: ScheduleItem) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onOpenAddScheduleModal,
  onOpenEditScheduleModal
}) => {
  const {
    days,
    selectedDay,
    setSelectedDay,
    scheduleItems,
    selectedScheduleId,
    setSelectedScheduleId,
    toggleScheduleCompleted,
    updateScheduleNotes
  } = useHoneymoon();

  // Filter mode
  const [filterMode, setFilterMode] = useState<string>('all');
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [noteInput, setNoteInput] = useState<string>('');
  const [orderOptimized, setOrderOptimized] = useState<boolean>(false);

  // Selected item for inspector
  const activeItem = scheduleItems.find(i => i.id === selectedScheduleId) || scheduleItems[0];

  // Filter days based on top buttons
  const getFilteredDays = () => {
    if (filterMode === 'rome') {
      return days.filter(d => d.city.includes('로마') || d.city.includes('남부'));
    }
    if (filterMode === 'florence') {
      return days.filter(d => d.city.includes('피렌체') || d.city.includes('피사'));
    }
    if (filterMode === 'venice') {
      return days.filter(d => d.city.includes('베네치아'));
    }
    return days;
  };

  const visibleDays = getFilteredDays();

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Google Maps link
  const openGoogleMaps = (query?: string) => {
    if (!query) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Filter Bar */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#1b382b] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            전체 일정 보기 11일
          </button>
          <button
            onClick={() => setFilterMode('rome')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'rome'
                ? 'bg-[#1b382b] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            로마 & 바티칸
          </button>
          <button
            onClick={() => setFilterMode('florence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'florence'
                ? 'bg-[#1b382b] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            피렌체 & 피사
          </button>
          <button
            onClick={() => setFilterMode('venice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterMode === 'venice'
                ? 'bg-[#1b382b] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            베네치아
          </button>
          <button
            onClick={() => setFilterMode('needBooking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === 'needBooking'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span>★ 예약 필요만 보기</span>
          </button>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2">
          <p className="hidden md:inline text-xs text-stone-400 mr-2">
            카드를 클릭하면 상세 세부사항 및 메모를 확인할 수 있습니다.
          </p>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>일정표 인쇄</span>
          </button>
          <button
            onClick={onOpenAddScheduleModal}
            className="px-3 py-1.5 rounded-lg bg-[#1b382b] hover:bg-[#132a20] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 일정 등록</span>
          </button>
        </div>
      </div>

      {/* 2. Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Day Selector (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
              <div>
                <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
                  Day Selector
                </h3>
                <p className="text-[11px] text-stone-400">
                  선택한 날짜의 타임라인으로 바로 이동합니다.
                </p>
              </div>
              <span className="text-xs font-bold text-stone-500">
                DAY {selectedDay} / 11
              </span>
            </div>

            {/* List of 11 Days */}
            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {days.map(d => {
                const isSelected = selectedDay === d.dayNumber;
                return (
                  <button
                    key={d.dayNumber}
                    onClick={() => setSelectedDay(d.dayNumber)}
                    className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b382b] text-white shadow-xs font-bold'
                        : 'hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-black uppercase ${isSelected ? 'text-amber-300' : 'text-stone-900'}`}>
                          DAY {d.dayNumber}
                        </span>
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                          {d.dateStr}
                        </span>
                      </div>
                      <p className={`text-xs truncate max-w-[140px] mt-0.5 ${isSelected ? 'text-white' : 'text-stone-600'}`}>
                        {d.title}
                      </p>
                    </div>

                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : d.badgeType === 'emerald'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : d.badgeType === 'amber'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : d.badgeType === 'rose'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}
                    >
                      {d.badge.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-stone-700">
              <span className="flex items-center gap-1">
                <CloudSun className="w-3.5 h-3.5 text-amber-600" />
                <span>1월 말 ~ 2월 초 현지 날씨</span>
              </span>
              <span className="text-[10px] text-stone-400">평년 기준</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded bg-white border border-stone-200/80">
                <p className="text-[10px] text-stone-500 font-medium">로마 / 피렌체</p>
                <p className="text-sm font-black text-stone-900">4°C ~ 13°C</p>
                <p className="text-[10px] text-stone-400 flex items-center gap-0.5 mt-0.5">
                  <Umbrella className="w-2.5 h-2.5 text-blue-500" /> 비 대비 우산 휴대
                </p>
              </div>

              <div className="p-2 rounded bg-white border border-stone-200/80">
                <p className="text-[10px] text-stone-500 font-medium">베네치아</p>
                <p className="text-sm font-black text-stone-900">1°C ~ 9°C</p>
                <p className="text-[10px] text-stone-400 flex items-center gap-0.5 mt-0.5">
                  <Wind className="w-2.5 h-2.5 text-sky-500" /> 바닷바람, 방한 외투
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Timelines (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {visibleDays
            .filter(d => filterMode === 'all' || d.dayNumber === selectedDay || filterMode !== 'all')
            .map(day => {
              const dayItems = scheduleItems.filter(item => {
                if (item.dayNumber !== day.dayNumber) return false;
                if (filterMode === 'needBooking') {
                  return item.badge?.includes('예약') || item.badge?.includes('검토');
                }
                return true;
              });

              if (filterMode === 'needBooking' && dayItems.length === 0) {
                return null;
              }

              return (
                <div
                  key={day.dayNumber}
                  id={`day-section-${day.dayNumber}`}
                  className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs"
                >
                  {/* Day Header Banner */}
                  <div className="bg-stone-50 p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#1b382b] text-white flex items-center justify-center text-xs font-black">
                        D{day.dayNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-500">{day.dateStr}</span>
                          <h4 className="text-sm sm:text-base font-extrabold text-stone-900">
                            {day.title}
                          </h4>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-700">
                            {day.dateStr.slice(-3, -1)}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {day.summary}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block">예상 소모 경비</span>
                      <span className="text-xs font-bold text-stone-700">
                        {day.dayNumber === 1
                          ? '€130 ~ €160'
                          : day.dayNumber === 4
                          ? '€110 ~ €150'
                          : day.dayNumber === 5
                          ? '€180 ~ €220'
                          : '€80 ~ €120'}
                      </span>
                    </div>
                  </div>

                  {/* Winter weather notice for Day 2 */}
                  {day.dayNumber === 2 && (
                    <div className="p-3 mx-4 my-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-bold flex items-center gap-1 text-amber-950">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>남부투어 주의사항 및 검토 안내</span>
                      </p>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        1월 말 겨울철 포지타노는 상점 및 페리 단축 운행이 많습니다. 기상 상황에 따라 살레르노 또는 소렌토 경로로 변경될 수 있으며, 투어 업체 확정 및 겨울 스케줄 재확인이 필수적입니다.
                      </p>
                    </div>
                  )}

                  {/* Day schedule items list */}
                  <div className="p-4 space-y-3">
                    {dayItems.length === 0 ? (
                      <p className="text-xs text-stone-400 text-center py-4">
                        등록된 세부 일정이 없습니다.
                      </p>
                    ) : (
                      dayItems.map(item => {
                        const isCurrentActive = activeItem?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedScheduleId(item.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                              isCurrentActive
                                ? 'border-[#1b382b] bg-emerald-50/20 shadow-xs'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                {/* Time badge */}
                                <div className="mt-0.5 shrink-0 flex items-center gap-1.5">
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      item.completed
                                        ? 'bg-emerald-500'
                                        : item.category === '항공/교통'
                                        ? 'bg-blue-600'
                                        : item.category === '숙소 체크인'
                                        ? 'bg-amber-600'
                                        : item.category === '식사 & 카페'
                                        ? 'bg-rose-600'
                                        : 'bg-emerald-700'
                                    }`}
                                  />
                                  <span className="text-xs font-black text-stone-700 font-mono">
                                    {item.time}
                                  </span>
                                </div>

                                <div>
                                  {/* Category tag & Badge */}
                                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-sm bg-stone-100 text-stone-600">
                                      {item.category}
                                    </span>
                                    {item.badge && (
                                      <span
                                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${
                                          item.badgeColor === 'red'
                                            ? 'bg-rose-100 text-rose-800'
                                            : item.badgeColor === 'amber'
                                            ? 'bg-amber-100 text-amber-900'
                                            : item.badgeColor === 'purple'
                                            ? 'bg-purple-100 text-purple-800'
                                            : item.badgeColor === 'blue'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-emerald-100 text-emerald-800'
                                        }`}
                                      >
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>

                                  <h5 className="text-xs sm:text-sm font-extrabold text-stone-900 group-hover:text-emerald-900">
                                    {item.title}
                                  </h5>

                                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                                    {item.description}
                                  </p>

                                  {item.notes && (
                                    <p className="text-[11px] text-stone-500 mt-1 italic flex items-center gap-1">
                                      <Info className="w-3 h-3 text-stone-400 shrink-0" />
                                      <span>{item.notes}</span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              <ChevronRight
                                className={`w-4 h-4 shrink-0 transition-transform ${
                                  isCurrentActive ? 'text-emerald-800 translate-x-1' : 'text-stone-300'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Right Column: Sticky Inspector Panel (3 cols) */}
        <div className="lg:col-span-3 sticky top-24 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-black text-stone-900 tracking-tight flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>일정 상세 검사기</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                #{activeItem.id}
              </span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  activeItem.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {activeItem.completed ? '예약 완료' : '진행 대기'}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-stone-100 text-stone-700">
                {activeItem.city}
              </span>
            </div>

            {/* Item Title */}
            <div>
              <h4 className="text-base font-black text-stone-900 leading-snug">
                {activeItem.title}
              </h4>
            </div>

            {/* Metadata Table */}
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">일정 일시</span>
                <span className="font-bold text-stone-900">
                  DAY {activeItem.dayNumber} · {activeItem.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">카테고리</span>
                <span className="font-semibold text-stone-800">{activeItem.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">예상 소요시간</span>
                <span className="font-semibold text-stone-800">약 60분 (수속 포함)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">예상 소모 비용</span>
                <span className="font-bold text-emerald-800">
                  {activeItem.costEur ? `€${activeItem.costEur}` : '포함 (항공권/사전결제)'}
                </span>
              </div>
            </div>

            {/* Couple Private Notes Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  동환 & 나경 전용 메모
                </label>
                <button
                  onClick={() => {
                    if (editingNotes) {
                      updateScheduleNotes(activeItem.id, noteInput);
                      setEditingNotes(false);
                    } else {
                      setNoteInput(activeItem.notes || '');
                      setEditingNotes(true);
                    }
                  }}
                  className="text-[11px] font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  {editingNotes ? '저장' : '수정'}
                </button>
              </div>

              {editingNotes ? (
                <textarea
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-emerald-400 focus:outline-none bg-emerald-50/20 text-stone-800"
                  rows={3}
                />
              ) : (
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed min-h-[60px]">
                  {activeItem.notes || '등록된 메모가 없습니다. 둘만의 팁이나 주의사항을 적어두세요.'}
                </div>
              )}
            </div>

            {/* Complete Checkbox */}
            <div
              onClick={() => toggleScheduleCompleted(activeItem.id)}
              className="p-2.5 rounded-lg border border-stone-200 hover:border-emerald-500 transition-colors flex items-center gap-2 cursor-pointer bg-white"
            >
              {activeItem.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-stone-300 shrink-0" />
              )}
              <span className="text-xs font-bold text-stone-800">
                일정 완료 처리
              </span>
            </div>

            {/* Google Map Link Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeItem.googleMapQuery || activeItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-stone-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              <span>Google 지도로 위치 열기</span>
            </a>

            {/* Edit / Order actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenEditScheduleModal(activeItem)}
                className="py-1.5 px-2 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>일정 수정</span>
              </button>
              <button
                onClick={() => {
                  setOrderOptimized(true);
                  setTimeout(() => setOrderOptimized(false), 2000);
                }}
                className={`py-1.5 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                  orderOptimized
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-stone-300 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span>{orderOptimized ? '✓ 순서 최적화됨' : '⇄ 동선 최적화'}</span>
              </button>
            </div>

            {/* Official Announcement Tip Card */}
            <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200 text-xs text-orange-900 space-y-1">
              <p className="font-bold flex items-center gap-1 text-orange-950">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                <span>공식 공지사항</span>
              </p>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                "2027년 베네치아 카니발 공식 시간표 및 고속철도(Frecciarossa/Italo) 시각표는 탑승 3~4개월 전 최종 오픈 시 확정 배정됩니다."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
