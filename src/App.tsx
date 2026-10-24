/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HoneymoonProvider, useHoneymoon } from './context/HoneymoonContext';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ItineraryView } from './components/ItineraryView';
import { ReservationView } from './components/ReservationView';
import { BudgetView } from './components/BudgetView';
import { ChecklistView } from './components/ChecklistView';
import { PlacesView } from './components/PlacesView';
import { TransitMapView } from './components/TransitMapView';
import { Footer } from './components/Footer';
import {
  TripInfoModal,
  ExpenseModal,
  ScheduleModal,
  ExchangeModal,
  VoucherModal
} from './components/Modals';
import { ScheduleItem, LedgerItem } from './types/honeymoon';

function MainApp() {
  const { activeTab } = useHoneymoon();

  // Modals state
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpenseItem, setEditingExpenseItem] = useState<LedgerItem | null>(null);
  const [voucherModal, setVoucherModal] = useState<{
    isOpen: boolean;
    title: string;
    filename: string;
  }>({
    isOpen: false,
    title: '',
    filename: ''
  });

  // Handlers
  const handleOpenAddSchedule = () => {
    setEditingScheduleItem(null);
    setIsScheduleModalOpen(true);
  };

  const handleOpenEditSchedule = (item: ScheduleItem) => {
    setEditingScheduleItem(item);
    setIsScheduleModalOpen(true);
  };

  const handleOpenAddExpense = () => {
    setEditingExpenseItem(null);
    setIsExpenseModalOpen(true);
  };

  const handleOpenEditExpense = (item: LedgerItem) => {
    setEditingExpenseItem(item);
    setIsExpenseModalOpen(true);
  };

  const handleOpenVoucher = (title: string, filename: string) => {
    setVoucherModal({
      isOpen: true,
      title,
      filename
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f8f8] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top persistent header */}
      <Header
        onOpenTripModal={() => setIsTripModalOpen(true)}
        onOpenExchangeModal={() => setIsExchangeModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenTripModal={() => setIsTripModalOpen(true)}
            onOpenExpenseModal={handleOpenAddExpense}
            onOpenExchangeModal={() => setIsExchangeModalOpen(true)}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            onOpenAddScheduleModal={handleOpenAddSchedule}
            onOpenEditScheduleModal={handleOpenEditSchedule}
          />
        )}

        {activeTab === 'reservations' && (
          <ReservationView
            onOpenAddModal={handleOpenAddExpense}
            onOpenVoucherModal={handleOpenVoucher}
          />
        )}

        {activeTab === 'checklist' && <ChecklistView />}

        {activeTab === 'places' && <PlacesView />}

        {activeTab === 'budget' && (
          <BudgetView
            onOpenAddExpenseModal={handleOpenAddExpense}
            onOpenEditExpenseModal={handleOpenEditExpense}
            onOpenExchangeModal={() => setIsExchangeModalOpen(true)}
          />
        )}

        {activeTab === 'routes' && <TransitMapView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TripInfoModal
        isOpen={isTripModalOpen}
        onClose={() => setIsTripModalOpen(false)}
      />

      <ExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setEditingScheduleItem(null);
        }}
        editItem={editingScheduleItem}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false);
          setEditingExpenseItem(null);
        }}
        editItem={editingExpenseItem}
      />

      <VoucherModal
        isOpen={voucherModal.isOpen}
        title={voucherModal.title}
        filename={voucherModal.filename}
        onClose={() =>
          setVoucherModal({ isOpen: false, title: '', filename: '' })
        }
      />
    </div>
  );
}

export default function App() {
  return (
    <HoneymoonProvider>
      <MainApp />
    </HoneymoonProvider>
  );
}
