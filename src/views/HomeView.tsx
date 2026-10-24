import React, { useState } from 'react';
import { PageId } from '../types';
import { PciEmblem3D } from '../components/PciEmblem3D';
import { GlobalClassCircleInteractive } from '../components/GlobalClassCircleInteractive';
import { OFFICIAL_PCI_INFO, FIVE_TREES_VALUES } from '../data/mockData';
import { StorageService } from '../services/storage';
import { Lightbox } from '../components/Lightbox';
import { OfficialPresentationViewer } from '../components/OfficialPresentationViewer';
import { PioneerCreedInteractive } from '../components/PioneerCreedInteractive';
import {
  LeadershipAssemblyArtwork,
  FamilyLeadershipTreeArtwork,
  SolidarityInvestmentArtwork,
  PciNationalCrestArtwork,
  GlobalClassCircleArtwork,
} from '../components/PciVisualArtwork';
import { ArrowRight, Shield, Award, Users, BookOpen, Heart, TrendingUp, Calendar, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const news = StorageService.getNews().slice(0, 3);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; caption: string } | null>(null);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION — EN VERT INSTITUTIONNEL MAJESTUEUX */}
      <section className="relative pt-12 md:pt-16 pb-16 overflow-hidden bg-gradient-to-b from-[#064E35] via-[#087747] to-[#064E35] text-white border-b border-[#087747]">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full border border-[#C9A65A]/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Quiet institutional kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C9A65A]/50 text-xs font-semibold text-[#C9A65A] tracking-wider uppercase">
                <span>Bureau International PCI</span>
                <span aria-hidden="true">·</span>
                <span>Club-Service Solidaire</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance">
                Former des leaders. Renforcer les liens. <span className="text-[#C9A65A]">Construire l’avenir.</span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100 leading-relaxed max-w-2xl text-balance">
                Pionnier Club International est un réseau engagé dans l’éducation, le leadership, la fraternité et la solidarité, qui encourage l’épanouissement individuel et le développement partagé.
              </p>

              {/* Actions row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('membership')}
                  className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-widest font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Rejoindre le Réseau</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('institution')}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Découvrir notre institution</span>
                </button>
              </div>

              {/* Verified Institutional Highlights Strip */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="block font-mono text-[11px] text-[#C9A65A] uppercase tracking-widest">Adhésion</span>
                  <span className="font-display font-bold text-base text-white">10 000 FCFA</span>
                  <span className="block text-[11px] text-emerald-200">Carte annuelle</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="block font-mono text-[11px] text-[#C9A65A] uppercase tracking-widest">Public</span>
                  <span className="font-display font-bold text-base text-white">21 à 77 ans</span>
                  <span className="block text-[11px] text-emerald-200">Hommes & Femmes</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="block font-mono text-[11px] text-[#C9A65A] uppercase tracking-widest">Classe</span>
                  <span className="font-display font-bold text-base text-white">24 Membres</span>
                  <span className="block text-[11px] text-emerald-200">Cadre d'entraide</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="block font-mono text-[11px] text-[#C9A65A] uppercase tracking-widest">Séances</span>
                  <span className="font-display font-bold text-base text-white">Samedi 4h</span>
                  <span className="block text-[11px] text-emerald-200">Tous les 15 jours</span>
                </div>
              </div>
            </div>

            {/* Right column: Interactive 3D PCI Emblem */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[440px] aspect-square rounded-2xl bg-gradient-to-b from-white/10 to-black/20 p-2 border border-[#C9A65A]/40 shadow-xl relative backdrop-blur-xs">
                <PciEmblem3D className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION INSTITUTIONNELLE AVEC ARTWORK DU LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Artwork Officiel de l'Assemblée des Leaders */}
          <div className="lg:col-span-5">
            <LeadershipAssemblyArtwork className="w-full min-h-[380px] shadow-xl" />
          </div>

          {/* Right: Text and Key Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
                Qui Sommes-Nous
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Le Club Service Qui Construit la Famille
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Le Pionnier Club International réunit des personnes soucieuses d'excellence morale, éducative et matérielle. Loin d'une simple association de loisirs, le PCI structure une communauté engagée dans le renforcement de la cellule familiale et l’élévation sociale mutuelle.
              </p>
            </div>

            {/* Encadré officiel en vert forêt */}
            <div className="p-6 rounded-2xl bg-[#064E35] text-white border border-[#087747] shadow-sm space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A65A] font-semibold block">
                Devise & Signature Officielle
              </span>
              <p className="font-display text-base italic text-emerald-100">
                « Un réseau fondé sur le leadership, la fraternité, la solidarité et le développement partagé. »
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-300">
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-medium">Association de droit ivoirien</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-medium">Orientation internationale</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <Shield className="w-5 h-5 text-[#087747]" />
                <h3 className="font-display text-sm font-bold text-stone-900">Leadership Intègre</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Former des hommes et femmes capables d'inspirer leurs foyers et leurs milieux professionnels.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <BookOpen className="w-5 h-5 text-[#173D6A]" />
                <h3 className="font-display text-sm font-bold text-stone-900">Éducation Familiale</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Enseignement régulier sur les Cinq Arbres pour stabiliser les valeurs parentales et conjugales.
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('institution')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
              >
                <span>Lire la charte et la gouvernance institutionnelle</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: PLAQUETTE OFFICIELLE INTERACTIVE (7 CHAPITRES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
            Doctrine & Cadre Statutaire
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Guide de Présentation Officielle du PCI
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Feuilletez les sept chapitres fondamentaux de l'organisation : mission, vocation, profil des membres et règles d'or.
          </p>
        </div>

        <OfficialPresentationViewer />
      </section>

      {/* SECTION 3: LES GLOBALES CLASSES (INTERACTIVE DIAGRAM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
            Cadre d'Appartenance Exclusif
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Les Globales Classes : 24 Membres Pour S’Entraider
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Tous les services de l'ONG se déroulent au sein des Globales Classes. Chaque nouvelle adhésion donne lieu à une affectation dans une classe de 24 membres.
          </p>
        </div>

        <GlobalClassCircleInteractive />
      </section>

      {/* SECTION 4: LES CINQ ARBRES DU LEADERSHIP FAMILIAL — EN VERT FORÊT */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#043322] text-white py-16 border-y border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
                Programme Éducatif Central
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Les Cinq Arbres du Leadership Familial
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-xl">
                Cinq vertus cardinales enseignées par exposés fraternels lors des rencontres du samedi pour restaurer des valeurs en péril.
              </p>
            </div>
            <button
              onClick={() => onNavigate('values')}
              className="text-xs font-bold text-[#C9A65A] hover:underline self-start md:self-auto cursor-pointer flex items-center gap-1.5"
            >
              <span>Consulter le cycle complet des valeurs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_TREES_VALUES.map((tree, idx) => (
              <div
                key={tree.id}
                className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/15 flex flex-col justify-between hover:border-[#C9A65A] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-xs text-[#C9A65A] font-bold">0{idx + 1}</span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-medium">PCI</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mt-3">{tree.name}</h3>
                  <p className="text-[11px] font-medium text-[#C9A65A] mt-1">{tree.subtitle}</p>
                  <p className="text-xs text-stone-200 mt-3 leading-relaxed">{tree.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-[10px] text-emerald-200 italic">{tree.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4.5: LE MANIFESTE DU PIONNIER (POURQUOI JE SUIS PIONNIER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PioneerCreedInteractive />
      </section>

      {/* SECTION 5: COMPOSITIONS VISUELLES & PATRIMOINE DU PCI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Patrimoine & Doctrine Visuelle
            </span>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Compositions Visuelles & Symbolique Officielle du PCI
            </h2>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
          >
            Explorer la galerie institutionnelle →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sceau et Armoiries Nationales & Internationales */}
          <div className="flex flex-col h-full">
            <PciNationalCrestArtwork className="h-full min-h-[340px]" />
          </div>

          {/* Card 2: Les Cinq Arbres du Leadership Familial */}
          <div className="flex flex-col h-full">
            <FamilyLeadershipTreeArtwork className="h-full min-h-[340px]" />
          </div>

          {/* Card 3: Clubs d'Investissement & Réduction du Coût de la Vie */}
          <div className="flex flex-col h-full">
            <SolidarityInvestmentArtwork className="h-full min-h-[340px]" />
          </div>
        </div>
      </section>

      {/* SECTION 6: DERNIÈRES ACTUALITÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Vie de l'Organisation
            </span>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Actualités & Communiqués Officiels
            </h2>
          </div>
          <button
            onClick={() => onNavigate('news')}
            className="text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
          >
            Toutes les publications →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-[#087747]/30 transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                  <span className="font-semibold text-[#087747]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display text-base font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">{item.author}</span>
                <button
                  onClick={() => onNavigate('news')}
                  className="text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
                >
                  Lire la suite →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 7: APPEL À L'ENGAGEMENT (CTA) — EN VERT FORÊT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#064E35] via-[#087747] to-[#064E35] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl border border-[#C9A65A]/40">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full border border-[#C9A65A]/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Adhésion & Intégration
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Prenez Part à une Aventure Humaine & Fraternelle Hors du Commun
            </h2>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              La carte d'adhésion annuelle de 10 000 FCFA vous ouvre l'accès immédiat à une Globale Classe de 24 membres, aux cycles d’enseignement sur le leadership familial et aux partenariats pour réduire le coût de la vie.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('membership')}
                className="px-8 py-3.5 text-xs uppercase tracking-widest font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-lg transition-all shadow-md cursor-pointer text-center"
              >
                Déposer sa candidature en ligne
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-white hover:text-stone-100 border border-white/30 hover:border-white rounded-lg transition-all text-center cursor-pointer"
              >
                Poser une question au secrétariat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for selected photo */}
      {selectedPhoto && (
        <Lightbox
          isOpen={true}
          imageUrl={selectedPhoto.url}
          title={selectedPhoto.title}
          caption={selectedPhoto.caption}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};
