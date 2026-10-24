import {
  CoupleInfo,
  StageCard,
  RadarItem,
  ChecklistItem,
  DayOverview,
  ScheduleItem,
  ReservationItem,
  LedgerItem,
  PlaceItem
} from '../types/honeymoon';

export const INITIAL_COUPLE_INFO: CoupleInfo = {
  groomKo: '김동환 (Kim Dong Hwan)',
  groomEn: 'Dong Hwan',
  brideKo: '왕나경 (Wang Na Kyung)',
  brideEn: 'Na Kyung',
  startDate: '2027.01.24',
  endDate: '2027.02.03',
  nights: 10,
  days: 11,
  flightIn: '로마 IN (FCO) 01.24 17:00 도착',
  flightOut: '로마 OUT 02.03',
  targetDepartureIso: '2027-01-24T17:00:00+01:00',
  exchangeRate: 1700
};

export const INITIAL_STAGE_CARDS: StageCard[] = [
  {
    id: 'stage-1',
    stageNumber: 'STAGE 01',
    duration: '3박 4일',
    subTheme: 'ARRIVAL & VATICAN',
    cityKo: '로마 1차 (Rome)',
    dates: '01.24 (토) - 01.27 (화)',
    tags: [
      { text: '호텔 미선정', color: 'red' },
      { text: '남부투어 검토중', color: 'orange' }
    ],
    keywords: '바티칸 박물관 & 시스티나 성당 투어, 성 베드로 대성당, 나보나 광장, 트라스테베레 저녁 산책, 남부 포지타노 투어(기상 옵션 검토)',
    hotelStatus: '후보 선정 필요',
    hotelDetail: '추천 지구: 테르미니역(이동성) 또는 몬티(분위기)',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', // Rome Colosseum
    actionPrimary: '동선 지도',
    actionSecondary: '상세 일정 →',
    targetTab: 'itinerary'
  },
  {
    id: 'stage-2',
    stageNumber: 'STAGE 02',
    duration: '3박 4일',
    subTheme: 'RENAISSANCE & SUNSET',
    cityKo: '피렌체 (Florence)',
    dates: '01.27 (화) - 01.30 (금)',
    tags: [
      { text: '호텔 예약예정', color: 'green' },
      { text: '우피치 사전예약 D-15', color: 'orange' }
    ],
    keywords: '산타 마리아 델 피오레 두오모 쿠폴라 등반, 우피치 미술관 가이드 투어, 미켈란젤로 광장 석양 와인, 피사의 사탑 반나절',
    hotelStatus: '스파 & 역세권',
    hotelDetail: 'MH Florence Hotel & Spa · SMN 역 도보 5분 · 웰니스 스파 시설 ...',
    imageUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80', // Florence Duomo sunset
    actionPrimary: '호텔 관리',
    actionSecondary: '일정 보기 →',
    targetTab: 'itinerary'
  },
  {
    id: 'stage-3',
    stageNumber: 'STAGE 03',
    duration: '2박 3일',
    subTheme: '2027 CARNIVAL MASK',
    cityKo: '베네치아 (Venice)',
    dates: '01.30 (금) - 02.01 (일)',
    tags: [
      { text: '호텔 예약예정', color: 'green' },
      { text: '카니발 축제기간', color: 'amber' }
    ],
    keywords: '산타루치아 대운하 바포레토, 산 마르코 대성당 & 광장, 2027 카니발 가면 축제 퍼레이드, 로맨틱 곤돌라 석양 투어',
    hotelStatus: '캐리어 편의 극대화',
    hotelDetail: 'Hotel Plaza Venice · 메스트레역 바로 앞 · 본섬 10분 열차 ...',
    imageUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80', // Venice Canal
    actionPrimary: '교통 동선',
    actionSecondary: '일정 보기 →',
    targetTab: 'itinerary'
  },
  {
    id: 'stage-4',
    stageNumber: 'STAGE 04',
    duration: '2박 3일',
    subTheme: 'GRAND FINALE & BOUTIQUES',
    cityKo: '로마 2차 (Rome Return)',
    dates: '02.01 (일) - 02.03 (화)',
    tags: [
      { text: '호텔 미선정', color: 'red' },
      { text: '명품 쇼핑 4시간 확보', color: 'brown' }
    ],
    keywords: '콜로세움 & 포로 로마노 내부 관람, 콘도티 거리(Via dei Condotti) 명품 쇼핑, 스페인 광장, 트레비 분수 야경 동전 던지기, FCO 공항 출국',
    hotelStatus: '공항 리무진 용이',
    hotelDetail: '추천: 테르미니역 주변(레오나르도 익스프레스 직통)',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80', // Rome Spanish Steps
    actionPrimary: '쇼핑 목록',
    actionSecondary: '출국 동선 →',
    targetTab: 'budget'
  }
];

export const INITIAL_RADAR_ITEMS: RadarItem[] = [
  {
    id: 'radar-1',
    title: '바티칸 박물관 & 시스티나 성당 공식 예약',
    badge: '방문일 60일 전',
    description: '2026년 11월 25일 오전 8시(한국시간) 티켓 오픈 예정. 한국어 패스트트랙 투어 사전 신청 권장.',
    actionText: '알림 설정됨',
    actionType: 'alert'
  },
  {
    id: 'radar-2',
    title: '피렌체 우피치 미술관 & 두오모 쿠폴라',
    badge: '방문일 30일 전',
    description: '두오모 브루넬레스키 쿠폴라는 현장 발권 불가. 일몰 1시간 전 타임슬롯 지정 필수.',
    actionText: '공식링크 확인',
    actionType: 'link'
  },
  {
    id: 'radar-3',
    title: '로마 출발 남부투어(폼페이·포지타노) 겨울 운행 검토',
    badge: '1월 특별 운영',
    description: '겨울철 해상 페리 결항 여부 및 포지타노 상점 휴업 주기 확인 후 차량 전용 투어로 조율 추천.',
    actionText: '검토 노트',
    actionType: 'note'
  }
];

