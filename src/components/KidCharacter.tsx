import React, { useEffect, useState } from 'react';
import { FeedbackState } from '../types';

interface KidCharacterProps {
  mood: FeedbackState;
}

export const KidCharacter: React.FC<KidCharacterProps> = ({ mood }) => {
  const [posX, setPosX] = useState<number>(50); // percentage 10% to 90%
  const [direction, setDirection] = useState<number>(1); // 1 = right, -1 = left
  const [bounce, setBounce] = useState<number>(0);

  useEffect(() => {
    // Character walking loop
    const interval = setInterval(() => {
      if (mood === 'pass') {
        // High jump on pass
        setBounce((prev) => (prev > 0 ? 0 : 16));
        return;
      } else if (mood === 'fail') {
        // Sad droop
        setBounce(-4);
        return;
      }

      // Normal walking
      setPosX((prevX) => {
        let newX = prevX + direction * 0.4;
        if (newX > 85) {
          setDirection(-1);
          newX = 85;
        } else if (newX < 15) {
          setDirection(1);
          newX = 15;
        }
        return newX;
      });

      setBounce((prev) => (prev === 0 ? 6 : 0));
    }, 120);

    return () => clearInterval(interval);
  }, [direction, mood]);

  return (
    <div
      className="absolute bottom-6 transition-all duration-150 ease-out z-20 pointer-events-none select-none"
      style={{
        left: `${posX}%`,
        transform: `translateX(-50%) translateY(${-bounce}px)`,
      }}
    >
      {/* Celebration sparkles on pass */}
      {mood === 'pass' && (
        <div className="absolute -top-12 -left-6 -right-6 flex justify-between pointer-events-none animate-ping">
          <span className="text-yellow-400 text-2xl font-bold">✨</span>
          <span className="text-amber-300 text-xl font-bold">🌟</span>
          <span className="text-emerald-400 text-2xl font-bold">🎉</span>
        </div>
      )}

      {/* Character Wrapper */}
      <div className="relative flex flex-col items-center">
        {/* Head */}
        <div
          className={`w-12 h-12 rounded-full border-2 border-[#2D2D1F] bg-[#FFDAB9] relative shadow-sm transition-transform duration-100 ${
            mood === 'fail' ? 'rotate-12' : ''
          }`}
        >
          {/* Hair */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#5A5A40] rounded-t-full border-t border-[#2D2D1F]" />

          {/* Eyes & Mouth Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            {mood === 'pass' ? (
              <>
                {/* Happy eyes */}
                <div className="flex gap-2.5 mb-1">
                  <div className="w-2.5 h-1 border-t-2 border-[#2D2D1F] rounded-t-full" />
                  <div className="w-2.5 h-1 border-t-2 border-[#2D2D1F] rounded-t-full" />
                </div>
                {/* Big happy mouth */}
                <div className="w-4 h-2.5 bg-[#D97757] rounded-b-full border border-[#2D2D1F]" />
                {/* Blush */}
                <div className="absolute top-5 left-1 w-2 h-1 bg-[#F5B8A8]/80 rounded-full" />
                <div className="absolute top-5 right-1 w-2 h-1 bg-[#F5B8A8]/80 rounded-full" />
              </>
            ) : mood === 'fail' ? (
              <>
                {/* X Eyes / Sad Eyes */}
                <div className="flex gap-2 mb-1 text-[11px] font-bold text-[#2D2D1F]">
                  <span>✖</span>
                  <span>✖</span>
                </div>
                {/* Frown mouth */}
                <div className="w-3.5 h-2 border-t-2 border-[#2D2D1F] rounded-t-full" />
                {/* Sweat drop */}
                <div className="absolute -top-1 right-0 text-[#5A87C6] text-xs">💦</div>
              </>
            ) : (
              <>
                {/* Normal Eyes */}
                <div className="flex gap-3 mb-1.5">
                  <div className="w-1.5 h-1.5 bg-[#2D2D1F] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#2D2D1F] rounded-full" />
                </div>
                {/* Neutral Mouth */}
                <div className="w-3 h-0.5 bg-[#2D2D1F] rounded-full" />
              </>
            )}
          </div>
        </div>

        {/* Body & Shirt */}
        <div className="w-9 h-7 bg-[#5A87C6] border-x-2 border-b-2 border-[#2D2D1F] rounded-b-md shadow-xs relative -mt-1">
          {/* Collar detail */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-white rounded-b-sm" />
        </div>

        {/* Legs / Walking Motion */}
        <div className="flex gap-2 -mt-0.5">
          <div
            className={`w-2.5 h-4 bg-[#2D2D1F] rounded-b-sm transition-transform duration-100 ${
              bounce > 0 ? 'translate-y-[-2px]' : ''
            }`}
          />
          <div
            className={`w-2.5 h-4 bg-[#2D2D1F] rounded-b-sm transition-transform duration-100 ${
              bounce === 0 ? 'translate-y-[-2px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
