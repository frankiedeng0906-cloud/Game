import React, { useEffect } from 'react';
import { Word } from '../types';
import { soundFx } from '../utils/sound';
import { Trophy, RefreshCw, Home, BookmarkCheck, Award, CheckCircle2, XCircle } from 'lucide-react';

interface StatsSummaryProps {
  score: number;
  totalQuestions: number;
  missedWords: Word[];
  onRestartQuiz: () => void;
  onBackToMenu: () => void;
  onOpenMistakeNotebook: () => void;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  score,
  totalQuestions,
  missedWords,
  onRestartQuiz,
  onBackToMenu,
  onOpenMistakeNotebook,
}) => {
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  useEffect(() => {
    soundFx.playFanfare();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 z-30 relative animate-fade-in font-sans">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 pill-shadow border border-[#E5E5DB] text-center space-y-6">
        {/* Trophy Header */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-[#FCE166] text-[#2D2D1F] mx-auto flex items-center justify-center font-bold text-3xl pill-shadow animate-bounce">
            <Trophy className="w-10 h-10 text-[#3D3D2D]" />
          </div>
          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#8FB384] text-[#2D2D1F] font-bold text-[10px]">
            完成挑戰!
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#2D2D1F]">挑戰成績結算</h2>
          <p className="text-xs text-[#5A5A40] mt-1">恭喜完成本次單字挑戰！繼續保持每天練習！</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-[#F2F2EB] rounded-2xl border border-[#E5E5DB]">
          <div className="p-2">
            <span className="text-[10px] font-bold text-[#5A5A40] block uppercase">答對題數</span>
            <span className="text-xl font-bold text-[#2D2D1F]">{score}</span>
          </div>

          <div className="p-2 border-x border-[#E5E5DB]">
            <span className="text-[10px] font-bold text-[#5A5A40] block uppercase">總答題數</span>
            <span className="text-xl font-bold text-[#2D2D1F]">{totalQuestions}</span>
          </div>

          <div className="p-2">
            <span className="text-[10px] font-bold text-[#5A5A40] block uppercase">正確率</span>
            <span className="text-xl font-bold text-[#5A5A40]">{accuracy}%</span>
          </div>
        </div>

        {/* Missed Words Overview */}
        {missedWords.length > 0 && (
          <div className="p-3 bg-[#F5B8A8]/20 rounded-2xl border border-[#F5B8A8] text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#D97757] flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-[#D97757]" />
                <span>本次答錯單字 ({missedWords.length} 個)</span>
              </span>
              <button
                onClick={onOpenMistakeNotebook}
                className="text-xs font-bold text-[#D97757] hover:underline"
              >
                查看錯題本 →
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missedWords.slice(0, 5).map((w, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white text-[#D97757] border border-[#F5B8A8] text-xs font-semibold rounded-md shadow-2xs"
                >
                  {w.word}
                </span>
              ))}
              {missedWords.length > 5 && (
                <span className="text-xs text-[#D97757] font-bold self-center">
                  +{missedWords.length - 5}...
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onRestartQuiz}
            className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 font-serif"
          >
            <RefreshCw className="w-4 h-4" />
            <span>再挑戰一輪</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full py-2.5 bg-[#F2F2EB] hover:bg-[#E5E5DB] text-[#2D2D1F] font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>返回主選單</span>
          </button>
        </div>
      </div>
    </div>
  );
};

