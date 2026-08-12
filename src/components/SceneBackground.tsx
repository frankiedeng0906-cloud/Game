import React from 'react';

export const SceneBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-3xl">
      {/* Sky Warm Background */}
      <div className="absolute inset-0 bg-[#F5F5F0]" />

      {/* Sun */}
      <div className="absolute top-8 right-12 w-24 h-24 bg-[#FCE166] rounded-full opacity-70 blur-xs flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#FCE166]" />
      </div>

      {/* Soft Natural Clouds */}
      <div className="absolute top-12 left-20 w-48 h-12 bg-white rounded-full opacity-50 shadow-sm animate-[bounce_9s_ease-in-out_infinite]" />
      <div className="absolute top-20 left-48 w-40 h-10 bg-white rounded-full opacity-40 shadow-sm animate-[bounce_12s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-16 right-1/3 w-52 h-11 bg-white rounded-full opacity-45 shadow-sm animate-[bounce_10s_ease-in-out_infinite]" />

      {/* Grass Ground - Natural Tones Grass Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 grass-gradient border-t border-[#8FB384]/40">
        {/* Decorative Grass Tufts in Olive & Earth Tones */}
        <div className="absolute -top-3 left-10 flex gap-1">
          <div className="w-2 h-4 bg-[#8FB384] rounded-t-full transform -rotate-12" />
          <div className="w-2.5 h-5 bg-[#A8C69F] rounded-t-full" />
          <div className="w-2 h-4 bg-[#8FB384] rounded-t-full transform rotate-12" />
        </div>

        <div className="absolute -top-3 left-1/3 flex gap-1">
          <div className="w-2 h-5 bg-[#A8C69F] rounded-t-full transform -rotate-6" />
          <div className="w-2.5 h-6 bg-[#8FB384] rounded-t-full" />
        </div>

        <div className="absolute -top-3 right-24 flex gap-1">
          <div className="w-2 h-4 bg-[#8FB384] rounded-t-full" />
          <div className="w-2.5 h-5 bg-[#A8C69F] rounded-t-full transform rotate-12" />
        </div>

        {/* Delicate Wildflowers */}
        <div className="absolute top-4 left-28 flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FCE166] border border-[#E5E5DB]" />
        </div>
        <div className="absolute top-6 right-1/3 flex items-center">
          <div className="w-3 h-3 rounded-full bg-white/90 border border-[#E5E5DB]" />
        </div>
      </div>
    </div>
  );
};

