import React from 'react';

// 1. Visuel Institutionnel : Grande Assemblée du Leadership
export const LeadershipAssemblyArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064E35] via-[#087747] to-[#043322] flex items-center justify-center p-6 text-white border border-[#C9A65A]/40 shadow-lg ${className}`}>
      {/* Background architectural arches and ambient glow */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 600 400" preserveAspectRatio="none">
        <defs>
          <radialGradient id="archGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C9A65A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#087747" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill="url(#archGlow)" />
        {/* Architectural Pillars & Arches */}
        <path d="M50 400 V 120 Q 300 30 550 120 V 400" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M120 400 V 160 Q 300 80 480 160 V 400" fill="none" stroke="#C9A65A" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="300" y1="40" x2="300" y2="400" stroke="#C9A65A" strokeWidth="0.75" strokeDasharray="4 4" strokeOpacity="0.4" />
      </svg>

      {/* Main Visual Composition */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm space-y-4 py-8">
        {/* Heraldic Medallion with Laurel */}
        <div className="relative w-24 h-24 rounded-full border-2 border-[#C9A65A] bg-[#064E35]/90 flex items-center justify-center shadow-xl">
          <svg className="w-16 h-16" viewBox="0 0 100 100">
            {/* Laurel Wreath */}
            <path
              d="M30 75 C 20 60, 20 40, 32 25 C 34 32, 38 38, 42 42 C 34 48, 30 60, 30 75 Z"
              fill="#C9A65A"
              opacity="0.9"
            />
            <path
              d="M70 75 C 80 60, 80 40, 68 25 C 66 32, 62 38, 58 42 C 66 48, 70 60, 70 75 Z"
              fill="#C9A65A"
              opacity="0.9"
            />
            {/* Central P */}
            <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="38" fontFamily="Cinzel, serif" fontWeight="bold">
              P
            </text>
          </svg>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A65A] uppercase font-bold block">
            Vision & Leadership Partagé
          </span>
          <h4 className="font-display text-lg font-bold text-white tracking-wide">
            L'Assemblée des Leaders Bâtisseurs
          </h4>
          <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xs">
            Un réseau d’hommes et de femmes engagés pour l’élévation morale, familiale et économique de leurs communautés.
          </p>
        </div>

        {/* 3 Pillars Chips */}
        <div className="flex items-center gap-2 pt-2">
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] text-white font-medium border border-white/10">
            Éducation
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] text-white font-medium border border-white/10">
            Fraternité
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] text-white font-medium border border-white/10">
            Solidarité
          </span>
        </div>
      </div>
    </div>
  );
};

