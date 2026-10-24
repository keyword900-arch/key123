import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import {
  Train,
  Plane,
  MapPin,
  Clock,
  Compass,
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const TransitMapView: React.FC = () => {
  const { coupleInfo } = useHoneymoon();

  const routes = [
    {
      id: 'r1',
      date: '2027.01.24 (토)',
      from: '인천국제공항 (ICN)',
      to: '로마 피우미치노 (FCO)',
      type: 'flight',
      carrier: '대한항공 KE931',
      duration: '13시간 20분',
      distance: '8,960 km',
      detail: '직항 비행. 보잉 787-9 드림라이너. 창가석 32A, 32B 완료.'
    },
    {
      id: 'r2',
      date: '2027.01.24 (토)',
      from: '피우미치노 공항역',
      to: '로마 테르미니역 (Roma Termini)',
      type: 'train',
      carrier: 'Leonardo Express (트랜이탈리아)',
      duration: '32분 직통',
      distance: '32 km',
      detail: '배차 간격 15분. 펀칭(개표) 불필요(QR코드 티켓). 1인 €14.'
    },
    {
      id: 'r3',
      date: '2027.01.27 (화)',
      from: '로마 테르미니역 (Roma Termini)',
      to: '피렌체 S.M.N역 (Firenze S.M.N)',
      type: 'highspeed',
      carrier: '이탈로(Italo) / Frecciarossa',
      duration: '1시간 36분',
      distance: '260 km',
      detail: '최고시속 300km/h 초고속열차. Prima 클래스 탑승 추천. 캐리어 보관소 선점.'
    },
    {
      id: 'r4',
      date: '2027.01.29 (목)',
      from: '피렌체 S.M.N',
      to: '피사 센트랄레 (Pisa Centrale)',
      type: 'train',
      carrier: 'Regionale Veloce (지역열차)',
      duration: '50분',
      distance: '80 km',
      detail: '현장 무인발권기 또는 트랜이탈리아 앱 구매. 자유석 탑승.'
    },
    {
      id: 'r5',
      date: '2027.01.30 (금)',
      from: '피렌체 S.M.N역',
      to: '베네치아 메스트레역 (Venezia Mestre)',
      type: 'highspeed',
      carrier: 'Frecciarossa / Italo',
      duration: '2시간 05분',
      distance: '250 km',
      detail: '본섬 직전 메스트레역 하차. 호텔 플라자 베니스 도보 1분 체크인 최적.'
    },
    {
      id: 'r6',
      date: '2027.02.01 (일)',
      from: '베네치아 메스트레역',
      to: '로마 테르미니역',
      type: 'highspeed',
      carrier: '초고속 종단 열차',
      duration: '3시간 45분',
      distance: '530 km',
      detail: '베네치아에서 남하하여 로마로 직통 귀환. 열차 내 간식 및 충전 콘센트 이용.'
    },
    {
      id: 'r7',
      date: '2027.02.03 (화)',
      from: '로마 테르미니역',
      to: '피우미치노 공항 (FCO)',
      type: 'train',
      carrier: 'Leonardo Express',
      duration: '32분',
      distance: '32 km',
      detail: '비행기 출발 4시간 전 탑승하여 여유롭게 세관 택스리펀 진행.'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            이탈리아 종단 이동 경로 & 교통 가이드
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            로마 ⇄ 피렌체 ⇄ 베네치아 1,020km 고속철도 및 공항 익스프레스 총정리
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>총 이동 거리: 1,020 km (철도 4구간)</span>
        </div>
      </div>

      {/* Visual Journey Schematic */}
      <div className="bg-gradient-to-r from-[#17382b] to-[#12281e] text-white p-6 rounded-2xl border border-emerald-900/40 shadow-lg">
        <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>●</span>
          <span>HIGH-SPEED RAILWAY MASTER CORRIDOR</span>
        </h3>

        {/* Timeline dots */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase">STAGE 01</span>
            <h4 className="text-base font-black">로마 1차 (Rome)</h4>
            <p className="text-xs text-stone-200">3박 4일 체류</p>
            <p className="text-[11px] text-emerald-200">FCO 공항 도착 → 테르미니역</p>
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase">STAGE 02</span>
            <h4 className="text-base font-black">피렌체 & 피사 (Florence)</h4>
            <p className="text-xs text-stone-200">3박 4일 체류 (고속열차 1h 36m)</p>
            <p className="text-[11px] text-emerald-200">SMN역 도보 5분 MH Florence</p>
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase">STAGE 03</span>
            <h4 className="text-base font-black">베네치아 (Venice)</h4>
            <p className="text-xs text-stone-200">2박 3일 체류 (고속열차 2h 05m)</p>
            <p className="text-[11px] text-emerald-200">메스트레역 Hotel Plaza Venice</p>
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase">STAGE 04</span>
            <h4 className="text-base font-black">로마 2차 (Rome Return)</h4>
            <p className="text-xs text-stone-200">2박 3일 체류 (종단열차 3h 45m)</p>
            <p className="text-[11px] text-emerald-200">스페인광장 쇼핑 후 FCO 출국</p>
          </div>
        </div>
      </div>

      {/* Transit Routes Table */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
        <h3 className="text-base font-extrabold text-stone-900">
          전체 상세 이동 구간 및 소요시간
        </h3>

        <div className="space-y-3">
          {routes.map(r => (
            <div
              key={r.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-100 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-500">{r.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-bold text-[10px]">
                    {r.carrier}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-stone-900">
                  <span>{r.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  <span>{r.to}</span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  {r.detail}
                </p>
              </div>

              <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 pt-2 md:pt-0 border-stone-200">
                <span className="text-sm font-black text-emerald-800">{r.duration}</span>
                <span className="text-[11px] text-stone-400">{r.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Train Riding & Baggage Essential Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
          <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
            <Train className="w-4 h-4 text-emerald-700" />
            <span>이탈리아 고속열차 수하물(캐리어) 팁</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-stone-600 leading-relaxed text-[11px]">
            <li>열차 칸 입구 대형 수하물 보관대(Luggage Rack)는 승차 직후 바로 채워지므로 10~15분 전 플랫폼 대기 권장.</li>
            <li>28인치 캐리어는 2인 좌석 사이 'A'자 공간이나 상단 선반에 적재 가능합니다.</li>
            <li>와이어 자전거 자물쇠를 지참하여 보관대에 묶어두면 분실 걱정 없이 꿀잠 가능!</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
          <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>현장 티켓 펀칭(Convalida) 주의사항</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-stone-600 leading-relaxed text-[11px]">
            <li>초고속열차(Frecciarossa/Italo)는 좌석 지정권이므로 개표기 펀칭이 불필요합니다.</li>
            <li>피사행 지역열차(Regionale) 종이 티켓은 플랫폼 진입 전 초록색 개표기에 반드시 펀칭해야 벌금을 피할 수 있습니다 (모바일 체크인 QR 제외).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