export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    text: '로마 1차 (01.24-27, 3박) 테르미니역 인근 숙소 최종 결제',
    assignee: '동환 담당',
    completed: false,
    category: '숙소/교통',
    priority: 'high'
  },
  {
    id: 'chk-2',
    text: '로마 2차 (02.01-03, 2박) 콘도티 & FCO 공항 이동 최적화 숙소 결정',
    assignee: '나경 담당',
    completed: false,
    category: '숙소/교통',
    priority: 'high'
  },
  {
    id: 'chk-3',
    text: '항공권 영문명 및 여권 만료일(6개월 이상 잔여) 상호 크로스체크',
    assignee: '완료됨',
    completed: true,
    category: '서류/항공',
    priority: 'high'
  },
  {
    id: 'chk-4',
    text: '해외 여행자보험 최고보장형 부부 패키지 가입 & 영문 증명서 보관',
    assignee: '동환 담당',
    completed: false,
    category: '서류/항공',
    priority: 'high'
  },
  {
    id: 'chk-5',
    text: '바티칸 투어 패스트트랙 공식 홈페이지 오픈 티켓팅 (D-60 알림 체크)',
    assignee: '동환 담당',
    completed: false,
    category: '투어/티켓',
    priority: 'high'
  },
  {
    id: 'chk-6',
    text: '유럽 e-SIM 2인 10GB 사전 구매 및 QR 코드 캡처 저장',
    assignee: '나경 담당',
    completed: false,
    category: '준비물/패킹',
    priority: 'medium'
  },
  {
    id: 'chk-7',
    text: '트래블로그 / 트래블월렛 카드 유로화 충전 및 비상 현금 300유로 환전',
    assignee: '동환 담당',
    completed: false,
    category: '환전/결제',
    priority: 'medium'
  },
  {
    id: 'chk-8',
    text: '베네치아 카니발 가면 체험 예약 및 프라이빗 곤돌라 시간대 확정',
    assignee: '나경 담당',
    completed: false,
    category: '투어/티켓',
    priority: 'medium'
  }
];

export const INITIAL_DAYS: DayOverview[] = [
  {
    dayNumber: 1,
    dateStr: '01.24 (토)',
    title: '로마 입국 & 설레는 체크인',
    summary: '인천 출발 후 17:00 로마 피우미치노 공항 도착 및 시내 안착',
    city: '로마',
    badge: '로마 완료 대기',
    badgeType: 'emerald',
    weather: { temp: '4°C ~ 13°C', condition: '맑음/구름 약간', icon: '☀️' }
  },
  {
    dayNumber: 2,
    dateStr: '01.25 (일)',
    title: '남부 투어 (폼페이·포지타노)',
    summary: '고대 유적 폼페이와 아말피 해안도로의 보석 포지타노 전일 투어',
    city: '남부',
    badge: '김동환 예약 필요',
    badgeType: 'amber',
    weather: { temp: '6°C ~ 14°C', condition: '화창한 겨울', icon: '☀️' }
  },
  {
    dayNumber: 3,
    dateStr: '01.26 (월)',
    title: '바티칸 미술관 & 성베드로',
    summary: '인류의 보물 라파엘로·미켈란젤로의 걸작과 로마 정통 미식 탐방',
    city: '로마',
    badge: '로마 예약 필요',
    badgeType: 'rose',
    weather: { temp: '5°C ~ 13°C', condition: '맑음', icon: '🌤️' }
  },
  {
    dayNumber: 4,
    dateStr: '01.27 (화)',
    title: '피렌체 이동 & 두오모·아르노',
    summary: '고속열차 이동, MH Florence Hotel 체크인, 두오모 및 아르노강 일몰',
    city: '피렌체',
    badge: '피렌체 기차 이동',
    badgeType: 'purple',
    weather: { temp: '3°C ~ 11°C', condition: '쌀쌀함/맑음', icon: '⛅' }
  },
  {
    dayNumber: 5,
    dateStr: '01.28 (수)',
    title: '우피치 미술관 & 미켈란젤로 광장',
    summary: '보티첼리의 비너스, 메디치가의 유산, 환상적인 언덕 위 일몰',
    city: '피렌체',
    badge: '피렌체 사전 예약',
    badgeType: 'amber',
    weather: { temp: '3°C ~ 12°C', condition: '맑음', icon: '☀️' }
  },
  {
    dayNumber: 6,
    dateStr: '01.29 (목)',
    title: '피사의 사탑 반일 & MH스파',
    summary: '오전 피사의 사탑 인증샷 후 오후 피렌체 복귀 럭셔리 스파 힐링',
    city: '피사/피렌체',
    badge: '피사 당일 릴랙스',
    badgeType: 'blue',
    weather: { temp: '4°C ~ 12°C', condition: '약간 구름', icon: '⛅' }
  },
  {
    dayNumber: 7,
    dateStr: '01.30 (금)',
    title: '물과 카니발의 도시, 베네치아',
    summary: 'Hotel Plaza Venice 체크인, 바포레토 1번선 대운하 크루징 & 카니발 가면 체험',
    city: '베네치아',
    badge: '베네치아 예약 필요',
    badgeType: 'amber',
    weather: { temp: '1°C ~ 9°C', condition: '바람 약간/방한 대비', icon: '☁️' }
  },
  {
    dayNumber: 8,
    dateStr: '01.31 (토)',
    title: '산마르코 & 낭만 곤돌라 석양',
    summary: '두칼레 궁전 탄식의 다리, 카페 플로리안 오케스트라, 운하 위 곤돌라',
    city: '베네치아',
    badge: '베네치아',
    badgeType: 'emerald',
    weather: { temp: '2°C ~ 8°C', condition: '맑음/노을 예술', icon: '🌅' }
  },
  {
    dayNumber: 9,
    dateStr: '02.01 (일)',
    title: '로마 복귀 & 판테온·나보나',
    summary: '고속열차 로마 귀환, 판테온, 나보나 광장, 지올리티 젤라또',
    city: '로마',
    badge: '로마 기차 4시간',
    badgeType: 'blue',
    weather: { temp: '5°C ~ 13°C', condition: '맑음', icon: '☀️' }
  },
  {
    dayNumber: 10,
    dateStr: '02.02 (월)',
    title: '콜로세움 & 콘도티 집중 쇼핑',
    summary: '오전 콜로세움 역사 탐방 후 4시간 집중 쇼핑 & 트레비 분수 야경',
    city: '로마',
    badge: '로마 예약 필요',
    badgeType: 'rose',
    weather: { temp: '6°C ~ 14°C', condition: '쾌청', icon: '☀️' }
  },
  {
    dayNumber: 11,
    dateStr: '02.03 (화)',
    title: '텍스리펀 & 피우미치노 출국',
    summary: '호텔 체크아웃, 공항 4시간 전 도착 집중 쇼핑 & 리펀 후 KE932 귀국 탑승',
    city: '로마/출국',
    badge: '출국 귀국',
    badgeType: 'emerald',
    weather: { temp: '5°C ~ 14°C', condition: '맑음', icon: '✈️' }
  }
];

