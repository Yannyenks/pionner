import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './views/HomeView';
import { InstitutionView } from './views/InstitutionView';
import { ValuesView } from './views/ValuesView';
import { GlobalClassesView } from './views/GlobalClassesView';
import { ActionsView } from './views/ActionsView';
import { MembershipView } from './views/MembershipView';
import { NewsView } from './views/NewsView';
import { GalleryView } from './views/GalleryView';
import { ContactView } from './views/ContactView';
import { MemberPortalView } from './views/MemberPortalView';
import { AdminBackOfficeView } from './views/AdminBackOfficeView';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Handle URL hash navigation for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'institution',
        'values',
        'global-classes',
        'actions',
        'membership',
        'news',
        'gallery',
        'contact',
        'member-portal',
        'admin',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F4] text-[#171B18] font-sans antialiased selection:bg-[#087747] selection:text-white">
      {/* Intro Preloader with fast skip */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Top Institutional Bar */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Canvas with Top Nav Offset */}
      <main className="flex-1 pt-20">
        {currentPage === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentPage === 'institution' && <InstitutionView onNavigate={handleNavigate} />}
        {currentPage === 'values' && <ValuesView onNavigate={handleNavigate} />}
        {currentPage === 'global-classes' && <GlobalClassesView onNavigate={handleNavigate} />}
        {currentPage === 'actions' && <ActionsView onNavigate={handleNavigate} />}
        {currentPage === 'membership' && <MembershipView onNavigate={handleNavigate} />}
        {currentPage === 'news' && <NewsView onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryView onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactView onNavigate={handleNavigate} />}
        {currentPage === 'member-portal' && <MemberPortalView onNavigate={handleNavigate} />}
        {currentPage === 'admin' && <AdminBackOfficeView onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
