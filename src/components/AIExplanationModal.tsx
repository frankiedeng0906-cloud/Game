import React, { useEffect, useState } from 'react';
import { Word, AIExplanationData } from '../types';
import { speakEnglishWord } from '../utils/speech';
import { Volume2, Sparkles, BookOpen, Lightbulb, Link, Check, X, RefreshCw } from 'lucide-react';

interface AIExplanationModalProps {
  word: Word | null;
  onClose: () => void;
}

export const AIExplanationModal: React.FC<AIExplanationModalProps> = ({ word, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIExplanationData | null>(null);

  useEffect(() => {
    if (!word) return;

    const fetchExplanation = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/ai-explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            word: word.word,
            definition: word.def,
            zh: word.zh,
          }),
        });

        const result = await res.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || '無法取得 AI 單字解析，請稍後再試。');
        }
      } catch (err: any) {
        console.error('Fetch explanation error:', err);
        setError('連線至 AI 服務發生錯誤。');
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, [word]);

  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D3D2D]/40 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-[#F5F5F0] rounded-3xl pill-shadow overflow-hidden border border-[#E5E5DB] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#5A5A40] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FCE166] animate-spin-slow" />
            <h3 className="font-serif font-bold text-lg tracking-wide">Gemini 智慧單字深度解析</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            title="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Main Word Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5DB]">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-bold font-serif text-[#2D2D1F] tracking-tight">{word.word}</h2>
                {data?.phonetic && (
                  <span className="text-sm font-medium text-[#5A5A40] font-mono">{data.phonetic}</span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#E5E5DB] text-[#3D3D2D] font-semibold uppercase">
                  {word.partOfSpeech || data?.partOfSpeech || 'word'}
                </span>
              </div>
              <p className="text-base font-semibold text-[#5A5A40] mt-1">{word.zh}</p>
            </div>

            <button
              onClick={() => speakEnglishWord(word.word)}
              className="p-3 bg-white hover:bg-[#F2F2EB] text-[#2D2D1F] rounded-xl transition-all pill-shadow flex items-center gap-1.5 font-medium text-sm border border-[#E5E5DB] active:scale-95"
            >
              <Volume2 className="w-5 h-5 text-[#8FB384]" />
              <span>發音</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-[#5A5A40] space-y-3">
              <RefreshCw className="w-8 h-8 text-[#8FB384] animate-spin" />
              <p className="text-sm font-medium">Gemini 正在分析單字根源與記憶口訣...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-4 bg-[#F5B8A8]/30 border border-[#F5B8A8] text-[#D97757] rounded-xl text-sm">
              <p className="font-semibold">分析失敗</p>
              <p className="mt-0.5">{error}</p>
            </div>
          )}

          {/* AI Generated Content */}
          {data && !loading && (
            <div className="space-y-4 text-[#3D3D2D] text-sm">
              {/* Definition */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E5E5DB] pill-shadow">
                <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold mb-1 font-serif">
                  <BookOpen className="w-4 h-4 text-[#8FB384]" />
                  <span>英文釋義與說明</span>
                </div>
                <p className="text-[#2D2D1F] font-serif leading-relaxed">{word.def}</p>
                {data.simpleExplanation && (
                  <p className="mt-1 text-[#5A5A40] text-xs">{data.simpleExplanation}</p>
                )}
              </div>

              {/* Mnemonic Memory Trick */}
              {data.mnemonic && (
                <div className="bg-[#FCE166]/20 p-3.5 rounded-2xl border border-[#FCE166]/60 pill-shadow">
                  <div className="flex items-center gap-1.5 text-[#3D3D2D] font-bold mb-1 font-serif">
                    <Lightbulb className="w-4 h-4 text-[#5A5A40]" />
                    <span>記憶技巧與口訣 (Mnemonic)</span>
                  </div>
                  <p className="text-[#2D2D1F] leading-relaxed font-medium">{data.mnemonic}</p>
                </div>
              )}

              {/* Root Analysis */}
              {data.rootAnalysis && (
                <div className="bg-[#A8C69F]/20 p-3.5 rounded-2xl border border-[#8FB384]/40 pill-shadow">
                  <div className="flex items-center gap-1.5 text-[#2D2D1F] font-bold mb-1 font-serif">
                    <Link className="w-4 h-4 text-[#8FB384]" />
                    <span>字根與詞源拆解</span>
                  </div>
                  <p className="text-[#2D2D1F] leading-relaxed font-medium">{data.rootAnalysis}</p>
                </div>
              )}

              {/* Example Sentences */}
              {data.exampleSentences && data.exampleSentences.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-[#2D2D1F] font-serif flex items-center gap-1.5">
                    <span>例句示範 (Example Sentences)</span>
                  </span>
                  <div className="space-y-2">
                    {data.exampleSentences.map((ex, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-2xl border border-[#E5E5DB] pill-shadow space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif text-[#2D2D1F]">{ex.en}</p>
                          <button
                            onClick={() => speakEnglishWord(ex.en)}
                            className="p-1 hover:bg-[#F2F2EB] rounded-lg text-[#5A5A40] shrink-0"
                            title="朗讀例句"
                          >
                            <Volume2 className="w-4 h-4 text-[#8FB384]" />
                          </button>
                        </div>
                        <p className="text-xs text-[#5A5A40] font-sans">{ex.zh}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synonyms & Collocations */}
              {((data.synonyms && data.synonyms.length > 0) || (data.collocations && data.collocations.length > 0)) && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5E5DB]">
                  {data.synonyms && data.synonyms.length > 0 && (
                    <div className="p-2.5 bg-white rounded-xl border border-[#E5E5DB]">
                      <span className="text-xs font-bold text-[#5A5A40] block mb-1">近義詞 (Synonyms)</span>
                      <p className="text-xs text-[#2D2D1F] font-medium">{data.synonyms.join(', ')}</p>
                    </div>
                  )}
                  {data.collocations && data.collocations.length > 0 && (
                    <div className="p-2.5 bg-white rounded-xl border border-[#E5E5DB]">
                      <span className="text-xs font-bold text-[#5A5A40] block mb-1">常用搭配 (Collocations)</span>
                      <p className="text-xs text-[#2D2D1F] font-medium">{data.collocations.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#E5E5DB]/40 border-t border-[#E5E5DB] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#5A5A40] hover:bg-[#4A4A3A] text-white font-medium rounded-xl transition-all shadow-xs text-sm"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