export const INITIAL_SCHEDULE_ITEMS: ScheduleItem[] = [
  // DAY 1
  {
    id: 'd1-1',
    dayNumber: 1,
    time: '17:00',
    city: '로마',
    category: '항공/교통',
    title: '로마 피우미치노(FCO) 국제공항 도착',
    badge: '노을 공항 안착',
    badgeColor: 'emerald',
    description: '대한항공/아시아나/외항사 도착 터미널 하차. 여권 및 입국심사 서류 준비.',
    notes: '인천공항에서 받은 로마 입국 서류 확인, e-SIM 활성화 여부 터미널에서 즉시 점검할 것',
    costEur: 0,
    costKrw: 0,
    completed: true,
    googleMapQuery: 'Leonardo da Vinci-Fiumicino Airport'
  },
  {
    id: 'd1-2',
    dayNumber: 1,
    time: '17:00 ~ 19:00',
    city: '로마',
    category: '항공/교통',
    title: '입국심사 & 수하물 수령 & 시내(테르미니) 이동',
    badge: '이동 최종 확인 필요',
    badgeColor: 'amber',
    description: '레오나르도 익스프레스 고속열차(1인 €14) 또는 정액 택시(€50) 이용해 테르미니역 방면으로 이동.',
    notes: '2인 €28 ~ €50 · 이동 약 32분',
    costEur: 30,
    completed: false,
    googleMapQuery: 'Roma Termini'
  },
  {
    id: 'd1-3',
    dayNumber: 1,
    time: '19:00 ~ 20:00',
    city: '로마',
    category: '숙소 체크인',
    title: '로마 1일차 호텔 체크인 (숙소 미확정)',
    badge: '호텔 미선정 / 예약 필요',
    badgeColor: 'red',
    description: '테르미니역 인근 또는 스페인광장 주변 4성급 부티크 호텔 검토 중. 짐 풀고 가벼운 복장 환복.',
    notes: '로마 1박 숙소 조기예약 확정 요망',
    costEur: 0,
    completed: false,
    googleMapQuery: 'Hotel Artemide Rome'
  },
  {
    id: 'd1-4',
    dayNumber: 1,
    time: '20:00 ~ 21:00',
    city: '로마',
    category: '식사 & 카페',
    title: '숙소 근처 트라토리아 첫 저녁 식사 & 휴식',
    badge: '첫 식사 완료 추천',
    badgeColor: 'emerald',
    description: '장시간 비행 후이므로 부담 없는 현지 가정식 파스타와 하우스 와인 1잔 후 21:00 취침 모드 진입.',
    notes: '카르보나라 or 카초 에 페페 추천',
    costEur: 50,
    completed: false,
    googleMapQuery: 'Trattoria Vecchia Roma'
  },

  // DAY 2
  {
    id: 'd2-1',
    dayNumber: 2,
    time: '06:30 ~ 10:00',
    city: '나폴리/포지타노',
    category: '항공/교통',
    title: '로마 출발 집결 & 남부 전용차량 이동',
    badge: '투어 버스 이동 / 미예약 / 검토 중',
    badgeColor: 'amber',
    description: '테르미니역 인근 투어 미팅 후 남부 고속도로 경유 약 3시간 소요. 차내 간식 및 보조배터리 지참.',
    notes: '겨울철 차량 전용 소규모 밴 투어 권장',
    costEur: 0,
    completed: false,
    googleMapQuery: 'Naples, Italy'
  },
  {
    id: 'd2-2',
    dayNumber: 2,
    time: '10:00 ~ 13:00',
    city: '나폴리/포지타노',
    category: '관광 & 명소',
    title: '폼페이 유적지 집중 가이드 투어 & 현지 중식',
    badge: '관광 & 식사',
    badgeColor: 'emerald',
    description: '베수비오 화산 폭발로 잠든 고대 로마 유적지 내부 관람(원형극장, 목욕탕, 포룸) 후 나폴리식 화덕피자 점심.',
    costEur: 40,
    completed: false,
    googleMapQuery: 'Pompeii Archaeological Park'
  },
  {
    id: 'd2-3',
    dayNumber: 2,
    time: '13:00 ~ 16:00',
    city: '나폴리/포지타노',
    category: '관광 & 명소',
    title: '소렌토 해안도로 전망 & 포지타노 마을 산책',
    badge: '이탈리아 코스트',
    badgeColor: 'emerald',
    description: '절벽 사이 파스텔톤 가옥들이 장관인 포지타노 전망대에서 스냅 촬영 및 레몬샤베트 시식.',
    costEur: 20,
    completed: false,
    googleMapQuery: 'Positano, Amalfi Coast'
  },
  {
    id: 'd2-4',
    dayNumber: 2,
    time: '16:00 ~ 20:30',
    city: '로마',
    category: '항공/교통',
    title: '로마 복귀 & 가벼운 저녁 후 휴식',
    badge: '복귀 이동',
    badgeColor: 'blue',
    description: '20:30경 로마 테르미니역 복귀 도착 후 호텔 휴식 및 다음날 바티칸 일정 준비.',
    costEur: 35,
    completed: false,
    googleMapQuery: 'Roma Termini'
  },

  // DAY 3
  {
    id: 'd3-1',
    dayNumber: 3,
    time: '09:00 ~ 10:30',
    city: '로마',
    category: '관광 & 명소',
    title: '바티칸 회화관(피나코테카) 투어',
    badge: '박물관 투어 / 패스트트랙 예약 필요',
    badgeColor: 'red',
    description: '조토, 라파엘로의 <그리스도의 변용>, 카라바조 걸작 중점 사전 도슨트 해설 관람.',
    costEur: 30,
    completed: false,
    googleMapQuery: 'Vatican Museums'
  },
  {
    id: 'd3-2',
    dayNumber: 3,
    time: '10:30 ~ 13:00',
    city: '로마',
    category: '관광 & 명소',
    title: '라파엘로의 방 & 시스티나 성당 (천장조·최후의 심판)',
    badge: '핵심 명소',
    badgeColor: 'purple',
    description: '<아테네 학당> 배경 인증샷 후 시스티나 예배당 입장 (정숙 유지, 사진 촬영 금지 구역 엄수).',
    costEur: 0,
    completed: false,
    googleMapQuery: 'Sistine Chapel'
  },
  {
    id: 'd3-3',
    dayNumber: 3,
    time: '14:00 ~ 15:30',
    city: '로마',
    category: '관광 & 명소',
    title: '성베드로 대성당 관람 & 피에타(Pietà) 친견',
    badge: '성당 관람',
    badgeColor: 'emerald',
    description: '세계 최대 규모의 성당 내부 미켈란젤로 <피에타>와 베르니니의 청동 발다키노 감상.',
    costEur: 0,
    completed: false,
    googleMapQuery: 'St. Peter\'s Basilica'
  },
  {
    id: 'd3-4',
    dayNumber: 3,
    time: '19:00 ~ 21:00',
    city: '로마',
    category: '식사 & 카페',
    title: '로마식 정통 까르보나라 & 판텔레 디너',
    badge: '로맨틱 디너 / 예약 권장',
    badgeColor: 'amber',
    description: '호텔 휴식 후 판테온 인근 로컬 맛집인 Armando al Pantheon 또는 Roscioli 테이블 예약 식사.',
    costEur: 80,
    completed: false,
    googleMapQuery: 'Armando al Pantheon'
  },

  // DAY 4
  {
    id: 'd4-1',
    dayNumber: 4,
    time: '11:00 ~ 12:30',
    city: '피렌체',
    category: '항공/교통',
    title: '로마 테르미니 → 피렌체 SMN역 (Frecciarossa)',
    badge: '고속열차 / 트랜이탈리아 예약 필요',
    badgeColor: 'amber',
    description: '1시간 30분 소요. Prima 또는 스마트 클래스 2석 좌석 지정. 캐리어 잠금장치 확인.',
    costEur: 45,
    completed: false,
    googleMapQuery: 'Firenze Santa Maria Novella'
  },
  {
    id: 'd4-2',
    dayNumber: 4,
    time: '13:00',
    city: '피렌체',
    category: '숙소 체크인',
    title: 'MH Florence Hotel & Spa 짐보관 및 체크인',
    badge: '호텔 체크인 / 예약 완료',
    badgeColor: 'emerald',
    description: 'SMN역 도보 5분 거리. 허니문 기념 웰컴 드링크 및 스파 시설(사우나, 실내풀) 사전 등록.',
    costEur: 0,
    completed: false,
    googleMapQuery: 'MH Florence Hotel & Spa'
  },
  {
    id: 'd4-3',
    dayNumber: 4,
    time: '14:30 ~ 17:30',
    city: '피렌체',
    category: '식사 & 카페',
    title: '두오모 광장 산책 & 카페 질리(Caffè Gilli) 티타임',
    badge: '명소 & 카페',
    badgeColor: 'emerald',
    description: '산타 마리아 델 피오레 대성당 외관 감상 후 1733년 개업한 질리에서 티라미수와 에스프레소.',
    costEur: 25,
    completed: false,
    googleMapQuery: 'Caffè Gilli Florence'
  },
  {
    id: 'd4-4',
    dayNumber: 4,
    time: '17:30 ~ 20:30',
    city: '피렌체',
    category: '관광 & 명소',
    title: '베키오 다리(Ponte Vecchio) 석양 & 전통 화덕피자',
    badge: '야경 & 식사',
    badgeColor: 'purple',
    description: '아르노 강변을 따라 황금빛 일몰 감상 후 피렌체 로컬 피제리아에서 나폴리식 마르게리타 만찬.',
    costEur: 45,
    completed: false,
    googleMapQuery: 'Ponte Vecchio Florence'
  },

  // DAY 5
  {
    id: 'd5-1',
    dayNumber: 5,
    time: '09:30 ~ 12:00',
    city: '피렌체',
    category: '관광 & 명소',
    title: '우피치 미술관(Galleria degli Uffizi) 공식 투어',
    badge: '우피치 미술관 / 사전 예약 필수',
    badgeColor: 'red',
    description: '보티첼리 <비너스의 탄생>, 레오나르도 다빈치 <수태고지> 등 르네상스 정수 관람.',
    costEur: 50,
    completed: false,
    googleMapQuery: 'Uffizi Gallery Florence'
  },
  {
    id: 'd5-2',
    dayNumber: 5,
    time: '13:00 ~ 15:30',
    city: '피렌체',
    category: '식사 & 카페',
    title: '메디치 리카르디 궁전 & 비볼리(Vivoli) 젤라또',
    badge: '명소 & 디저트',
    badgeColor: 'emerald',
    description: '동방박사의 행렬 프레스코화 관람 후 피렌체에서 가장 오래된 수제 젤라또 비볼리 방문.',
    costEur: 20,
    completed: false,
    googleMapQuery: 'Vivoli Gelato Florence'
  },
  {
    id: 'd5-3',
    dayNumber: 5,
    time: '16:30 ~ 18:30',
    city: '피렌체',
    category: '관광 & 명소',
    title: '미켈란젤로 광장(Piazzale Michelangelo) 황혼',
    badge: '선셋 명소',
    badgeColor: 'amber',
    description: '피렌체 전경과 붉은 지붕군, 두오모가 어우러지는 파노라마 일몰 감상 및 기념 커플 스냅.',
    costEur: 15,
    completed: false,
    googleMapQuery: 'Piazzale Michelangelo'
  },
  {
    id: 'd5-4',
    dayNumber: 5,
    time: '19:00 ~ 21:00',
    city: '피렌체',
    category: '식사 & 카페',
    title: '피오렌티나 티본스테이크(Bistecca alla Fiorentina) 저녁',
    badge: '디너 완결 / Buca Mario 예약 필요',
    badgeColor: 'purple',
    description: '키아니나 소고기 1.2kg 숯불 그릴과 토스카나 끼안티 클라시코 와인 페어링.',
    costEur: 120,
    completed: false,
    googleMapQuery: 'Trattoria dell\'Orto Florence'
  },

  // DAY 6
  {
    id: 'd6-1',
    dayNumber: 6,
    time: '09:00 ~ 10:30',
    city: '피사',
    category: '항공/교통',
    title: '피렌체 SMN → 피사 센트랄레(Pisa Centrale) 이동',
    badge: '지역 열차',
    badgeColor: 'blue',
    description: '레조날레(Regionale Veloce) 탑승 약 50분 소요. 역 도착 후 기적의 광장 방면 도보 이동.',
    costEur: 19,
    completed: false,
    googleMapQuery: 'Pisa Centrale'
  },
  {
    id: 'd6-2',
    dayNumber: 6,
    time: '10:45 ~ 12:30',
    city: '피사',
    category: '관광 & 명소',
    title: '기적의 광장(Piazza dei Miracoli) & 피사의 사탑',
    badge: '사탑 & 중식',
    badgeColor: 'emerald',
    description: '기울어진 종탑과 대성당, 세례당 관람. 위트 있는 사탑 밀기 사진 촬영 후 광장 근처 파니니 점심.',
    costEur: 40,
    completed: false,
    googleMapQuery: 'Leaning Tower of Pisa'
  },
  {
    id: 'd6-3',
    dayNumber: 6,
    time: '16:00 ~ 19:00',
    city: '피렌체',
    category: '휴식 & 웰니스',
    title: 'MH Florence Hotel 실내 스파·자쿠지 & 쇼핑 정리',
    badge: '휴식 & 웰니스 / 호텔 프로모 시설',
    badgeColor: 'emerald',
    description: '그동안 누적된 여독을 풀기 위한 온수풀 자쿠지 및 핀란드식 사우나 이용. 가죽시장 소품 쇼핑.',
    costEur: 0,
    completed: false,
    googleMapQuery: 'MH Florence Hotel & Spa'
  },

  // DAY 7
  {
    id: 'd7-1',
    dayNumber: 7,
    time: '10:30 ~ 12:45',
    city: '베네치아',
    category: '항공/교통',
    title: '피렌체 SMN → 베네치아 메스트레(Venezia Mestre)',
    badge: '고속열차 / 이탈로/트랜이탈리아 예약 필요',
    badgeColor: 'amber',
    description: '기차로 약 2시간 15분 이동. 메스트레역 바로 앞 Hotel Plaza Venice 체크인 및 짐 보관.',
    costEur: 45,
    completed: false,
    googleMapQuery: 'Venezia Mestre railway station'
  },
  {
    id: 'd7-2',
    dayNumber: 7,
    time: '14:45 ~ 16:00',
    city: '베네치아',
    category: '관광 & 명소',
    title: '대운하 수상버스(바포레토 1번선) 유람',
    badge: '수상 버스',
    badgeColor: 'blue',
    description: '산타루치아역 선착장에서 산마르코 광장까지 대운하 궁전들을 감상하며 낭만 크루징.',
    costEur: 20,
    completed: false,
    googleMapQuery: 'Grand Canal Venice'
  },
  {
    id: 'd7-3',
    dayNumber: 7,
    time: '16:00 ~ 19:00',
    city: '베네치아',
    category: '관광 & 명소',
    title: '산마르코 광장 & 2027 카니발 가면 체험 & 수소(Suso) 젤라또',
    badge: '카니발 & 디저트',
    badgeColor: 'purple',
    description: '전통 아틀리에에서 수제 마스크 고르기, 카니발 코스튬 시민들과 기념사진 후 유명 젤라또 수소 시식.',
    costEur: 30,
    completed: false,
    googleMapQuery: 'Piazza San Marco Venice'
  },

  // DAY 8
  {
    id: 'd8-1',
    dayNumber: 8,
    time: '10:00 ~ 13:00',
    city: '베네치아',
    category: '관광 & 명소',
    title: '산마르코 대성당 & 두칼레 궁전(탄식의 다리)',
    badge: '궁전 & 대성당 / 두칼레 사전예약 요망',
    badgeColor: 'amber',
    description: '황금 모자이크 대성당 내부 관람 및 카사노바가 수감되었던 감옥으로 이어지는 탄식의 다리 건너기.',
    costEur: 60,
    completed: false,
    googleMapQuery: 'Doge\'s Palace Venice'
  },
  {
    id: 'd8-2',
    dayNumber: 8,
    time: '13:00 ~ 14:30',
    city: '베네치아',
    category: '식사 & 카페',
    title: '카페 플로리안(Caffè Florian) 오케스트라 런치',
    badge: '전통 카페',
    badgeColor: 'purple',
    description: '1720년 문을 연 유럽 최고(最古) 카페의 야외 테라스 라이브 앙상블과 핫초콜릿/브런치.',
    costEur: 60,
    completed: false,
    googleMapQuery: 'Caffè Florian Venice'
  },
  {
    id: 'd8-3',
    dayNumber: 8,
    time: '16:00 ~ 17:30',
    city: '베네치아',
    category: '관광 & 명소',
    title: '프라이빗 곤돌라(Private Gondola) 선셋 체험',
    badge: '허니문 하이라이트 / 프라이빗 선셋예약 필요',
    badgeColor: 'red',
    description: '골목 좁은 수로부터 대운하로 이어지는 프라이빗 보트 유람. (선택: 수상택시 또는 가면제작 공방 체험 병행).',
    costEur: 110,
    completed: false,
    googleMapQuery: 'Gondola Station San Marco'
  },

  // DAY 9
  {
    id: 'd9-1',
    dayNumber: 9,
    time: '10:30 ~ 14:30',
    city: '로마',
    category: '항공/교통',
    title: '베네치아 메스트레 → 로마 테르미니 고속열차',
    badge: '고속열차 / 기차표 예매 필요',
    badgeColor: 'amber',
    description: '약 4시간 소요. 차내에서 사진 정리 및 마지막 로마 체류지 동선 체크.',
    costEur: 55,
    completed: false,
    googleMapQuery: 'Roma Termini'
  },
  {
    id: 'd9-2',
    dayNumber: 9,
    time: '16:00 ~ 18:30',
    city: '로마',
    category: '관광 & 명소',
    title: '판테온(Pantheon) & 나보나 광장(Piazza Navona) & 지올리티',
    badge: '광장 산책',
    badgeColor: 'emerald',
    description: '2천 년 역사의 돔 오큘러스 관람, 베르니니의 4대강 분수 산책 후 3대 젤라또 지올리티 방문.',
    costEur: 15,
    completed: false,
    googleMapQuery: 'Pantheon Rome'
  },

  // DAY 10
  {
    id: 'd10-1',
    dayNumber: 10,
    time: '09:30 ~ 12:00',
    city: '로마',
    category: '관광 & 명소',
    title: '콜로세움(Colosseo) & 포로 로마노 내부 관람',
    badge: '고대 로마 / 티켓 오픈일 예약 필수',
    badgeColor: 'red',
    description: '검투사의 경기장 아레나 플로어 관람 및 고대 로마 공공 광장 포로 로마노 조망.',
    costEur: 40,
    completed: false,
    googleMapQuery: 'Colosseum Rome'
  },
  {
    id: 'd10-2',
    dayNumber: 10,
    time: '13:00 ~ 17:00',
    city: '로마',
    category: '쇼핑 & 기념품',
    title: '스페인 광장 & 비아 데이 콘도티(Via dei Condotti) 쇼핑',
    badge: '집중 쇼핑 (4H)',
    badgeColor: 'purple',
    description: '명품 부티크 거리(구찌, 프라다, 샤넬 등) 및 리나센테(Rinascente) 백화점 가족 감사 선물 구매.',
    costEur: 0,
    completed: false,
    googleMapQuery: 'Via dei Condotti Rome'
  },
  {
    id: 'd10-3',
    dayNumber: 10,
    time: '19:00 ~ 21:30',
    city: '로마',
    category: '식사 & 카페',
    title: '트레비 분수 야경 & 동전 던지기 & 피날레 갈라 디너',
    badge: '마지막 밤 만찬',
    badgeColor: 'emerald',
    description: '"다시 로마에 오게 해주세요" 소원 동전 던지기 후 로맨틱 루프탑 파인다이닝 코스 요리.',
    costEur: 140,
    completed: false,
    googleMapQuery: 'Trevi Fountain Rome'
  },

  // DAY 11
  {
    id: 'd11-1',
    dayNumber: 11,
    time: '출발 4시간 전',
    city: '로마',
    category: '항공/교통',
    title: '로마 피우미치노 공항(FCO) 도착 및 택스리펀',
    badge: '공항 수속 / 항공편 시각 미입력',
    badgeColor: 'amber',
    description: '글로벌블루/플래닛 세관 도장 및 환급 처리, 위탁 수하물 부치기, 보안검색 및 면세구역 입장.',
    notes: '텍스리펀(Global Blue) 여유 고려해 공항 최소 3시간 30분 전 도착 필요!',
    costEur: 0,
    completed: false,
    googleMapQuery: 'Rome Fiumicino Airport Terminal 3'
  }
];

