export type ActiveTab = 
  | 'dashboard' 
  | 'itinerary' 
  | 'reservations' 
  | 'checklist' 
  | 'places' 
  | 'budget' 
  | 'routes';

export interface CoupleInfo {
  groomKo: string;
  groomEn: string;
  brideKo: string;
  brideEn: string;
  startDate: string; // 2027.01.24
  endDate: string; // 2027.02.03
  nights: number; // 10
  days: number; // 11
  flightIn: string; // FCO 01.24 17:00
  flightOut: string; // FCO 02.03 18:30
  targetDepartureIso: string; // 2027-01-24T17:00:00+01:00
  exchangeRate: number; // 1 EUR = 1700 KRW
}

export interface StageCard {
  id: string;
  stageNumber: string; // "STAGE 01"
  duration: string; // "3박 4일"
  subTheme: string; // "ARRIVAL & VATICAN"
  cityKo: string; // "로마 1차 (Rome)"
  dates: string; // "01.24 (토) - 01.27 (화)"
  tags: { text: string; color: 'red' | 'orange' | 'green' | 'amber' | 'brown' }[];
  keywords: string;
  hotelStatus: string;
  hotelDetail: string;
  imageUrl: string;
  actionPrimary: string;
  actionSecondary: string;
  targetTab: ActiveTab;
}

export interface RadarItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  actionText: string;
  actionType: 'alert' | 'link' | 'note';
}

export interface ChecklistItem {
  id: string;
  text: string;
  assignee: '동환 담당' | '나경 담당' | '공동' | '완료됨';
  completed: boolean;
  category: '서류/항공' | '숙소/교통' | '투어/티켓' | '환전/결제' | '준비물/패킹';
  priority?: 'high' | 'medium' | 'low';
}

export interface ScheduleItem {
  id: string;
  dayNumber: number; // 1 - 11
  time: string; // "17:00" or "17:00 ~ 19:00"
  city: '로마' | '피렌체' | '베네치아' | '피사' | '나폴리/포지타노';
  category: '항공/교통' | '숙소 체크인' | '식사 & 카페' | '관광 & 명소' | '쇼핑 & 기념품' | '휴식 & 웰니스';
  title: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'red' | 'purple' | 'blue';
  description: string;
  notes?: string;
  costEur?: number;
  costKrw?: number;
  completed: boolean;
  googleMapQuery?: string;
}

export interface DayOverview {
  dayNumber: number;
  dateStr: string; // "01.24 (토)"
  title: string;
  summary: string;
  city: string;
  badge: string;
  badgeType: 'emerald' | 'amber' | 'blue' | 'purple' | 'rose';
  weather: {
    temp: string;
    condition: string;
    icon: string;
  };
}

export interface ReservationItem {
  id: string;
  category: 'flight' | 'hotel' | 'train' | 'tour' | 'dining';
  title: string;
  subtitle?: string;
  status: 'confirmed' | 'planned' | 'pending';
  statusText: string;
  statusColor: 'emerald' | 'amber' | 'rose' | 'gray';
  dates: string;
  route?: string;
  flightCode?: string;
  flightDuration?: string;
  aircraft?: string;
  pnr?: string;
  hotelLocation?: string;
  hotelAddress?: string;
  features?: string[];
  costEur?: number;
  costKrw?: number;
  voucherUrl?: string;
  officialSiteUrl?: string;
  bookingChannel?: string;
  memo?: string;
  dDayText?: string;
}

export interface LedgerItem {
  id: string;
  date: string; // "2027.01.24"
  dayLabel: string; // "사전 예약" or "DAY 5"
  category: '숙박' | '식음료' | '교통' | '관광' | '쇼핑' | '도시세/보험';
  title: string;
  memo: string;
  amountEur?: number;
  amountKrw?: number;
  isEstimate: boolean;
  paymentMethod: string;
  status: '영수증 대기' | '미결제 (체크인 결제)' | '미결제' | '온라인 결제 예정' | '온라인 사전 결제' | '예상 금액' | '영수증 보관' | '결제 완료';
  receiptAttached?: boolean;
}

export interface PlaceItem {
  id: string;
  nameKo: string;
  nameIt: string;
  city: '로마' | '피렌체' | '베네치아' | '피사' | '포지타노';
  category: '랜드마크' | '미술관/박물관' | '미식/레스토랑' | '카페/젤라또' | '포토스팟 & 석양' | '명품쇼핑';
  description: string;
  tip: string;
  recommendedTime: string;
  imageUrl: string;
  mapQuery: string;
}
