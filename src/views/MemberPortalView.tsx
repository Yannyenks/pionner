import React, { useState } from 'react';
import { PageId, MembershipApplication, GlobalClass } from '../types';
import { StorageService } from '../services/storage';
import { OFFICIAL_PCI_INFO, FIVE_TREES_VALUES } from '../data/mockData';
import { Shield, User, Calendar, CreditCard, BookOpen, Clock, Download, CheckCircle2, QrCode } from 'lucide-react';

interface MemberPortalViewProps {
  onNavigate: (page: PageId) => void;
}

export const MemberPortalView: React.FC<MemberPortalViewProps> = ({ onNavigate }) => {
  const applications = StorageService.getApplications().filter((a) => a.status === 'acceptee');
  const classes = StorageService.getClasses();

  // Active authenticated member (pre-selected or selectable for demo/real testing)
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    applications[0]?.id || ''
  );

  const [activeTab, setActiveTab] = useState<'profile' | 'card' | 'class' | 'resources'>('profile');

  const currentMember = applications.find((a) => a.id === selectedMemberId) || applications[0];
  const assignedClass = classes.find((c) => c.id === currentMember?.assignedClassId) || classes[0];

  if (!currentMember) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <Shield className="w-12 h-12 text-[#087747] mx-auto" />
        <h2 className="font-display text-xl font-bold text-stone-900">Espace Membre Privé</h2>
        <p className="text-xs text-stone-600">
          Aucun membre n'est actuellement agréé en base de données. Déposez une candidature ou activez un profil dans le back-office.
        </p>
        <button
          onClick={() => onNavigate('membership')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#087747] rounded-lg"
        >
          Déposer une candidature
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Top Banner with Member Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#087747] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Portail des Adhérents PCI</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Bienvenue, {currentMember.fullName}
          </h1>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Matricule Officiel : <span className="font-bold text-[#087747]">{currentMember.referenceCode}</span> · Globale Classe : {assignedClass.name}
          </p>
        </div>

        {/* Member account switcher (simulating real authenticated session) */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white p-2 rounded-xl border border-stone-200">
          <span className="text-[11px] text-stone-500 pl-2">Session :</span>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="text-xs font-semibold text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.fullName} ({app.referenceCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'profile' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Tableau de Bord</span>
        </button>

        <button
          onClick={() => setActiveTab('card')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'card' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Ma Carte Dématérialisée</span>
        </button>

        <button
          onClick={() => setActiveTab('class')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'class' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Ma Globale Classe (24 membres)</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'resources' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Supports des 5 Arbres</span>
        </button>
      </div>

      {/* TAB: PROFILE / DASHBOARD */}
      {activeTab === 'profile' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
                Statut Adhérent
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#087747]" />
                <span className="font-display text-lg font-bold text-stone-900">Actif & En Règle</span>
              </div>
              <p className="text-xs text-stone-500">Carte annuelle 2026 validée (10 000 FCFA)</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
                Prochaine Séance
              </span>
              <p className="font-display text-lg font-bold text-stone-900">Samedi 31 Octobre</p>
              <p className="text-xs text-stone-500">Séance de 4h · {assignedClass.sessionTime}</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
                Thème d'Enseignement
              </span>
              <p className="font-display text-lg font-bold text-[#087747]">Arbre de la Solidarité</p>
              <p className="text-xs text-stone-500">Mutualisation & Appui aux initiatives de membres</p>
            </div>
          </div>

          {/* Internal announcement card */}
          <div className="bg-[#FAF9F4] rounded-2xl p-6 md:p-8 border border-stone-300 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
              Message du Délégué de Classe
            </span>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Ordre du jour de la prochaine séance bimensuelle
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Chers frères et sœurs de la classe <strong>{assignedClass.name}</strong>, merci de veiller à votre ponctualité dès {assignedClass.sessionTime.includes('Matinée') ? '08h15' : '13h45'}. Nous aurons l'honneur d'accueillir un exposé fraternel sur l'Arbre de la Solidarité, suivi du point d'étape sur le club d'investissement et la validation des partenariats commerçants.
            </p>
          </div>
        </div>
      )}

      {/* TAB: DIGITAL MEMBERSHIP CARD */}
      {activeTab === 'card' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-display text-xl font-bold text-stone-900">
              Carte Officielle d'Adhérent Pionnier
            </h3>
            <p className="text-xs text-stone-500">
              Carte de membre et de réduction du coût de la vie chez nos partenaires économiques et sociaux.
            </p>
          </div>

          {/* Premium Card UI with Gold/Green Styling */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#064E35] via-[#087747] to-[#171B18] text-white shadow-xl border border-[#C9A65A]/40 overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 w-44 h-44 rounded-full border border-[#C9A65A]/20 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C9A65A] bg-white flex items-center justify-center">
                  <span className="font-display font-bold text-lg text-[#087747]">P</span>
                </div>
                <div>
                  <span className="font-display font-bold text-sm tracking-wider uppercase block">
                    Pionnier Club International
                  </span>
                  <span className="text-[10px] text-[#C9A65A] tracking-widest block font-medium">
                    CARTE DE MEMBRE & POUVOIR D'ACHAT
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[#C9A65A] px-2.5 py-1 rounded bg-black/30 border border-[#C9A65A]/30">
                2026 / 2027
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-300 block">Titulaire</span>
                <p className="font-display text-lg font-bold tracking-wide">{currentMember.fullName}</p>
                <p className="text-xs text-[#C9A65A]">{currentMember.profession || 'Membre Adhérent'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <span className="text-[10px] uppercase text-stone-300 block">Matricule National</span>
                  <span className="font-mono font-bold">{currentMember.referenceCode}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-300 block">Globale Classe</span>
                  <span className="font-bold truncate block">{assignedClass.name}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
              <span>BUREAU NATIONAL CÔTE D'IVOIRE</span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#C9A65A]">
                <QrCode className="w-4 h-4" />
                <span>PCI-VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2 text-center">
            <p>
              Présentez cette carte dématérialisée ou votre carte physique dans les cliniques, pharmacies et commerces conventionnés pour bénéficier des réductions négociées.
            </p>
          </div>
        </div>
      )}

      {/* TAB: GLOBALE CLASSE DETAILS */}
      {activeTab === 'class' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="font-mono text-xs font-bold text-[#087747]">{assignedClass.code}</span>
              <h3 className="font-display text-xl font-bold text-stone-900">{assignedClass.name}</h3>
              <span className="text-xs text-stone-500">{assignedClass.city}</span>
            </div>

            <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <span>Effectif de la classe : </span>
              <strong className="text-stone-900">{assignedClass.currentMembersCount}</strong> / {assignedClass.maxCapacity} membres
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <span className="text-stone-400 uppercase font-mono block">Créneau Séance</span>
              <p className="font-bold text-stone-900">{assignedClass.sessionTime}</p>
              <span className="text-stone-500">Un samedi sur deux (4h)</span>
            </div>

            <div className="p-4 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <span className="text-stone-400 uppercase font-mono block">Délégué Référent</span>
              <p className="font-bold text-stone-900">{assignedClass.leaderName}</p>
              <span className="text-stone-500">Coordination fraternelle</span>
            </div>

            <div className="p-4 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <span className="text-stone-400 uppercase font-mono block">Club d'Investissement</span>
              <p className="font-bold text-[#087747]">Actif & Opérationnel</p>
              <span className="text-stone-500">Épargne solidaire mutualisée</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB: RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-bold text-stone-900">
              Recueil Pédagogique des Cinq Arbres du Leadership
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Documents et fiches de travail distribués aux membres pour guider leurs foyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIVE_TREES_VALUES.map((tree, i) => (
              <div key={tree.id} className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#087747]">Fiche 0{i + 1}</span>
                  <span className="text-[10px] text-stone-400 font-medium">Programme Officiel PCI</span>
                </div>
                <h4 className="font-display text-base font-bold text-stone-900">{tree.name}</h4>
                <p className="text-xs text-stone-600">{tree.description}</p>
                <div className="pt-2 text-[11px] text-[#087747] font-semibold">
                  {tree.actionConcrete}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
