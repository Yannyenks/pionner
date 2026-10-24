import React, { useState } from 'react';
import { PageId } from '../types';
import { OFFICIAL_PCI_INFO } from '../data/mockData';
import { Phone, Mail, MapPin, Globe, Shield, MessageCircle, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'mentions' | 'confidentialite' | 'conditions' | null>(null);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171B18] text-[#FAF9F4] border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800">
          {/* Col 1: Identity & Crest */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#C9A65A]/80 bg-[#064E35] flex items-center justify-center shadow-inner">
                <span className="font-display font-bold text-2xl text-[#C9A65A]">P</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block tracking-wide">
                  PIONNIER CLUB
                </span>
                <span className="text-xs text-[#C9A65A] tracking-widest uppercase block font-medium">
                  International
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Association Les Pionniers de la Famille Nouvelle — Bureau International. Un club-service fondé sur le leadership, la fraternité, la solidarité et le développement partagé.
            </p>

            <div className="pt-2">
              <a
                href={OFFICIAL_PCI_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Assistance WhatsApp Officielle</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Institutionnelle */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#C9A65A] font-semibold mb-4">
              Institution & Valeurs
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('institution')} className="hover:text-white transition-colors cursor-pointer">
                  Qui sommes-nous & Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('values')} className="hover:text-white transition-colors cursor-pointer">
                  Les Cinq Arbres du Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('global-classes')} className="hover:text-white transition-colors cursor-pointer">
                  Le cadre des Globales Classes (24 membres)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('actions')} className="hover:text-white transition-colors cursor-pointer">
                  Clubs d'Investissement & Pouvoir d'Achat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Archives & Photographies du Club
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Adhésion & Espace Membre */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#C9A65A] font-semibold mb-4">
              Engagement & Accès
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('membership')} className="hover:text-white transition-colors cursor-pointer">
                  Formulaire d'Adhésion (21 à 77 ans)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('membership')} className="hover:text-white transition-colors cursor-pointer">
                  Suivi du statut de candidature
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('member-portal')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>Portail Membres Privé</span>
                  <span className="text-[10px] text-stone-500 font-mono">(Sécurisé)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-stone-500 hover:text-stone-300">
                  <Shield className="w-3 h-3 text-[#C9A65A]" />
                  <span>Administration (Bureau)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news')} className="hover:text-white transition-colors cursor-pointer">
                  Communiqués & Ordre du jour
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Coordonnées officielles vérifiées */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#C9A65A] font-semibold mb-4">
              Coordonnées Officielles
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A65A] shrink-0 mt-0.5" />
                <span>{OFFICIAL_PCI_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A65A] shrink-0" />
                <a href={`tel:${OFFICIAL_PCI_INFO.phone}`} className="hover:text-white transition-colors">
                  {OFFICIAL_PCI_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A65A] shrink-0" />
                <a href={`mailto:${OFFICIAL_PCI_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {OFFICIAL_PCI_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C9A65A] shrink-0" />
                <span>{OFFICIAL_PCI_INFO.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with legal links and official signature */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="font-sans italic text-center md:text-left text-stone-300">
            « Pionnier Club International — Le leadership au service de la fraternité et du développement partagé. »
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <button
              onClick={() => setLegalModal('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setLegalModal('confidentialite')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Politique de Confidentialité
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setLegalModal('conditions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Conditions d'Adhésion
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-[#FAF9F4] text-[#171B18] max-w-2xl w-full rounded-xl shadow-2xl border border-stone-300 p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-display text-lg font-bold text-[#087747]">
                {legalModal === 'mentions' && 'Mentions Légales & Cadre Institutionnel'}
                {legalModal === 'confidentialite' && 'Politique de Confidentialité & Protection des Données'}
                {legalModal === 'conditions' && 'Conditions Générales d’Adhésion & Statuts'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                aria-label="Fermer la modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs leading-relaxed text-stone-700">
              {legalModal === 'mentions' && (
                <>
                  <p>
                    <strong>Dénomination officielle :</strong> Pionnier Club International (PCI) — émanant de l'Association Les Pionniers de la Famille Nouvelle.
                  </p>
                  <p>
                    <strong>Statut :</strong> Organisation de type club-service à vocation éducative, sociale et de développement partagé, relevant du droit associatif ivoirien, sous réserve de compléments administratifs officiels.
                  </p>
                  <p>
                    <strong>Siège & Contact :</strong> Abidjan, Côte d'Ivoire. Téléphone vérifié : +225 0500671912. Courriel : Pionnierclub.international@gmail.com.
                  </p>
                  <p>
                    <strong>Direction de la publication :</strong> Bureau International Pionnier Club.
                  </p>
                </>
              )}

              {legalModal === 'confidentialite' && (
                <>
                  <p>
                    Le Pionnier Club International s'engage à protéger l'intégrité et la confidentialité des informations personnelles soumises par les candidats et les membres.
                  </p>
                  <p>
                    <strong>Collecte :</strong> Les données requises lors de la candidature (nom, téléphone, ville, tranche d'âge, motivations) servent exclusivement à l'instruction des dossiers d'adhésion et à l'affectation au sein des Globales Classes.
                  </p>
                  <p>
                    <strong>Droits :</strong> Tout adhérent dispose d'un droit d'accès, de rectification et d'effacement de ses données personnelles auprès du secrétariat général via l'adresse officielle.
                  </p>
                </>
              )}

              {legalModal === 'conditions' && (
                <>
                  <p>
                    <strong>1. Éligibilité :</strong> L'adhésion est ouverte aux femmes et hommes majeurs âgés de 21 à 77 ans partageant les idéaux de leadership, de dignité et de solidarité familiale.
                  </p>
                  <p>
                    <strong>2. Droits d'adhésion :</strong> La carte d'adhésion annuelle officielle est fixée à 10 000 FCFA. Les cotisations de fonctionnement mensuelles sont arrêtées par le bureau du club.
                  </p>
                  <p>
                    <strong>3. Intégration en Globale Classe :</strong> Tout membre agréé est affilié à une Globale Classe de 24 personnes au sein de laquelle se déroulent l'ensemble des formations bimensuelles de 4 heures et les projets d'investissement.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#087747] rounded-md cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
