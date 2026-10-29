import React from 'react';
import { CartItem } from '../types/shop';
import { formatPrice } from '../data/products';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToCatalog,
  onNavigateToCheckout,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const estimatedDelivery = subtotal > 0 ? 1500 : 0;
  const grandTotal = subtotal + estimatedDelivery;

  return (
    <div className="w-full pb-16 px-4 sm:px-6 pt-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#272727] text-xs font-[var(--font-space)]">
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onNavigateToCatalog();
            }}
            className="flex items-center gap-1.5 text-[#b8b8b8] hover:text-[#f5f5f5] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Продолжить выбор в каталоге</span>
          </button>

          <span className="text-[#666666] uppercase tracking-wider">
            Корзина реликвий ({items.reduce((sum, i) => sum + i.quantity, 0)} шт.)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-6">
          Корзина Заказа
        </h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="border border-[#272727] bg-[#121212] p-12 text-center my-6">
            <div className="w-16 h-16 bg-[#1a1a1a] border border-[#272727] flex items-center justify-center mx-auto mb-4 text-[#666666]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#f5f5f5] font-[var(--font-epilogue)] mb-2">
              Ваша корзина пуста
            </h2>
            <p className="text-xs font-[var(--font-courier)] text-[#b8b8b8] max-w-md mx-auto mb-6">
              Вы еще не выбрали ни одной реликвии. Ознакомьтесь с архивным реестром предметов для оформления доставки.
            </p>
            <button
              onClick={() => {
                audioEngine.playTypewriterKey();
                onNavigateToCatalog();
              }}
              className="btn-blood-velvet px-6 py-2.5 text-xs font-bold cursor-pointer"
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          /* Cart Items List & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-[#272727] bg-[#121212] divide-y divide-[#272727]">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Visual & Title */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="w-14 h-14 bg-[#161616] border border-[#272727] flex items-center justify-center text-2xl shrink-0">
                        {item.product.symbol}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-[#666666] font-mono uppercase mb-0.5">
                          {item.product.articul}
                        </div>
                        <h3 className="text-sm font-bold text-[#f5f5f5] font-[var(--font-epilogue)] truncate mb-1">
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-[#b8b8b8] font-mono tabular-nums">
                          {formatPrice(item.product.price)} / шт.
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#272727]">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#272727] bg-[#1a1a1a] h-9">
                        <button
                          onClick={() => {
                            audioEngine.playTypewriterKey();
                            onUpdateQuantity(item.product.id, -1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-xs font-bold text-[#b8b8b8] hover:text-[#f5f5f5] hover:bg-[#201f1f] transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-9 text-center text-xs font-bold font-mono tabular-nums text-[#f5f5f5]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            audioEngine.playTypewriterKey();
                            onUpdateQuantity(item.product.id, 1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-xs font-bold text-[#b8b8b8] hover:text-[#f5f5f5] hover:bg-[#201f1f] transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-bold font-[var(--font-space)] text-[#f5f5f5] tabular-nums block">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          audioEngine.playStoneThud();
                          onRemoveItem(item.product.id);
                        }}
                        title="Удалить из корзины"
                        className="text-[#666666] hover:text-[#b00020] transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-between items-center text-xs font-[var(--font-space)] text-[#666666] pt-1">
                <span>Предметов в заказе: {items.reduce((s, i) => s + i.quantity, 0)}</span>
                <button
                  onClick={() => {
                    audioEngine.playStoneThud();
                    onClearCart();
                  }}
                  className="hover:text-[#b00020] uppercase cursor-pointer"
                >
                  Очистить корзину
                </button>
              </div>
            </div>

            {/* Order Summary Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="border border-[#272727] bg-[#121212] p-5 sm:p-6 sticky top-20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] pb-3 mb-4 border-b border-[#272727]">
                  Сводка заказа
                </h3>

                <div className="space-y-3 text-xs font-[var(--font-courier)] text-[#b8b8b8] pb-4 mb-4 border-b border-[#272727]">
                  <div className="flex justify-between">
                    <span>Сумма товаров:</span>
                    <span className="font-mono text-[#f5f5f5] tabular-nums font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка курьером:</span>
                    <span className="font-mono text-[#f5f5f5] tabular-nums">
                      {formatPrice(estimatedDelivery)}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#666666]">
                    * Окончательный выбор способа доставки на следующем шаге.
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-xs font-bold font-[var(--font-space)] text-[#666666] uppercase">
                    Итого к оплате:
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold font-[var(--font-space)] text-[#f5f5f5] tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                {/* Checkout Primary Button */}
                <button
                  onClick={() => {
                    audioEngine.playTypewriterKey();
                    onNavigateToCheckout();
                  }}
                  className="w-full btn-blood-velvet py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mb-3"
                >
                  <span>Оформить заказ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-[11px] font-[var(--font-space)] text-[#666666] justify-center text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff7518]" />
                  <span>Оплата при получении курьеру / Kaspi</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
