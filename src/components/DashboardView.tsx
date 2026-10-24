import React, { useState, useEffect } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import {
  Compass,
  Calendar,
  Building,
  BedDouble,
  CheckSquare,
  CreditCard,
  Wallet,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Plane,
  Train,
  CheckCircle2,
  Circle,
  Bell,
  HeartHandshake,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';

interface DashboardViewProps {
  onOpenTripModal: () => void;
  onOpenExpenseModal: () => void;
  onOpenExchangeModal: () => void;
  onOpenRadarModal?: (title: string, desc: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenTripModal,
  onOpenExpenseModal,
  onOpenExchangeModal,
  onOpenRadarModal
}) => {
  const {
    coupleInfo,
    stageCards,
    radarItems,
    checklistItems,
    toggleChecklist,
    setActiveTab,
    setSelectedDay,
    separateShoppingBudget,
    setSeparateShoppingBudget
  } = useHoneymoon();

  // City filter for stage cards
  const [cityFilter, setCityFilter] = useState<string>('all');

  // Real-time Countdown timer
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 92, hours: 2, minutes: 34, seconds: 39 });

  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date('2027-01-24T17:00:00+01:00').getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter stage cards
  const filteredStages = stageCards.filter(stage => {
    if (cityFilter === 'all') return true;
    if (cityFilter === 'rome') return stage.cityKo.includes('로마');
    if (cityFilter === 'florence') return stage.cityKo.includes('피렌체');
    if (cityFilter === 'venice') return stage.cityKo.includes('베네치아');
    return true;
  });

  // Calculate top 4 incomplete checklists
  const topChecklists = checklistItems.slice(0, 4);
  const completedCount = checklistItems.filter(c => c.completed).length;
  const checklistPercent = Math.round((completedCount / (checklistItems.length || 1)) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Deep Forest Green Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#17382b] via-[#1a3d30] to-[#12281e] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-emerald-900/40">
        {/* Subtle background glow/particles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />

        {/* Top tag and In/Out banner */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs tracking-wider border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OFFICIAL HONEYMOON JOURNAL · ITALY 2027</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-200/90 font-medium">
            <Plane className="w-3.5 h-3.5 text-emerald-400 rotate-45" />
            <span>로마 IN (FCO) 01.24 17:00 도착 — 로마 OUT 02.03</span>
          </div>
        </div>

        {/* Breadcrumb route and Italian chapter title */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-emerald-200 border border-white/15">
            Rome → Florence → Venice → Rome (로마 IN / OUT)
          </span>
          <span className="font-serif-it italic text-amber-300/95 text-lg tracking-wide">
            Capitolo Primo
          </span>
        </div>

        {/* Large Main Heading */}
        <div className="relative z-10 mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
            동환 <span className="text-rose-400 font-normal">♥</span> 나경의 이탈리아 신혼여행
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 font-serif-it italic font-normal tracking-wide">
            "Dong Hwan & Na Kyung's Italy Honeymoon · 2027.01.24 — 02.03 (10박 11일)"
          </p>
        </div>

        {/* 3 Identity badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 mb-8">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-emerald-100 font-medium">
            <span className="text-rose-400">♡</span>
            <span>신랑 {coupleInfo.groomKo} & 신부 {coupleInfo.brideKo}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-emerald-100 font-medium">
            <span>👥</span>
            <span>성인 2인 프라이빗</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-emerald-100 font-medium">
            <span>🏛️</span>
            <span>관광 60% · 휴식 & 미식 40%</span>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="relative z-10 p-4 sm:p-5 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
                HONEYMOON COUNTDOWN TARGET
              </p>
              <p className="text-sm sm:text-base font-semibold text-white">
                2027년 1월 24일 로마 도착 17:00 (FCO) 출발까지
              </p>
            </div>
          </div>

          {/* Time digits */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 text-center">
              <div className="min-w-[50px] sm:min-w-[62px] px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-200/70 font-medium">
                  DAYS
                </span>
              </div>
              <span className="text-white/40 font-bold text-lg">:</span>
              <div className="min-w-[50px] sm:min-w-[62px] px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-200/70 font-medium">
                  HRS
                </span>
              </div>
              <span className="text-white/40 font-bold text-lg">:</span>
              <div className="min-w-[50px] sm:min-w-[62px] px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-200/70 font-medium">
                  MIN
                </span>
              </div>
              <span className="text-white/40 font-bold text-lg">:</span>
              <div className="min-w-[50px] sm:min-w-[62px] px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white font-mono text-amber-300">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-200/70 font-medium">
                  SEC
                </span>
              </div>
            </div>

            <button
              onClick={onOpenTripModal}
              className="px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>여행 정보 수정</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 7-8 KPI Summary Metric Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">여행 기간</span>
            <Calendar className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 tracking-tight">10박 11일</div>
          <p className="text-[11px] text-stone-500 mt-0.5">이탈리아 본토 체류</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">방문 도시</span>
            <Building className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 tracking-tight">3개 도시</div>
          <p className="text-[11px] text-stone-500 mt-0.5">로마·피렌체·베네치아</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">숙박 구간</span>
            <BedDouble className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 tracking-tight">4개 구간</div>
          <p className="text-[11px] text-stone-500 mt-0.5">3박+3박+2박+2박</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">예약 진행률</span>
            <CheckSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-stone-900">25%</span>
            <span className="text-xs text-stone-500">진행</span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '25%' }} />
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">체크리스트</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-stone-900">{checklistPercent}%</span>
            <span className="text-xs text-stone-500">준비중</span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${checklistPercent}%` }} />
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">총 목표 예산</span>
            <CreditCard className="w-4 h-4 text-stone-700" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 tracking-tight">1,000만</div>
          <p className="text-[11px] text-stone-500 mt-0.5">2인 원화 기준 (KRW)</p>
        </div>

        {/* Metric 7 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">계획 지출</span>
            <Wallet className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 tracking-tight">650만</div>
          <p className="text-[11px] text-stone-500 mt-0.5">항공 제외 예상액</p>
        </div>

        {/* Metric 8 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-500">남은 예산</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 tracking-tight">350만</div>
          <p className="text-[11px] text-emerald-800 font-medium mt-0.5">여유분 확보</p>
        </div>
      </section>

      {/* 3. 이탈리아 종단 4단계 여정 카드 (Grand Itinerary Journey) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold tracking-wider uppercase mb-1">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>GRAND ITINERARY JOURNEY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              이탈리아 종단 4단계 여정 카드
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              로마 입국부터 피렌체 르네상스, 베네치아 카니발, 마지막 로마 명품 쇼핑 및 귀국까지의 핵심 스테이지입니다.
            </p>
          </div>

          {/* City filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs font-semibold text-stone-700">
            <button
              onClick={() => setCityFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                cityFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'
              }`}
            >
              전체 4개 구간 (10박)
            </button>
            <button
              onClick={() => setCityFilter('rome')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                cityFilter === 'rome' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'
              }`}
            >
              로마
            </button>
            <button
              onClick={() => setCityFilter('florence')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                cityFilter === 'florence' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'
              }`}
            >
              피렌체
            </button>
            <button
              onClick={() => setCityFilter('venice')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                cityFilter === 'venice' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'
              }`}
            >
              베네치아
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredStages.map((stage, idx) => {
            const dayTarget = idx === 0 ? 1 : idx === 1 ? 4 : idx === 2 ? 7 : 10;
            return (
              <div
                key={stage.id}
                className="group bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Image Header with Stage badge */}
                <div className="relative h-44 overflow-hidden bg-stone-900">
                  <img
                    src={stage.imageUrl}
                    alt={stage.cityKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                  {/* Top Stage & Days pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#1b382b] text-emerald-300 tracking-wide uppercase border border-emerald-500/30">
                      {stage.stageNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/90 text-stone-900 backdrop-blur-xs">
                      {stage.duration}
                    </span>
                  </div>

                  {/* Bottom Image titles */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {stage.subTheme}
                    </p>
                    <h3 className="text-lg font-black leading-tight text-white drop-shadow-xs">
                      {stage.cityKo}
                    </h3>
                    <p className="text-xs text-stone-200 font-medium">
                      {stage.dates}
                    </p>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  {/* Status badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {stage.tags.map((tag, tIdx) => {
                      const colorStyles =
                        tag.color === 'green'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : tag.color === 'orange'
                          ? 'bg-orange-50 text-orange-800 border-orange-200'
                          : tag.color === 'amber'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : tag.color === 'brown'
                          ? 'bg-amber-100 text-stone-800 border-stone-300'
                          : 'bg-rose-50 text-rose-800 border-rose-200';
                      return (
                        <span
                          key={tIdx}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full border ${colorStyles}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{tag.text}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Representative Schedule keywords */}
                  <div>
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-1">
                      대표 일정 키워드
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                      {stage.keywords}
                    </p>
                  </div>

                  {/* Accommodation state */}
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">
                    <div className="flex items-center justify-between font-bold text-stone-800 mb-0.5">
                      <span className="text-[11px] text-stone-500">숙소 상태</span>
                      <span className="text-emerald-800 font-semibold">{stage.hotelStatus}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 truncate">
                      {stage.hotelDetail}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        if (stage.actionPrimary.includes('지도') || stage.actionPrimary.includes('동선')) {
                          setActiveTab('routes');
                        } else if (stage.actionPrimary.includes('호텔')) {
                          setActiveTab('reservations');
                        } else {
                          setActiveTab('budget');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{stage.actionPrimary}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDay(dayTarget);
                        setActiveTab('itinerary');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <span>{stage.actionSecondary}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom 2-Column Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Radar & Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* 4-A. 예약 오픈 및 시급 과제 레이더 */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    예약 오픈 및 시급 과제 레이더
                  </h3>
                  <p className="text-xs text-stone-500">
                    사전 오픈 60일~90일 전 티켓 선점이 필요한 필수 코스
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                우선순위 높음
              </span>
            </div>

            <div className="space-y-3">
              {radarItems.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-stone-50 hover:bg-stone-100/80 border border-stone-200 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{item.title}</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-stone-200 text-stone-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenRadarModal) {
                        onOpenRadarModal(item.title, item.description);
                      } else {
                        setActiveTab('reservations');
                      }
                    }}
                    className="px-3 py-1.5 rounded-md bg-[#84432a] hover:bg-[#6e3520] text-white text-xs font-bold shadow-2xs whitespace-nowrap cursor-pointer transition-colors"
                  >
                    {item.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4-B. 미완료 핵심 체크리스트 */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    미완료 핵심 체크리스트
                  </h3>
                  <p className="text-xs text-stone-500">
                    출국 전 반드시 해결해야 할 상위 4개 안건
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('checklist')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>전체 체크리스트 보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {topChecklists.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    item.completed
                      ? 'bg-stone-50/60 border-stone-200 text-stone-400'
                      : 'bg-white border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 hover:text-emerald-600 shrink-0" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${item.completed ? 'line-through text-stone-400' : ''}`}>
                      {item.text}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-md shrink-0 ${
                      item.assignee === '완료됨'
                        ? 'bg-stone-200 text-stone-600'
                        : item.assignee === '동환 담당'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.assignee}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Budget & Train summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4-C. 예산 관리 및 실시간 소진율 */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    예산 관리 및 실시간 소진율
                  </h3>
                  <p className="text-xs text-stone-500">
                    항공권 외 현지 숙박, 이동 고속열차, 미식 및 투어 계획 지출이 포함된 밸런스입니다.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                목표 1,000만원
              </span>
            </div>

            {/* Circular Donut & Legend */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-around gap-4">
              {/* Donut graphic */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-stone-200"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress arc (65%) */}
                  <path
                    className="text-[#1b382b]"
                    strokeDasharray="65, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-stone-900 leading-none">65%</span>
                  <span className="text-[10px] text-stone-500 font-medium">계획 배정</span>
                </div>
              </div>

              {/* Legend numbers */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#1b382b]" />
                    <span className="text-stone-600 font-medium">계획 지출액</span>
                  </div>
                  <span className="font-extrabold text-stone-900">6,500,000원</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-stone-300" />
                    <span className="text-stone-600 font-medium">예비 잔여 예산</span>
                  </div>
                  <span className="font-extrabold text-stone-900">3,500,000원</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 border-t border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-stone-500 text-[11px]">항공권(확정)</span>
                  </div>
                  <span className="text-stone-500 text-[11px]">실제 결제액 연동대기</span>
                </div>
              </div>
            </div>

            {/* Shopping budget toggle box */}
            <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-700" />
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    로마 2차 명품 쇼핑 예산 별도 분리
                  </p>
                  <p className="text-[11px] text-stone-500">
                    기본 여행 경비 1,000만원과 별도 관리 모드
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={separateShoppingBudget}
                  onChange={e => setSeparateShoppingBudget(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1b382b]" />
              </label>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenExpenseModal}
                className="px-3 py-2 rounded-lg bg-[#1b382b] hover:bg-[#132a20] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                가계부 지출 입력
              </button>
              <button
                onClick={onOpenExchangeModal}
                className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer border border-stone-200"
              >
                환율 계산기
              </button>
            </div>
          </div>

          {/* 4-D. 도시 간 고속열차 이동 요약 */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    도시 간 고속열차 이동 요약
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold text-stone-500">3개 노선</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-stone-900 mr-2">01.27</span>
                  <span className="text-stone-700">로마 테르미니 → 피렌체 SMN</span>
                </div>
                <span className="text-stone-500 font-medium">1시간 36분 (이탈로)</span>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-stone-900 mr-2">01.30</span>
                  <span className="text-stone-700">피렌체 SMN → 베네치아 메스트레</span>
                </div>
                <span className="text-stone-500 font-medium">2시간 05분 (프레체)</span>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-stone-900 mr-2">02.01</span>
                  <span className="text-stone-700">베네치아 메스트레 → 로마 테르미니</span>
                </div>
                <span className="text-stone-500 font-medium">3시간 45분 (고속 직통)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-stone-500">열차 좌석은 Prima/Club 클래스 추천</span>
              <button
                onClick={() => setActiveTab('routes')}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>노선 지도 및 역 위치</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
