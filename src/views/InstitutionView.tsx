import React from 'react';
import { PageId } from '../types';
import { OFFICIAL_PCI_INFO } from '../data/mockData';
import { PciNationalCrestArtwork, LeadershipAssemblyArtwork } from '../components/PciVisualArtwork';
import { Shield, Target, Compass, Award, Building, Globe2, ChevronRight, CheckCircle2, Eye } from 'lucide-react';

interface InstitutionViewProps {
  onNavigate: (page: PageId) => void;
}

export const InstitutionView: React.FC<InstitutionViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header en Vert Institutionnel Profond */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Organisation & Gouvernance
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Notre Institution : Bâtir des Communautés Fortes Autour de la Famille
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Le Pionnier Club International (PCI) trouve sa genèse dans la volonté de restaurer les équilibres fondamentaux de nos sociétés à travers l'éducation, la responsabilité parentale, l'entraide financière et la fraternité vécue au quotidien.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Compositions Officielles & Présentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <PciNationalCrestArtwork className="w-full min-h-[380px] shadow-xl" />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
                Cadre Statutaire & Fondements
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Une Organisation de Droit Ivoirien à Vocation Internationale
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Le Pionnier Club International est issu de l'<strong>Association Les Pionniers de la Famille Nouvelle</strong>. L'organisation est constituée conformément au cadre législatif régissant les associations en République de Côte d'Ivoire.
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Chaque adhésion (10 000 FCFA/an) ouvre le droit d'appartenance à une Globale Classe de 24 personnes où sont dispensés les cycles de formation morale et parentale, et où sont activés les mécanismes de soutien économique mutuel.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <span className="font-bold text-[#087747] block">Spécificité du Modèle PCI</span>
              <p>
                <strong>ONG d’Éducation & de Culture :</strong> Le PCI se distingue fondamentalement des ONG purement caritatives. Il fonctionne selon le modèle rigoureux des grands clubs-services internationaux (à l'instar du Lion's Club et du Rotary Club), axé sur la transmission du leadership et l'autonomie pérenne des membres.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Blocs Officiels des Diapositives : Pourquoi nous existons & À qui nous nous adressons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slide 2 : Pourquoi nous existons ? */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <span className="text-[10px] font-mono font-bold text-[#087747] uppercase">Chapitre 02</span>
              <span className="text-xs font-semibold text-stone-500">Doctrine Officielle</span>
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Pourquoi nous existons ?
            </h3>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Apporter aux populations un <strong>soulagement et un soutien</strong> lorsqu’elles sont seules et désemparées.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Offrir un appui, quel que soit l’âge, lorsque la personne ne bénéficie pas du soutien attendu d’une <strong>famille unie</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Favoriser le développement personnel par <strong>l’éducation au leadership</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Encourager <strong>l’enrichissement solidaire</strong> et le bien-être partagé.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Créer un réseau de Pionniers fondé sur la convivialité, la fraternité et la solidarité.</span>
              </li>
            </ul>
          </div>

          {/* Slide 3 : À qui nous nous adressons ? */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <span className="text-[10px] font-mono font-bold text-[#087747] uppercase">Chapitre 03</span>
              <span className="text-xs font-semibold text-stone-500">Critères d'Admissibilité</span>
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              À qui nous nous adressons ?
            </h3>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>À toutes les personnes, <strong>hommes ou femmes, majeures jusqu’à 77 ans</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Savoir au moins <strong>lire et écrire</strong> de préférence pour assimiler les enseignements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Être à même d’apporter ce que l’on possède : <strong>cotisations, conseils, expériences, connaissances ou expertise</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <span>Contribuer collectivement à la <strong>croissance et au rayonnement</strong> du réseau Pionnier Club.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: Organisation & Organigramme fonctionnel */}
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Architecture des Instances
            </span>
            <h3 className="font-display text-2xl font-bold text-stone-900">
              Structure & Gouvernance Opérationnelle
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#087747] font-bold">Niveau 1</span>
              <h4 className="font-display text-base font-bold text-stone-900">Bureau International</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Définit la vision globale, veille à la conformité des programmes pédagogiques des 5 Arbres et supervise l'expansion et la coordination entre pays.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#087747] font-bold">Niveau 2</span>
              <h4 className="font-display text-base font-bold text-stone-900">Bureau National (Côte d’Ivoire)</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pilote le déploiement sur le territoire ivoirien, gère l'instruction des dossiers d'adhésion, la délivrance des cartes officielles et la charte des partenaires.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#087747] font-bold">Niveau 3</span>
              <h4 className="font-display text-base font-bold text-stone-900">Les Globales Classes</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cellules vivantes de 24 membres animées par un Délégué de Classe. C'est le lieu d'exercice effectif de la fraternité, de l'apprentissage et de l'épargne solidaire.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Ambitions Internationales — EN VERT INSTITUTIONNEL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#064E35] to-[#087747] text-white p-8 md:p-12 rounded-2xl border border-[#C9A65A]/40 shadow-xl">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A65A] font-semibold">
              <Globe2 className="w-4 h-4" />
              <span>Horizon & Rayonnement</span>
            </div>
            <h3 className="font-display text-2xl font-bold">
              Implantation Actuelle & Déploiement Sous-Régional
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Actuellement déployé avec dynamisme dans plusieurs communes d'Abidjan (Cocody, Plateau, Yopougon, Riviera), le Pionnier Club International prépare méthodiquement son essaimage dans les villes de l'intérieur de la Côte d'Ivoire et auprès des diasporas africaines désireuses d'implanter le modèle de la Globale Classe dans leur pays de résidence.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => onNavigate('membership')}
              className="w-full py-3 px-4 text-xs uppercase tracking-widest font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-lg shadow-sm transition-colors text-center cursor-pointer"
            >
              Postuler comme membre
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3 px-4 text-xs uppercase tracking-widest font-semibold text-white border border-white/30 hover:border-white rounded-lg transition-colors text-center cursor-pointer"
            >
              Contacter le Bureau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
