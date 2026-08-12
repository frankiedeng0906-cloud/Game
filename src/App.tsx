import React, { useState, useEffect } from 'react';
import { GameLevel, Word, FeedbackState } from './types';
import { SceneBackground } from './components/SceneBackground';
import { KidCharacter } from './components/KidCharacter';
import { LevelSelector } from './components/LevelSelector';
import { QuizScreen } from './components/QuizScreen';
import { StudyMode } from './components/StudyMode';
import { MistakeNotebook } from './components/MistakeNotebook';
import { StatsSummary } from './components/StatsSummary';
import { AIExplanationModal } from './components/AIExplanationModal';

type ActiveView = 'menu' | 'quiz' | 'study' | 'mistakes' | 'summary';

export default function App() {
  const [view, setView] = useState<ActiveView>('menu');
  const [level, setLevel] = useState<GameLevel>('basic');
  const [customWords, setCustomWords] = useState<Word[]>([]);
  const [customCategoryName, setCustomCategoryName] = useState<string>('');

  const [characterMood, setCharacterMood] = useState<FeedbackState>('');
  const [aiModalWord, setAiModalWord] = useState<Word | null>(null);

  // Stats for Summary Screen
  const [lastRoundScore, setLastRoundScore] = useState<number>(0);
  const [lastRoundTotal, setLastRoundTotal] = useState<number>(0);
  const [lastRoundMissed, setLastRoundMissed] = useState<Word[]>([]);

  // Persistent Missed Words Notebook
  const [mistakeList, setMistakeList] = useState<Word[]>(() => {
    try {
      const saved = localStorage.getItem('voca_challenge_missed_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('voca_challenge_missed_words', JSON.stringify(mistakeList));
    } catch (e) {
      console.error('Failed to save missed words:', e);
    }
  }, [mistakeList]);

  // Handle Level Selection
  const handleSelectLevel = async (selectedLevel: GameLevel, customCategory?: string) => {
    setLevel(selectedLevel);
    if (selectedLevel === 'custom' && customCategory) {
      setCustomCategoryName(customCategory);
      try {
        const res = await fetch('/api/ai-custom-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: customCategory, count: 10 }),
        });
        const data = await res.json();
        if (data.success && data.words) {
          const formatted: Word[] = data.words.map((w: any, idx: number) => ({
            id: `c_${idx}_${Date.now()}`,
            word: w.word,
            def: w.def,
            zh: w.zh || '自訂主題單字',
            level: 'custom',
            partOfSpeech: w.partOfSpeech || 'noun',
            category: w.category,
            confusableWords: Array.isArray(w.confusableWords) ? w.confusableWords : [],
          }));
          setCustomWords(formatted);
          setView('quiz');
        } else {
          alert('AI 出題失敗，切換回預設初階模式。');
          setLevel('basic');
          setView('quiz');
        }
      } catch (err) {
        console.error('Failed to generate custom quiz:', err);
        alert('AI 出題連線發生錯誤。');
        setLevel('basic');
        setView('quiz');
      }
    } else {
      setView('quiz');
    }
  };

  const handleRecordMissedWord = (word: Word) => {
    setMistakeList((prev) => {
      if (prev.some((w) => w.word.toLowerCase() === word.word.toLowerCase())) {
        return prev;
      }
      return [word, ...prev];
    });
  };

  const handleFinishRound = (score: number, total: number, missed: Word[]) => {
    setLastRoundScore(score);
    setLastRoundTotal(total);
    setLastRoundMissed(missed);
    setView('summary');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F0] text-[#4A4A3A] font-serif flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden">
      {/* Outer Game Window Box in Natural Tones Frame */}
      <div className="relative w-full max-w-[960px] h-[640px] sm:h-[680px] bg-[#F5F5F0] rounded-3xl pill-shadow border-2 border-[#D5D5CB] overflow-hidden flex flex-col justify-between">
        {/* Dynamic Animated Background */}
        <SceneBackground />

        {/* Dynamic Animated Kid Character */}
        <KidCharacter mood={characterMood} />

        {/* Screen Routing */}
        <div className="relative z-30 w-full h-full flex flex-col justify-between p-2">
          {view === 'menu' && (
            <LevelSelector
              onSelectLevel={handleSelectLevel}
              onOpenStudyMode={() => setView('study')}
              onOpenMistakeNotebook={() => setView('mistakes')}
              mistakeCount={mistakeList.length}
            />
          )}

          {view === 'quiz' && (
            <QuizScreen
              level={level}
              customWords={customWords}
              customCategoryName={customCategoryName}
              onBackToMenu={() => setView('menu')}
              onFinishRound={handleFinishRound}
              onTriggerAIExplain={(word) => setAiModalWord(word)}
              onRecordMissedWord={handleRecordMissedWord}
              onCharacterMoodChange={(mood) => setCharacterMood(mood)}
            />
          )}

          {view === 'study' && (
            <StudyMode
              onBackToMenu={() => setView('menu')}
              onTriggerAIExplain={(word) => setAiModalWord(word)}
            />
          )}

          {view === 'mistakes' && (
            <MistakeNotebook
              missedWords={mistakeList}
              onBackToMenu={() => setView('menu')}
              onTriggerAIExplain={(word) => setAiModalWord(word)}
              onClearMistakes={() => setMistakeList([])}
              onStartMistakeQuiz={() => {
                setCustomWords(mistakeList);
                setCustomCategoryName('錯題複習');
                setLevel('custom');
                setView('quiz');
              }}
            />
          )}

          {view === 'summary' && (
            <StatsSummary
              score={lastRoundScore}
              totalQuestions={lastRoundTotal}
              missedWords={lastRoundMissed}
              onRestartQuiz={() => setView('quiz')}
              onBackToMenu={() => setView('menu')}
              onOpenMistakeNotebook={() => setView('mistakes')}
            />
          )}
        </div>
      </div>

      {/* Gemini AI Word Explanation Modal */}
      <AIExplanationModal
        word={aiModalWord}
        onClose={() => setAiModalWord(null)}
      />
    </div>
  );
}
