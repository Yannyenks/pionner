import React, { useState } from 'react';
import { PageId } from '../types';
import {
  LeadershipAssemblyArtwork,
  FamilyLeadershipTreeArtwork,
  GlobalClassCircleArtwork,
  SolidarityInvestmentArtwork,
  PciNationalCrestArtwork,
} from '../components/PciVisualArtwork';
import { Eye, Shield, Users, Award, BookOpen, Heart, Sparkles, TrendingUp, Compass, ArrowRight } from 'lucide-react';

interface GalleryViewProps {
  onNavigate: (page: PageId) => void;
}

interface PatrimonyItem {
  id: string;
  title: string;
  category: 'Gouvernance & Sceaux' | 'Leadership' | 'Doctrine & 5 Arbres' | 'Solidarité & Économie';
  subtitle: string;
  description: string;
  component: React.ReactNode;
  tags: string[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PatrimonyItem | null>(null);

  const patrimonyItems: PatrimonyItem[] = [
    {
      id: 'item-1',
      title: 'Sceau d’Honneur & Armoiries Officielles',
      category: 'Gouvernance & Sceaux',
      subtitle: 'Bureau International & Bureau National Côte d’Ivoire',
      description: 'L’emblème officiel du Pionnier Club International, composé de la couronne de laurier dorée, de l’étoile directrice et du monogramme « P ». Il incarne le prestige, la loyauté constitutionnelle et la devise : « Leadership, Fraternité, Solidarité et Développement partagé ».',
      component: <PciNationalCrestArtwork className="h-full min-h-[300px]" />,
      tags: ['Sceau Officiel', 'Droit Ivoirien', 'Rayonnement International'],
    },
    {
      id: 'item-2',
      title: 'L’Assemblée des Leaders Bâtisseurs',
      category: 'Leadership',
      subtitle: 'Formation Continue & Émulation Morale',
      description: 'Représentation architecturale et symbolique de l’assemblée fraternelle réunissant hommes et femmes de 21 à 77 ans pour développer des capacités d’influence saine sur leur foyer et leur environnement social.',
      component: <LeadershipAssemblyArtwork className="h-full min-h-[300px]" />,
      tags: ['Leadership', 'Éducation', 'Convivialité'],
    },
    {
      id: 'item-3',
      title: 'L’Arbre Maître du Leadership Familial',
      category: 'Doctrine & 5 Arbres',
      subtitle: 'Les Cinq Branches Cardinales d’Enseignement',
      description: 'Schéma doctrinaire matérialisant les Cinq Arbres enseignés lors des séances bimensuelles : Fraternité, Solidarité, Fidélité, Dignité et Foi. Chaque branche rétablit un repère indispensable à l’harmonie familiale.',
      component: <FamilyLeadershipTreeArtwork className="h-full min-h-[300px]" />,
      tags: ['Cinq Arbres', 'Éducation Familiale', 'Valeurs'],
    },
    {
      id: 'item-4',
      title: 'La Constellation des 24 Membres',
      category: 'Doctrine & 5 Arbres',
      subtitle: 'Le Nombre d’Or des Globales Classes',
      description: 'Visualisation de la structure géométrique sacrée d’une Globale Classe : 24 pionniers reliés en constellation d’entraide. Un effectif optimal garantissant proximité humaine, absence d’anonymat et dynamique de groupe puissante.',
      component: <GlobalClassCircleArtwork className="h-full min-h-[300px]" />,
      tags: ['24 Membres', 'Globales Classes', 'Entraide Intime'],
    },
    {
      id: 'item-5',
      title: 'Clubs d’Investissement & Réduction du Coût de la Vie',
      category: 'Solidarité & Économie',
      subtitle: 'Mutualisation & Enrichissement Partagé',
      description: 'Le volet économique et pratique du PCI : fonds rotatif d’investissement solidaire au sein des classes, partenariats conventionnés pour réduire les dépenses quotidiennes et carte annuelle à 10 000 FCFA.',
      component: <SolidarityInvestmentArtwork className="h-full min-h-[300px]" />,
      tags: ['Investissement Solidaire', 'Carte 10 000 FCFA', 'Pouvoir d’Achat'],
    },
  ];

  const categories = ['all', 'Gouvernance & Sceaux', 'Leadership', 'Doctrine & 5 Arbres', 'Solidarité & Économie'];

  const filtered = activeFilter === 'all'
    ? patrimonyItems
    : patrimonyItems.filter((item) => item.category === activeFilter);

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel Profond */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Patrimoine & Symbolique
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Galerie des Compositions & Armoiries Officielles
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Explorez le langage visuel, les symboles fondateurs et l’architecture doctrinale qui incarnent la noblesse de la mission du Pionnier Club International.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#087747] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat === 'all' ? 'Toutes les créations' : cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Visual Showcase */}
              <div className="p-3 bg-stone-900/5">
                <div className="rounded-xl overflow-hidden shadow-inner">
                  {item.component}
                </div>
              </div>

              {/* Information body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#087747]">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">PCI Officiel</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#C9A65A] mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-stone-100 rounded text-[10px] text-stone-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#087747] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Détails & Doctrine associée</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detail view */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#087747] block">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-stone-900 mt-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C9A65A]">
                    {selectedItem.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md">
                {selectedItem.component}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>{selectedItem.description}</p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#087747] block">
                    Cadre Opérationnel au PCI
                  </span>
                  <p className="text-xs">
                    Chaque symbole reflète une réalité de terrain : 20 séances annuelles de 4 heures chaque samedi bimensuel, une cotisation statutaire de 10 000 FCFA/an et un encadrement fondé sur l'élévation mutuelle.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onNavigate('membership');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#087747] text-white text-xs font-semibold hover:bg-[#064E35] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Rejoindre le Réseau</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
