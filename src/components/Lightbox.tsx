import React from 'react';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  caption?: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageUrl, title, caption, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[92vh] flex flex-col items-center bg-[#171B18] rounded-xl overflow-hidden border border-stone-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between px-6 py-3.5 bg-stone-900 border-b border-stone-800 text-stone-200">
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wide">{title}</h4>
            {caption && <p className="text-[11px] text-stone-400">{caption}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Fermer la vue plein écran"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center max-h-[78vh]">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain rounded shadow-lg"
          />
        </div>

        {/* Footer info */}
        <div className="w-full py-2.5 px-6 bg-stone-950 text-center text-[11px] text-stone-400 border-t border-stone-800">
          Document et archives officiels Pionnier Club International
        </div>
      </div>
    </div>
  );
};
