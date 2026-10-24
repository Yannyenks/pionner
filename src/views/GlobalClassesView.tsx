import React, { useState } from 'react';
import { PageId, GlobalClass } from '../types';
import { GlobalClassCircleInteractive } from '../components/GlobalClassCircleInteractive';
import { GlobalClassCircleArtwork } from '../components/PciVisualArtwork';
import { StorageService } from '../services/storage';
import { Users, Clock, Calendar, CheckCircle2, MapPin, Sparkles, AlertCircle, Eye } from 'lucide-react';

interface GlobalClassesViewProps {
  onNavigate: (page: PageId) => void;
}

export const GlobalClassesView: React.FC<GlobalClassesViewProps> = ({ onNavigate }) => {
  const classes = StorageService.getClasses();
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');

  const filteredClasses = selectedCityFilter === 'all'
    ? classes
    : classes.filter((c) => c.city.toLowerCase().includes(selectedCityFilter.toLowerCase()));

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Cadre de Vie & d'Entraide
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Les Globales Classes : Le Cœur Vivant du Pionnier Club
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Au PCI, vous n'êtes pas un simple numéro sur une liste d'adhérents. Dès votre admission, vous rejoignez une <strong>Globale Classe de 24 personnes</strong>, un cercle à taille humaine pensé pour favoriser la proximité réelle, la bienveillance et l'efficacité des projets.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Visual Artwork Banner with Constellation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
          <div className="md:col-span-5">
            <GlobalClassCircleArtwork className="w-full shadow-md" />
          </div>
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Structure Fraternelle
            </span>
            <h3 className="font-display text-xl font-bold text-stone-900">
              « 24 personnes regroupées par classe pour s’entraider »
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Les rencontres dans les Globales Classes se tiennent tous les quinze jours, les samedis uniquement, pour une séance de quatre heures (en matinée ou après-midi) avec un encadrement efficace. Tous les services de l'ONG se font dans les Globales Classes.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-3 py-1 bg-emerald-50 text-[#087747] font-semibold rounded-md border border-emerald-200">
                Samedi 4 heures
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 font-semibold rounded-md border border-amber-200">
                Effectif strict : 24 membres
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Constellation Showcase */}
        <div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Modélisation Interactive de la Globale Classe
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Explorez la répartition des rôles fraternels, le rythme des séances et la mutualisation des ressources.
              </p>
            </div>
          </div>

          <GlobalClassCircleInteractive />
        </div>

        {/* Section Explicative Officielle : Pourquoi 24 Personnes ? (Slide 6) */}
        <div className="bg-gradient-to-br from-[#064E35] to-[#087747] text-white rounded-2xl p-8 md:p-10 border border-[#C9A65A]/40 shadow-xl space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block mb-1">
              Principes Fondateurs · Chapitre 6
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Pourquoi Exactement 24 Personnes par Globale Classe ?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Le format de 24 personnes n'est pas le fruit du hasard. C'est le nombre d'or communautaire calibré par les pères fondateurs du PCI pour conjuguer intimité, efficacité et richesse humaine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="font-mono text-xs text-[#C9A65A] font-bold">RÈGLE 01</span>
              <h3 className="font-display font-bold text-sm text-white">Format Optimal</h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Un format ni trop restreint pour stimuler la diversité, ni trop large pour éviter l’anonymat de masse.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="font-mono text-xs text-[#C9A65A] font-bold">RÈGLE 02</span>
              <h3 className="font-display font-bold text-sm text-white">Proximité Réelle</h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Une proximité authentique entre les membres où chacun est connu, écouté et secouru sans intermédiaire.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="font-mono text-xs text-[#C9A65A] font-bold">RÈGLE 03</span>
              <h3 className="font-display font-bold text-sm text-white">Variété des Échanges</h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Une pluralité de parcours, d'expériences professionnelles et d'interactions pour enrichir les débats.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="font-mono text-xs text-[#C9A65A] font-bold">RÈGLE 04</span>
              <h3 className="font-display font-bold text-sm text-white">Souplesse & Mobilité</h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Une flexibilité d'organisation et une meilleure mobilité opérationnelle des membres et de la classe.
              </p>
            </div>
          </div>
        </div>

        {/* Section Officielle : Que fait-on dans une Globale-Classe ? (Slide 4) */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block mb-1">
              Pédagogie & Évolution · Chapitre 4
            </span>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Le Parcours Annuel : 20 Séances & Système de Grades
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Un cycle de progression continu pour devenir un bâtisseur de famille et un leader éclairé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#087747] flex items-center justify-center font-bold">
                20
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">20 Séances par Année</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Les rencontres ont lieu tous les quinze jours, le samedi uniquement (4h). L'assiduité rigoureuse permet d'obtenir des <strong>gratifications officielles et des grades supérieurs</strong> au sein de l'ordre PCI.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#173D6A] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">Résolution de Cas Pratiques</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Développer son leadership familial à travers l'étude de cas réels, travailler avec ses pairs sur les problématiques de foyer et appliquer les acquis à l'extérieur.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-[#C9A65A] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">Club d'Investissement</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Participation active au fond d'épargne productive pour la création de richesse personnelle et l'enrichissement solidaire des 24 membres.
              </p>
            </div>
          </div>
        </div>

        {/* Répertoire des Globales Classes Actives */}
        <div className="bg-[#FAF9F4] rounded-2xl p-8 border border-stone-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-stone-900">
                Répertoire des Classes en Cours
              </h2>
              <p className="text-xs text-stone-600">
                Classes actuellement enregistrées auprès du Bureau National en Côte d'Ivoire.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => setSelectedCityFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCityFilter === 'all' ? 'bg-[#087747] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedCityFilter('cocody')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCityFilter === 'cocody' ? 'bg-[#087747] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cocody
              </button>
              <button
                onClick={() => setSelectedCityFilter('plateau')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCityFilter === 'plateau' ? 'bg-[#087747] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Plateau
              </button>
              <button
                onClick={() => setSelectedCityFilter('yopougon')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCityFilter === 'yopougon' ? 'bg-[#087747] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Yopougon
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClasses.map((gc) => (
              <div
                key={gc.id}
                className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="font-mono text-xs font-bold text-[#087747]">{gc.code}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        gc.status === 'complete'
                          ? 'bg-stone-100 text-stone-700'
                          : gc.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {gc.status === 'complete' ? 'Classe Complète' : gc.status === 'active' ? 'Active' : 'En constitution'}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-bold text-stone-900 mt-3">{gc.name}</h4>
                  <div className="mt-2 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{gc.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Créneau : {gc.sessionTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>Délégué : {gc.leaderName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Effectif : <strong>{gc.currentMembersCount}</strong> / {gc.maxCapacity} membres
                  </span>
                  <button
                    onClick={() => onNavigate('membership')}
                    className="text-xs font-semibold text-[#087747] hover:underline cursor-pointer"
                  >
                    Demander cette classe →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
