import React, { useState } from 'react';
import { PageId, MembershipApplication, ApplicationStatus } from '../types';
import { StorageService } from '../services/storage';
import { OFFICIAL_PCI_INFO } from '../data/mockData';
import { ShieldCheck, CheckCircle2, Clock, Search, AlertCircle, FileText, ArrowRight, UserCheck } from 'lucide-react';

interface MembershipViewProps {
  onNavigate: (page: PageId) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Côte d’Ivoire');
  const [city, setCity] = useState('');
  const [age, setAge] = useState<number>(30);
  const [profession, setProfession] = useState('');
  const [motivation, setMotivation] = useState('');
  const [consent, setConsent] = useState(false);

  // Status submission
  const [submittedApp, setSubmittedApp] = useState<MembershipApplication | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Tracking state
  const [searchCode, setSearchCode] = useState('');
  const [trackedApp, setTrackedApp] = useState<MembershipApplication | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !motivation.trim()) {
      setFormError('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    if (age < 21 || age > 77) {
      setFormError('Conformément aux statuts officiels du PCI, l’âge requis est compris entre 21 et 77 ans.');
      return;
    }

    if (!consent) {
      setFormError('Vous devez consentir au traitement de vos données pour valider la candidature.');
      return;
    }

    try {
      const created = StorageService.submitApplication({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country.trim(),
        city: city.trim(),
        age: Number(age),
        profession: profession.trim() || undefined,
        motivation: motivation.trim(),
      });

      setSubmittedApp(created);
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setCity('');
      setProfession('');
      setMotivation('');
      setConsent(false);
    } catch (err) {
      setFormError('Une erreur est survenue lors de l’enregistrement de votre dossier.');
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setTrackedApp(null);

    if (!searchCode.trim()) {
      setSearchError('Veuillez saisir votre référence (ex: PCI-2026-7841).');
      return;
    }

    const found = StorageService.findApplicationByCode(searchCode);
    if (!found) {
      setSearchError('Aucun dossier trouvé avec cette référence. Vérifiez la saisie ou contactez le secrétariat.');
    } else {
      setTrackedApp(found);
    }
  };

  const renderStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'acceptee':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Candidature Agréée
          </span>
        );
      case 'en_cours':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5" />
            En cours d'instruction
          </span>
        );
      case 'refusee':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <AlertCircle className="w-3.5 h-3.5" />
            Non retenue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <FileText className="w-3.5 h-3.5" />
            Dossier Reçu
          </span>
        );
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Rejoindre le Réseau
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Adhésion au Pionnier Club International
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Intégrez une communauté de leaders responsables, accédez aux formations sur le leadership familial et participez à l'enrichissement solidaire des ménages.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Conditions d'adhésion officielles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">Critère d'âge</span>
          <p className="font-display text-base font-bold text-stone-900">21 à 77 ans</p>
          <span className="text-xs text-stone-500 block">Hommes et femmes de toutes professions</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">Carte annuelle</span>
          <p className="font-display text-base font-bold text-[#087747]">10 000 FCFA</p>
          <span className="text-xs text-stone-500 block">Donne accès à tous les services de l'ONG</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">Affectation</span>
          <p className="font-display text-base font-bold text-stone-900">Globale Classe</p>
          <span className="text-xs text-stone-500 block">24 membres pour s'entraider</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">Engagement</span>
          <p className="font-display text-base font-bold text-stone-900">Samedi (4h)</p>
          <span className="text-xs text-stone-500 block">Séance bimensuelle encadrée</span>
        </div>
      </div>

      {/* Tab Switcher: Déposer vs Suivre */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-[#087747] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          1. Déposer ma Candidature
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'track'
              ? 'bg-[#087747] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          2. Suivre un Dossier Existant
        </button>
      </div>

      {/* TAB 1: FORMULAIRE D'ADHÉSION */}
      {activeTab === 'apply' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-10 border border-stone-200 shadow-sm">
            {submittedApp ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#087747] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
                    Candidature Enregistrée avec Succès
                  </span>
                  <h3 className="font-display text-2xl font-bold text-stone-900">
                    Merci {submittedApp.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    Votre demande a été transmise aux membres du Bureau National PCI pour instruction préliminaire.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF9F4] border border-stone-300 max-w-md mx-auto text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs text-stone-500">Numéro de référence :</span>
                    <span className="font-mono text-sm font-bold text-[#087747]">
                      {submittedApp.referenceCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs text-stone-500">Statut initial :</span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Dossier reçu
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Date de dépôt :</span>
                    <span>{new Date(submittedApp.submittedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 max-w-md mx-auto text-left">
                  <p>
                    <strong>Étapes suivantes :</strong> Vous serez contacté(e) par téléphone ou WhatsApp par le responsable d'affectation des Globales Classes pour un entretien fraternel. La carte d'adhésion officielle de 10 000 FCFA sera remise après validation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSearchCode(submittedApp.referenceCode);
                      setActiveTab('track');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg transition-colors cursor-pointer"
                  >
                    Consulter le suivi en direct
                  </button>
                  <button
                    onClick={() => setSubmittedApp(null)}
                    className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Déposer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    Formulaire Officiel de Candidature
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    Tous les champs marqués d’un astérisque (*) sont requis pour l'instruction par le Bureau National.
                  </p>
                </div>

                {formError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nom & Prénoms complets *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ex: Koffi Kouassi Sylvain"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="koffi.sylvain@example.com"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Numéro Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+225 07 00 00 00 00"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Âge du candidat (21 à 77 ans) *
                    </label>
                    <input
                      type="number"
                      min={21}
                      max={77}
                      required
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ville & Commune de résidence *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="ex: Abidjan (Cocody)"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Profession ou Domaine d'activité (Facultatif)
                    </label>
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="ex: Cadre administratif, Entrepreneur..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Pays de résidence
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Vos motivations pour rejoindre le PCI *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Expliquez ce qui vous attire dans les idéaux de leadership familial, de fraternité et d'entraide en Globale Classe..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] focus:ring-1 focus:ring-[#087747]"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#087747] focus:ring-[#087747]"
                    />
                    <span>
                      Je confirme avoir entre 21 et 77 ans et j'accepte que mes données soient traitées par le secrétariat du PCI aux fins d'instruction de ma candidature. Je reconnais que la validation finale intervient après entretien et acquittement de la carte annuelle de 10 000 FCFA.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs uppercase tracking-widest font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Soumettre ma candidature au Bureau National
                </button>
              </form>
            )}
          </div>

          {/* Right sidebar info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF9F4] rounded-2xl p-6 border border-stone-300 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#087747] font-semibold block">
                Transparence & Processus
              </span>
              <h4 className="font-display text-base font-bold text-stone-900">
                Comment s'opère votre admission ?
              </h4>
              <ol className="space-y-3 text-xs text-stone-600 list-decimal list-inside">
                <li>
                  <strong className="text-stone-900">Dépôt en ligne :</strong> attribution immédiate d'un numéro de dossier unique.
                </li>
                <li>
                  <strong className="text-stone-900">Instruction :</strong> examen de compatibilité géographique pour votre Globale Classe.
                </li>
                <li>
                  <strong className="text-stone-900">Entretien :</strong> échange fraternel d'accueil avec un responsable.
                </li>
                <li>
                  <strong className="text-stone-900">Délivrance de la carte :</strong> intégration dans votre cercle de 24 membres.
                </li>
              </ol>
            </div>

            <div className="p-6 rounded-2xl bg-[#064E35] text-white space-y-3">
              <h4 className="font-display text-base font-bold text-[#C9A65A]">Besoin d'Assistance ?</h4>
              <p className="text-xs text-stone-200 leading-relaxed">
                Le secrétariat des adhésions se tient à votre écoute pour vous orienter vers la Globale Classe la plus proche de votre domicile.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${OFFICIAL_PCI_INFO.phone}`}
                  className="block text-xs font-mono font-bold text-white hover:underline"
                >
                  Tél : {OFFICIAL_PCI_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUIVI DU DOSSIER */}
      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-stone-200 shadow-sm space-y-8">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Suivi en Temps Réel de Votre Candidature
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Saisissez la référence officielle reçue lors de votre dépôt (ex : PCI-2026-7841).
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="ex: PCI-2026-7841 ou PCI-2026-8923"
              className="flex-1 px-4 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] font-mono uppercase"
            />
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Consulter</span>
            </button>
          </form>

          {searchError && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {trackedApp && (
            <div className="border border-stone-200 rounded-xl p-6 bg-[#FAF9F4] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="font-mono text-xs font-bold text-stone-500 block">
                    {trackedApp.referenceCode}
                  </span>
                  <h4 className="font-display text-lg font-bold text-stone-900">
                    {trackedApp.fullName}
                  </h4>
                  <span className="text-xs text-stone-500">{trackedApp.city}, {trackedApp.country}</span>
                </div>
                <div>{renderStatusBadge(trackedApp.status)}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block">Âge :</span>
                  <span className="font-medium text-stone-800">{trackedApp.age} ans</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Profession :</span>
                  <span className="font-medium text-stone-800">{trackedApp.profession || 'Non spécifiée'}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Contact :</span>
                  <span className="font-medium text-stone-800">{trackedApp.phone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Date de dépôt :</span>
                  <span className="font-medium text-stone-800">
                    {new Date(trackedApp.submittedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {trackedApp.adminNotes && (
                <div className="p-4 rounded-lg bg-white border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-700 block">Note du Secrétariat :</span>
                  <p className="text-stone-600">{trackedApp.adminNotes}</p>
                </div>
              )}

              {trackedApp.status === 'acceptee' && (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#087747]" />
                    <span>Félicitations ! Votre adhésion a été validée.</span>
                  </div>
                  <p>
                    Vous pouvez vous connecter dès à présent à l'<strong>Espace Membre</strong> avec votre email pour consulter le calendrier de votre classe et télécharger votre carte d'adhésion dématérialisée.
                  </p>
                  <button
                    onClick={() => onNavigate('member-portal')}
                    className="inline-flex items-center gap-1.5 font-bold text-[#087747] underline cursor-pointer pt-1"
                  >
                    <span>Accéder à mon espace membre</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};