export const INITIAL_RESERVATIONS: ReservationItem[] = [
  // Flights
  {
    id: 'res-f1',
    category: 'flight',
    title: '인천 (ICN) → 로마 (FCO)',
    subtitle: '서울 인천국제공항 T2 → 피우미치노 공항 T3',
    status: 'confirmed',
    statusText: '예약 완료 · 출국편',
    statusColor: 'emerald',
    dates: '2027.01.24 (일) 17:00 도착',
    flightCode: 'KE931 (보잉 787-9)',
    flightDuration: '직항 약 13h 20m',
    pnr: 'KE-798242A',
    voucherUrl: '대한항공_E-티켓확인증.pdf',
    memo: '동환 메모: 나경이 창가석 선호 반영(좌석 32A, 32B 완료). 입국 후 레오나르도 익스프레스 열차로 테르미니역 이동 예정.'
  },
  {
    id: 'res-f2',
    category: 'flight',
    title: '로마 (FCO) → 인천 (ICN)',
    subtitle: '피우미치노 공항 T3 → 서울 인천국제공항 T2',
    status: 'confirmed',
    statusText: '예약 완료 · 귀국편',
    statusColor: 'emerald',
    dates: '2027.02.03 (수) 출발 (출발 시간 미입력 - 확인 필요)',
    flightCode: 'KE932',
    flightDuration: '직항 약 11h 50m',
    pnr: 'KE-798242A',
    officialSiteUrl: 'https://www.koreanair.com',
    memo: '나경 메모: 텍스리펀(Global Blue) 여유 고려해 공항 최소 3시간 30분 전 도착 필요!'
  },

  // Hotels
  {
    id: 'res-h1',
    category: 'hotel',
    title: '로마 1차 숙소 후보 탐색 중',
    subtitle: '1차 거점 (3박) · 2027.01.24 ~ 01.27 (3박 4일)',
    status: 'pending',
    statusText: '미선정 숙소',
    statusColor: 'rose',
    dates: '2027.01.24 ~ 01.27 (3박 4일)',
    hotelLocation: '추천 지역: 테르미니역(Stazione Termini) 인근 또는 낭만적인 몬티 지구(Rione Monti)',
    features: [
      '도착 당일 피우미치노 공항선 캐리어 이동 편의성 (도보 7분 이내)',
      '피렌체행 이탈로 아침 열차 탑승 동선 확보',
      '1박당 예산 상한: ₩ 300,000 ~ ₩ 400,000선'
    ],
    memo: '후보군: 호텔 아르테미데, 인디펜던트 호텔'
  },
  {
    id: 'res-h2',
    category: 'hotel',
    title: 'MH Florence Hotel & Spa',
    subtitle: '2차 거점 (3박) · 2027.01.27 ~ 01.30 (3박 4일)',
    status: 'planned',
    statusText: '예약 예정 (Planned)',
    statusColor: 'amber',
    dates: '2027.01.27 ~ 01.30 (3박 4일)',
    hotelLocation: '피렌체 SMN 중앙역 도보 3분',
    hotelAddress: 'Via Luigi Alamanni 37, 50123 Firenze FI, Italy',
    features: [
      '겨울 여행 특화 실내 스파 & 사우나, 루프탑 테라스',
      '피사(Pisa) 당일치기 플랫폼 진입 최적'
    ],
    costEur: 680,
    costKrw: 918000,
    bookingChannel: '부킹닷컴 예약 링크 확인',
    memo: '조식포함 · 무료 취소 기한: 체크인 3일 전 (2027.01.24)'
  },
  {
    id: 'res-h3',
    category: 'hotel',
    title: 'Hotel Plaza Venice',
    subtitle: '3차 거점 (2박) · 2027.01.30 ~ 02.01 (2박 3일)',
    status: 'planned',
    statusText: '예약 예정 (Planned)',
    statusColor: 'amber',
    dates: '2027.01.30 ~ 02.01 (2박 3일)',
    hotelLocation: '베네치아 메스트레역(Mestre) 정문 바로 앞 (도보 1분)',
    hotelAddress: 'Viale Stazione 36, 30171 Mestre, Venezia, Italy',
    features: [
      '산타 루치아 본섬역까지 빈번한 기차로 10분 직결',
      '본섬 돌바닥/계단 다리 캐리어 이동 고통 원천 방지'
    ],
    costEur: 360,
    costKrw: 612000,
    bookingChannel: '호텔 공식 홈페이지 확인',
    memo: '2박 Superior Double · 무료 취소 기한 체크 완료'
  },
  {
    id: 'res-h4',
    category: 'hotel',
    title: '로마 2차 귀국 전 숙소 선정',
    subtitle: '마지막 거점 (2박) · 2027.02.01 ~ 02.03 (2박 3일)',
    status: 'pending',
    statusText: '미선정 숙소',
    statusColor: 'rose',
    dates: '2027.02.01 ~ 02.03 (2박 3일)',
    hotelLocation: '추천 지역: 스페인 광장(Piazza di Spagna) 쇼핑 편리 구역 또는 공항선 직통 테르미니역',
    features: [
      '피우미치노 공항 출국일 이른 아침 셔틀/열차 연계 수월',
      '마지막 날 명품 거리 쇼핑 및 기념품 패킹 편리성',
      '동환 & 나경의 마지막 밤 로맨틱 루프탑 바 보유 호텔 우대'
    ],
    memo: '후보군: 호텔 나치오날레, 부티크 호텔 캄포 데 피오리'
  },

  // Trains
  {
    id: 'res-t1',
    category: 'train',
    title: '로마 → 피렌체',
    subtitle: 'Roma Termini → Firenze S.M.N',
    status: 'pending',
    statusText: '미예약 (D-90 오픈)',
    statusColor: 'gray',
    dates: '2027.01.27 (수) 11:00 목표 · 소요 1시간 36분',
    flightCode: 'Frecciarossa / Italo',
    costEur: 80,
    costKrw: 136000,
    memo: 'Prima/Business 석 · 2인 약 €80'
  },
  {
    id: 'res-t2',
    category: 'train',
    title: '피렌체 → 베네치아',
    subtitle: 'Firenze S.M.N → Venezia Mestre',
    status: 'pending',
    statusText: '미예약 (D-90 오픈)',
    statusColor: 'gray',
    dates: '2027.01.30 (토) 10:30 목표 · 소요 2시간 05분',
    flightCode: '고속열차 직통 (메스트레역 직하차)',
    costEur: 90,
    costKrw: 153000,
    memo: '메스트레역 직하차 · 2인 약 €90'
  },
  {
    id: 'res-t3',
    category: 'train',
    title: '베네치아 → 로마',
    subtitle: 'Venezia Mestre → Roma Termini',
    status: 'pending',
    statusText: '미예약 (D-90 오픈)',
    statusColor: 'gray',
    dates: '2027.02.01 (월) 10:30 목표 · 소요 3시간 45분',
    flightCode: '종단 초고속 (스낵 서비스 포함)',
    costEur: 110,
    costKrw: 187000,
    memo: '종단 초고속 · 2인 약 €110'
  },
  {
    id: 'res-t4',
    category: 'train',
    title: '피렌체 ↔ 피사 왕복',
    subtitle: 'Firenze S.M.N ↔ Pisa Centrale',
    status: 'planned',
    statusText: '현장발권 가능 (Regionale Veloce)',
    statusColor: 'emerald',
    dates: '2027.01.29 (금) 근교투어 · 소요 약 50분',
    flightCode: '왕복 패키지 일괄 결제 편리',
    costEur: 38,
    costKrw: 64600,
    memo: '2인 왕복 약 €38 · 자유석 (일정유동적)'
  },

  // Tours
  {
    id: 'res-tour1',
    category: 'tour',
    title: '바티칸 박물관 & 시스티나 성당',
    subtitle: 'Musei Vaticani & Cappella Sistina (천장창조, 최후의 심판 집중 감상)',
    status: 'pending',
    statusText: '티켓 오픈 대기 (D-60)',
    statusColor: 'rose',
    dates: '로마 DAY 3 · 09:00 슬롯 (오전 프라이빗 입장)',
    bookingChannel: '바티칸 공식 티켓 사이트',
    costEur: 60,
    memo: '바티칸 공식 티켓 사이트 · 세부 설정'
  },
  {
    id: 'res-tour2',
    category: 'tour',
    title: '이탈리아 남부 일일투어',
    subtitle: '폼페이 유적지 + 소렌토 전망대 + 포지타노 해안마을 밴 투어',
    status: 'pending',
    statusText: '겨울 투어 일정 검토 중',
    statusColor: 'amber',
    dates: '로마 근교 DAY 3',
    bookingChannel: '한국어 가이드 소규모 밴',
    costKrw: 360000,
    memo: '주의사항: 1월 말 포지타노 상점 휴무 여부 체크'
  },
  {
    id: 'res-tour3',
    category: 'tour',
    title: '우피치 미술관 패스트트랙',
    subtitle: 'Galleria degli Uffizi (보티첼리 \'비너스의 탄생\', 레오나르도 다빈치)',
    status: 'pending',
    statusText: '미예약 (D-45 권장)',
    statusColor: 'amber',
    dates: '피렌체 DAY 5 · 13:30 (점심 후 여유 입장)',
    bookingChannel: 'b-ticket 공식 채널',
    costEur: 50,
    memo: '오디오가이드 2인 포함'
  },
  {
    id: 'res-tour4',
    category: 'tour',
    title: '피사의 사탑 타워 등반권',
    subtitle: 'Torre di Pisa 사탑 꼭대기 전망대 & 두오모 대성당 입장',
    status: 'pending',
    statusText: '미예약 (D-20 권장)',
    statusColor: 'gray',
    dates: '피사 근교 DAY 6 · 타임슬롯: 14:00 예약제 (30분 단위)',
    costEur: 40,
    memo: '주의사항: 모든 가방 보관소 필수 예치'
  },
  {
    id: 'res-tour5',
    category: 'tour',
    title: '산마르코 & 두칼레 궁전',
    subtitle: 'Palazzo Ducale & 탄식의 다리 내부 통과 패스트트랙',
    status: 'pending',
    statusText: '미예약',
    statusColor: 'gray',
    dates: '베네치아 DAY 7 · 패키지: 두칼레 궁전 + 산마르코 테라스',
    costEur: 60,
    memo: '특징: 현장 대기 중 1시간 절약'
  },
  {
    id: 'res-tour6',
    category: 'tour',
    title: '콜로세움 아레나 & 포로 로마노',
    subtitle: 'Colosseo Full Experience (아레나 바닥 및 지하 구역 입장)',
    status: 'pending',
    statusText: '티켓팅 직전 (D-30 오픈)',
    statusColor: 'rose',
    dates: '로마 복귀 DAY 9 · 관람 30일 전 정각 오픈',
    costEur: 40,
    memo: '동환/나경: 동시 접속 예매 전략 수립 완료'
  },

  // Activities & Dining
  {
    id: 'res-act1',
    category: 'dining',
    title: '베네치아 프라이빗 곤돌라 체험',
    subtitle: '산마르코 소운하에서 대운하로 이어지는 프라이빗 단독 탑승 (약 30~40분)',
    status: 'planned',
    statusText: '현장 공식 정찰제 or 일몰 사전예약',
    statusColor: 'emerald',
    dates: '베네치아 허니문 하이라이트 · 16:30 노을 무렵',
    costEur: 110,
    memo: '공식 주간 요금: €90 (배 1척당) / 일몰/야간 요금 (19:00~): €110 (배 1척당)'
  },
  {
    id: 'res-act2',
    category: 'dining',
    title: '피렌체 티본스테이크 디너 (Trattoria dell\'Orto)',
    subtitle: '토스카나 전통 키아니나 품종 비스테카 알라 피오렌티나 & 끼안티 클라시코 와인',
    status: 'planned',
    statusText: '식당 예약 예정 (1개월 전)',
    statusColor: 'emerald',
    dates: '피렌체 미식 · 2027.01.28 (목) 19:30',
    costEur: 120,
    memo: '동환\'s Pick: 부라타 치즈 토마토 샐러드 + 티본 1.2kg 미디엄 레어 주문 예정'
  }
];

