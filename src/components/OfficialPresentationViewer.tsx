import React, { useState } from 'react';
import { OFFICIAL_PRESENTATION_CHAPTERS, PIONEER_CREED } from '../data/mockData';
import { ChevronLeft, ChevronRight, CheckCircle2, Award, Sparkles, Users, BookOpen, Compass, ShieldCheck, Heart, TrendingUp, CreditCard } from 'lucide-react';

interface OfficialPresentationViewerProps {
  className?: string;
}

export const OfficialPresentationViewer: React.FC<OfficialPresentationViewerProps> = ({ className = '' }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentChapter = OFFICIAL_PRESENTATION_CHAPTERS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % OFFICIAL_PRESENTATION_CHAPTERS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + OFFICIAL_PRESENTATION_CHAPTERS.length) % OFFICIAL_PRESENTATION_CHAPTERS.length);
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-[#087747]/40 shadow-xl bg-gradient-to-b from-[#064E35] to-[#043322] text-white ${className}`}>
      {/* Top Slide Header Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C9A65A] bg-[#087747] flex items-center justify-center font-display font-bold text-xs text-[#C9A65A]">
            {currentChapter.number}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A65A] font-bold block">
              Plaquette Institutionnelle Officielle
            </span>
            <span className="text-xs text-stone-300">
              Chapitre {currentIdx + 1} sur {OFFICIAL_PRESENTATION_CHAPTERS.length}
            </span>
          </div>
        </div>

        {/* Chapter Quick Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {OFFICIAL_PRESENTATION_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setCurrentIdx(idx)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                currentIdx === idx
                  ? 'bg-[#C9A65A] text-[#064E35] font-bold shadow-xs'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              {ch.number}
            </button>
          ))}
        </div>
      </div>

      {/* Main Slide Presentation Body */}
      <div className="p-6 sm:p-10 md:p-12 min-h-[360px] flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A65A] font-bold">
              {currentChapter.subtitle}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {currentChapter.title}
            </h3>
          </div>

          {/* Points list */}
          <div className="space-y-3.5">
            {currentChapter.points.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#C9A65A]/50 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#C9A65A]/20 text-[#C9A65A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Special Manifest callout if on Chapter 7 */}
          {currentChapter.id === 'chap-7' && (
            <div className="p-4 rounded-xl bg-white/10 border border-[#C9A65A]/40 text-xs text-[#C9A65A] italic">
              « Être Pionnier, c'est choisir l'ascension collective plutôt que l'illusion de réussir seul. »
            </div>
          )}
        </div>

        {/* Slide Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <span className="text-[11px] text-stone-400 font-mono hidden sm:inline-block">
            {currentChapter.title}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C9A65A] hover:bg-[#d9b86c] text-xs font-bold text-[#064E35] transition-colors cursor-pointer"
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
