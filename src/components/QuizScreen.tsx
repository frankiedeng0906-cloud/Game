import React, { useState, useEffect } from 'react';
import { Word, GameLevel, FeedbackState } from '../types';
import { WORD_DATABASE } from '../data/words';
import { generateSmart8Options } from '../utils/distractors';
import { soundFx } from '../utils/sound';
import { speakEnglishWord } from '../utils/speech';
import { Volume2, VolumeX, Sparkles, Flame, Eye, EyeOff, RotateCcw, Home, Sparkle } from 'lucide-react';

interface QuizScreenProps {
  level: GameLevel;
  customWords?: Word[];
  customCategoryName?: string;
  onBackToMenu: () => void;
  onFinishRound: (score: number, total: number, missed: Word[]) => void;
  onTriggerAIExplain: (word: Word) => void;
  onRecordMissedWord: (word: Word) => void;
  onCharacterMoodChange: (mood: FeedbackState) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  level,
  customWords,
  customCategoryName,
  onBackToMenu,
  onFinishRound,
  onTriggerAIExplain,
  onRecordMissedWord,
  onCharacterMoodChange,
}) => {
  const [wordPool, setWordPool] = useState<Word[]>([]);
  const [currentQ, setCurrentQ] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [score, setScore] = useState<number>(0);
  const [roundCount, setRoundCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  const [inputLocked, setInputLocked] = useState<boolean>(false);
  const [showChineseHint, setShowChineseHint] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [missedInSession, setMissedInSession] = useState<Word[]>([]);

  // Initialize Word Pool on Level Load
  useEffect(() => {
    let initialPool: Word[] = [];
    if (level === 'custom' && customWords && customWords.length > 0) {
      initialPool = [...customWords];
    } else {
      initialPool = WORD_DATABASE.filter((w) => w.level === level);
    }

    // Shuffle pool
    initialPool.sort(() => Math.random() - 0.5);
    setWordPool(initialPool);
    setScore(0);
    setRoundCount(0);
    setStreak(0);
    setMissedInSession([]);
    
    if (initialPool.length > 0) {
      loadNextQuestion(initialPool, 0);
    }
  }, [level, customWords]);

  const loadNextQuestion = (pool: Word[], currentRound: number) => {
    if (pool.length === 0) {
      // Re-fill pool if finished
      let rePool = WORD_DATABASE.filter((w) => w.level === level);
      rePool.sort(() => Math.random() - 0.5);
      pool = rePool;
    }

    const nextWord = pool[pool.length - 1];
    const newPool = pool.slice(0, pool.length - 1);
    setWordPool(newPool);

    // Generate 7 High-Similarity, Confusable Distractors (人都是人、物都是物、字形音義接近)
    const combinedOptions = generateSmart8Options(nextWord, WORD_DATABASE, customWords || []);

    setCurrentQ(nextWord);
    setOptions(combinedOptions);
    setSelectedAnswer(null);
    setInputLocked(false);
    setRoundCount(currentRound + 1);
    onCharacterMoodChange('');
  };

  const handleAnswerSelect = (optionWord: string) => {
    if (!currentQ || inputLocked) return;

    setInputLocked(true);
    setSelectedAnswer(optionWord);

    const isCorrect = optionWord.toLowerCase() === currentQ.word.toLowerCase();

    if (isCorrect) {
      soundFx.playCorrect();
      setScore((s) => s + 1);
      setStreak((st) => {
        const nextSt = st + 1;
        setBestStreak((b) => Math.max(b, nextSt));
        return nextSt;
      });
      onCharacterMoodChange('pass');
    } else {
      soundFx.playWrong();
      setStreak(0);
      onCharacterMoodChange('fail');
      onRecordMissedWord(currentQ);
      setMissedInSession((prev) => [...prev, currentQ]);
    }

    // Auto-advance after 850ms
    setTimeout(() => {
      loadNextQuestion(wordPool, roundCount);
    }, 850);
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  if (!currentQ) return null;

  // Mask definition by replacing target word with ______
  const wordRegex = new RegExp(currentQ.word, 'gi');
  const maskedDef = currentQ.def.replace(wordRegex, '______');

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-3 z-30 relative flex flex-col items-center font-sans">
      {/* Top Header Navigation & Stats Bar */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-3 pill-shadow border border-[#E5E5DB] mb-4 flex items-center justify-between gap-2">
        {/* Left: Back & Level Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="p-2 rounded-xl bg-[#F2F2EB] hover:bg-[#E5E5DB] text-[#3D3D2D] transition-colors flex items-center gap-1 font-semibold text-xs"
            title="返回選單"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">主選單</span>
          </button>

          <span className="px-2.5 py-1 rounded-lg bg-[#E5E5DB]/90 text-[#3D3D2D] text-xs font-bold uppercase tracking-wider">
            {level === 'basic' && '🌱 初階'}
            {level === 'advanced' && '🌿 進階'}
            {level === 'master' && '👑 高階'}
            {level === 'custom' && `🧠 AI ${customCategoryName || '自訂'}`}
          </span>
        </div>

        {/* Center: Score & Round */}
        <div className="flex items-center gap-3">
          <div className="text-center px-3 py-1 bg-[#FCE166]/20 rounded-xl border border-[#FCE166]/60">
            <span className="text-[10px] text-[#5A5A40] font-bold block uppercase leading-none">得分</span>
            <span className="text-base font-bold text-[#2D2D1F]">{score}</span>
          </div>

          <div className="text-center px-3 py-1 bg-[#F2F2EB] rounded-xl border border-[#E5E5DB]">
            <span className="text-[10px] text-[#5A5A40] font-bold block uppercase leading-none">題號</span>
            <span className="text-base font-bold text-[#2D2D1F]">{roundCount}</span>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#D97757] text-white rounded-xl shadow-xs animate-bounce">
              <Flame className="w-4 h-4 fill-current text-[#FCE166]" />
              <span className="text-xs font-bold">{streak} 連勝!</span>
            </div>
          )}
        </div>

        {/* Right: Sound & Finish Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-[#F5B8A8]/30 text-[#D97757] border-[#F5B8A8]'
                : 'bg-[#A8C69F]/30 text-[#3D3D2D] border-[#A8C69F]'
            }`}
            title={isMuted ? '開啟音效' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onFinishRound(score, roundCount, missedInSession)}
            className="px-3 py-1.5 bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium text-xs rounded-xl shadow-xs transition-all"
          >
            結束挑戰
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-5 pill-shadow border border-[#E5E5DB] mb-4 relative">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              Q
            </span>
            <span className="text-xs font-semibold text-[#5A5A40]">請挑選符合下列英文字義的單字：</span>
          </div>

          {/* Action Buttons: Speak Def & AI Explain */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => speakEnglishWord(currentQ.def)}
              className="p-1.5 rounded-lg bg-[#F2F2EB] hover:bg-[#E5E5DB] text-[#3D3D2D] transition-colors"
              title="朗讀題幹"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowChineseHint(!showChineseHint)}
              className="px-2 py-1 rounded-lg bg-[#A8C69F]/30 hover:bg-[#A8C69F]/50 text-[#2D2D1F] text-xs font-semibold transition-colors flex items-center gap-1 border border-[#8FB384]/50"
            >
              {showChineseHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showChineseHint ? '隱藏中文' : '中文提示'}</span>
            </button>

            <button
              onClick={() => onTriggerAIExplain(currentQ)}
              className="px-2.5 py-1 rounded-lg bg-[#5A5A40] hover:bg-[#4A4A3A] text-white text-xs font-medium shadow-xs transition-opacity flex items-center gap-1 font-serif"
              title="查看 Gemini AI 深度解析"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FCE166]" />
              <span>AI 解析</span>
            </button>
          </div>
        </div>

        {/* Masked Question Definition Text */}
        <div className="my-3 p-4 bg-[#F2F2EB]/80 rounded-xl border border-[#E5E5DB]">
          <p className="text-[#2D2D1F] text-base sm:text-lg font-serif leading-relaxed">
            "{maskedDef}"
          </p>
          {showChineseHint && (
            <p className="mt-2 text-sm text-[#5A5A40] font-medium pt-2 border-t border-[#E5E5DB]">
              💡 中文含意：{currentQ.zh}
            </p>
          )}
        </div>
      </div>

      {/* 8 Multiple Choice Option Buttons Grid (2x4) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2">
        {options.map((optWord, idx) => {
          const isSelected = selectedAnswer === optWord;
          const isCorrectWord = optWord.toLowerCase() === currentQ.word.toLowerCase();

          let btnStyle =
            'bg-white/90 text-[#2D2D1F] border-[#E5E5DB] hover:bg-[#F2F2EB] pill-shadow';

          if (selectedAnswer) {
            if (isCorrectWord) {
              btnStyle =
                'bg-[#A8C69F] text-[#2D2D1F] border-[#8FB384] pill-shadow font-bold';
            } else if (isSelected && !isCorrectWord) {
              btnStyle = 'bg-[#F5B8A8] text-[#2D2D1F] border-[#D97757] pill-shadow';
            } else {
              btnStyle = 'bg-[#F2F2EB] text-[#5A5A40]/50 border-[#E5E5DB] opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={inputLocked}
              onClick={() => handleAnswerSelect(optWord)}
              className={`p-3.5 rounded-2xl border font-semibold text-base transition-all duration-150 flex items-center justify-between text-left active:scale-98 ${btnStyle}`}
            >
              <span className="tracking-wide font-sans">{optWord}</span>
              {selectedAnswer && isCorrectWord && (
                <span className="text-[#2D2D1F] text-xs font-bold bg-white/80 px-2 py-0.5 rounded-full border border-[#8FB384]">
                  正確✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
