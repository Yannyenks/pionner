import React, { useState } from 'react';
import { PageId } from '../types';
import { OFFICIAL_PCI_INFO } from '../data/mockData';
import { StorageService } from '../services/storage';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Informations générales');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Record in audit log
    StorageService.logAction(
      `Visiteur (${name})`,
      'Message de contact envoyé',
      `Objet: "${subject}" - Email: ${email}`
    );

    setSentSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Secrétariat & Correspondance
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Contacter le Pionnier Club International
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Une question sur les adhésions, l'implantation d'une Globale Classe ou un partenariat ? Les équipes du Bureau International et du Bureau National sont à votre écoute.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-2xs space-y-6">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Coordonnées Officielles Vérifiées
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                <MapPin className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Siège & Bureau National</span>
                  <span className="text-stone-600">{OFFICIAL_PCI_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                <Phone className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Téléphone Officiel</span>
                  <a href={`tel:${OFFICIAL_PCI_INFO.phone}`} className="text-stone-600 hover:text-[#087747] font-mono">
                    {OFFICIAL_PCI_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                <Mail className="w-4 h-4 text-[#087747] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Courriel Institutionnel</span>
                  <a href={`mailto:${OFFICIAL_PCI_INFO.email}`} className="text-stone-600 hover:text-[#087747] break-all">
                    {OFFICIAL_PCI_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={OFFICIAL_PCI_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir une discussion WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#064E35] text-white space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Permanence du Club
            </span>
            <p className="text-xs text-stone-200 leading-relaxed">
              Le secrétariat traite les demandes d'information du lundi au vendredi de 08h00 à 17h00. Les séances des Globales Classes se tiennent quant à elles tous les 15 jours, les samedis.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-10 border border-stone-200 shadow-sm">
          {sentSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#087747] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Message Envoyé au Secrétariat
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Merci de votre prise de contact. Votre correspondance a bien été transmise et un responsable du Bureau National vous répondra dans les meilleurs délais.
              </p>
              <button
                onClick={() => setSentSuccess(false)}
                className="mt-4 px-5 py-2 text-xs font-semibold text-[#087747] bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-display text-xl font-bold text-stone-900">
                Formulaire de Correspondance
              </h3>

              {errorMsg && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nom & Prénoms *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Adresse Courriel *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Objet de votre demande *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747] bg-white"
                >
                  <option value="Informations générales">Informations générales sur le PCI</option>
                  <option value="Question sur l'adhésion">Question sur l'adhésion (10 000 FCFA)</option>
                  <option value="Localisation des Globales Classes">Localisation d'une Globale Classe</option>
                  <option value="Partenariat Carte Coût de la Vie">Proposition de partenariat conventionné</option>
                  <option value="Autre demande">Autre correspondance officielle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message détaillé *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message avec clarté..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#087747]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-xs uppercase tracking-widest font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmettre mon message</span>
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
