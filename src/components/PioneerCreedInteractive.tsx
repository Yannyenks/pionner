import React, { useState } from 'react';
import { PIONEER_CREED } from '../data/mockData';
import { Compass, Heart, TrendingUp, Users, ShieldCheck, Sparkles, BookOpen, CreditCard, CheckCircle2 } from 'lucide-react';

export const PioneerCreedInteractive: React.FC = () => {
  const [activeCreedId, setActiveCreedId] = useState<number>(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Heart': return Heart;
      case 'TrendingUp': return TrendingUp;
      case 'Users': return Users;
      case 'ShieldCheck': return ShieldCheck;
      case 'Sparkles': return Sparkles;
      case 'BookOpen': return BookOpen;
      default: return CreditCard;
    }
  };

  const activeItem = PIONEER_CREED.find((c) => c.id === activeCreedId) || PIONEER_CREED[0];
  const ActiveIcon = getIcon(activeItem.icon);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 md:p-10 space-y-8">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block mb-1">
          Manifeste du Pionnier · Chapitre 7
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
          Pourquoi je suis Pionnier ?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
          Les huit raisons profondes qui animent chaque femme et chaque homme ayant choisi de rejoindre le réseau.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 8 Interactive Creed Selectors */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PIONEER_CREED.map((item) => {
            const Icon = getIcon(item.icon);
            const isSelected = activeCreedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCreedId(item.id)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer border flex items-start gap-3 ${
                  isSelected
                    ? 'bg-[#064E35] text-white border-[#087747] shadow-md scale-[1.02]'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/15 text-[#C9A65A]' : 'bg-white text-[#087747] shadow-2xs'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#C9A65A]' : 'text-stone-400'}`}>
                    Engagement 0{item.id}
                  </span>
                  <span className="text-xs font-semibold block leading-snug">
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Focused Active Creed Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#064E35] to-[#087747] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#C9A65A]/40 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <span className="font-mono text-xs text-[#C9A65A] font-bold">
              ENGAGEMENT OFFICIEL 0{activeItem.id} / 08
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C9A65A]">
              <ActiveIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-xl font-bold text-white">
              {activeItem.title}
            </h4>

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs text-stone-100 italic leading-relaxed">
              « {activeItem.text} »
            </div>

            <div className="space-y-2 text-xs text-stone-200 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A65A] shrink-0 mt-0.5" />
                <span>Mis en pratique bimensuellement dans la Globale Classe.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A65A] shrink-0 mt-0.5" />
                <span>Partagé avec 23 pairs bienveillants pour grandir ensemble.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
