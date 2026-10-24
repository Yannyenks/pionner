import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Automatically transition after 2.2 seconds
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onComplete, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F4] transition-opacity duration-600 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Laurel Wreath Outline */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#C9A65A"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              strokeOpacity="0.6"
            />
          </svg>

          {/* Central P insignia */}
          <div className="w-20 h-20 rounded-full bg-white shadow-md border border-[#C9A65A]/40 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-[#087747] tracking-tight">P</span>
          </div>
        </div>

        <p className="font-display text-lg tracking-widest text-[#087747] font-semibold uppercase mb-1">
          Pionnier Club International
        </p>
        <p className="text-xs text-stone-500 tracking-wide font-sans mb-8">
          Le leadership, la fraternité & le développement partagé
        </p>

        {/* Skip button so it never traps the user */}
        <button
          onClick={handleSkip}
          className="text-xs uppercase tracking-widest text-stone-400 hover:text-[#087747] transition-colors py-1.5 px-4 rounded-full border border-stone-200 hover:border-[#087747]/40 cursor-pointer"
        >
          Passer l'introduction →
        </button>
      </div>
    </div>
  );
};
