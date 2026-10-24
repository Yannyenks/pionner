import React, { useState } from 'react';
import { Users, Clock, ShieldCheck, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface MemberSeat {
  id: number;
  label: string;
  role: string;
  duty: string;
}

export const GlobalClassCircleInteractive: React.FC = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'circle' | 'schedule' | 'investment'>('circle');

  // 24 members definition
  const seats: MemberSeat[] = Array.from({ length: 24 }, (_, i) => {
    const id = i + 1;
    let role = 'Membre Fraternel';
    let duty = 'Participation active aux exposés, solidarité d’entraide et contribution au club d’investissement.';

    if (id === 1) {
      role = 'Délégué Principal de Classe';
      duty = 'Coordination fraternelle, accueil bienveillant et liaison avec le Bureau National.';
    } else if (id === 7) {
      role = 'Délégué aux Cinq Arbres';
      duty = 'Animation pédagogique des exposés sur le Leadership Familial et suivi des thèmes moraux.';
    } else if (id === 13) {
      role = 'Délégué Investissement & Entraide';
      duty = 'Tenue du registre d’enrichissement solidaire et suivi des projets mutuels.';
    } else if (id === 19) {
      role = 'Délégué Convivialité & Écoute';
      duty = 'Organisation des moments fraternels et veille bienveillante sur les situations de détresse.';
    }

    return {
      id,
      label: `Siège ${id < 10 ? '0' + id : id}`,
      role,
      duty,
    };
  });

  const currentSeat = seats.find((s) => s.id === selectedSeat) || seats[0];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-6 py-4 bg-[#064E35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#C9A65A] font-semibold block">
            Architecture Communautaire
          </span>
          <h3 className="font-display text-lg font-bold">
            La Globale Classe : Cellule de 24 Membres Interconnectés
          </h3>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-black/20 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('circle')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'circle' ? 'bg-[#FAF9F4] text-[#064E35] font-semibold shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Le Cercle des 24
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'schedule' ? 'bg-[#FAF9F4] text-[#064E35] font-semibold shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Séance de 4 Heures
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'investment' ? 'bg-[#FAF9F4] text-[#064E35] font-semibold shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Investissement
          </button>
        </div>
      </div>

      {/* Main body */}
      <div className="p-6 md:p-8">
        {activeTab === 'circle' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive SVG Constellation Circle */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center p-4">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Outer delicate guide rings */}
                  <circle cx="200" cy="200" r="160" fill="none" stroke="#E7E5E4" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="110" fill="none" stroke="#C9A65A" strokeOpacity="0.25" strokeWidth="1" />

                  {/* Interconnection network lines to central focus */}
                  {seats.map((seat, i) => {
                    const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
                    const x = 200 + Math.cos(angle) * 160;
                    const y = 200 + Math.sin(angle) * 160;
                    const isSelected = selectedSeat === seat.id;

                    return (
                      <line
                        key={`line-${seat.id}`}
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke={isSelected ? '#087747' : '#D6D3D1'}
                        strokeWidth={isSelected ? 2 : 0.75}
                        strokeOpacity={isSelected ? 0.9 : 0.35}
                      />
                    );
                  })}

                  {/* Central Symbol Hub */}
                  <circle cx="200" cy="200" r="48" fill="#FAF9F4" stroke="#087747" strokeWidth="2" />
                  <circle cx="200" cy="200" r="42" fill="#064E35" />
                  <text x="200" y="196" textAnchor="middle" fill="#C9A65A" fontSize="18" fontFamily="Cinzel, serif" fontWeight="bold">
                    PCI
                  </text>
                  <text x="200" y="214" textAnchor="middle" fill="#FFFFFF" fontSize="9" letterSpacing="1">
                    24 MEMBRES
                  </text>

                  {/* 24 interactive seat nodes */}
                  {seats.map((seat, i) => {
                    const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
                    const x = 200 + Math.cos(angle) * 160;
                    const y = 200 + Math.sin(angle) * 160;
                    const isSelected = selectedSeat === seat.id;
                    const isOfficer = seat.id === 1 || seat.id === 7 || seat.id === 13 || seat.id === 19;

                    return (
                      <g
                        key={`node-${seat.id}`}
                        onClick={() => setSelectedSeat(seat.id)}
                        className="cursor-pointer transition-transform hover:scale-125"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 15 : isOfficer ? 13 : 10}
                          fill={isSelected ? '#087747' : isOfficer ? '#C9A65A' : '#FFFFFF'}
                          stroke={isSelected ? '#C9A65A' : isOfficer ? '#064E35' : '#78716C'}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                        />
                        <text
                          x={x}
                          y={y + 3.5}
                          textAnchor="middle"
                          fill={isSelected || isOfficer ? '#FFFFFF' : '#44403C'}
                          fontSize={isSelected ? '10' : '9'}
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {seat.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-500 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#C9A65A] inline-block" />
                  <span>Délégués thématiques</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white border border-stone-400 inline-block" />
                  <span>Pairs fraternels</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#087747] inline-block" />
                  <span>Siège sélectionné</span>
                </div>
              </div>
            </div>

            {/* Selected Member Detail Card */}
            <div className="lg:col-span-5 bg-[#FAF9F4] rounded-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold font-mono">
                  {currentSeat.label} / 24
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-stone-300 text-stone-700 font-medium">
                  Globale Classe
                </span>
              </div>

              <div className="mt-4">
                <h4 className="font-display text-lg font-bold text-stone-900">
                  {currentSeat.role}
                </h4>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  {currentSeat.duty}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                  <span><strong>Rythme :</strong> Un samedi sur deux, session de 4 heures encadrée.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700">
                  <Heart className="w-4 h-4 text-[#C9A65A] shrink-0 mt-0.5" />
                  <span><strong>Principe :</strong> Entraide mutuelle, écoute discrète et zéro jugement.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700">
                  <Users className="w-4 h-4 text-[#173D6A] shrink-0 mt-0.5" />
                  <span><strong>Taille fixe :</strong> 24 personnes pour préserver la proximité et l'efficacité.</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setSelectedSeat((currentSeat.id % 24) + 1)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#087747] bg-white hover:bg-emerald-50 rounded-lg border border-[#087747]/30 transition-colors cursor-pointer"
                >
                  <span>Examiner le siège suivant ({((currentSeat.id % 24) + 1)})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h4 className="font-display text-lg font-bold text-stone-900">
                Déroulement d'une Séance Bimensuelle de 4 Heures
              </h4>
              <p className="mt-1 text-xs text-stone-600">
                Les rencontres se tiennent le samedi matin (08h30 - 12h30) ou après-midi (14h00 - 18h00), garantissant un encadrement structuré et un investissement humain de qualité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF9F4] border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#087747] font-mono">01h00</span>
                  <Sparkles className="w-4 h-4 text-[#C9A65A]" />
                </div>
                <h5 className="font-semibold text-xs text-stone-900">Exposé des 5 Arbres</h5>
                <p className="mt-1 text-[11px] text-stone-600 leading-normal">
                  Formation magistrale et interactive sur l'un des piliers du Leadership Familial (Fraternité, Solidarité, Fidélité, Dignité ou Foi).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F4] border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#087747] font-mono">01h00</span>
                  <Heart className="w-4 h-4 text-emerald-600" />
                </div>
                <h5 className="font-semibold text-xs text-stone-900">Partages & Écoute</h5>
                <p className="mt-1 text-[11px] text-stone-600 leading-normal">
                  Tours de parole fraternels où chaque membre peut exprimer ses défis de vie, ses réussites et solliciter l'avis bienveillant du cercle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F4] border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#087747] font-mono">01h00</span>
                  <ShieldCheck className="w-4 h-4 text-[#173D6A]" />
                </div>
                <h5 className="font-semibold text-xs text-stone-900">Club d'Investissement</h5>
                <p className="mt-1 text-[11px] text-stone-600 leading-normal">
                  Point économique : bilan des cotisations volontaires, validation des aides solidaires et examen des projets d'auto-suffisance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F4] border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#087747] font-mono">01h00</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <h5 className="font-semibold text-xs text-stone-900">Convivialité & Réseau</h5>
                <p className="mt-1 text-[11px] text-stone-600 leading-normal">
                  Échanges informels, collation fraternelle et mise en relation professionnelle pour concrétiser la carte de réduction du coût de la vie.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <h4 className="font-display text-lg font-bold text-stone-900">
                Enrichissement Solidaire par le Regroupement
              </h4>
              <p>
                Le Pionnier Club International n'est pas une simple tribune de débats : c'est un club-service agissant. Chaque Globale Classe dispose de la faculté d'activer son <strong>Club d'Investissement Solidaire</strong>.
              </p>
              <p>
                Les fonds réunis permettent de financer à taux zéro ou très réduit des projets concrets des membres (équipement professionnel, démarrage d'activité, approvisionnement groupé) sous la caution solidaire des 24 pairs.
              </p>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                « Tous les services offerts par l'ONG se font dans les Globales Classes. L'inscription automatique dans une classe valide votre adhésion. »
              </div>
            </div>

            <div className="p-6 rounded-xl bg-stone-900 text-white space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A65A] font-semibold block">
                Conditions Officielles Vérifiées
              </span>
              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span>Tranche d'âge éligible</span>
                  <span className="font-bold text-white">21 à 77 ans</span>
                </li>
                <li className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span>Carte d'adhésion annuelle</span>
                  <span className="font-bold text-[#C9A65A]">10 000 FCFA / an</span>
                </li>
                <li className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span>Effectif strict par classe</span>
                  <span className="font-bold text-white">24 membres</span>
                </li>
                <li className="flex items-center justify-between pb-1">
                  <span>Fréquence des séances</span>
                  <span className="font-bold text-white">Bimensuelle (Samedi 4h)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
