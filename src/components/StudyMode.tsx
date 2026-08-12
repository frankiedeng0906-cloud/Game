import React, { useState } from 'react';
import { Word, GameLevel } from '../types';
import { WORD_DATABASE } from '../data/words';
import { speakEnglishWord } from '../utils/speech';
import { Volume2, Sparkles, ChevronLeft, ChevronRight, RotateCw, BookOpen, Star, CheckCircle } from 'lucide-react';

interface StudyModeProps {
  onBackToMenu: () => void;
  onTriggerAIExplain: (word: Word) => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ onBackToMenu, onTriggerAIExplain }) => {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>('basic');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [starredWords, setStarredWords] = useState<Set<string>>(new Set());

  const currentLevelWords = WORD_DATABASE.filter((w) => w.level === selectedLevel);
  const currentWord = currentLevelWords[currentIndex] || currentLevelWords[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % currentLevelWords.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + currentLevelWords.length) % currentLevelWords.length);
  };

  const toggleStar = (wordId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredWords((prev) => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  };

  if (!currentWord) return null;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 z-30 relative flex flex-col items-center font-sans">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-[#F2F2EB] text-[#3D3D2D] font-medium text-xs border border-[#E5E5DB] pill-shadow flex items-center gap-1"
        >
          ← 返回選單
        </button>

        {/* Level Switcher tabs */}
        <div className="flex bg-white/90 p-1 rounded-2xl border border-[#E5E5DB] pill-shadow gap-1 text-xs font-medium">
          <button
            onClick={() => {
              setSelectedLevel('basic');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1 rounded-xl transition-colors ${
              selectedLevel === 'basic' ? 'bg-[#8FB384] text-[#2D2D1F] font-bold shadow-xs' : 'text-[#5A5A40] hover:bg-[#F2F2EB]'
            }`}
          >
            初階
          </button>
          <button
            onClick={() => {
              setSelectedLevel('advanced');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1 rounded-xl transition-colors ${
              selectedLevel === 'advanced' ? 'bg-[#5A5A40] text-white font-bold shadow-xs' : 'text-[#5A5A40] hover:bg-[#F2F2EB]'
            }`}
          >
            進階
          </button>
          <button
            onClick={() => {
              setSelectedLevel('master');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1 rounded-xl transition-colors ${
              selectedLevel === 'master' ? 'bg-[#3D3D2D] text-white font-bold shadow-xs' : 'text-[#5A5A40] hover:bg-[#F2F2EB]'
            }`}
          >
            高階
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="w-full flex justify-between items-center text-xs text-[#5A5A40] font-medium mb-2 px-1">
        <span>📖 單字卡翻牌學習</span>
        <span>
          {currentIndex + 1} / {currentLevelWords.length} 個單字
        </span>
      </div>

      {/* 3D Flip Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] bg-white/95 rounded-3xl p-6 pill-shadow border border-[#E5E5DB] cursor-pointer transition-all duration-300 relative flex flex-col justify-between hover:border-[#8FB384] group"
      >
        {/* Top Control Bar inside card */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-[#E5E5DB]/70 text-[#3D3D2D] text-xs font-semibold uppercase">
            {currentWord.partOfSpeech || 'noun'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => toggleStar(currentWord.id, e)}
              className={`p-2 rounded-xl transition-colors ${
                starredWords.has(currentWord.id)
                  ? 'bg-[#FCE166] text-[#2D2D1F]'
                  : 'bg-[#F2F2EB] text-[#5A5A40]/60 hover:text-[#2D2D1F]'
              }`}
              title="收藏單字"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                speakEnglishWord(currentWord.word);
              }}
              className="p-2 bg-[#A8C69F]/30 hover:bg-[#A8C69F]/50 text-[#2D2D1F] rounded-xl transition-colors"
              title="朗讀發音"
            >
              <Volume2 className="w-5 h-5 text-[#5A5A40]" />
            </button>
          </div>
        </div>

        {/* Card Content (Front vs Back) */}
        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <h2 className="text-4xl font-bold font-serif text-[#2D2D1F] tracking-tight">{currentWord.word}</h2>
            <p className="text-xs text-[#5A5A40]/80 font-medium font-sans">點擊卡片查看釋義與中文翻譯</p>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="py-4 space-y-4 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-[#5A5A40] uppercase block mb-1">英文釋義</span>
              <p className="text-[#2D2D1F] font-serif text-lg">{currentWord.def}</p>
            </div>

            <div className="p-3 bg-[#A8C69F]/20 rounded-2xl border border-[#8FB384]/30">
              <span className="text-xs font-bold text-[#5A5A40] block">中文含意</span>
              <p className="text-[#2D2D1F] font-bold text-base mt-0.5">{currentWord.zh}</p>
            </div>

            {currentWord.example && (
              <div className="p-3 bg-[#F2F2EB] rounded-2xl border border-[#E5E5DB]">
                <span className="text-xs font-bold text-[#5A5A40] block">例句</span>
                <p className="text-[#2D2D1F] text-xs font-serif italic mt-0.5">"{currentWord.example}"</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Card Footer */}
        <div className="pt-3 border-t border-[#E5E5DB] flex items-center justify-between text-xs text-[#5A5A40]">
          <span className="flex items-center gap-1 font-semibold text-[#5A5A40]">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? '再按一次看正面' : '翻牌'}</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onTriggerAIExplain(currentWord);
            }}
            className="px-2.5 py-1 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium text-xs shadow-xs transition-opacity flex items-center gap-1 font-serif"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FCE166]" />
            <span>AI 解說</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2.5 bg-white/90 hover:bg-[#F2F2EB] text-[#2D2D1F] font-medium rounded-2xl border border-[#E5E5DB] pill-shadow flex items-center gap-1.5 transition-all text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>上一個</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium rounded-2xl shadow-xs flex items-center gap-1.5 transition-all text-sm"
        >
          <span>下一個</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
