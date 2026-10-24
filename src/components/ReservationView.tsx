import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { ReservationItem } from '../types/honeymoon';
import {
  Download,
  Plus,
  Plane,
  Building,
  Train,
  Ticket,
  Utensils,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ReservationViewProps {
  onOpenAddModal: () => void;
  onOpenVoucherModal: (title: string, filename: string) => void;
}

export const ReservationView: React.FC<ReservationViewProps> = ({
  onOpenAddModal,
  onOpenVoucherModal
}) => {
  const { reservations, updateReservationStatus, coupleInfo } = useHoneymoon();

  // Category tab filter
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedPnr, setCopiedPnr] = useState<boolean>(false);

  // Copy PNR
  const handleCopyPnr = (pnr: string) => {
    navigator.clipboard.writeText(pnr);
    setCopiedPnr(true);
    setTimeout(() => setCopiedPnr(false), 2000);
  };

  // Batch download voucher alert
  const handleBatchDownload = () => {
    alert('모든 예약 확정 바우처(대한항공 e-티켓, 호텔 예약확인서, 열차 티켓) 압축 파일 다운로드를 시작합니다.');
  };

  // Filter items
  const filtered = reservations.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            예약 및 숙소 허브
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            이탈리아 10박 11일 여정의 모든 항공, 도시 간 초고속 열차, 엄선된 감성 숙소 및 필수 뮤지엄 예약 현황을 실시간으로 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchDownload}
            className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-stone-200 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>예약 바우처 일괄 다운로드</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 rounded-lg bg-[#84432a] hover:bg-[#6e3520] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 예약 항목 등록</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>전체 준비 진행률</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              총 16개 항목
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-700"
                  strokeDasharray="12.5, 100"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-stone-900">12.5%</span>
            </div>
            <div>
              <p className="text-sm font-extrabold text-stone-900">2 / 16 건</p>
              <p className="text-[11px] text-stone-500">완료 2 · 예정 2 · 미정 12</p>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-100 flex items-center gap-3 text-[11px] text-stone-500">
            <span>● 확정: 항공권 2건</span>
            <span>● 숙소 2곳 조율 중</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>예약 지출 정산 현황</span>
            <span className="text-stone-400">💳</span>
          </div>
          <div>
            <span className="text-[11px] text-stone-500 block">결제 확정액 (2인)</span>
            <p className="text-xl font-extrabold text-stone-900">₩ 3,120,000</p>
            <p className="text-[11px] text-stone-500">대한항공 왕복 확정 결제분</p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500">결제 예정 견적 (추산): </span>
            <span className="font-bold text-amber-800">약 ₩ 4,450,000</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>티켓팅 데드라인 긴급도</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
              ● D-60 오픈
            </span>
          </div>
          <h4 className="text-sm font-black text-stone-900 truncate">
            바티칸 & 시스티나 성당
          </h4>
          <p className="text-xs text-stone-600 line-clamp-2">
            방문일 60일 전 자정(이탈리아 시각) 정각 오픈. 패스트트랙 및 한국어 오디오 투어...
          </p>
          <div className="pt-2 border-t border-stone-100 text-[11px] text-rose-700 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>오픈 예정일: 2026.11.26 08:00 (KST)</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>이탈리아 종단 루트</span>
            <span className="text-emerald-700">🧭</span>
          </div>
          <h4 className="text-sm font-black text-stone-900">
            4개 거점 · 10박
          </h4>
          <p className="text-xs text-stone-600">
            로마 3박 → 피렌체 3박 → 베네치아 2박 → 로마 2박
          </p>
          <div className="pt-2 border-t border-stone-100 text-xs flex items-center justify-between">
            <span className="text-stone-500">열차 이동 4구간</span>
            <span className="font-extrabold text-stone-900">1,020 km</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            전체 예약 (16)
          </button>
          <button
            onClick={() => setCategoryFilter('flight')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'flight'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Plane className="w-3 h-3" />
            <span>항공편 (2)</span>
          </button>
          <button
            onClick={() => setCategoryFilter('hotel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'hotel'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>호텔 (4)</span>
          </button>
          <button
            onClick={() => setCategoryFilter('train')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'train'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Train className="w-3 h-3" />
            <span>기차 (4)</span>
          </button>
          <button
            onClick={() => setCategoryFilter('tour')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'tour'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Ticket className="w-3 h-3" />
            <span>관광지·투어 (5)</span>
          </button>
          <button
            onClick={() => setCategoryFilter('dining')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'dining'
                ? 'bg-[#1b382b] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>체험·다이닝 (1)</span>
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 focus:outline-none"
        >
          <option value="all">모든 상태 보기</option>
          <option value="confirmed">예약 완료만</option>
          <option value="planned">예약 예정만</option>
          <option value="pending">미선정/대기만</option>
        </select>
      </div>

      {/* 4. Section 1: 항공편 (International Flights) */}
      {(categoryFilter === 'all' || categoryFilter === 'flight') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Plane className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">
                항공편 (International Flights)
              </h3>
              <span className="text-xs text-stone-500">
                인천(ICN) ⇄ 로마 레오나르도 다 빈치(FCO) 직항 왕복
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-800">2 / 2 예약 완료</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flight 1 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>예약 완료 · 출국편</span>
                </span>
                <span className="text-xs text-stone-400">대한항공 KE931</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-stone-900">인천 (ICN)</h4>
                  <p className="text-xs text-stone-500">서울 인천국제공항 T2</p>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-stone-400">직항 약 13h 20m</span>
                  <div className="w-24 h-px bg-stone-300 relative my-1">
                    <Plane className="w-3.5 h-3.5 text-stone-600 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-600">KE931 (보잉 787-9)</span>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-black text-stone-900">로마 (FCO)</h4>
                  <p className="text-xs text-stone-500">피우미치노 공항 T3</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">일정</span>
                  <span className="font-bold text-stone-900">2027.01.24 (일) 17:00 도착</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">탑승 인원</span>
                  <span className="font-semibold text-stone-800">성인 2인 (동환, 나경)</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                  <span className="text-stone-500">예약 번호 (PNR)</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-stone-900">
                    <span>KE-798242A</span>
                    <button
                      onClick={() => handleCopyPnr('KE-798242A')}
                      className="text-stone-400 hover:text-stone-700 cursor-pointer"
                      title="PNR 복사"
                    >
                      {copiedPnr ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">결제 상태</span>
                  <span className="text-emerald-700 font-bold">결제 완료 (실제 상세 입력 대기)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">바우처 첨부</span>
                  <button
                    onClick={() => onOpenVoucherModal('대한항공 e-티켓 확인증', '대한항공_E-티켓확인증.pdf')}
                    className="text-rose-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>대한항공_E-티켓확인증.pdf</span>
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-[11px] text-stone-700 leading-relaxed">
                <span className="text-amber-800 font-bold">동환 메모: </span>
                나경이 창가석 선호 반영(좌석 32A, 32B 완료). 입국 후 레오나르도 익스프레스 열차로 테르미니역 이동 예정.
              </div>
            </div>

            {/* Flight 2 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>예약 완료 · 귀국편</span>
                </span>
                <span className="text-xs text-stone-400">대한항공 KE932</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-stone-900">로마 (FCO)</h4>
                  <p className="text-xs text-stone-500">피우미치노 공항 T3</p>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-stone-400">직항 약 11h 50m</span>
                  <div className="w-24 h-px bg-stone-300 relative my-1">
                    <Plane className="w-3.5 h-3.5 text-stone-600 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-600">KE932</span>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-black text-stone-900">인천 (ICN)</h4>
                  <p className="text-xs text-stone-500">서울 인천국제공항 T2</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">일정</span>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 block">2027.02.03 (수) 출발</span>
                    <span className="text-[10px] text-rose-600 font-semibold">(출발 시간 미입력 - 확인 필요)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">예약 번호 (PNR)</span>
                  <span className="font-mono font-bold text-stone-900">KE-798242A</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">결제 상태</span>
                  <span className="text-emerald-700 font-bold">결제 완료 (왕복 패키지 일괄 결제 완료)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">공식 발권처</span>
                  <a
                    href="https://www.koreanair.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-700 hover:text-emerald-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>대한항공 공식 홈페이지 바로가기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200/80 text-[11px] text-stone-700 leading-relaxed">
                <span className="text-rose-800 font-bold">나경 메모: </span>
                텍스리펀(Global Blue) 여유 고려해 공항 최소 3시간 30분 전 도착 필요!
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Section 2: 호텔 및 숙소 (Accommodations · 4구간) */}
      {(categoryFilter === 'all' || categoryFilter === 'hotel') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <Building className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">
                호텔 및 숙소 (Accommodations · 4구간)
              </h3>
              <span className="text-xs text-stone-500">
                로마, 피렌체, 베네치아의 로맨틱 허니문 스테이
              </span>
            </div>
            <span className="text-xs font-bold text-amber-800">2개 예정 · 2개 미선정</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hotel 1: Rome 1 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                    <span>● 미선정 숙소</span>
                  </span>
                  <span className="text-xs font-bold text-stone-500">1차 거점 (3박)</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.24 ~ 01.27 (3박 4일)</p>
                <h4 className="text-lg font-black text-stone-900 mt-1">
                  로마 1차 숙소 후보 탐색 중
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  추천 지역: 테르미니역(Stazione Termini) 인근 또는 낭만적인 몬티 지구(Rione Monti)
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                  <p className="font-bold text-stone-700">선정 기준 체크포인트:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                    <li>도착 당일 피우미치노 공항선 캐리어 이동 편의성 (도보 7분 이내)</li>
                    <li>피렌체행 이탈로 아침 열차 탑승 동선 확보</li>
                    <li>1박당 예산 상한: ₩ 300,000 ~ ₩ 400,000선</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-stone-500">후보군: 호텔 아르테미데, 인디펜던트 호텔</span>
                <button
                  onClick={() => alert('호텔명을 입력하고 저장하는 기능입니다.')}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold cursor-pointer"
                >
                  호텔명·주소·가격 입력
                </button>
              </div>
            </div>

            {/* Hotel 2: MH Florence */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                    <span>● 예약 예정 (Planned)</span>
                  </span>
                  <span className="text-xs font-bold text-stone-500">2차 거점 (3박)</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.27 ~ 01.30 (3박 4일)</p>
                <h4 className="text-lg font-black text-stone-900 mt-1">
                  MH Florence Hotel & Spa
                </h4>
                <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Via Luigi Alamanni 37, 50123 Firenze FI, Italy</span>
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">위치 장점</span>
                    <span className="font-semibold text-stone-800">피렌체 SMN 중앙역 도보 3분</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">핵심 어메니티</span>
                    <span className="font-semibold text-stone-800">겨울 여행 특화 실내 스파 & 사우나, 루프탑 테라스</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">근교 연계성</span>
                    <span className="font-semibold text-stone-800">피사(Pisa) 당일치기 플랫폼 진입 최적</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-stone-200">
                    <span className="text-stone-500">예상 견적 (3박 조식포함)</span>
                    <span className="font-extrabold text-stone-900">약 € 680 (₩ 918,000)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-800 font-medium">체크인 3일 전 (2027.01.24) 무료취소</span>
                <button
                  onClick={() => updateReservationStatus('res-h2', 'confirmed', '예약 확정')}
                  className="px-3 py-1.5 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white font-bold cursor-pointer transition-colors"
                >
                  예약 확정으로 변경
                </button>
              </div>
            </div>

            {/* Hotel 3: Hotel Plaza Venice */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                    <span>● 예약 예정 (Planned)</span>
                  </span>
                  <span className="text-xs font-bold text-stone-500">3차 거점 (2박)</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.30 ~ 02.01 (2박 3일)</p>
                <h4 className="text-lg font-black text-stone-900 mt-1">
                  Hotel Plaza Venice
                </h4>
                <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Viale Stazione 36, 30171 Mestre, Venezia, Italy</span>
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">위치 장점</span>
                    <span className="font-semibold text-stone-800">베네치아 메스트레역(Mestre) 정문 바로 앞 (도보 1분)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">본섬 이동 편의</span>
                    <span className="font-semibold text-stone-800">산타 루치아 본섬역까지 빈번한 기차로 10분 직결</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">물가 & 캐리어</span>
                    <span className="font-semibold text-stone-800">본섬 돌바닥/계단 다리 캐리어 이동 고통 원천 방지</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-stone-200">
                    <span className="text-stone-500">예상 견적 (2박 Superior Double)</span>
                    <span className="font-extrabold text-stone-900">약 € 360 (₩ 612,000)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500">무료 취소 기한 체크 완료</span>
                <button
                  onClick={() => updateReservationStatus('res-h3', 'confirmed', '예약 확정')}
                  className="px-3 py-1.5 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white font-bold cursor-pointer transition-colors"
                >
                  예약 확정으로 변경
                </button>
              </div>
            </div>

            {/* Hotel 4: Rome 2 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                    <span>● 미선정 숙소</span>
                  </span>
                  <span className="text-xs font-bold text-stone-500">마지막 거점 (2박)</span>
                </div>
                <p className="text-xs text-stone-500">2027.02.01 ~ 02.03 (2박 3일)</p>
                <h4 className="text-lg font-black text-stone-900 mt-1">
                  로마 2차 귀국 전 숙소 선정
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  추천 지역: 스페인 광장(Piazza di Spagna) 쇼핑 편리 구역 또는 공항선 직통 테르미니역
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                  <p className="font-bold text-stone-700">선정 기준 체크포인트:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                    <li>피우미치노 공항 출국일 이른 아침 셔틀/열차 연계 수월</li>
                    <li>마지막 날 명품 거리 쇼핑 및 기념품 패킹 편리성</li>
                    <li>동환 & 나경의 마지막 밤 로맨틱 루프탑 바 보유 호텔 우대</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-stone-500">후보군: 호텔 나치오날레, 부티크 호텔 캄포 데 피오리</span>
                <button
                  onClick={() => alert('호텔명을 입력하고 저장하는 기능입니다.')}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold cursor-pointer"
                >
                  호텔명·주소·가격 입력
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Section 3: 초고속 열차 & 지역철도 (Trains · 4구간) */}
      {(categoryFilter === 'all' || categoryFilter === 'train') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                <Train className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">
                초고속 열차 & 지역철도 (Trains · 4구간)
              </h3>
              <span className="text-xs text-stone-500">
                Frecciarossa (이탈리아 철도청 Trenitalia) & Italo 티켓팅
              </span>
            </div>
            <span className="text-xs font-bold text-stone-500">4구간 예약 오픈 대기 중</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Train 1 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-500 font-bold">미예약 (D-90 오픈)</span>
                  <span className="text-rose-600 font-bold">Frecciarossa / Italo</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.27 (수) 11:00 목표</p>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  로마 → 피렌체
                </h4>
                <p className="text-[11px] text-stone-500">Roma Termini → Firenze S.M.N</p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">소요시간:</span> <span className="font-bold text-stone-800">1시간 36분</span></p>
                  <p><span className="text-stone-400">추천 좌석:</span> <span className="font-bold text-emerald-800">Prima / Business 석</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">예상: 2인 약 €80</span>
                <span className="font-bold text-stone-700">예약 체크</span>
              </div>
            </div>

            {/* Train 2 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-500 font-bold">미예약 (D-90 오픈)</span>
                  <span className="text-rose-600 font-bold">고속열차 직통</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.30 (토) 10:30 목표</p>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  피렌체 → 베네치아
                </h4>
                <p className="text-[11px] text-stone-500">Firenze S.M.N → Venezia Mestre</p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">소요시간:</span> <span className="font-bold text-stone-800">2시간 05분</span></p>
                  <p><span className="text-stone-400">하차역:</span> <span className="font-bold text-blue-800">메스트레역 직하차</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">예상: 2인 약 €90</span>
                <span className="font-bold text-stone-700">예약 체크</span>
              </div>
            </div>

            {/* Train 3 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-500 font-bold">미예약 (D-90 오픈)</span>
                  <span className="text-rose-600 font-bold">종단 초고속</span>
                </div>
                <p className="text-xs text-stone-500">2027.02.01 (월) 10:30 목표</p>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  베네치아 → 로마
                </h4>
                <p className="text-[11px] text-stone-500">Venezia Mestre → Roma Termini</p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">소요시간:</span> <span className="font-bold text-stone-800">3시간 45분</span></p>
                  <p><span className="text-stone-400">옵션:</span> <span className="font-bold text-amber-800">스낵 서비스 포함</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">예상: 2인 약 €110</span>
                <span className="font-bold text-stone-700">예약 체크</span>
              </div>
            </div>

            {/* Train 4 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-emerald-700 font-bold">현장발권 가능</span>
                  <span className="text-stone-500 font-medium">Regionale Veloce</span>
                </div>
                <p className="text-xs text-stone-500">2027.01.29 (금) 근교투어</p>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  피렌체 ↔ 피사 왕복
                </h4>
                <p className="text-[11px] text-stone-500">Firenze S.M.N ↔ Pisa Centrale</p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">소요시간:</span> <span className="font-bold text-stone-800">편도 50분</span></p>
                  <p><span className="text-stone-400">좌석:</span> <span className="font-bold text-stone-800">자유석 (일정유동적)</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">2인 왕복 약 €38</span>
                <span className="font-bold text-emerald-800">현장발권</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Section 4: 관광지 입장권 & 특별 투어 (Tours & Tickets) */}
      {(categoryFilter === 'all' || categoryFilter === 'tour') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                <Ticket className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">
                관광지 입장권 & 특별 투어 (Tours & Tickets)
              </h3>
              <span className="text-xs text-stone-500">
                웨이팅 없는 사전 패스트트랙 및 남부 일일투어 일정
              </span>
            </div>
            <span className="text-xs font-bold text-purple-800">6개 항목 검토 중</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tour 1: Vatican */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    티켓 오픈 대기 (D-60)
                  </span>
                  <span className="text-stone-500 font-bold">로마 DAY 2</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  바티칸 박물관 & 시스티나 성당
                </h4>
                <p className="text-[11px] text-stone-500">
                  Musei Vaticani & Cappella Sistina (천장창조, 최후의 심판 집중 감상)
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">희망 시간:</span> <span className="font-bold text-stone-800">09:00 슬롯 (오전 프라이빗 입장)</span></p>
                  <p><span className="text-stone-400">예약 공식처:</span> <span className="font-bold text-emerald-800">바티칸 공식 티켓 사이트</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">공식 예약 사이트</span>
                <button
                  onClick={() => alert('바티칸 티켓 예매 알림이 설정되었습니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  세부 설정
                </button>
              </div>
            </div>

            {/* Tour 2: Southern Tour */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    겨울 투어 일정 검토 중
                  </span>
                  <span className="text-stone-500 font-bold">로마 근교 DAY 3</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  이탈리아 남부 일일투어
                </h4>
                <p className="text-[11px] text-stone-500">
                  폼페이 유적지 + 소렌토 전망대 + 포지타노 해안마을 밴 투어
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">투어 형태:</span> <span className="font-bold text-stone-800">한국어 가이드 소규모 밴</span></p>
                  <p><span className="text-stone-400">주의사항:</span> <span className="font-bold text-rose-700">1월 말 포지타노 상점 휴무 여부 체크</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">2인 약 ₩ 360,000</span>
                <button
                  onClick={() => alert('플랫폼별 겨울 투어 옵션을 비교합니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  플랫폼 비교
                </button>
              </div>
            </div>

            {/* Tour 3: Uffizi */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    미예약 (D-45 권장)
                  </span>
                  <span className="text-stone-500 font-bold">피렌체 DAY 5</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  우피치 미술관 패스트트랙
                </h4>
                <p className="text-[11px] text-stone-500">
                  Galleria degli Uffizi (보티첼리 '비너스의 탄생', 레오나르도 다빈치)
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">희망 시간:</span> <span className="font-bold text-stone-800">13:30 (점심 후 여유 입장)</span></p>
                  <p><span className="text-stone-400">공식 예매처:</span> <span className="font-bold text-emerald-800">b-ticket 공식 채널</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">공식 티켓 예매</span>
                <button
                  onClick={() => alert('우피치 미술관 티켓 사이트 링크를 확인합니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  세부 설정
                </button>
              </div>
            </div>

            {/* Tour 4: Pisa */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold">
                    미예약 (D-20 권장)
                  </span>
                  <span className="text-stone-500 font-bold">피사 근교 DAY 6</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  피사의 사탑 타워 등반권
                </h4>
                <p className="text-[11px] text-stone-500">
                  Torre di Pisa 사탑 꼭대기 전망대 & 두오모 대성당 입장
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">타임슬롯:</span> <span className="font-bold text-stone-800">14:00 예약제 (30분 단위)</span></p>
                  <p><span className="text-stone-400">주의사항:</span> <span className="font-bold text-amber-800">모든 가방 보관소 필수 예치</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">2인 약 €40</span>
                <button
                  onClick={() => alert('피사 사탑 예약 슬롯을 확인합니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  세부 설정
                </button>
              </div>
            </div>

            {/* Tour 5: Doge's Palace */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold">
                    미예약
                  </span>
                  <span className="text-stone-500 font-bold">베네치아 DAY 7</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  산마르코 & 두칼레 궁전
                </h4>
                <p className="text-[11px] text-stone-500">
                  Palazzo Ducale & 탄식의 다리 내부 통과 패스트트랙
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">패키지:</span> <span className="font-bold text-stone-800">두칼레 궁전 + 산마르코 테라스</span></p>
                  <p><span className="text-stone-400">특징:</span> <span className="font-bold text-stone-800">현장 대기 중 1시간 절약</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">2인 약 €60</span>
                <button
                  onClick={() => alert('두칼레 궁전 패스트트랙 옵션을 확인합니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  세부 설정
                </button>
              </div>
            </div>

            {/* Tour 6: Colosseum */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    티켓팅 직전 (D-30 오픈)
                  </span>
                  <span className="text-stone-500 font-bold">로마 복귀 DAY 9</span>
                </div>
                <h4 className="text-base font-black text-stone-900 mt-1">
                  콜로세움 아레나 & 포로 로마노
                </h4>
                <p className="text-[11px] text-stone-500">
                  Colosseo Full Experience (아레나 바닥 및 지하 구역 입장)
                </p>
                <div className="mt-2.5 p-2 rounded bg-stone-50 text-[11px] space-y-1">
                  <p><span className="text-stone-400">오픈 일시:</span> <span className="font-bold text-stone-800">관람 30일 전 정각 오픈</span></p>
                  <p><span className="text-stone-400">동환/나경:</span> <span className="font-bold text-emerald-800">동시 접속 예매 전략 수립 완료</span></p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">공식 예매처</span>
                <button
                  onClick={() => alert('콜로세움 공식 예매처 오픈 알림을 설정합니다.')}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  세부 설정
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Section 5: 로맨틱 다이닝 & 허니문 특별체험 (Activities) */}
      {(categoryFilter === 'all' || categoryFilter === 'dining') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">
                로맨틱 다이닝 & 허니문 특별체험 (Activities)
              </h3>
              <span className="text-xs text-stone-500">
                베네치아 대운하 곤돌라 및 피렌체 티본스테이크 명소
              </span>
            </div>
            <span className="text-xs font-bold text-rose-800">현장 및 사전예약 검토</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Activity 1 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-emerald-700 font-bold">현장 공식 정찰제 or 일몰 사전예약</span>
                  <span className="text-amber-800 font-bold">베네치아 허니문 하이라이트</span>
                </div>
                <h4 className="text-lg font-black text-stone-900">
                  베네치아 프라이빗 곤돌라 체험
                </h4>
                <p className="text-xs text-stone-500">
                  산마르코 소운하에서 대운하로 이어지는 프라이빗 단독 탑승 (약 30~40분)
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">공식 주간 요금:</span>
                    <span className="font-bold text-stone-800">€90 (배 1척당)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">일몰/야간 요금 (19:00~):</span>
                    <span className="font-bold text-emerald-800">€110 (배 1척당)</span>
                  </div>
                  <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                    * 팁: 현장 탑승 시 탑승 전 정확한 코스(대운하 진입 여부)와 요금 사전 확인 필수.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>추천 시간대: 16:30 노을 무렵</span>
                </span>
                <button
                  onClick={() => alert('곤돌라 석양 코스가 플랜에 등록되었습니다.')}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  예약 플랜에 추가
                </button>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-stone-500 font-bold">식당 예약 예정 (1개월 전)</span>
                  <span className="text-amber-800 font-bold">피렌체 미식</span>
                </div>
                <h4 className="text-lg font-black text-stone-900">
                  피렌체 티본스테이크 디너 (Trattoria dell'Orto)
                </h4>
                <p className="text-xs text-stone-500">
                  토스카나 전통 키아니나 품종 비스테카 알라 피오렌티나 & 끼안티 클라시코 와인
                </p>

                <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">희망 일시:</span>
                    <span className="font-bold text-stone-800">2027.01.28 (목) 19:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">예약 수단:</span>
                    <span className="font-bold text-stone-800">TheFork 어플 or 구글 맵 실시간 예약</span>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-stone-200">
                    동환's Pick: 부라타 치즈 토마토 샐러드 + 티본 1.2kg 미디엄 레어 주문 예정
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500 font-bold">2인 예상: € 110 ~ € 130</span>
                <button
                  onClick={() => alert('피렌체 식당 예약 정보가 클립보드에 복사되었습니다.')}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold cursor-pointer"
                >
                  식당 예약 정보 관리
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
