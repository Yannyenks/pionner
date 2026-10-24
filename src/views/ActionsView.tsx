import React, { useState } from 'react';
import { PageId, ProgramAction } from '../types';
import { INITIAL_PROGRAMS } from '../data/mockData';
import { TrendingUp, ShieldCheck, CreditCard, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

import { SolidarityInvestmentArtwork } from '../components/PciVisualArtwork';

interface ActionsViewProps {
  onNavigate: (page: PageId) => void;
}

export const ActionsView: React.FC<ActionsViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Investissement Solidaire',
    'Leadership Familial',
    'Économie & Pouvoir d’Achat',
    'Action Communautaire',
  ];

  const filtered = selectedCategory === 'all'
    ? INITIAL_PROGRAMS
    : INITIAL_PROGRAMS.filter((p) => p.category === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'ShieldCheck': return ShieldCheck;
      case 'CreditCard': return CreditCard;
      default: return HeartHandshake;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
                Programmes & Réalisations
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Nos Actions : Transformer les Idéaux en Solutions Concrètes
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                Le Pionnier Club International structure des initiatives durables répondant aux besoins fondamentaux de ses adhérents : renforcement des compétences parentales, constitution d'une épargne solidaire et protection du pouvoir d'achat.
              </p>
            </div>
            <div className="lg:col-span-5">
              <SolidarityInvestmentArtwork className="w-full shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#087747] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat === 'all' ? 'Toutes les initiatives' : cat}
          </button>
        ))}
      </div>

      {/* Action Cards Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((action) => {
          const Icon = getIcon(action.iconName);
          return (
            <div
              key={action.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-[#087747]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#087747] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      {action.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {action.frequency}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-stone-900 leading-snug">
                  {action.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {action.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
                    Objectifs Opérationnels :
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {action.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087747] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 bg-[#FAF9F4] -mx-6 -mb-6 p-6 rounded-b-2xl space-y-3">
                <div className="text-xs">
                  <span className="font-bold text-[#087747] uppercase tracking-wider block mb-1">
                    Portée constatée au sein des classes :
                  </span>
                  <p className="text-stone-700 italic">
                    {action.realWorldImpact}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => onNavigate('membership')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
                  >
                    <span>Participer à ce programme via mon adhésion</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brochure document callout */}
      <div className="bg-[#FAF9F4] rounded-2xl p-8 border border-stone-300 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
            Documents de Référence
          </span>
          <h3 className="font-display text-xl font-bold text-stone-900">
            Consultez les Dépliants & Chartes Officielles
          </h3>
          <p className="text-xs text-stone-600 max-w-xl">
            Tous les programmes présentés sont issus des directives validées par l'Association Les Pionniers de la Famille Nouvelle et le Bureau International.
          </p>
        </div>

        <button
          onClick={() => onNavigate('gallery')}
          className="px-6 py-3 text-xs uppercase tracking-widest font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg shadow-2xs whitespace-nowrap cursor-pointer"
        >
          Voir les archives et documents →
        </button>
      </div>
      </div>
    </div>
  );
};
