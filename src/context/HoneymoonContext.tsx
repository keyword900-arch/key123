import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveTab,
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
import {
  INITIAL_COUPLE_INFO,
  INITIAL_STAGE_CARDS,
  INITIAL_RADAR_ITEMS,
  INITIAL_CHECKLIST_ITEMS,
  INITIAL_DAYS,
  INITIAL_SCHEDULE_ITEMS,
  INITIAL_RESERVATIONS,
  INITIAL_LEDGER_ITEMS,
  INITIAL_PLACES
} from '../data/initialData';

interface HoneymoonContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  coupleInfo: CoupleInfo;
  updateCoupleInfo: (info: Partial<CoupleInfo>) => void;
  stageCards: StageCard[];
  radarItems: RadarItem[];
  checklistItems: ChecklistItem[];
  toggleChecklist: (id: string) => void;
  addChecklistItem: (text: string, assignee: ChecklistItem['assignee'], category: ChecklistItem['category']) => void;
  days: DayOverview[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  scheduleItems: ScheduleItem[];
  selectedScheduleId: string;
  setSelectedScheduleId: (id: string) => void;
  toggleScheduleCompleted: (id: string) => void;
  updateScheduleNotes: (id: string, notes: string) => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id' | 'completed'>) => void;
  reservations: ReservationItem[];
  updateReservationStatus: (id: string, status: ReservationItem['status'], statusText: string) => void;
  addReservation: (item: Omit<ReservationItem, 'id'>) => void;
  ledgerItems: LedgerItem[];
  addLedgerItem: (item: Omit<LedgerItem, 'id'>) => void;
  updateLedgerItem: (id: string, item: Partial<LedgerItem>) => void;
  deleteLedgerItem: (id: string) => void;
  places: PlaceItem[];
  targetBudget: number;
  setTargetBudget: (val: number) => void;
  plannedExpenses: number;
  separateShoppingBudget: boolean;
  setSeparateShoppingBudget: (val: boolean) => void;
  shoppingBudget: number;
  setShoppingBudget: (val: number) => void;
  taxRefundInputEur: number;
  setTaxRefundInputEur: (val: number) => void;
  taxRefundRate: number;
  setTaxRefundRate: (val: number) => void;
  resetToDefaults: () => void;
}

const HoneymoonContext = createContext<HoneymoonContextType | undefined>(undefined);

const STORAGE_KEY = 'donghwan_nakyung_honeymoon_v1';

