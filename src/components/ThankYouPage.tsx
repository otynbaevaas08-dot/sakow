import React from 'react';
import { OrderRecord } from '../types/shop';
import { formatPrice } from '../data/products';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface ThankYouPageProps {
  order: OrderRecord;
  onReturnToCatalog: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  order,
  onReturnToCatalog,
}) => {
  const handlePrint = () => {
    audioEngine.playTypewriterKey();
    window.print();
  };

  return (
    <div className="w-full pb-16 px-4 sm:px-6 pt-8">
      <div className="max-w-2xl mx-auto">
        {/* Double Hairline Parchment Frame for Official Order Certificate */}
        <div className="parchment-frame mb-8">
          <div className="parchment-frame-inner p-6 sm:p-10 bg-[#121212]">
            {/* Header Badge & Title */}
            <div className="text-center pb-6 mb-6 border-b border-[#272727]">
              <div className="w-14 h-14 bg-[#1a1a1a] border border-[#ff7518] text-[#ff7518] shadow-[0_0_20px_rgba(255,117,24,0.3)] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-[10px] font-bold tracking-widest uppercase text-[#ff7518] font-[var(--font-space)] mb-1">
                Квитанция архива «Обсидиан»
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-2">
                Заказ № {order.orderNumber} Принят
              </h1>

              <p className="text-xs font-[var(--font-courier)] text-[#b8b8b8]">
                Уведомление успешно доставлено хранителю через Telegram Bot API.
              </p>
            </div>

            {/* Confirmation Note */}
            <div className="p-4 bg-[#1a1a1a] border border-[#272727] text-xs font-[var(--font-courier)] text-[#e5e2e1] mb-6 leading-relaxed">
              <span className="font-bold font-[var(--font-space)] text-[#ff7518] uppercase tracking-wider block mb-1">
                Статус исполнения:
              </span>
              <p>
                Ваш заказ зафиксирован в реестре. Наш специалист свяжется с вами по номеру{' '}
                <strong className="text-[#f5f5f5]">{order.customer.phone}</strong> в течение 15 минут для подтверждения времени доставки.
              </p>
            </div>

            {/* Customer Details */}
            <div className="border border-[#272727] p-4 bg-[#161616] mb-6 text-xs font-[var(--font-courier)]">
              <div className="text-[11px] font-bold font-[var(--font-space)] uppercase tracking-wider text-[#666666] mb-3 pb-2 border-b border-[#272727]">
                Реквизиты получателя
              </div>
              <div className="space-y-1.5 text-[#b8b8b8]">
                <div><span className="text-[#666666]">Покупатель:</span> <strong className="text-[#f5f5f5]">{order.customer.name}</strong></div>
                <div><span className="text-[#666666]">Телефон:</span> <strong className="text-[#f5f5f5]">{order.customer.phone}</strong></div>
                <div><span className="text-[#666666]">Адрес доставки:</span> <span className="text-[#f5f5f5]">{order.customer.address || 'Самовывоз из хранилища'}</span></div>
                {order.customer.comment && (
                  <div><span className="text-[#666666]">Комментарий:</span> <span className="text-[#f5f5f5]">{order.customer.comment}</span></div>
                )}
                <div><span className="text-[#666666]">Дата фиксации:</span> <span className="text-[#ff7518] font-mono">{order.createdAt}</span></div>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="border border-[#272727] p-4 mb-6">
              <div className="text-[11px] font-bold font-[var(--font-space)] uppercase tracking-wider text-[#666666] mb-3 pb-2 border-b border-[#272727]">
                Состав посылки ({order.items.length} наим.)
              </div>
              <div className="divide-y divide-[#272727] text-xs font-[var(--font-courier)]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[#f5f5f5] font-bold truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[10px] text-[#666666]">
                        {item.quantity} шт. × {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <span className="font-mono text-[#f5f5f5] font-bold tabular-nums">
                      {formatPrice(item.quantity * item.product.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="pt-4 mt-3 border-t border-[#272727] flex items-baseline justify-between">
                <span className="text-xs font-bold font-[var(--font-space)] text-[#666666] uppercase">
                  Итоговая сумма к оплате:
                </span>
                <span className="text-xl font-extrabold font-[var(--font-space)] text-[#f5f5f5] tabular-nums">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto btn-obsidian-ghost px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Распечатать чек</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playTypewriterKey();
                  onReturnToCatalog();
                }}
                className="w-full sm:w-auto btn-blood-velvet px-6 py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Вернуться в каталог</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
