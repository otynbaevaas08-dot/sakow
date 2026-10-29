/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TOKEN = "9292524346:AAG8mnlIm5Mm1pn6at2My4aQ4FHXqYMfORE";
export const CHAT_ID = "5074390027".trim();

import React, { useState, useEffect } from 'react';
import { PageType, Product, CartItem, OrderRecord } from './types/shop';
import { PRODUCTS, formatPrice } from './data/products';
import { ShopHeader } from './components/ShopHeader';
import { CatalogPage } from './components/CatalogPage';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ThankYouPage } from './components/ThankYouPage';
import { audioEngine } from './services/audioEngine';
import { Check, ShoppingBag, ShieldCheck, PhoneCall, MapPin, Clock } from 'lucide-react';

const CART_STORAGE_KEY = 'obsidian_shop_cart_v1';
const LAST_ORDER_KEY = 'obsidian_shop_last_order_v1';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      { product: PRODUCTS[0], quantity: 1 }
    ];
  });

  // Last completed order for thank-you page
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return null;
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Audio ambience toggle
  const handleToggleAudio = () => {
    const nextState = !audioActive;
    setAudioActive(nextState);
    audioEngine.toggleAmbience(nextState, 35);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`«${product.name}» (${quantity} шт.) добавлен в корзину`);
  };

  // Update quantity (+1 or -1)
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Remove item completely
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Товар удален из корзины');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    showToast('Корзина полностью очищена');
  };

  // Select product for detail page
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle successful order from checkout
  const handleOrderSuccess = (order: OrderRecord) => {
    setCompletedOrder(order);
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    // Clear cart as required by user brief
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    setActivePage('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e2e1] flex flex-col relative selection:bg-[#b00020] selection:text-[#f5f5f5]">
      {/* 1. Static Atmospheric Vignette Overlay */}
      <div className="vignette-overlay" aria-hidden="true" />

      {/* 2. Micro-Noise Film Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Header */}
      <ShopHeader
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        cartTotal={cartSubtotal}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#121212] border border-[#ff7518] shadow-[0_0_24px_rgba(255,117,24,0.3)] text-xs font-[var(--font-space)] text-[#f5f5f5] flex items-center gap-3 animate-fade-in">
          <div className="w-5 h-5 bg-[#1a1a1a] border border-[#ff7518] flex items-center justify-center text-[#ff7518] shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Pages Router */}
      <main className="flex-1 w-full">
        {activePage === 'catalog' && (
          <CatalogPage
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
          />
        )}

        {activePage === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onBackToCatalog={() => setActivePage('catalog')}
            onAddToCart={handleAddToCart}
            onNavigateToCart={() => setActivePage('cart')}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigateToCatalog={() => setActivePage('catalog')}
            onNavigateToCheckout={() => setActivePage('checkout')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cart}
            onBackToCart={() => setActivePage('cart')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {activePage === 'thank-you' && completedOrder && (
          <ThankYouPage
            order={completedOrder}
            onReturnToCatalog={() => setActivePage('catalog')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#272727] bg-[#0e0e0e] py-10 px-4 sm:px-6 text-xs font-[var(--font-space)] text-[#666666]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#272727]">
          {/* Col 1: Wordmark */}
          <div className="space-y-3">
            <div className="text-base font-extrabold text-[#f5f5f5] uppercase font-[var(--font-epilogue)]">
              Обсидиан
            </div>
            <p className="text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed">
              Лавка готических реликвий, музейных раритетов и антикварных фолиантов. Ручная консервация и сертификаты подлинности.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="text-xs font-bold text-[#f5f5f5] uppercase tracking-wider mb-3">
              Разделы лавки
            </div>
            <ul className="space-y-2 text-[#b8b8b8] font-[var(--font-courier)]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff7518] cursor-pointer"
                >
                  Архивный каталог
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff7518] cursor-pointer"
                >
                  Корзина ({cartTotalCount})
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff7518] cursor-pointer"
                >
                  Оформление заказа
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delivery */}
          <div>
            <div className="text-xs font-bold text-[#f5f5f5] uppercase tracking-wider mb-3">
              Доставка в Казахстане
            </div>
            <ul className="space-y-2 text-[#b8b8b8] font-[var(--font-courier)]">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff7518] shrink-0" />
                <span>Алматы, Астана, Шымкент и вся РК</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b00020] shrink-0" />
                <span>Срок: 1–3 дня (1 500 ₸)</span>
              </li>
              <li>• Расчет строго в тенге (₸)</li>
            </ul>
          </div>

          {/* Col 4: Telegram & Contacts */}
          <div>
            <div className="text-xs font-bold text-[#f5f5f5] uppercase tracking-wider mb-3">
              Связь с хранителем
            </div>
            <p className="text-xs font-[var(--font-courier)] text-[#b8b8b8] leading-relaxed mb-3">
              Заказы принимаются через сайт и поступают моментально в Telegram Bot администратора.
            </p>
            <div className="p-2.5 bg-[#121212] border border-[#272727] text-[11px] font-mono text-[#ff7518]">
              Telegram ID: 5074390027
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
          <div>
            © 1889–2026 Хранилище «Обсидиан». Все права защищены.
          </div>
          <div className="text-[#b8b8b8] font-mono">
            MORS PATET NON OMNIBUS SED ELECTIS · ₸ KZT
          </div>
        </div>
      </footer>
    </div>
  );
}
