import React from 'react';
import { ScreenId } from '../types/horror';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface HeaderNavProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  audioActive: boolean;
  onToggleAudio: () => void;
  onOpenQuickDossier: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeScreen,
  onSelectScreen,
  audioActive,
  onToggleAudio,
  onOpenQuickDossier,
}) => {
  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'chronicles', label: 'Chronicles' },
    { id: 'cipher', label: 'Cipher Room' },
    { id: 'specimens', label: 'Specimen Drawer' },
    { id: 'crucible', label: 'Crucible' },
    { id: 'dossier', label: 'Dossier Log' },
  ];

  const handleNavClick = (id: ScreenId) => {
    audioEngine.playTypewriterKey();
    onSelectScreen(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#272727] bg-[#0e0e0e]/95 backdrop-blur-sm px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => handleNavClick('chronicles')}
          className="text-lg md:text-xl font-extrabold tracking-tight text-[#f5f5f5] whitespace-nowrap shrink-0 hover:text-[#ff7518] transition-colors uppercase font-[var(--font-epilogue)] text-left cursor-pointer"
        >
          Blackwell Ossuary
        </button>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase font-[var(--font-space)] text-[#b8b8b8]">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b ${
                  isActive
                    ? 'text-[#f5f5f5] border-[#b00020] font-bold'
                    : 'border-transparent hover:text-[#f5f5f5] hover:border-[#ff7518]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Fixed Audio HUD Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio Candle Toggle Button (Fixed-position minimal HUD control 40x40px) */}
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onToggleAudio();
            }}
            title={audioActive ? 'Dampen Sub-Bass Ambience' : 'Ignite Candle & Sub-Bass Ambience'}
            aria-label="Toggle atmospheric audio"
            className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer relative ${
              audioActive
                ? 'bg-[#1a1a1a] border-[#ff7518] text-[#ff7518] candle-glow-active'
                : 'bg-[#121212] border-[#272727] text-[#666666] hover:border-[#b8b8b8] hover:text-[#b8b8b8]'
            }`}
          >
            {audioActive ? (
              <div className="flex items-center justify-center">
                <Flame className="w-4 h-4 animate-pulse" />
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {audioActive && (
              <span className="sr-only">Ambient Audio Active</span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onOpenQuickDossier();
            }}
            className="btn-blood-velvet px-4 py-2 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sanctum Log
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-4 overflow-x-auto pt-3 pb-1 border-t border-[#272727]/60 mt-2 text-xs font-semibold tracking-wider uppercase font-[var(--font-space)] text-[#b8b8b8]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${
              activeScreen === item.id
                ? 'text-[#f5f5f5] border-b-2 border-[#b00020]'
                : 'hover:text-[#f5f5f5]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
