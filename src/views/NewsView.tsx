import React, { useState } from 'react';
import { PageId, NewsItem } from '../types';
import { StorageService } from '../services/storage';
import { Calendar, Tag, ArrowRight, Share2, Check, X, BookOpen, Clock } from 'lucide-react';

interface NewsViewProps {
  onNavigate: (page: PageId) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate }) => {
  const newsList = StorageService.getNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<NewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Communiqué', 'Solidarité', 'Leadership', 'Vie du Club'];

  const filtered = selectedCategory === 'all'
    ? newsList
    : newsList.filter((n) => n.category === selectedCategory);

  const handleShare = (item: NewsItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${item.title} - ${window.location.href}`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header en Vert Institutionnel */}
      <section className="bg-gradient-to-b from-[#064E35] to-[#087747] text-white py-14 border-b border-[#087747]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A65A] font-semibold block">
              Espace Éditorial
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Actualités, Événements & Communiqués Officiels
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Suivez la vie institutionnelle du Pionnier Club International, les dates des prochaines assemblées générales et les bilans des actions de solidarité.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#087747] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat === 'all' ? 'Toutes les parutions' : cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl p-6 md:p-7 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-[#087747]/40 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
                <span className="font-semibold text-[#087747]">{item.category}</span>
                <span className="text-stone-400 font-mono text-[11px]">{item.date}</span>
              </div>

              <h2 className="font-display text-lg font-bold text-stone-900 leading-snug">
                {item.title}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
                {item.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setReadingArticle(item)}
                className="text-xs font-semibold text-[#087747] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lire le communiqué</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleShare(item)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                title="Partager"
                aria-label="Partager cet article"
              >
                {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-[#FAF9F4] text-[#171B18] max-w-3xl w-full rounded-2xl shadow-2xl border border-stone-300 p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#087747]">{readingArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500">{readingArticle.date}</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                aria-label="Fermer l'article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {readingArticle.title}
              </h2>
              <div className="text-xs text-stone-500 font-medium">
                Par : {readingArticle.author}
              </div>

              <div className="pt-4 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => handleShare(readingArticle)}
                className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager cette parution</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#087747] hover:bg-[#064E35] rounded-md transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
