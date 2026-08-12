import React from 'react';
import { Word } from '../types';
import { speakEnglishWord } from '../utils/speech';
import { BookmarkCheck, Volume2, Sparkles, Trash2, ArrowLeft, Play, AlertCircle } from 'lucide-react';

interface MistakeNotebookProps {
  missedWords: Word[];
  onBackToMenu: () => void;
  onTriggerAIExplain: (word: Word) => void;
  onClearMistakes: () => void;
  onStartMistakeQuiz: () => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  missedWords,
  onBackToMenu,
  onTriggerAIExplain,
  onClearMistakes,
  onStartMistakeQuiz,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 z-30 relative font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-[#F2F2EB] text-[#3D3D2D] font-medium text-xs border border-[#E5E5DB] pill-shadow flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回選單</span>
        </button>

        <div className="flex items-center gap-2">
          {missedWords.length > 0 && (
            <>
              <button
                onClick={onStartMistakeQuiz}
                className="px-3.5 py-2 bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all font-serif"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>重測錯題</span>
              </button>

              <button
                onClick={onClearMistakes}
                className="p-2 text-[#D97757] hover:bg-[#F5B8A8]/20 rounded-xl transition-colors border border-[#F5B8A8]"
                title="清空錯題本"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 pill-shadow border border-[#E5E5DB] mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5B8A8]/30 text-[#D97757] flex items-center justify-center font-bold">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-[#2D2D1F]">📕 複習錯題本</h2>
            <p className="text-xs text-[#5A5A40]">收集練習中答錯的單字，加強複習與記憶</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#F5B8A8]/30 text-[#D97757] font-bold text-xs border border-[#F5B8A8]">
          共 {missedWords.length} 個錯題
        </span>
      </div>

      {/* Word List */}
      {missedWords.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center border border-[#E5E5DB] pill-shadow space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#A8C69F]/30 text-[#2D2D1F] mx-auto flex items-center justify-center font-bold text-xl">
            🌿
          </div>
          <h3 className="text-lg font-bold font-serif text-[#2D2D1F]">錯題本空空如也！</h3>
          <p className="text-xs text-[#5A5A40] max-w-sm mx-auto">
            你在練習過程中答對了所有題目，或者尚未累積任何錯題。繼續保持！
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {missedWords.map((word, idx) => (
            <div
              key={`${word.id}-${idx}`}
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#E5E5DB] pill-shadow flex items-center justify-between gap-3 hover:border-[#8FB384] transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold font-serif text-[#2D2D1F]">{word.word}</h3>
                  <span className="text-xs font-semibold text-[#5A5A40]">{word.zh}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5E5DB]/70 text-[#3D3D2D] font-mono">
                    {word.partOfSpeech || 'noun'}
                  </span>
                </div>
                <p className="text-xs text-[#5A5A40] line-clamp-1">{word.def}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => speakEnglishWord(word.word)}
                  className="p-2 rounded-xl bg-[#F2F2EB] hover:bg-[#E5E5DB] text-[#3D3D2D] transition-colors"
                  title="朗讀發音"
                >
                  <Volume2 className="w-4 h-4 text-[#8FB384]" />
                </button>

                <button
                  onClick={() => onTriggerAIExplain(word)}
                  className="px-2.5 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium text-xs shadow-xs transition-opacity flex items-center gap-1 font-serif"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FCE166]" />
                  <span>AI 解析</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
