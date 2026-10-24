import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, Shield, Lock, ExternalLink } from 'lucide-react';
import { OFFICIAL_PCI_INFO } from '../data/mockData';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'institution', label: 'Notre Institution' },
    { id: 'values', label: 'Nos Valeurs' },
    { id: 'global-classes', label: 'Globales Classes' },
    { id: 'actions', label: 'Nos Actions' },
    { id: 'news', label: 'Actualités' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#064E35]/95 backdrop-blur-md shadow-md border-b border-[#087747] py-3'
          : 'bg-[#064E35] border-b border-[#087747]/80 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Official Laurel Badge */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-full border border-[#C9A65A] bg-[#087747] flex items-center justify-center shadow-xs group-hover:border-white transition-colors">
              <span className="font-display font-bold text-lg text-[#C9A65A]">P</span>
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white block leading-none">
                PIONNIER CLUB
              </span>
              <span className="text-[10px] tracking-widest text-[#C9A65A] font-semibold uppercase block mt-0.5">
                International
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line, quiet typography) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#C9A65A] pb-0.5 cursor-pointer ${
                  currentPage === link.id
                    ? 'text-[#C9A65A] font-semibold border-b-2 border-[#C9A65A]'
                    : 'border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Quick Member Portal Access */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('member-portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'member-portal'
                  ? 'text-[#C9A65A] bg-white/15'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#C9A65A]" />
              <span>Espace Membre</span>
            </button>

            <button
              onClick={() => handleNavClick('membership')}
              className="px-4 py-2 text-xs font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-md transition-all shadow-xs hover:shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Rejoindre le Réseau
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('membership')}
              className="text-xs px-3 py-1.5 font-bold text-[#064E35] bg-[#C9A65A] rounded-md sm:hidden"
            >
              Adhésion
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#C9A65A] focus:outline-hidden cursor-pointer"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#064E35] border-b border-[#087747] px-4 pt-3 pb-6 shadow-xl text-white">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 px-3 text-left text-sm font-medium rounded-md transition-colors ${
                  currentPage === link.id
                    ? 'text-[#C9A65A] bg-white/10 font-semibold'
                    : 'text-stone-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-[#087747] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('member-portal')}
                className="flex items-center justify-between py-2 px-3 text-sm text-stone-200 hover:bg-white/5 rounded-md font-medium"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C9A65A]" />
                  Portail Espace Membre
                </span>
                <span className="text-xs text-[#C9A65A]/80">Accès privé</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-between py-2 px-3 text-sm text-stone-200 hover:bg-white/5 rounded-md font-medium"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C9A65A]" />
                  Back-Office Administration
                </span>
                <span className="text-xs text-stone-400">Gestion</span>
              </button>

              <button
                onClick={() => handleNavClick('membership')}
                className="w-full text-center py-2.5 px-4 text-sm font-bold text-[#064E35] bg-[#C9A65A] hover:bg-[#d9b86c] rounded-md shadow-xs mt-2"
              >
                Candidater au Réseau PCI
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
