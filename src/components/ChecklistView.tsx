import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { ChecklistItem } from '../types/honeymoon';
import {
  CheckSquare,
  Plus,
  CheckCircle2,
  Circle,
  Filter,
  User,
  AlertTriangle,
  FolderCheck,
  Check
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const { checklistItems, toggleChecklist, addChecklistItem } = useHoneymoon();

  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [newText, setNewText] = useState<string>('');
  const [newAssignee, setNewAssignee] = useState<ChecklistItem['assignee']>('공동');
  const [newCategory, setNewCategory] = useState<ChecklistItem['category']>('준비물/패킹');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const completedCount = checklistItems.filter(i => i.completed).length;
  const totalCount = checklistItems.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  const filteredItems = checklistItems.filter(item => {
    if (assigneeFilter === 'completed' && !item.completed) return false;
    if (assigneeFilter === 'active' && item.completed) return false;
    if (assigneeFilter === 'donghwan' && item.assignee !== '동환 담당') return false;
    if (assigneeFilter === 'nakyung' && item.assignee !== '나경 담당') return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    return true;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addChecklistItem(newText.trim(), newAssignee, newCategory);
    setNewText('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            출국 전 필수 체크리스트
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            동환 & 나경의 완벽한 10박 11일 이탈리아 허니문을 위한 분담형 체크리스트
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-2 rounded-lg bg-[#1b382b] hover:bg-[#132a20] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>새 항목 추가</span>
        </button>
      </div>

      {/* Progress banner */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">전체 달성률</span>
            <span className="text-stone-500 font-medium">({completedCount} / {totalCount} 완료)</span>
          </div>
          <span className="text-sm font-black text-emerald-800">{progressPercent}%</span>
        </div>

        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1b382b] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
          <h4 className="text-xs font-bold text-stone-800">새 안건 등록</h4>
          <input
            type="text"
            placeholder="예: 여권 사본 및 증명사진 2장 챙기기"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
            required
          />
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-stone-600 block mb-1 font-semibold">담당자</label>
              <select
                value={newAssignee}
                onChange={e => setNewAssignee(e.target.value as ChecklistItem['assignee'])}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="동환 담당">동환 담당</option>
                <option value="나경 담당">나경 담당</option>
                <option value="공동">공동</option>
              </select>
            </div>
            <div>
              <label className="text-stone-600 block mb-1 font-semibold">카테고리</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as ChecklistItem['category'])}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="서류/항공">서류/항공</option>
                <option value="숙소/교통">숙소/교통</option>
                <option value="투어/티켓">투어/티켓</option>
                <option value="환전/결제">환전/결제</option>
                <option value="준비물/패킹">준비물/패킹</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#1b382b] text-white text-xs font-bold"
            >
              추가 완료
            </button>
          </div>
        </form>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setAssigneeFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              assigneeFilter === 'all' ? 'bg-[#1b382b] text-white' : 'bg-white text-stone-700 border border-stone-200'
            }`}
          >
            전체 ({checklistItems.length})
          </button>
          <button
            onClick={() => setAssigneeFilter('donghwan')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              assigneeFilter === 'donghwan' ? 'bg-[#1b382b] text-white' : 'bg-white text-stone-700 border border-stone-200'
            }`}
          >
            동환 담당
          </button>
          <button
            onClick={() => setAssigneeFilter('nakyung')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              assigneeFilter === 'nakyung' ? 'bg-[#1b382b] text-white' : 'bg-white text-stone-700 border border-stone-200'
            }`}
          >
            나경 담당
          </button>
          <button
            onClick={() => setAssigneeFilter('active')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              assigneeFilter === 'active' ? 'bg-[#1b382b] text-white' : 'bg-white text-stone-700 border border-stone-200'
            }`}
          >
            미완료
          </button>
          <button
            onClick={() => setAssigneeFilter('completed')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              assigneeFilter === 'completed' ? 'bg-[#1b382b] text-white' : 'bg-white text-stone-700 border border-stone-200'
            }`}
          >
            완료됨
          </button>
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700"
        >
          <option value="all">전체 카테고리</option>
          <option value="서류/항공">서류/항공</option>
          <option value="숙소/교통">숙소/교통</option>
          <option value="투어/티켓">투어/티켓</option>
          <option value="환전/결제">환전/결제</option>
          <option value="준비물/패킹">준비물/패킹</option>
        </select>
      </div>

      {/* Checklist items */}
      <div className="bg-white rounded-xl border border-stone-200/90 divide-y divide-stone-100 shadow-2xs">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => toggleChecklist(item.id)}
            className={`p-4 transition-colors flex items-center justify-between gap-3 cursor-pointer ${
              item.completed ? 'bg-stone-50/50' : 'hover:bg-emerald-50/20'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-stone-300 hover:text-emerald-600 shrink-0" />
              )}
              <div>
                <p className={`text-xs sm:text-sm font-semibold ${item.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                  {item.text}
                </p>
                <span className="text-[10px] text-stone-400 font-medium">
                  {item.category}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                item.completed
                  ? 'bg-stone-200 text-stone-600'
                  : item.assignee === '동환 담당'
                  ? 'bg-orange-100 text-orange-800'
                  : item.assignee === '나경 담당'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {item.assignee}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
