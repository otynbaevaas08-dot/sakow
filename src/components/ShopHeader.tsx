import React from 'react';
import { PageType } from '../types/shop';
import { ShoppingBag, Flame, VolumeX, Shield, Compass } from 'lucide-react';
import { formatPrice } from '../data/products';
import { audioEngine } from '../services/audioEngine';

interface ShopHeaderProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
  cartTotal: number;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  activePage,
  onNavigate,
  cartCount,
  cartTotal,
  audioActive,
  onToggleAudio,
}) => {
  const handleNavClick = (page: PageType) => {
    audioEngine.playTypewriterKey();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#272727] bg-[#0e0e0e]/95 backdrop-blur-md px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('catalog')}
          className="text-left cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-7 h-7 bg-[#1a1a1a] border border-[#272727] flex items-center justify-center group-hover:border-[#ff7518] transition-colors shrink-0">
            <span className="font-mono text-xs text-[#ff7518] font-bold">🜂</span>
          </div>
          <div>
            <div className="text-base sm:text-lg font-extrabold tracking-tight text-[#f5f5f5] uppercase font-[var(--font-epilogue)] group-hover:text-[#ff7518] transition-colors leading-none">
              Обсидиан
            </div>
            <div className="text-[10px] text-[#666666] font-[var(--font-space)] tracking-widest uppercase mt-0.5 hidden xs:block">
              Лавка Реликвий
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase font-[var(--font-space)] text-[#b8b8b8]">
          <button
            onClick={() => handleNavClick('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b ${
              activePage === 'catalog'
                ? 'text-[#f5f5f5] border-[#b00020] font-bold'
                : 'border-transparent hover:text-[#f5f5f5] hover:border-[#ff7518]'
            }`}
          >
            Каталог
          </button>
          <button
            onClick={() => handleNavClick('cart')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b ${
              activePage === 'cart' || activePage === 'checkout'
                ? 'text-[#f5f5f5] border-[#b00020] font-bold'
                : 'border-transparent hover:text-[#f5f5f5] hover:border-[#ff7518]'
            }`}
          >
            Корзина ({cartCount})
          </button>
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              handleNavClick('catalog');
              const el = document.getElementById('about-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-b border-transparent hover:text-[#f5f5f5] hover:border-[#ff7518] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            О лавке
          </button>
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              handleNavClick('catalog');
              const el = document.getElementById('delivery-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-b border-transparent hover:text-[#f5f5f5] hover:border-[#ff7518] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            Доставка в ₸
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Fixed Audio HUD Candle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Audio Candle Atmosphere Button (40x40px) */}
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onToggleAudio();
            }}
            title={audioActive ? 'Приглушить амбиент свечи' : 'Зажечь свечу и включить амбиент'}
            aria-label="Переключить атмосферный звук"
            className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer relative ${
              audioActive
                ? 'bg-[#1a1a1a] border-[#ff7518] text-[#ff7518] candle-glow-active'
                : 'bg-[#121212] border-[#272727] text-[#666666] hover:border-[#b8b8b8] hover:text-[#b8b8b8]'
            }`}
          >
            {audioActive ? (
              <Flame className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Primary Action Button: Cart */}
          <button
            onClick={() => handleNavClick('cart')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-bold font-[var(--font-space)] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              cartCount > 0
                ? 'btn-blood-velvet'
                : 'btn-obsidian-ghost'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Корзина:</span>
            <span className="font-mono tabular-nums font-bold">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="hidden md:inline font-mono text-[11px] text-[#ffdad8]">
                · {formatPrice(cartTotal)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