export const HoneymoonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('d1-1');

  // Load state from localStorage or default
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_couple`);
    return saved ? JSON.parse(saved) : INITIAL_COUPLE_INFO;
  });

  const [stageCards] = useState<StageCard[]>(INITIAL_STAGE_CARDS);
  const [radarItems] = useState<RadarItem[]>(INITIAL_RADAR_ITEMS);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_checklist`);
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST_ITEMS;
  });

  const [days] = useState<DayOverview[]>(INITIAL_DAYS);

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_schedules`);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE_ITEMS;
  });

  const [reservations, setReservations] = useState<ReservationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reservations`);
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [ledgerItems, setLedgerItems] = useState<LedgerItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ledgers`);
    return saved ? JSON.parse(saved) : INITIAL_LEDGER_ITEMS;
  });

  const [places] = useState<PlaceItem[]>(INITIAL_PLACES);

  const [targetBudget, setTargetBudget] = useState<number>(10000000);
  const [plannedExpenses] = useState<number>(6500000);
  const [separateShoppingBudget, setSeparateShoppingBudget] = useState<boolean>(true);
  const [shoppingBudget, setShoppingBudget] = useState<number>(3000000);
  const [taxRefundInputEur, setTaxRefundInputEur] = useState<number>(1500);
  const [taxRefundRate, setTaxRefundRate] = useState<number>(12.5);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_couple`, JSON.stringify(coupleInfo));
  }, [coupleInfo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_checklist`, JSON.stringify(checklistItems));
  }, [checklistItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_schedules`, JSON.stringify(scheduleItems));
  }, [scheduleItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reservations`, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ledgers`, JSON.stringify(ledgerItems));
  }, [ledgerItems]);

  const updateCoupleInfo = (info: Partial<CoupleInfo>) => {
    setCoupleInfo(prev => ({ ...prev, ...info }));
  };

  const toggleChecklist = (id: string) => {
    setChecklistItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addChecklistItem = (
    text: string,
    assignee: ChecklistItem['assignee'],
    category: ChecklistItem['category']
  ) => {
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text,
      assignee,
      category,
      completed: false,
      priority: 'medium'
    };
    setChecklistItems(prev => [newItem, ...prev]);
  };

  const toggleScheduleCompleted = (id: string) => {
    setScheduleItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const updateScheduleNotes = (id: string, notes: string) => {
    setScheduleItems(prev =>
      prev.map(item => (item.id === id ? { ...item, notes } : item))
    );
  };

  const addScheduleItem = (item: Omit<ScheduleItem, 'id' | 'completed'>) => {
    const newItem: ScheduleItem = {
      ...item,
      id: `sched-${Date.now()}`,
      completed: false
    };
    setScheduleItems(prev => [...prev, newItem]);
    setSelectedScheduleId(newItem.id);
  };

  const updateReservationStatus = (id: string, status: ReservationItem['status'], statusText: string) => {
    setReservations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const color: ReservationItem['statusColor'] =
            status === 'confirmed' ? 'emerald' : status === 'planned' ? 'amber' : 'rose';
          return { ...item, status, statusText, statusColor: color };
        }
        return item;
      })
    );
  };

  const addReservation = (item: Omit<ReservationItem, 'id'>) => {
    const newItem: ReservationItem = {
      ...item,
      id: `res-${Date.now()}`
    };
    setReservations(prev => [newItem, ...prev]);
  };

  const addLedgerItem = (item: Omit<LedgerItem, 'id'>) => {
    const newItem: LedgerItem = {
      ...item,
      id: `led-${Date.now()}`
    };
    setLedgerItems(prev => [newItem, ...prev]);
  };

  const updateLedgerItem = (id: string, updated: Partial<LedgerItem>) => {
    setLedgerItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteLedgerItem = (id: string) => {
    setLedgerItems(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_couple`);
    localStorage.removeItem(`${STORAGE_KEY}_checklist`);
    localStorage.removeItem(`${STORAGE_KEY}_schedules`);
    localStorage.removeItem(`${STORAGE_KEY}_reservations`);
    localStorage.removeItem(`${STORAGE_KEY}_ledgers`);
    setCoupleInfo(INITIAL_COUPLE_INFO);
    setChecklistItems(INITIAL_CHECKLIST_ITEMS);
    setScheduleItems(INITIAL_SCHEDULE_ITEMS);
    setReservations(INITIAL_RESERVATIONS);
    setLedgerItems(INITIAL_LEDGER_ITEMS);
    setSelectedDay(1);
    setSelectedScheduleId('d1-1');
  };

  return (
    <HoneymoonContext.Provider
      value={{
        activeTab,
        setActiveTab,
        coupleInfo,
        updateCoupleInfo,
        stageCards,
        radarItems,
        checklistItems,
        toggleChecklist,
        addChecklistItem,
        days,
        selectedDay,
        setSelectedDay,
        scheduleItems,
        selectedScheduleId,
        setSelectedScheduleId,
        toggleScheduleCompleted,
        updateScheduleNotes,
        addScheduleItem,
        reservations,
        updateReservationStatus,
        addReservation,
        ledgerItems,
        addLedgerItem,
        updateLedgerItem,
        deleteLedgerItem,
        places,
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
        setTaxRefundRate,
        resetToDefaults
      }}
    >
      {children}
    </HoneymoonContext.Provider>
  );
};

export const useHoneymoon = () => {
  const context = useContext(HoneymoonContext);
  if (!context) {
    throw new Error('useHoneymoon must be used within a HoneymoonProvider');
  }
  return context;
};
