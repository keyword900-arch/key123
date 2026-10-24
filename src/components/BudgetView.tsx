import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { LedgerItem } from '../types/honeymoon';
import {
  CreditCard,
  Plus,
  RefreshCw,
  Edit3,
  TrendingUp,
  PieChart,
  ShoppingBag,
  Calculator,
  Receipt,
  CheckCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileText,
  AlertCircle,
  BookOpen
} from 'lucide-react';

interface BudgetViewProps {
  onOpenAddExpenseModal: () => void;
  onOpenEditExpenseModal: (item: LedgerItem) => void;
  onOpenExchangeModal: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  onOpenAddExpenseModal,
  onOpenEditExpenseModal,
  onOpenExchangeModal
}) => {
  const {
    coupleInfo,
    ledgerItems,
    targetBudget,
    setTargetBudget,
    plannedExpenses,
    separateShoppingBudget,
    setSeparateShoppingBudget,
    shoppingBudget,
    setShoppingBudget,
    taxRefundInputEur,
    setTaxRefundInputEur,
    taxRefundRate,
    setTaxRefundRate
  } = useHoneymoon();

  // Ledger category filter
  const [ledgerFilter, setLedgerFilter] = useState<string>('all');
  const [editingTargetBudget, setEditingTargetBudget] = useState<boolean>(false);
  const [tempBudget, setTempBudget] = useState<number>(targetBudget);

  // Daily spend estimates for D1 to D11 in 만원
  const dailyCosts = [
    { day: 'D1', label: '1일차', cost: 16, desc: '로마 입국 & 저녁' },
    { day: 'D2', label: '2일차', cost: 42, desc: '남부 폼페이 투어' },
    { day: 'D3', label: '3일차', cost: 38, desc: '바티칸 & 디너' },
    { day: 'D4', label: '4일차', cost: 85, desc: '피렌체 이동 & 체크인' },
    { day: 'D5', label: '5일차', cost: 120, desc: '우피치 & 티본스테이크' },
    { day: 'D6', label: '6일차', cost: 45, desc: '피사의 사탑 반나절' },
    { day: 'D7', label: '7일차', cost: 95, desc: '베네치아 입성' },
    { day: 'D8', label: '8일차', cost: 80, desc: '산마르코 & 곤돌라' },
    { day: 'D9', label: '9일차', cost: 55, desc: '로마 복귀 열차' },
    { day: 'D10', label: '10일차', cost: 110, desc: '콜로세움 & 갈라 디너' },
    { day: 'D11', label: '11일차', cost: 20, desc: '공항 출국' }
  ];

  // Calculate tax refund simulation
  const simulatedRefundEur = (taxRefundInputEur * (taxRefundRate / 100));
  const simulatedRefundKrw = Math.round(simulatedRefundEur * coupleInfo.exchangeRate);

  // Filtered ledgers
  const filteredLedgers = ledgerItems.filter(item => {
    if (ledgerFilter === 'all') return true;
    return item.category === ledgerFilter;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            예산 및 지출 마스터 플래너
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            김동환 & 왕나경 2인 전용 스마트 여행 재정 포트폴리오
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExchangeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
          >
            <span>기준 환율 1 EUR ≈ {coupleInfo.exchangeRate.toLocaleString()} KRW</span>
            <RefreshCw className="w-3 h-3 text-stone-400" />
          </button>
          <button
            onClick={onOpenAddExpenseModal}
            className="px-3.5 py-2 rounded-lg bg-[#84432a] hover:bg-[#6e3520] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 지출 기록</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: 전체 목표 예산 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>전체 목표 예산 (2인)</span>
            <button
              onClick={() => {
                if (editingTargetBudget) {
                  setTargetBudget(tempBudget);
                  setEditingTargetBudget(false);
                } else {
                  setTempBudget(targetBudget);
                  setEditingTargetBudget(true);
                }
              }}
              className="text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {editingTargetBudget ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={tempBudget}
                onChange={e => setTempBudget(Number(e.target.value))}
                className="w-full text-base font-bold p-1 border rounded border-emerald-500"
              />
              <button
                onClick={() => {
                  setTargetBudget(tempBudget);
                  setEditingTargetBudget(false);
                }}
                className="px-2 py-1 text-xs bg-emerald-800 text-white rounded font-bold"
              >
                저장
              </button>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-black text-stone-900 tracking-tight">
                {targetBudget.toLocaleString()} 원
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                ≈ € {Math.round(targetBudget / coupleInfo.exchangeRate).toLocaleString()}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>항공권 & 쇼핑비 별도 관리 체계</span>
          </div>
        </div>

        {/* KPI 2: 초기 계획 여행 경비 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>초기 계획 여행 경비</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px]">
              65% 배정
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-stone-900 tracking-tight">
              {plannedExpenses.toLocaleString()} 원
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              현지 체류 10박 11일 필수비
            </p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1">
            <span>💰 항공권 및 명품 쇼핑 제외</span>
          </div>
        </div>

        {/* KPI 3: 결제 현황 추적 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>결제 현황 추적</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
              ● 영수증 대기
            </span>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-500">확정 지불:</span>
              <span className="font-bold text-stone-800">미입력 (항공권)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">지불 예정:</span>
              <span className="font-extrabold text-stone-900">6,500,000 원</span>
            </div>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '4%' }} />
          </div>
        </div>

        {/* KPI 4: 남은 여유 예산 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>남은 여유 예산</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              안전 한도
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-700 tracking-tight">
              {(targetBudget - plannedExpenses).toLocaleString()} 원
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              여유 비율 35.0% 잔여
            </p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">🛡️ 80% 도달 알림 기능 활성화</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Row 1: 지출 구성 포트폴리오 & 카테고리별 예산 배정 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (5 cols): Portfolio Donut */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                지출 구성 포트폴리오
              </h3>
              <p className="text-xs text-stone-500">
                계획 예산 6,500,000원 기준 카테고리 점유율
              </p>
            </div>
            <PieChart className="w-4 h-4 text-stone-400" />
          </div>

          {/* Donut & Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                {/* 숙박 43.1% */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#1b382b" strokeWidth="4"
                  strokeDasharray="43.1 100" strokeDashoffset="0"
                />
                {/* 식비 21.5% */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#78350f" strokeWidth="4"
                  strokeDasharray="21.5 100" strokeDashoffset="-43.1"
                />
                {/* 관광 13.8% */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#92400e" strokeWidth="4"
                  strokeDasharray="13.8 100" strokeDashoffset="-64.6"
                />
                {/* 교통 11.5% */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#047857" strokeWidth="4"
                  strokeDasharray="11.5 100" strokeDashoffset="-78.4"
                />
                {/* 도시세/예비 10.0% */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4"
                  strokeDasharray="10 100" strokeDashoffset="-89.9"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase text-stone-400 font-bold">TOTAL</span>
                <span className="text-xl font-black text-stone-900 leading-none">650만</span>
                <span className="text-[10px] text-stone-500 mt-0.5">10박 11일</span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-1.5 text-xs w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#1b382b]" />
                  <span className="text-stone-700 font-medium">숙박 (43.1%)</span>
                </div>
                <span className="font-extrabold text-stone-900">280만</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#78350f]" />
                  <span className="text-stone-700 font-medium">식비·카페 (21.5%)</span>
                </div>
                <span className="font-extrabold text-stone-900">140만</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#92400e]" />
                  <span className="text-stone-700 font-medium">관광·체험 (13.8%)</span>
                </div>
                <span className="font-extrabold text-stone-900">90만</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#047857]" />
                  <span className="text-stone-700 font-medium">교통 (11.5%)</span>
                </div>
                <span className="font-extrabold text-stone-900">75만</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
                  <span className="text-stone-700 font-medium">도시세·예비 (10.0%)</span>
                </div>
                <span className="font-extrabold text-stone-900">65만</span>
              </div>
            </div>
          </div>

          {/* Progress Comparison */}
          <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex justify-between items-center text-stone-500">
              <span className="font-bold text-stone-700">계획 예산 vs 실제 결제 지출</span>
              <span className="text-[11px]">실지출 등록률 3%</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>예상 지출 계획</span>
                <span className="font-bold">6,500,000 원 (100%)</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1b382b] h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-amber-900">
                <span>현재 실제 결제액 (확정)</span>
                <span className="font-bold">198,000 원 (3.0%)</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '3%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right (7 cols): 카테고리별 예산 배정 현황 5 Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-stone-900">
              카테고리별 예산 배정 현황
            </h3>
            <span className="text-xs font-bold text-stone-500">5개 메인 영역</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Card 1: 숙박 */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    🛏️
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">숙박 (10박)</h4>
                    <p className="text-[11px] text-stone-500">로마 5박, 피렌체 3박, 베네치아 2박</p>
                  </div>
                </div>
                <span className="text-base font-black text-stone-900">2,800,000 원</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span>예정: € 1,647</span>
                <span className="text-amber-800 font-semibold">MH Florence / Hotel Plaza 대기중</span>
              </div>
            </div>

            {/* Card 2: 식비 */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                    🍴
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">식비·카페·젤라또</h4>
                    <p className="text-[11px] text-stone-500">질리, 비볼리, 지올리티, 스테이크</p>
                  </div>
                </div>
                <span className="text-base font-black text-stone-900">1,400,000 원</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span>예정: € 823</span>
                <span className="font-semibold text-stone-700">1일 평균 약 75 EUR</span>
              </div>
            </div>

            {/* Card 3: 교통 */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold">
                    🚆
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">교통 (열차/페리)</h4>
                    <p className="text-[11px] text-stone-500">이탈로 고속열차, 바포레토, 피사 왕복</p>
                  </div>
                </div>
                <span className="text-base font-black text-stone-900">750,000 원</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span>예정: € 441</span>
                <span className="text-blue-800 font-semibold">얼리버드 예약 예정</span>
              </div>
            </div>

            {/* Card 4: 관광 */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">
                    🏛️
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">관광·체험</h4>
                    <p className="text-[11px] text-stone-500">바티칸, 우피치, 남부투어, 곤돌라</p>
                  </div>
                </div>
                <span className="text-base font-black text-stone-900">900,000 원</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span>예정: € 529</span>
                <span className="text-purple-800 font-semibold">패스트트랙 우선 확보</span>
              </div>
            </div>

            {/* Card 5: 도시세 & 예비비 (Full Span) */}
            <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center text-xs font-bold">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">
                      보험·호텔 도시세(City Tax)·긴급 예비비
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      호텔 체크아웃 현장 납부 도시세 1박 약 6~10€ & 여행자보험
                    </p>
                  </div>
                </div>
                <span className="text-base font-black text-stone-900">650,000 원</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span className="text-amber-800 font-medium">현금 유로화 유의</span>
                <span>도시세는 현장 카드/현금 필수 납부</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Middle Row 2: 여행 일자별 예상 지출 곡선 & 쇼핑 전용 슬롯 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (6 cols): Daily chart */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                여행 일자별(DAY 1 ~ 11) 예상 지출 곡선
              </h3>
              <p className="text-xs text-stone-500">
                로마(5박) · 피렌체(3박) · 베네치아(2박)
              </p>
            </div>
            <span className="text-xs font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
              단위: 만원
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-1 border-b border-stone-200">
            {dailyCosts.map(item => {
              const heightPercent = Math.min(100, Math.round((item.cost / 120) * 100));
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-stone-900 text-white text-[10px] py-1 px-1.5 rounded whitespace-nowrap pointer-events-none z-20">
                    {item.label}: {item.cost}만원 ({item.desc})
                  </div>

                  <span className="text-[10px] font-bold text-stone-500 group-hover:text-emerald-700">
                    {item.cost}
                  </span>

                  <div className="w-full bg-stone-100 rounded-t-sm h-28 flex items-end">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        item.cost >= 80 ? 'bg-[#1b382b]' : 'bg-emerald-600/70'
                      } group-hover:bg-amber-600`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-stone-600">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 text-center">
            * D4, D5 (피렌체 숙박 결제 및 티본스테이크)와 D10 (로마 미식 갈라 디너)에 집중 지출 발생 예상
          </p>
        </div>

        {/* Right (6 cols): 가족 선물 & 명품 쇼핑 전용 슬롯 & 택스리펀 계산기 */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-stone-900">
                    가족 선물 & 명품 쇼핑 전용 슬롯
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    특별 독립 관리
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  스페인 광장, 콘도티 명품거리, 리나센테 백화점 쇼핑
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setSeparateShoppingBudget(false)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                  !separateShoppingBudget ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                총예산 포함
              </button>
              <button
                onClick={() => setSeparateShoppingBudget(true)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer ${
                  separateShoppingBudget ? 'bg-[#84432a] text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                별도 분리 관리
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shopping budget box */}
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-700">쇼핑 예산 배정액</span>
                <span className="text-[10px] text-stone-400">미입력 상태</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={shoppingBudget.toLocaleString()}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setShoppingBudget(Number(raw) || 0);
                  }}
                  className="w-full text-base font-black px-2 py-1 rounded border border-stone-300 bg-white text-stone-900"
                />
                <span className="text-xs font-bold text-stone-600">원</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                구찌 본점, 프라다, 카말돌리 수분크림, 산타마리아노벨라
              </p>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-[11px] text-stone-600">
                <span>동환 배정 50%</span>
                <span>나경 배정 50%</span>
              </div>
            </div>

            {/* Tax Refund Simulator */}
            <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-amber-700" />
                  <span>택스리펀(Tax Refund) 계산기</span>
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">이탈리아 기준 (12~14%)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-600">€</span>
                <input
                  type="number"
                  value={taxRefundInputEur}
                  onChange={e => setTaxRefundInputEur(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold px-2 py-1 rounded border border-amber-300 bg-white"
                />
                <button
                  onClick={() => alert(`€ ${taxRefundInputEur} 쇼핑 시 약 € ${simulatedRefundEur.toFixed(2)} (${simulatedRefundKrw.toLocaleString()}원) 환급 예상됩니다.`)}
                  className="px-2.5 py-1 text-xs font-bold rounded bg-[#84432a] text-white whitespace-nowrap cursor-pointer"
                >
                  시뮬레이션
                </button>
              </div>

              <div className="pt-2 border-t border-amber-200 text-xs flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] text-stone-500 block">예상 환급액 (12.5% 산출)</span>
                  <span className="text-sm font-extrabold text-amber-900">
                    € {simulatedRefundEur.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">원화 환산 약</span>
                  <span className="text-sm font-black text-stone-900">
                    {simulatedRefundKrw.toLocaleString()} 원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom: 지출 내역 상세 원장 (Ledger) */}
      <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs overflow-hidden space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">
              지출 내역 상세 원장 (Ledger)
            </h3>
            <p className="text-xs text-stone-500">
              현지 결제 내역 및 예약금 실시간 입력 관리
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-semibold">
            {['all', '숙박', '식음료', '교통', '관광', '쇼핑'].map(cat => (
              <button
                key={cat}
                onClick={() => setLedgerFilter(cat)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  ledgerFilter === cat
                    ? 'bg-[#1b382b] text-white shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? '전체' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold border-y border-stone-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3">일자 / 구분</th>
                <th className="py-3 px-3">카테고리</th>
                <th className="py-3 px-4">항목명 & 메모</th>
                <th className="py-3 px-4">결제 통화 & 금액</th>
                <th className="py-3 px-3">결제 수단</th>
                <th className="py-3 px-3">상태 / 영수증</th>
                <th className="py-3 px-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredLedgers.map(item => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                  {/* 일자 / 구분 */}
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-stone-900 block">{item.date}</span>
                    <span className="text-[11px] text-stone-400">{item.dayLabel}</span>
                  </td>

                  {/* 카테고리 */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.category === '교통'
                          ? 'bg-blue-100 text-blue-800'
                          : item.category === '숙박'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.category === '관광'
                          ? 'bg-purple-100 text-purple-800'
                          : item.category === '식음료'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span>{item.category}</span>
                    </span>
                  </td>

                  {/* 항목명 & 메모 */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-extrabold text-stone-900 block">{item.title}</span>
                    <span className="text-[11px] text-stone-500 block truncate">{item.memo}</span>
                  </td>

                  {/* 결제 통화 & 금액 */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.amountEur ? (
                      <div>
                        <span className="font-extrabold text-stone-900 block">
                          € {item.amountEur.toLocaleString()} {item.isEstimate && '(예정)'}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          약 {item.amountKrw ? item.amountKrw.toLocaleString() : (item.amountEur * coupleInfo.exchangeRate).toLocaleString()} 원
                        </span>
                      </div>
                    ) : item.amountKrw ? (
                      <div>
                        <span className="font-extrabold text-stone-900 block">
                          {item.amountKrw.toLocaleString()} 원
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {item.isEstimate ? '예상 금액' : '실제 결제'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-stone-400 font-semibold">실제 결제액 미입력</span>
                    )}
                  </td>

                  {/* 결제 수단 */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-stone-700 font-medium">{item.paymentMethod}</span>
                  </td>

                  {/* 상태 / 영수증 */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {item.status === '영수증 대기' ? (
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>영수증 대기</span>
                      </span>
                    ) : item.status === '영수증 보관' ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Receipt className="w-3.5 h-3.5" />
                        <span>영수증 보관</span>
                      </span>
                    ) : (
                      <span className="text-stone-600 font-medium">{item.status}</span>
                    )}
                  </td>

                  {/* 관리 */}
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onOpenEditExpenseModal(item)}
                      className="px-2.5 py-1 text-xs font-semibold rounded border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Smart Payment Tip Banner */}
      <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <span className="text-sm">💡</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
              이탈리아 신혼여행 현지 결제 스마트 팁
            </h4>
            <p className="text-xs text-stone-600">
              트래블로그·트래블월렛 카드로 유로화 수수료 없이 결제하고, 젤라또 집 및 호텔 도시세(City Tax)용으로 소액 현금 약 200~300€ 준비를 권장합니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('스마트 결제 가이드: \n1. 트래블로그/트래블월렛으로 90% 이상 결제 가능\n2. 호텔 도시세는 체크아웃 시 별도 납부\n3. 상점 구매 시 "타사 리펀(Tax Refund) 서류" 요청 필수')}
          className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-stone-500" />
          <span>환전·결제 가이드</span>
        </button>
      </div>
    </div>
  );
};
