import React, { useState, useEffect } from 'react';
import { PageId, MembershipApplication, GlobalClass, NewsItem, AuditLogEntry } from '../types';
import { StorageService } from '../services/storage';
import { OFFICIAL_PCI_INFO } from '../data/mockData';
import { Shield, Users, FileText, Plus, CheckCircle2, Clock, XCircle, Search, Edit3, Trash2, ArrowUpRight } from 'lucide-react';

interface AdminBackOfficeViewProps {
  onNavigate: (page: PageId) => void;
}

export const AdminBackOfficeView: React.FC<AdminBackOfficeViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'classes' | 'news' | 'audit'>('applications');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Data states
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [classes, setClasses] = useState<GlobalClass[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Filter & Search states
  const [appFilter, setAppFilter] = useState<'all' | 'recue' | 'en_cours' | 'acceptee' | 'refusee'>('all');
  const [appSearch, setAppSearch] = useState('');

  // Selected App for review modal
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [reviewStatus, setReviewStatus] = useState<MembershipApplication['status']>('recue');
  const [reviewClassId, setReviewClassId] = useState<string>('');
  const [reviewNotes, setReviewNotes] = useState<string>('');

  // New Class Form modal
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCity, setNewClassCity] = useState('');
  const [newClassTime, setNewClassTime] = useState<'Matinée (08h30 - 12h30)' | 'Après-midi (14h00 - 18h00)'>('Matinée (08h30 - 12h30)');
  const [newClassLeader, setNewClassLeader] = useState('');

  // New News Item modal
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<NewsItem['category']>('Communiqué');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const reloadData = () => {
    setApplications(StorageService.getApplications());
    setClasses(StorageService.getClasses());
    setNews(StorageService.getNews());
    setAuditLogs(StorageService.getAuditLogs());
  };

  useEffect(() => {
    reloadData();
  }, [refreshTrigger]);

  const handleOpenReview = (app: MembershipApplication) => {
    setSelectedApp(app);
    setReviewStatus(app.status);
    setReviewClassId(app.assignedClassId || classes[0]?.id || '');
    setReviewNotes(app.adminNotes || '');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    StorageService.updateApplicationStatus(
      selectedApp.id,
      reviewStatus,
      reviewClassId,
      reviewNotes
    );

    setSelectedApp(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !newClassCity.trim() || !newClassLeader.trim()) return;

    const count = classes.length + 1;
    const code = `GC-ABJ-${count < 10 ? '00' + count : '0' + count}`;

    StorageService.addClass({
      code,
      name: newClassName.trim(),
      city: newClassCity.trim(),
      sessionTime: newClassTime,
      leaderName: newClassLeader.trim(),
      currentMembersCount: 0,
      maxCapacity: 24,
      status: 'in_formation',
    });

    setShowAddClassModal(false);
    setNewClassName('');
    setNewClassCity('');
    setNewClassLeader('');
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim() || !newNewsSummary.trim() || !newNewsContent.trim()) return;

    StorageService.addNews({
      title: newNewsTitle.trim(),
      category: newNewsCategory,
      summary: newNewsSummary.trim(),
      content: newNewsContent.split('\n\n').filter((p) => p.trim().length > 0),
      author: 'Secrétariat Général PCI',
    });

    setShowAddNewsModal(false);
    setNewNewsTitle('');
    setNewNewsSummary('');
    setNewNewsContent('');
    setRefreshTrigger((prev) => prev + 1);
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchStatus = appFilter === 'all' || app.status === appFilter;
    const matchSearch =
      app.fullName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.referenceCode.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.city.toLowerCase().includes(appSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#087747] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-[#C9A65A]" />
            <span>Direction du Bureau National PCI</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Tableau de Bord Administratif
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Supervision des candidatures, gestion des effectifs de classes et publication des actes officiels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 text-xs font-semibold text-stone-600 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Retour au site public
          </button>
        </div>
      </div>

      {/* Real Real-Time KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
            Demandes Reçues
          </span>
          <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">
            {applications.length}
          </p>
          <span className="text-xs text-stone-500">Candidatures en registre</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#087747] font-bold block">
            Membres Agréés
          </span>
          <p className="font-display text-2xl font-bold text-[#087747] tabular-nums">
            {applications.filter((a) => a.status === 'acceptee').length}
          </p>
          <span className="text-xs text-stone-500">Cartes de 10 000 FCFA validées</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
            Globales Classes
          </span>
          <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">
            {classes.length}
          </p>
          <span className="text-xs text-stone-500">24 personnes par classe</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold block">
            Journal d'Audit
          </span>
          <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">
            {auditLogs.length}
          </p>
          <span className="text-xs text-stone-500">Événements tracés</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'applications' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Candidatures d'Adhésion ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'classes' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Gestion des Globales Classes ({classes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'news' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Actualités & Actes Officiels ({news.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'audit' ? 'bg-[#087747] text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Journal d'Audit</span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS MANAGEMENT */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Rechercher nom, code, ville..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="px-3.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] w-64"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setAppFilter('all')}
                className={`px-2.5 py-1 rounded-md ${appFilter === 'all' ? 'bg-white font-bold text-stone-900 shadow-2xs' : 'text-stone-600'}`}
              >
                Toutes ({applications.length})
              </button>
              <button
                onClick={() => setAppFilter('recue')}
                className={`px-2.5 py-1 rounded-md ${appFilter === 'recue' ? 'bg-white font-bold text-amber-700 shadow-2xs' : 'text-stone-600'}`}
              >
                Reçues
              </button>
              <button
                onClick={() => setAppFilter('en_cours')}
                className={`px-2.5 py-1 rounded-md ${appFilter === 'en_cours' ? 'bg-white font-bold text-blue-700 shadow-2xs' : 'text-stone-600'}`}
              >
                En cours
              </button>
              <button
                onClick={() => setAppFilter('acceptee')}
                className={`px-2.5 py-1 rounded-md ${appFilter === 'acceptee' ? 'bg-white font-bold text-emerald-700 shadow-2xs' : 'text-stone-600'}`}
              >
                Agréées
              </button>
              <button
                onClick={() => setAppFilter('refusee')}
                className={`px-2.5 py-1 rounded-md ${appFilter === 'refusee' ? 'bg-white font-bold text-red-700 shadow-2xs' : 'text-stone-600'}`}
              >
                Refusées
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 bg-stone-50">
                  <th className="py-2.5 px-3 font-semibold">Référence</th>
                  <th className="py-2.5 px-3 font-semibold">Candidat</th>
                  <th className="py-2.5 px-3 font-semibold">Âge / Ville</th>
                  <th className="py-2.5 px-3 font-semibold">Téléphone</th>
                  <th className="py-2.5 px-3 font-semibold">Statut</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#087747]">{app.referenceCode}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-stone-900 block">{app.fullName}</span>
                      <span className="text-[11px] text-stone-500">{app.profession || 'Profession non renseignée'}</span>
                    </td>
                    <td className="py-3 px-3 text-stone-600">
                      <span>{app.age} ans</span> · <span>{app.city}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-600">{app.phone}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          app.status === 'acceptee'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'en_cours'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'refusee'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status === 'acceptee'
                          ? 'Agréée'
                          : app.status === 'en_cours'
                          ? 'En cours'
                          : app.status === 'refusee'
                          ? 'Refusée'
                          : 'Reçue'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleOpenReview(app)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#087747] hover:bg-emerald-50 rounded border border-[#087747]/30 cursor-pointer"
                      >
                        Examiner & Décider
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL CLASSES MANAGEMENT */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Liste des Globales Classes Officielles
              </h3>
              <p className="text-xs text-stone-500">
                Chaque classe accueille 24 personnes maximum pour garantir un encadrement régulier.
              </p>
            </div>

            <button
              onClick={() => setShowAddClassModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ouvrir une Nouvelle Classe</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-mono text-xs font-bold text-[#087747]">{c.code}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-700">
                    Capacité : {c.maxCapacity}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-base font-bold text-stone-900">{c.name}</h4>
                  <p className="text-xs text-stone-500">{c.city}</p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg">
                  <div><strong>Créneau :</strong> {c.sessionTime}</div>
                  <div><strong>Délégué :</strong> {c.leaderName}</div>
                  <div><strong>Adhérents affectés :</strong> {c.currentMembersCount} / {c.maxCapacity}</div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      const nextCount = Math.min(c.maxCapacity, c.currentMembersCount + 1);
                      StorageService.updateClass(c.id, { currentMembersCount: nextCount });
                      setRefreshTrigger((p) => p + 1);
                    }}
                    className="flex-1 py-1.5 px-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded text-center cursor-pointer"
                  >
                    +1 Adhérent
                  </button>
                  <button
                    onClick={() => {
                      const nextCount = Math.max(0, c.currentMembersCount - 1);
                      StorageService.updateClass(c.id, { currentMembersCount: nextCount });
                      setRefreshTrigger((p) => p + 1);
                    }}
                    className="py-1.5 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded text-center cursor-pointer"
                  >
                    -1
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NEWS MANAGEMENT */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Communiqués & Actualités Institutionnelles
              </h3>
              <p className="text-xs text-stone-500">
                Gérer les annonces affichées sur la page d'accueil et dans l'espace éditorial.
              </p>
            </div>

            <button
              onClick={() => setShowAddNewsModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publier un Communiqué</span>
            </button>
          </div>

          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#087747]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-stone-900">{item.title}</h4>
                  <p className="text-xs text-stone-600 line-clamp-1">{item.summary}</p>
                </div>

                <div className="text-xs text-stone-400 font-mono self-start md:self-auto">
                  {item.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Journal d'Audit & Traçabilité des Décisions
            </h3>
            <p className="text-xs text-stone-500">
              Chaque acte officiel, changement de statut de candidat et ouverture de classe est tracé de façon transparente.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 bg-stone-50">
                  <th className="py-2.5 px-3 font-semibold">Horodatage</th>
                  <th className="py-2.5 px-3 font-semibold">Opérateur / Acteur</th>
                  <th className="py-2.5 px-3 font-semibold">Nature de l'Action</th>
                  <th className="py-2.5 px-3 font-semibold">Détails Opérationnels</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono text-stone-500">
                      {new Date(log.timestamp).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">{log.actor}</td>
                    <td className="py-3 px-3 text-[#087747] font-medium">{log.action}</td>
                    <td className="py-3 px-3 text-stone-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPLICATION REVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="font-mono text-xs font-bold text-[#087747]">
                  {selectedApp.referenceCode}
                </span>
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Instruction : {selectedApp.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-stone-400 hover:text-stone-900 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs bg-stone-50 p-4 rounded-xl">
              <div><strong>Âge :</strong> {selectedApp.age} ans (Éligibilité 21 à 77 ans respectée)</div>
              <div><strong>Contact :</strong> {selectedApp.phone} · {selectedApp.email}</div>
              <div><strong>Résidence :</strong> {selectedApp.city}, {selectedApp.country}</div>
              <div><strong>Profession :</strong> {selectedApp.profession || 'Non renseignée'}</div>
              <div className="pt-2 border-t border-stone-200">
                <strong>Motivations déclarées :</strong>
                <p className="mt-1 text-stone-700 italic">{selectedApp.motivation}</p>
              </div>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Décision d'Admission
                </label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                >
                  <option value="recue">Dossier reçu (en attente)</option>
                  <option value="en_cours">En cours d'instruction / entretien préliminaire</option>
                  <option value="acceptee">Candidature agréée (carte 10 000 FCFA activable)</option>
                  <option value="refusee">Candidature rejetée</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Affectation Globale Classe
                </label>
                <select
                  value={reviewClassId}
                  onChange={(e) => setReviewClassId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city}) - {c.currentMembersCount}/{c.maxCapacity} membres
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Note d'Instruction / Observations du Bureau
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="ex: Entretien téléphonique validé. Carte annuelle payée. Convocations envoyées..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg cursor-pointer"
                >
                  Valider la décision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CLASS MODAL */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Ouverture d'une Nouvelle Globale Classe (24 pers.)
            </h3>
            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nom de la Classe</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Globale Classe Marcory-Progrès"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ville / Commune</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Abidjan (Marcory)"
                  value={newClassCity}
                  onChange={(e) => setNewClassCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Créneau Séance Samedi</label>
                <select
                  value={newClassTime}
                  onChange={(e) => setNewClassTime(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="Matinée (08h30 - 12h30)">Matinée (08h30 - 12h30)</option>
                  <option value="Après-midi (14h00 - 18h00)">Après-midi (14h00 - 18h00)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Délégué Référent</label>
                <input
                  type="text"
                  required
                  placeholder="ex: M. Yao Philippe"
                  value={newClassLeader}
                  onChange={(e) => setNewClassLeader(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg cursor-pointer"
                >
                  Créer la classe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEWS MODAL */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Publication d'un Communiqué Officiel
            </h3>
            <form onSubmit={handleCreateNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Titre de l'Acte / Parution</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Ordre du jour de l'Assemblée Générale Extraordinaire"
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Catégorie</label>
                <select
                  value={newNewsCategory}
                  onChange={(e) => setNewNewsCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="Communiqué">Communiqué</option>
                  <option value="Événement">Événement</option>
                  <option value="Solidarité">Solidarité</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Vie du Club">Vie du Club</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Résumé synthétique</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Bref résumé en 2 phrases..."
                  value={newNewsSummary}
                  onChange={(e) => setNewNewsSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Texte intégral (paragraphes séparés par double retour)</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Texte complet du communiqué..."
                  value={newNewsContent}
                  onChange={(e) => setNewNewsContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg cursor-pointer"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