export const INITIAL_LEDGER_ITEMS: LedgerItem[] = [
  {
    id: 'led-1',
    date: '2027.01.24',
    dayLabel: '사전 예약',
    category: '교통',
    title: '대한항공 왕복 항공권 (ICN ↔ FCO)',
    memo: '2인 왕복 직항 발권 완료',
    amountKrw: 3120000,
    isEstimate: false,
    paymentMethod: '현대카드 프리미엄',
    status: '영수증 대기',
    receiptAttached: false
  },
  {
    id: 'led-2',
    date: '2027.01.28',
    dayLabel: 'DAY 5',
    category: '숙박',
    title: 'MH Florence Hotel & Spa',
    memo: '피렌체 3박 스위트룸 (예약금 대기)',
    amountEur: 680,
    amountKrw: 1156000,
    isEstimate: true,
    paymentMethod: '트래블로그 EUR',
    status: '미결제 (체크인 결제)'
  },
  {
    id: 'led-3',
    date: '2027.01.31',
    dayLabel: 'DAY 8',
    category: '숙박',
    title: 'Hotel Plaza Venice (메스트레 역전)',
    memo: '베네치아 2박 디럭스 트윈',
    amountEur: 360,
    amountKrw: 612000,
    isEstimate: true,
    paymentMethod: '트래블로그 EUR',
    status: '미결제'
  },
  {
    id: 'led-4',
    date: '2027.01.25',
    dayLabel: 'DAY 2',
    category: '관광',
    title: '바티칸 박물관 & 시스티나 경당 패스트트랙',
    memo: '공식 예약사이트 2인 티켓 예상',
    amountEur: 60,
    amountKrw: 102000,
    isEstimate: true,
    paymentMethod: '온라인 결제 예정',
    status: '온라인 결제 예정'
  },
  {
    id: 'led-5',
    date: '2027.01.29',
    dayLabel: 'DAY 6',
    category: '관광',
    title: '우피치 미술관 우선 입장권',
    memo: '오디오가이드 2인 포함 예상',
    amountEur: 50,
    amountKrw: 85000,
    isEstimate: true,
    paymentMethod: '온라인 사전 결제',
    status: '온라인 사전 결제'
  },
  {
    id: 'led-6',
    date: '2027.01.29',
    dayLabel: 'DAY 6',
    category: '식음료',
    title: '피렌체 Buca Mario 티본스테이크 & 끼안티 와인',
    memo: '1.2kg 비스테카 알라 피오렌티나',
    amountEur: 120,
    amountKrw: 204000,
    isEstimate: true,
    paymentMethod: '트래블로그 카드',
    status: '예상 금액'
  },
  {
    id: 'led-7',
    date: '2027.01.28',
    dayLabel: 'DAY 5',
    category: '교통',
    title: '이탈로 고속열차 (로마 테르미니 ➔ 피렌체 SMN)',
    memo: '프리마 좌석 2인 사전 얼리버드',
    amountKrw: 116400,
    amountEur: 68.47,
    isEstimate: false,
    paymentMethod: '트래블로그 체크',
    status: '영수증 보관',
    receiptAttached: true
  }
];

