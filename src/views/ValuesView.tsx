import React, { useState } from 'react';
import { PageId } from '../types';
import { FIVE_TREES_VALUES } from '../data/mockData';
import { FamilyLeadershipTreeArtwork } from '../components/PciVisualArtwork';
import { ShieldCheck, Heart, Users, Sparkles, BookOpen, Compass, Award, CheckCircle, Eye } from 'lucide-react';

interface ValuesViewProps {
  onNavigate: (page: PageId) => void;
}

export const ValuesView: React.FC<ValuesViewProps> = ({ onNavigate }) => {
  const [selectedTree, setSelectedTree] = useState<string>(FIVE_TREES_VALUES[0].id);

  const corePillars = [
    {
      title: 'Leadership',
      kicker: 'Exemplarité & Influence Morale',
      desc: 'Le vrai leadership ne commande pas par la force, mais inspire par la droiture. Au PCI, nous formons des hommes et des femmes capables de diriger d’abord leur propre vie et leur foyer avant de prétendre guider les autres.',
      application: 'Responsabilisation tournante des membres dans la gestion des séances de Globale Classe.',
      icon: Compass,
      tag: 'Gouvernance',
    },
    {
      title: 'Éducation',
      kicker: 'Formation Continue des Consciences',
      desc: 'L’éducation au PCI s’articule autour de la doctrine des Cinq Arbres du Leadership Familial. Elle ne se limite pas à des théories académiques, mais propose des repères éthiques directement applicables au quotidien.',
      application: 'Exposés thématiques bimensuels de 60 minutes avec études de cas familiaux.',
      icon: BookOpen,
      tag: 'Transmission',
    },
    {
      title: 'Fraternité',
      kicker: 'Le Ciment de la Communauté',
      desc: 'La fraternité est le socle absolu du club. Chaque membre est accueilli avec égards et considération. Nous bannissons le mépris, la jalousie et les querelles de clocher pour privilégier l’élévation mutuelle.',
      application: 'Visites de courtoisie systématiques, célébration des joies et présence aux obsèques.',
      icon: Heart,
      tag: 'Cohésion',
    },
    {
      title: 'Solidarité',
      kicker: 'L’Entraide Agissante',
      desc: 'Une solidarité qui ne se traduit pas en actes concrets reste stérile. Les membres mettent en commun leurs forces relationnelles et économiques pour secourir les frères en difficulté et encourager ceux qui entreprennent.',
      application: 'Caisse de secours d’urgence et clubs d’épargne productive au sein des classes.',
      icon: ShieldCheck,
      tag: 'Soutien',
    },
    {
      title: 'Convivialité',
      kicker: 'La Chaleur des Rencontres',
      desc: 'Le PCI cultive la joie de vivre et le plaisir des retrouvailles. Les séances de classe et les assemblées générales sont des parenthèses de paix, empreintes d’humour sain et de détente fraternelle.',
      application: 'Repas conviviaux, pauses café fraternelles et sorties familiales organisées.',
      icon: Sparkles,
      tag: 'Partage',
    },
    {
      title: 'Développement Partagé',
      kicker: 'L’Ascension Collective',
      desc: 'Nul ne doit prospérer seul au détriment de ses pairs. Nous croyons en une prospérité inclusive où chaque progrès individuel rejaillit positivement sur l’ensemble du réseau et des familles.',
      application: 'Partage d’opportunités d’affaires, conventions de réduction du coût de la vie.',
      icon: Users,
      tag: 'Économie',
    },
  ];

  const currentTreeObj = FIVE_TREES_VALUES.find((t) => t.id === selectedTree) || FIVE_TREES_VALUES[0];

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Philosophie & Éthique
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Nos Valeurs : Le Socle Moral du Pionnier Club International
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Le PCI ne s'arrête pas à un simple rassemblement associatif : nous défendons une philosophie de vie où le progrès matériel est indissociable de l'élévation éthique et de la protection de la cellule familiale.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Banner with Visual Artwork & Moral Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
          <div className="md:col-span-5">
            <FamilyLeadershipTreeArtwork className="w-full min-h-[280px]" />
          </div>
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Engagement Fraternel
            </span>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Des Valeurs Vécues au Quotidien dans Chaque Foyer
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              « Un réseau de personnes qui cultivent convivialité, solidarité et recherche de condition de vie excellente. » Nos membres traduisent ces principes par une fidélité éprouvée et une présence attentive lors des rencontres régulières.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#087747] font-semibold">
                Cadre officiel : 21 à 77 ans
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold">
                10 000 FCFA carte annuelle
              </span>
            </div>
          </div>
        </div>

        {/* Les 6 Valeurs Piliers du PCI */}
        <div>
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Les Six Piliers de l'Engagement Pionnier
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Chaque valeur structure le comportement attendu des adhérents dans la cité et au sein du club.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-[#087747]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <span className="text-[11px] font-mono font-bold text-[#087747]">PILIER 0{i + 1}</span>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider">{pillar.tag}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#087747] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-stone-900">{pillar.title}</h3>
                        <span className="text-[11px] text-stone-500 block leading-tight">{pillar.kicker}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 bg-stone-50/60 -mx-6 -mb-6 p-4 rounded-b-xl">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#087747] block mb-1">
                      Application concrète au PCI :
                    </span>
                    <p className="text-[11px] text-stone-700 leading-normal">
                      {pillar.application}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focus Approfondi : Les 5 Arbres du Leadership Familial — EN VERT FORÊT */}
        <div className="bg-gradient-to-b from-[#064E35] to-[#043322] text-white rounded-2xl p-8 md:p-12 border border-[#C9A65A]/40 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block mb-1">
              Enseignement Exclusif
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              La Doctrine des Cinq Arbres du Leadership Familial
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Pour impacter et stabiliser durablement les familles, le PCI a formalisé cinq vertus cardinales enseignées dans toutes les Globales Classes.
            </p>
          </div>

          {/* Tree Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/15 pb-4">
            {FIVE_TREES_VALUES.map((t, index) => (
              <button
                key={t.id}
                onClick={() => setSelectedTree(t.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTree === t.id
                    ? 'bg-[#C9A65A] text-[#064E35] font-bold shadow-xs'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                }`}
              >
                0{index + 1}. {t.name.replace('Arbre de la ', '').replace('Arbre de l’', '')}
              </button>
            ))}
          </div>

          {/* Selected Tree Detailed Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/10 rounded-xl p-6 md:p-8 border border-white/15 backdrop-blur-xs">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-[#C9A65A] tracking-wider uppercase">
                {currentTreeObj.subtitle}
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                {currentTreeObj.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {currentTreeObj.description}
              </p>

              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <span className="text-[10px] font-bold text-[#C9A65A] uppercase tracking-wider block mb-1">
                  Exercice Pratique en Globale Classe :
                </span>
                <p className="text-xs text-white font-medium">
                  {currentTreeObj.actionConcrete}
                </p>
              </div>

              <div className="pt-2">
                <blockquote className="text-xs italic text-emerald-200 border-l-2 border-[#C9A65A] pl-3">
                  {currentTreeObj.quote}
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#087747] to-[#064E35] text-white rounded-xl text-center space-y-3 border border-[#C9A65A]/30">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-[#C9A65A]/40 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#C9A65A]" />
              </div>
              <h4 className="font-display text-base font-bold">Engagement du Membre</h4>
              <p className="text-xs text-stone-200 leading-relaxed">
                En adhérant au Pionnier Club International, vous vous engagez solennellement à faire vivre cet arbre dans votre foyer et au sein de votre classe.
              </p>
              <button
                onClick={() => onNavigate('membership')}
                className="mt-2 px-5 py-2.5 text-xs font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Faire ma demande d'adhésion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
