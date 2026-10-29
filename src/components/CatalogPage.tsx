import React, { useState } from 'react';
import { Product } from '../types/shop';
import { CATEGORIES, formatPrice } from '../data/products';
import { Search, ShoppingBag, Eye, ArrowUpRight, ShieldCheck, Truck, Sparkles, Filter } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface CatalogPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = products
    .filter((item) => {
      const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.articul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    audioEngine.playTypewriterKey();
    onAddToCart(product);
  };

  return (
    <div className="w-full pb-16">
      {/* Hero Banner Section */}
      <section className="relative border-b border-[#272727] bg-[#0e0e0e] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-[var(--font-space)] text-[#ff7518] tracking-widest uppercase mb-3">
            <span>Августейший Архивной Репозиторий</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1889</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-4">
            Реликвии, Манускрипты & Теневые Раритеты
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed mb-8">
            Подлинные предметы оккультной истории, антикварные хирургические клинки, герметичные реликварии и свитки ручной работы.
            Доставка курьером по всему Казахстану.
          </p>

          {/* Quick Trust Markers */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-[var(--font-space)] text-[#666666] uppercase tracking-wider pt-4 border-t border-[#272727]/60">
            <span className="flex items-center gap-1.5 text-[#b8b8b8]">
              <ShieldCheck className="w-4 h-4 text-[#ff7518]" />
              <span>Музейная консервация</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#b8b8b8]">
              <Truck className="w-4 h-4 text-[#b00020]" />
              <span>Доставка по Казахстану в ₸</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#b8b8b8]">
              <Sparkles className="w-4 h-4 text-[#ff7518]" />
              <span>Сертификат подлинности</span>
            </span>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="border border-[#272727] bg-[#121212] p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-[#272727]">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию, артикулу или описанию..."
                className="w-full pl-10 pr-4 py-2.5 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5] placeholder:text-[#666666]"
              />
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-[#666666] font-[var(--font-space)] uppercase tracking-wider">
                Сортировка:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#1a1a1a] border border-[#272727] text-xs font-[var(--font-space)] text-[#f5f5f5] px-3 py-2.5 outline-none focus:border-[#ff7518] cursor-pointer"
              >
                <option value="featured">По популярности</option>
                <option value="price-asc">Сначала дешевле (₸)</option>
                <option value="price-desc">Сначала дороже (₸)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs font-semibold text-[#666666] font-[var(--font-space)] uppercase tracking-wider mr-2 hidden sm:inline">
              Категории:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    audioEngine.playTypewriterKey();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold font-[var(--font-space)] uppercase tracking-wider transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#1a1a1a] text-[#f5f5f5] border-[#b00020] shadow-[0_0_12px_rgba(176,0,32,0.3)]'
                      : 'bg-[#121212] text-[#b8b8b8] border-[#272727] hover:border-[#b8b8b8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-[var(--font-space)] text-[#666666] mb-6">
          <span>Найдено артефактов: <span className="text-[#f5f5f5] font-mono tabular-nums font-bold">{filteredProducts.length}</span></span>
          <span className="text-[#ff7518]">Все цены указаны в казахстанских тенге (₸)</span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="border border-[#272727] bg-[#121212] p-12 text-center my-8">
            <p className="text-sm font-[var(--font-courier)] text-[#b8b8b8] mb-3">
              По вашему запросу ничего не найдено в архивном реестре.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Все');
                setSearchQuery('');
              }}
              className="btn-obsidian-ghost px-4 py-2 text-xs font-semibold"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isCrimson = product.auraType === 'crimson';
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    audioEngine.playStoneThud();
                    onSelectProduct(product);
                  }}
                  className={`border border-[#272727] bg-[#121212] p-5 cursor-pointer card-aura-hover flex flex-col justify-between group relative ${
                    isCrimson
                      ? 'hover:shadow-[0_0_26px_rgba(176,0,32,0.28)] hover:border-[#5b403e]'
                      : 'hover:shadow-[0_0_22px_rgba(255,117,24,0.24)] hover:border-[#5b403e]'
                  }`}
                >
                  <div>
                    {/* Top strip: Articul & Stock */}
                    <div className="flex items-center justify-between text-[11px] font-[var(--font-space)] text-[#666666] pb-2.5 mb-3 border-b border-[#272727]">
                      <span className="font-mono uppercase">{product.articul}</span>
                      <span className="text-[#ff7518] uppercase tracking-wider">{product.category}</span>
                    </div>

                    {/* Visual Artifact Box */}
                    <div className="w-full h-40 bg-[#161616] border border-[#272727] flex flex-col items-center justify-center p-4 mb-4 relative overflow-hidden group-hover:border-[#ff7518] transition-colors">
                      <span className="text-4xl mb-2 filter drop-shadow-[0_0_8px_rgba(255,117,24,0.3)]">
                        {product.symbol}
                      </span>
                      <div className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                        Реликвия № {product.articul.split('-')[1]}
                      </div>
                      {product.featured && (
                        <div className="absolute top-2 right-2 text-[9px] bg-[#b00020] text-[#f5f5f5] font-[var(--font-space)] font-bold px-1.5 py-0.5 tracking-wider uppercase">
                          Редкость
                        </div>
                      )}
                    </div>

                    {/* Product Title (Epilogue) */}
                    <h3 className="text-base font-bold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-2 group-hover:text-[#ff7518] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Short Description (Courier Prime) */}
                    <p className="text-xs text-[#b8b8b8] font-[var(--font-courier)] leading-relaxed line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#272727]">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold font-[var(--font-space)] text-[#f5f5f5] tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-[#666666] line-through font-mono tabular-nums">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          audioEngine.playStoneThud();
                          onSelectProduct(product);
                        }}
                        className="btn-obsidian-ghost py-2 text-[11px] font-semibold text-center cursor-pointer"
                      >
                        Детали
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="btn-blood-velvet py-2 text-[11px] font-bold text-center flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Купить</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Information Section: About & Delivery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Section */}
          <div id="about-section" className="border border-[#272727] bg-[#121212] p-6 sm:p-8">
            <span className="text-[10px] font-bold text-[#ff7518] font-[var(--font-space)] tracking-widest uppercase block mb-1">
              Архивная концепция
            </span>
            <h2 className="text-xl font-bold text-[#f5f5f5] font-[var(--font-epilogue)] mb-3">
              О лавке «Обсидиан»
            </h2>
            <p className="text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed mb-4">
              Мы собираем редкие исторические и готические артефакты, антикварные фолианты и авторские реликвии ручной ковки.
              Каждый предмет проходит очистку, патинацию и проверку в нашей мастерской перед внесением в каталог.
            </p>
            <div className="p-3 bg-[#1a1a1a] border border-[#272727] text-[11px] font-[var(--font-courier)] text-[#f5f5f5] italic">
              «MORS PATET NON OMNIBUS SED ELECTIS» — Все предметы поставляются в бескислородной упаковке с сургучной печатью.
            </div>
          </div>

          {/* Delivery Section */}
          <div id="delivery-section" className="border border-[#272727] bg-[#121212] p-6 sm:p-8">
            <span className="text-[10px] font-bold text-[#ff7518] font-[var(--font-space)] tracking-widest uppercase block mb-1">
              Условия получения
            </span>
            <h2 className="text-xl font-bold text-[#f5f5f5] font-[var(--font-epilogue)] mb-3">
              Доставка и оплата в Казахстане
            </h2>
            <ul className="space-y-2.5 text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed mb-4">
              <li>• <strong className="text-[#f5f5f5]">Курьерская служба по Казахстану:</strong> 1–3 дня (1 500 ₸).</li>
              <li>• <strong className="text-[#f5f5f5]">Экспресс-доставка (Алматы, Астана):</strong> в день заказа (3 000 ₸).</li>
              <li>• <strong className="text-[#f5f5f5]">Самовывоз из хранилища:</strong> бесплатно.</li>
              <li>• <strong className="text-[#f5f5f5]">Оплата:</strong> наличными курьеру или Kaspi при получении.</li>
            </ul>
            <div className="text-[11px] font-[var(--font-space)] text-[#666666]">
              При оформлении заказа заявка моментально поступает хранителю через Telegram Bot.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
