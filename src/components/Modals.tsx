import React, { useState, useEffect } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { ScheduleItem, LedgerItem } from '../types/honeymoon';
import { X, Check, FileText, Download, Calculator, Sparkles, RefreshCw } from 'lucide-react';

interface TripInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TripInfoModal: React.FC<TripInfoModalProps> = ({ isOpen, onClose }) => {
  const { coupleInfo, updateCoupleInfo } = useHoneymoon();
  const [groomKo, setGroomKo] = useState(coupleInfo.groomKo);
  const [brideKo, setBrideKo] = useState(coupleInfo.brideKo);
  const [startDate, setStartDate] = useState(coupleInfo.startDate);
  const [endDate, setEndDate] = useState(coupleInfo.endDate);
  const [exchangeRate, setExchangeRate] = useState(coupleInfo.exchangeRate);

  useEffect(() => {
    if (isOpen) {
      setGroomKo(coupleInfo.groomKo);
      setBrideKo(coupleInfo.brideKo);
      setStartDate(coupleInfo.startDate);
      setEndDate(coupleInfo.endDate);
      setExchangeRate(coupleInfo.exchangeRate);
    }
  }, [isOpen, coupleInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoupleInfo({
      groomKo,
      brideKo,
      startDate,
      endDate,
      exchangeRate: Number(exchangeRate) || 1700
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-base font-extrabold text-stone-900">여행 및 커플 정보 설정</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1">신랑 성함</label>
            <input
              type="text"
              value={groomKo}
              onChange={e => setGroomKo(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">신부 성함</label>
            <input
              type="text"
              value={brideKo}
              onChange={e => setBrideKo(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">여행 시작일</label>
              <input
                type="text"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900"
                required
              />
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">여행 종료일</label>
              <input
                type="text"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">기준 환율 (1 EUR = ? KRW)</label>
            <input
              type="number"
              value={exchangeRate}
              onChange={e => setExchangeRate(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white font-bold cursor-pointer"
            >
              저장 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  editItem?: LedgerItem | null;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, editItem }) => {
  const { addLedgerItem, updateLedgerItem, coupleInfo } = useHoneymoon();

  const [date, setDate] = useState('2027.01.24');
  const [dayLabel, setDayLabel] = useState('DAY 1');
  const [category, setCategory] = useState<LedgerItem['category']>('식음료');
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [currency, setCurrency] = useState<'EUR' | 'KRW'>('EUR');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('트래블로그 EUR');
  const [status, setStatus] = useState<LedgerItem['status']>('결제 완료');

  useEffect(() => {
    if (editItem) {
      setDate(editItem.date);
      setDayLabel(editItem.dayLabel);
      setCategory(editItem.category);
      setTitle(editItem.title);
      setMemo(editItem.memo);
      if (editItem.amountEur) {
        setCurrency('EUR');
        setAmount(editItem.amountEur);
      } else {
        setCurrency('KRW');
        setAmount(editItem.amountKrw || 0);
      }
      setPaymentMethod(editItem.paymentMethod);
      setStatus(editItem.status);
    } else {
      setDate('2027.01.24');
      setDayLabel('DAY 1');
      setCategory('식음료');
      setTitle('');
      setMemo('');
      setCurrency('EUR');
      setAmount(0);
      setPaymentMethod('트래블로그 EUR');
      setStatus('결제 완료');
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload: Partial<LedgerItem> = {
      date,
      dayLabel,
      category,
      title: title.trim(),
      memo: memo.trim(),
      paymentMethod,
      status,
      isEstimate: status.includes('예상') || status.includes('대기')
    };

    if (currency === 'EUR') {
      payload.amountEur = amount;
      payload.amountKrw = Math.round(amount * coupleInfo.exchangeRate);
    } else {
      payload.amountKrw = amount;
      payload.amountEur = Number((amount / coupleInfo.exchangeRate).toFixed(2));
    }

    if (editItem) {
      updateLedgerItem(editItem.id, payload);
    } else {
      addLedgerItem(payload as Omit<LedgerItem, 'id'>);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-base font-extrabold text-stone-900">
            {editItem ? '지출 내역 수정' : '새 가계부 지출 등록'}
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">일자</label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-300"
                placeholder="2027.01.24"
                required
              />
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">일차 라벨</label>
              <input
                type="text"
                value={dayLabel}
                onChange={e => setDayLabel(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-300"
                placeholder="DAY 1 or 사전 예약"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">카테고리</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as LedgerItem['category'])}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="숙박">숙박</option>
                <option value="식음료">식음료</option>
                <option value="교통">교통</option>
                <option value="관광">관광</option>
                <option value="쇼핑">쇼핑</option>
                <option value="도시세/보험">도시세/보험</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">결제 수단</label>
              <input
                type="text"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-300"
                placeholder="트래블로그 EUR, 신용카드, 현금"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">항목명</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-stone-300"
              placeholder="예: 지올리티 젤라또 2인, 곤돌라 석양 탑승권"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">세부 메모</label>
            <input
              type="text"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              className="w-full p-2 rounded-lg border border-stone-300"
              placeholder="맛, 영수증 캡처 여부, 특이사항"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">통화</label>
              <div className="flex rounded-lg border border-stone-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setCurrency('EUR')}
                  className={`flex-1 py-1.5 font-bold cursor-pointer ${
                    currency === 'EUR' ? 'bg-[#1b382b] text-white' : 'bg-stone-50 text-stone-700'
                  }`}
                >
                  EUR (€)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('KRW')}
                  className={`flex-1 py-1.5 font-bold cursor-pointer ${
                    currency === 'KRW' ? 'bg-[#1b382b] text-white' : 'bg-stone-50 text-stone-700'
                  }`}
                >
                  KRW (원)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">금액</label>
              <input
                type="number"
                step="any"
                value={amount || ''}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-stone-300"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">상태</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as LedgerItem['status'])}
              className="w-full p-2 rounded-lg border border-stone-300 bg-white"
            >
              <option value="결제 완료">결제 완료</option>
              <option value="영수증 보관">영수증 보관</option>
              <option value="영수증 대기">영수증 대기</option>
              <option value="미결제 (체크인 결제)">미결제 (체크인 결제)</option>
              <option value="온라인 사전 결제">온라인 사전 결제</option>
              <option value="예상 금액">예상 금액</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white font-bold cursor-pointer"
            >
              {editItem ? '수정 완료' : '등록 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  editItem?: ScheduleItem | null;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, editItem }) => {
  const { addScheduleItem } = useHoneymoon();

  const [dayNumber, setDayNumber] = useState<number>(1);
  const [time, setTime] = useState('14:00');
  const [city, setCity] = useState<ScheduleItem['city']>('로마');
  const [category, setCategory] = useState<ScheduleItem['category']>('관광 & 명소');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [costEur, setCostEur] = useState<number>(0);

  useEffect(() => {
    if (editItem) {
      setDayNumber(editItem.dayNumber);
      setTime(editItem.time);
      setCity(editItem.city);
      setCategory(editItem.category);
      setTitle(editItem.title);
      setDescription(editItem.description);
      setNotes(editItem.notes || '');
      setCostEur(editItem.costEur || 0);
    } else {
      setDayNumber(1);
      setTime('14:00');
      setCity('로마');
      setCategory('관광 & 명소');
      setTitle('');
      setDescription('');
      setNotes('');
      setCostEur(0);
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addScheduleItem({
      dayNumber,
      time,
      city,
      category,
      title: title.trim(),
      description: description.trim(),
      notes: notes.trim(),
      costEur,
      badge: '사용자 등록',
      badgeColor: 'emerald',
      googleMapQuery: `${title.trim()} ${city}`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-base font-extrabold text-stone-900">
            {editItem ? '일정 수정' : '새 세부 일정 추가'}
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">일차 (DAY)</label>
              <select
                value={dayNumber}
                onChange={e => setDayNumber(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>
                    DAY {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">시간대</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="14:00 or 14:00 ~ 16:00"
                className="w-full p-2 rounded-lg border border-stone-300"
                required
              />
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">도시</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value as ScheduleItem['city'])}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="로마">로마</option>
                <option value="피렌체">피렌체</option>
                <option value="베네치아">베네치아</option>
                <option value="피사">피사</option>
                <option value="나폴리/포지타노">포지타노/남부</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">카테고리</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ScheduleItem['category'])}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="관광 & 명소">관광 & 명소</option>
                <option value="식사 & 카페">식사 & 카페</option>
                <option value="항공/교통">항공/교통</option>
                <option value="숙소 체크인">숙소 체크인</option>
                <option value="쇼핑 & 기념품">쇼핑 & 기념품</option>
                <option value="휴식 & 웰니스">휴식 & 웰니스</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-bold mb-1">예상 비용 (EUR)</label>
              <input
                type="number"
                value={costEur}
                onChange={e => setCostEur(Number(e.target.value))}
                placeholder="0"
                className="w-full p-2 rounded-lg border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">일정 제목</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="예: 산타 마리아 노벨라 약국 쇼핑, 젤라또 수소 방문"
              className="w-full p-2 rounded-lg border border-stone-300"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">설명 및 코스</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="방문 동선, 관람 포인트 등을 상세히 기록하세요."
              rows={2}
              className="w-full p-2 rounded-lg border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">동환 & 나경 전용 메모</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="예: 장미수 2병, 고체 향수 구매 / 현금 결제 가능"
              className="w-full p-2 rounded-lg border border-stone-300"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#1b382b] hover:bg-[#142d22] text-white font-bold cursor-pointer"
            >
              등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({ isOpen, onClose }) => {
  const { coupleInfo, updateCoupleInfo } = useHoneymoon();
  const [eurVal, setEurVal] = useState<number>(100);
  const [rate, setRate] = useState<number>(coupleInfo.exchangeRate);

  if (!isOpen) return null;

  const krwResult = Math.round(eurVal * rate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-emerald-800" />
            <span>유로 ↔ 원화 환율 계산기</span>
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1">기준 환율 (1 EUR)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-stone-300 font-bold"
              />
              <button
                onClick={() => updateCoupleInfo({ exchangeRate: rate })}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold whitespace-nowrap"
              >
                환율 적용
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div>
              <label className="block text-stone-600 font-bold mb-1">유로 금액 (€)</label>
              <input
                type="number"
                value={eurVal}
                onChange={e => setEurVal(Number(e.target.value))}
                className="w-full p-2 text-lg font-black rounded-lg border border-stone-300 bg-white"
              />
            </div>

            <div className="text-center text-stone-400 text-sm">↓</div>

            <div>
              <span className="block text-stone-600 font-bold mb-1">원화 환산 금액 (KRW)</span>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xl font-black text-emerald-950">
                {krwResult.toLocaleString()} 원
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 text-center">
            * 트래블로그/트래블월렛 환전 시 수수료 0% 우대 환율 기준입니다.
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-[#1b382b] text-white font-bold cursor-pointer"
          >
            확인 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  title,
  filename
}) => {
  if (!isOpen) return null;

  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-base font-extrabold text-stone-900">{title}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <p className="font-extrabold text-sm text-stone-900">{filename}</p>
          <p className="text-xs text-stone-500 leading-relaxed">
            2027.01.24 인천 → 로마 직항 (KE931) 정식 e-티켓 바우처입니다.<br />
            승객명: KIM DONG HWAN / WANG NA KYUNG (성인 2인)
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700"
          >
            닫기
          </button>
          <button
            onClick={() => {
              setDownloaded(true);
              setTimeout(() => {
                setDownloaded(false);
                onClose();
              }, 1200);
            }}
            className="px-4 py-2 rounded-lg bg-[#1b382b] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>다운로드 완료!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>PDF 바우처 발급</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