export const INITIAL_PLACES: PlaceItem[] = [
  {
    id: 'place-1',
    nameKo: '콜로세움 & 포로 로마노',
    nameIt: 'Colosseo & Foro Romano',
    city: '로마',
    category: '랜드마크',
    description: '고대 로마 황제들의 영광과 검투사들의 숨결이 살아 숨 쉬는 역사적 심장부.',
    tip: '통합 티켓으로 아레나 플로어까지 진입하면 멋진 사진을 건질 수 있습니다. 오후 늦은 골든아워에 방문 추천.',
    recommendedTime: 'DAY 10 오전 09:30',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Colosseum Rome'
  },
  {
    id: 'place-2',
    nameKo: '산타 마리아 델 피오레 두오모',
    nameIt: 'Cattedrale di Santa Maria del Fiore',
    city: '피렌체',
    category: '랜드마크',
    description: '붉은 쿠폴라 돔과 대리석 파사드가 환상적인 르네상스의 상징.',
    tip: '쿠폴라 463계단 등반 시 피렌체 전경이 한눈에 펼쳐집니다. 브루넬레스키 패스는 30일 전 정각 예매 필수!',
    recommendedTime: 'DAY 4 오후 14:30',
    imageUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Florence Cathedral'
  },
  {
    id: 'place-3',
    nameKo: '산 마르코 광장 & 대성당',
    nameIt: 'Piazza San Marco',
    city: '베네치아',
    category: '랜드마크',
    description: '나폴레옹이 "유럽에서 가장 우아한 응접실"이라 격찬한 대광장과 비잔틴 대성당.',
    tip: '2027 카니발 축제 기간 동안 화려한 의상의 가면 퍼레이드가 매일 진행됩니다.',
    recommendedTime: 'DAY 7 오후 16:00',
    imageUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Piazza San Marco Venice'
  },
  {
    id: 'place-4',
    nameKo: '트레비 분수',
    nameIt: 'Fontana di Trevi',
    city: '로마',
    category: '포토스팟 & 석양',
    description: '등 뒤로 동전을 던지면 다시 로마에 온다는 전설의 분수.',
    tip: '동전 던지기: 1개는 로마 재방문, 2개는 사랑하는 사람과의 영원한 결합을 뜻합니다!',
    recommendedTime: 'DAY 10 야경 19:00',
    imageUrl: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Trevi Fountain Rome'
  },
  {
    id: 'place-5',
    nameKo: '비아 데이 콘도티 명품거리',
    nameIt: 'Via dei Condotti',
    city: '로마',
    category: '명품쇼핑',
    description: '스페인 광장에서 시작되는 세계 최고급 부티크 거리(구찌, 불가리, 프라다, 샤넬).',
    tip: '이탈리아 본점 단독 상품 및 12~14% 택스리펀 영수증을 현장에서 바로 발급받으세요.',
    recommendedTime: 'DAY 10 오후 13:00 ~ 17:00',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Via dei Condotti Rome'
  },
  {
    id: 'place-6',
    nameKo: '미켈란젤로 광장',
    nameIt: 'Piazzale Michelangelo',
    city: '피렌체',
    category: '포토스팟 & 석양',
    description: '아르노 강과 두오모, 베키오 다리가 주황빛 석양에 물드는 피렌체 최고의 뷰포인트.',
    tip: '광장 계단에 앉아 로컬 끼안티 와인 한 잔과 함께 노을을 감상하는 것이 허니문 필수 코스.',
    recommendedTime: 'DAY 5 일몰 16:30',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    mapQuery: 'Piazzale Michelangelo Florence'
  }
];
