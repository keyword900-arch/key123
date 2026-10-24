import React, { useState } from 'react';
import { useHoneymoon } from '../context/HoneymoonContext';
import { RotateCcw, AlertTriangle, Check, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const { coupleInfo, resetToDefaults } = useHoneymoon();
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setShowConfirm(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <footer className="mt-12 border-t border-stone-200/90 bg-[#f7f8f8] py-8 px-4 sm:px-6 lg:px-8 text-stone-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left romantic quote */}
        <div className="text-center md:text-left">
          <p className="font-serif-it italic text-lg sm:text-xl font-normal text-stone-900 tracking-wide">
            "La vita è bella, insieme a te."
          </p>
          <p className="text-xs text-stone-500 mt-1">
            {coupleInfo.groomKo.split(' ')[0]} & {coupleInfo.brideKo.split(' ')[0]}의 첫 걸음, 2027 로마·피렌체·포지타노·베네치아 신혼여행
          </p>
        </div>

        {/* Right status & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>오프라인 모드 동기화 완료</span>
          </div>

          <span className="text-stone-400">
            © 2027 Dong Hwan & Na Kyung. All memories preserved.
          </span>

          {showConfirm ? (
            <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
              <span className="text-[11px] text-rose-700 font-bold">초기화할까요?</span>
              <button
                onClick={handleReset}
                className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold"
              >
                예
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-1.5 py-0.5 bg-stone-200 text-stone-700 rounded text-[10px]"
              >
                취소
              </button>
            </div>
          ) : resetSuccess ? (
            <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
              <Check className="w-3 h-3" /> 초기화 완료
            </span>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              title="초기 샘플 데이터 복원"
              className="text-stone-400 hover:text-stone-600 text-[11px] flex items-center gap-1 cursor-pointer underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>데이터 초기화</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