// 2. Visuel Pédagogique : Les Cinq Arbres du Leadership Familial
export const FamilyLeadershipTreeArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064E35] via-[#087747] to-[#171B18] p-8 text-white border border-[#C9A65A]/40 shadow-lg ${className}`}>
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-[#C9A65A] flex items-center justify-center text-[#C9A65A] shadow-inner">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 8H9L12 2Z" fill="#C9A65A" fillOpacity="0.4" />
            <path d="M12 7L17 14H7L12 7Z" fill="#C9A65A" fillOpacity="0.6" />
            <path d="M12 12L19 20H5L12 12Z" fill="#C9A65A" fillOpacity="0.8" />
            <path d="M12 20V22" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A65A] uppercase font-bold block">
            Doctrine Fondatrice
          </span>
          <h4 className="font-display text-xl font-bold text-white">
            L'Arbre Maître du Leadership Familial
          </h4>
          <p className="text-xs text-stone-200 leading-relaxed max-w-sm">
            Enraciné dans la dignité et la foi, déployant ses branches de fraternité, solidarité et fidélité pour stabiliser chaque foyer.
          </p>
        </div>

        {/* The 5 branches badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-md pt-2 text-[11px]">
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-center font-medium">
            1. Fraternité
          </div>
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-center font-medium">
            2. Solidarité
          </div>
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-center font-medium">
            3. Fidélité
          </div>
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-center font-medium">
            4. Dignité
          </div>
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-center font-medium col-span-2 sm:col-span-1">
            5. Foi
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Visuel Communautaire : Le Cercle Sacré des 24 Membres
export const GlobalClassCircleArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-stone-900 text-white p-8 border border-[#087747]/40 shadow-lg ${className}`}>
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Animated Constellation Symbol */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#087747" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A65A" strokeWidth="1" strokeOpacity="0.6" />
            
            {/* 24 surrounding nodes */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
              const x = 100 + Math.cos(angle) * 85;
              const y = 100 + Math.sin(angle) * 85;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#C9A65A"
                  stroke="#FFFFFF"
                  strokeWidth="0.75"
                />
              );
            })}

            {/* Central hub */}
            <circle cx="100" cy="100" r="32" fill="#064E35" stroke="#C9A65A" strokeWidth="2" />
            <text x="100" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="Cinzel, serif" fontWeight="bold">
              PCI
            </text>
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A65A] uppercase font-bold block">
            Cadre d'Appartenance · 24 Personnes
          </span>
          <h4 className="font-display text-xl font-bold text-white">
            La Globale Classe en Constellation
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
            Un cercle intime, protecteur et agissant où personne n’est laissé de côté et où chacun enrichit le groupe de ses compétences.
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. Visuel Économique & Solidaire : Mutualisation & Clubs d'Investissement
export const SolidarityInvestmentArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#173D6A] via-[#064E35] to-[#171B18] text-white p-8 border border-stone-700 shadow-lg ${className}`}>
      <div className="flex flex-col items-center text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-[#C9A65A] flex items-center justify-center text-[#C9A65A]">
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A65A] uppercase font-bold block">
            Autonomie & Prospérité
          </span>
          <h4 className="font-display text-xl font-bold text-white">
            Clubs d'Investissement & Réduction du Coût de la Vie
          </h4>
          <p className="text-xs text-stone-200 leading-relaxed max-w-sm">
            Mutualisation des capacités d’épargne, création de revenus passifs et conventions d'avantages économiques négociées auprès de partenaires agrées.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#C9A65A]">
          <span>Carte Annuelle : 10 000 FCFA</span>
        </div>
      </div>
    </div>
  );
};

// 5. Visuel Emblématique : Sceau et Armoiries du Bureau National & International
export const PciNationalCrestArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064E35] via-[#087747] to-[#043322] p-8 text-white border border-[#C9A65A]/50 shadow-xl ${className}`}>
      {/* Subtle guilloche patterned background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#C9A65A" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#FFFFFF" strokeWidth="0.75" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#C9A65A" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-5">
        {/* Heraldic Shield */}
        <div className="relative w-28 h-28 rounded-full border-2 border-[#C9A65A] bg-[#043322] flex items-center justify-center shadow-2xl">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            {/* Laurel Wreath */}
            <path
              d="M25 78 C 12 60, 12 36, 28 20 C 30 28, 35 35, 40 40 C 30 46, 25 60, 25 78 Z"
              fill="#C9A65A"
            />
            <path
              d="M75 78 C 88 60, 88 36, 72 20 C 70 28, 65 35, 60 40 C 70 46, 75 60, 75 78 Z"
              fill="#C9A65A"
            />
            {/* Star at crown */}
            <polygon points="50,14 53,21 61,22 55,27 57,35 50,31 43,35 45,27 39,22 47,21" fill="#C9A65A" />
            {/* Monogram P */}
            <text x="50" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="38" fontFamily="Cinzel, Georgia, serif" fontWeight="bold">
              P
            </text>
          </svg>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-[#C9A65A] uppercase font-bold block">
            Bureau International & National
          </span>
          <h4 className="font-display text-lg font-bold text-white">
            Armoiries & Sceau d'Honneur PCI
          </h4>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-xs">
            « Un réseau fondé sur le leadership, la fraternité, la solidarité et le développement partagé. »
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-2 text-[10px]">
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-100 font-medium border border-white/10">
            Droit Ivoirien
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-100 font-medium border border-white/10">
            Rayonnement International
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#C9A65A]/20 text-[#C9A65A] font-bold border border-[#C9A65A]/40">
            10 000 FCFA/an
          </span>
        </div>
      </div>
    </div>
  );
};
