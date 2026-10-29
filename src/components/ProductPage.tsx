import React, { useState } from 'react';
import { Product } from '../types/shop';
import { formatPrice } from '../data/products';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface ProductPageProps {
  product: Product;
  onBackToCatalog: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateToCart: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBackToCatalog,
  onAddToCart,
  onNavigateToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      audioEngine.playTypewriterKey();
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    audioEngine.playTypewriterKey();
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    audioEngine.playTypewriterKey();
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const isCrimson = product.auraType === 'crimson';

  return (
    <div className="w-full pb-16 px-4 sm:px-6 pt-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb & Back Link */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#272727] text-xs font-[var(--font-space)]">
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onBackToCatalog();
            }}
            className="flex items-center gap-1.5 text-[#b8b8b8] hover:text-[#f5f5f5] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться в каталог</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[#666666]">
            <span>Каталог</span>
            <ChevronRight className="w-3 h-3" />
            <span>{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#f5f5f5] truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Main Product Layout (2-column desktop split, mobile stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Visual Artifact Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div
              className={`border border-[#272727] bg-[#121212] p-6 text-center relative ${
                isCrimson
                  ? 'shadow-[0_0_30px_rgba(176,0,32,0.22)]'
                  : 'shadow-[0_0_25px_rgba(255,117,24,0.18)]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-[var(--font-space)] text-[#666666] pb-3 mb-6 border-b border-[#272727]">
                <span className="font-mono">{product.articul}</span>
                <span className="text-[#ff7518] uppercase tracking-wider">{product.category}</span>
              </div>

              {/* Large Symbol Showcase */}
              <div className="w-full h-64 bg-[#161616] border border-[#272727] flex flex-col items-center justify-center p-6 mb-6">
                <span className="text-7xl mb-4 filter drop-shadow-[0_0_16px_rgba(255,117,24,0.4)]">
                  {product.symbol}
                </span>
                <div className="text-xs text-[#b8b8b8] font-[var(--font-courier)] uppercase tracking-widest">
                  Подлинный Артефакт Хранилища
                </div>
                <div className="text-[10px] text-[#666666] font-mono mt-1">
                  Свинцовая пломба подтверждена
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-left text-[11px] font-[var(--font-space)] text-[#b8b8b8] border-t border-[#272727] pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ff7518] shrink-0" />
                  <span>Оригинал 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#b00020] shrink-0" />
                  <span>Ручная доводка</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Articul & Category */}
              <div className="flex items-center gap-3 text-xs font-[var(--font-space)] text-[#666666] mb-2 uppercase tracking-wider">
                <span className="text-[#ff7518] font-mono">{product.articul}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#f5f5f5] font-bold">В НАЛИЧИИ</span>
              </div>

              {/* Headline (Epilogue) */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6 pb-5 border-b border-[#272727]">
                <span className="text-3xl font-extrabold font-[var(--font-space)] text-[#f5f5f5] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#666666] line-through font-mono tabular-nums">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-[#ff7518] font-[var(--font-space)] uppercase tracking-wider ml-2">
                  Включая НДС
                </span>
              </div>

              {/* Latin Inscription Box (Parchment Double Hairline Frame) */}
              {product.latinInscription && (
                <div className="parchment-frame mb-6">
                  <div className="parchment-frame-inner p-4 bg-[#121212]">
                    <div className="flex items-center justify-between text-[11px] font-bold font-[var(--font-space)] text-[#666666] uppercase mb-1">
                      <span>Гравировка на артефакте</span>
                      <button
                        onClick={() => {
                          audioEngine.playTypewriterKey();
                          setShowTranslation(!showTranslation);
                        }}
                        className="text-[#ff7518] hover:underline cursor-pointer lowercase"
                      >
                        {showTranslation ? '[скрыть перевод]' : '[перевести латынь]'}
                      </button>
                    </div>
                    <div className="text-sm font-bold font-[var(--font-courier)] text-[#f5f5f5] italic">
                      "{product.latinInscription}"
                    </div>
                    {showTranslation && product.latinTranslation && (
                      <div className="mt-2 pt-2 border-t border-[#272727] text-xs font-[var(--font-courier)] text-[#ff7518]">
                        Перевод: {product.latinTranslation}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Full Description (Courier Prime, 1.8x line-height) */}
              <div className="space-y-3 text-xs sm:text-sm font-[var(--font-courier)] text-[#b8b8b8] leading-[1.8] mb-8">
                {product.fullDescription.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Quantity Selector & Add to Cart Controls */}
              <div className="border border-[#272727] bg-[#121212] p-4 sm:p-5 mb-8">
                <div className="text-xs font-bold font-[var(--font-space)] uppercase text-[#666666] mb-3">
                  Количество и оформление
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#272727] bg-[#1a1a1a] h-11 shrink-0">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-10 h-full flex items-center justify-center text-sm font-bold text-[#b8b8b8] hover:text-[#f5f5f5] hover:bg-[#201f1f] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono tabular-nums text-[#f5f5f5]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="w-10 h-full flex items-center justify-center text-sm font-bold text-[#b8b8b8] hover:text-[#f5f5f5] hover:bg-[#201f1f] transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-blood-velvet h-11 px-6 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#f5f5f5]" />
                        <span>Добавлено в корзину!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Добавить в корзину ({formatPrice(product.price * quantity)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sub-action: Go to Cart */}
                {justAdded && (
                  <div className="mt-3 pt-3 border-t border-[#272727] flex items-center justify-between text-xs font-[var(--font-space)]">
                    <span className="text-[#ff7518]">Товар в вашей корзине</span>
                    <button
                      onClick={() => {
                        audioEngine.playTypewriterKey();
                        onNavigateToCart();
                      }}
                      className="text-[#f5f5f5] underline hover:text-[#ff7518] uppercase cursor-pointer"
                    >
                      Перейти к оформлению →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="border border-[#272727] bg-[#121212] p-5">
              <h3 className="text-xs font-bold font-[var(--font-space)] uppercase tracking-wider text-[#666666] mb-3">
                Характеристики экспоната
              </h3>
              <div className="divide-y divide-[#272727] text-xs font-[var(--font-courier)]">
                {product.specs.map((spec, i) => (
                  <div key={i} className="py-2 flex items-baseline justify-between gap-4">
                    <span className="text-[#666666] shrink-0">{spec.label}</span>
                    <span className="text-[#f5f5f5] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
