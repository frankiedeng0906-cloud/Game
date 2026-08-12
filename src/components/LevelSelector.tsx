import React, { useState } from 'react';
import { GameLevel } from '../types';
import { Sparkles, BookOpen, BookmarkCheck, BrainCircuit, Play, ArrowRight, Loader2 } from 'lucide-react';

interface LevelSelectorProps {
  onSelectLevel: (level: GameLevel, customCategory?: string) => void;
  onOpenStudyMode: () => void;
  onOpenMistakeNotebook: () => void;
  mistakeCount: number;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  onSelectLevel,
  onOpenStudyMode,
  onOpenMistakeNotebook,
  mistakeCount,
}) => {
  const [customTopic, setCustomTopic] = useState<string>('');
  const [loadingCustom, setLoadingCustom] = useState<boolean>(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;
    setLoadingCustom(true);
    onSelectLevel('custom', customTopic.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-2xl mx-auto px-4 py-6 z-30 relative font-sans">
      {/* Title Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5E5DB]/80 border border-[#D5D5CB] text-[#5A5A40] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#8FB384] animate-spin-slow" />
          <span>English Word Quest</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2D1F] tracking-tight">
          English Word Quest
        </h1>
        <p className="text-[#5A5A40] text-sm max-w-md mx-auto font-sans">
          探索多階單字挑戰賽，結合溫暖自然氛圍與 Gemini AI 智慧解說！
        </p>
      </div>

      {/* Main Mode Cards */}
      <div className="w-full space-y-4">
        {/* Core Quiz Level Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Basic */}
          <button
            onClick={() => onSelectLevel('basic')}
            className="group relative p-5 bg-white/90 hover:bg-[#F2F2EB] rounded-2xl pill-shadow border border-[#E5E5DB] transition-all duration-200 flex flex-col items-center text-center space-y-2 active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-[#A8C69F]/25 text-[#3D3D2D] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              🌱
            </div>
            <div>
              <h3 className="font-bold text-[#2D2D1F] text-base group-hover:text-[#5A5A40]">初階 (Basic)</h3>
              <p className="text-xs text-[#5A5A40]/80 mt-0.5">生活日常單字庫 (30+ 題)</p>
            </div>
            <span className="mt-2 text-xs font-semibold text-[#8FB384] group-hover:underline flex items-center gap-1">
              開始答題 <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Advanced */}
          <button
            onClick={() => onSelectLevel('advanced')}
            className="group relative p-5 bg-white/90 hover:bg-[#F2F2EB] rounded-2xl pill-shadow border border-[#E5E5DB] transition-all duration-200 flex flex-col items-center text-center space-y-2 active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8FB384]/30 text-[#2D2D1F] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              🌿
            </div>
            <div>
              <h3 className="font-bold text-[#2D2D1F] text-base group-hover:text-[#5A5A40]">進階 (Advanced)</h3>
              <p className="text-xs text-[#5A5A40]/80 mt-0.5">學術與工作單字 (25+ 題)</p>
            </div>
            <span className="mt-2 text-xs font-semibold text-[#5A5A40] group-hover:underline flex items-center gap-1">
              開始答題 <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Master */}
          <button
            onClick={() => onSelectLevel('master')}
            className="group relative p-5 bg-white/90 hover:bg-[#F2F2EB] rounded-2xl pill-shadow border border-[#E5E5DB] transition-all duration-200 flex flex-col items-center text-center space-y-2 active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-[#5A5A40]/15 text-[#2D2D1F] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              👑
            </div>
            <div>
              <h3 className="font-bold text-[#2D2D1F] text-base group-hover:text-[#5A5A40]">高階 (Master)</h3>
              <p className="text-xs text-[#5A5A40]/80 mt-0.5">托福檢定與專業精通</p>
            </div>
            <span className="mt-2 text-xs font-semibold text-[#5A5A40] group-hover:underline flex items-center gap-1">
              挑戰高手 <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* AI Custom Quiz Generator */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#E5E5DB] rounded-2xl p-4 pill-shadow">
          <div className="flex items-center gap-2 mb-2 text-[#3D3D2D] font-bold text-sm font-serif">
            <BrainCircuit className="w-4 h-4 text-[#8FB384]" />
            <span>AI 智慧自訂主題出題 (Gemini API)</span>
          </div>
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="輸入任何主題 (例如: 旅遊英文、自然生態、美饌佳餚)..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E5DB] bg-white text-sm text-[#2D2D1F] focus:outline-hidden focus:ring-2 focus:ring-[#8FB384] placeholder:text-[#5A5A40]/50 font-medium"
            />
            <button
              type="submit"
              disabled={!customTopic.trim() || loadingCustom}
              className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A3A] disabled:opacity-50 text-white text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              {loadingCustom ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              <span>AI 出題</span>
            </button>
          </form>
        </div>

        {/* Additional Tools & Learning Modes */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onOpenStudyMode}
            className="p-3.5 bg-white/90 hover:bg-[#F2F2EB] rounded-2xl border border-[#E5E5DB] pill-shadow flex items-center justify-center gap-2 text-[#3D3D2D] font-semibold text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#8FB384]" />
            <span>📖 單字卡翻牌學習</span>
          </button>

          <button
            onClick={onOpenMistakeNotebook}
            className="p-3.5 bg-white/90 hover:bg-[#F2F2EB] rounded-2xl border border-[#E5E5DB] pill-shadow flex items-center justify-center gap-2 text-[#3D3D2D] font-semibold text-sm transition-all relative"
          >
            <BookmarkCheck className="w-4 h-4 text-[#D97757]" />
            <span>📕 複習錯題本</span>
            {mistakeCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#D97757] text-white text-xs font-bold">
                {mistakeCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

