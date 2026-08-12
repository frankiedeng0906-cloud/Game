export type GameLevel = 'basic' | 'advanced' | 'master' | 'custom';

export interface Word {
  id: string;
  word: string;
  def: string;
  zh: string;
  level: GameLevel;
  partOfSpeech?: string;
  category?: string;
  confusableWords?: string[];
  example?: string;
  phonetic?: string;
}

export type FeedbackState = '' | 'pass' | 'fail';

export interface AIExampleSentence {
  en: string;
  zh: string;
}

export interface AIExplanationData {
  phonetic?: string;
  partOfSpeech?: string;
  zhTranslation?: string;
  simpleExplanation: string;
  mnemonic: string;
  rootAnalysis?: string;
  exampleSentences: AIExampleSentence[];
  synonyms?: string[];
  collocations?: string[];
}

export interface QuizHistory {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  date: string;
  level: GameLevel;
  missedWords: Word[];
}

export interface MistakeItem {
  word: Word;
  missedCount: number;
  lastMissedDate: number;
}
