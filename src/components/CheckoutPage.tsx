export const TOKEN = "9292524346:AAG8mnlIm5Mm1pn6at2My4aQ4FHXqYMfORE";
export const CHAT_ID = "5074390027".trim();

import React, { useState } from 'react';
import { CartItem, CheckoutFormData, OrderRecord } from '../types/shop';
import { formatPrice } from '../data/products';
import { ArrowLeft, ShieldCheck, AlertTriangle, Send, Loader2, Check } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToCart: () => void;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBackToCart,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    address: '',
    comment: '',
    deliveryMethod: 'courier',
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === 'express' ? 3000 : formData.deliveryMethod === 'courier' ? 1500 : 0;
  const grandTotal = subtotal + deliveryFee;

  const validate = (): boolean => {
    const errors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Пожалуйста, введите ваше имя (обязательно)';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Пожалуйста, введите номер телефона (обязательно)';
    } else if (formData.phone.trim().length < 8) {
      errors.phone = 'Введите корректный номер телефона (не менее 8 цифр)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      audioEngine.playStoneThud();
      return;
    }

    if (items.length === 0) {
      setErrorMessage('В корзине нет товаров для оформления.');
      return;
    }

    setIsSubmitting(true);
    audioEngine.playTypewriterKey();

    // Generate readable order number
    const orderNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const deliveryLabels: Record<string, string> = {
      courier: 'Курьерская доставка по Казахстану (1 500 ₸)',
      express: 'Срочная доставка день-в-день (3 000 ₸)',
      pickup: 'Самовывоз из хранилища (бесплатно)',
    };

    // Format Russian message exactly as required
    const itemsList = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} [${item.product.articul}]\n   ${item.quantity} шт. × ${formatPrice(item.product.price)} = ${formatPrice(item.quantity * item.product.price)}`
      )
      .join('\n');

    const message = [
      `🛒 Новый заказ: № ${orderNumber}`,
      `━━━━━━━━━━━━━━━━━━`,
      `📦 Состав заказа:`,
      itemsList,
      `━━━━━━━━━━━━━━━━━━`,
      `💰 Итого к оплате: ${formatPrice(grandTotal)}`,
      `🚚 Доставка: ${deliveryLabels[formData.deliveryMethod]}`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 Данные покупателя:`,
      `• Имя: ${formData.name}`,
      `• Телефон: ${formData.phone}`,
      `• Адрес: ${formData.address.trim() || 'Не указан / Самовывоз'}`,
      `• Комментарий: ${formData.comment.trim() || 'Нет комментария'}`,
      `━━━━━━━━━━━━━━━━━━`,
      `📅 Дата и время: ${dateFormatted}`,
    ].join('\n');

    try {
      // Prompt specification:
      // fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", { method: "POST", body: new URLSearchParams({ chat_id: CHAT_ID, text: message }) })
      // Do not add custom headers.
      const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        body: new URLSearchParams({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (data && data.ok === true) {
        audioEngine.playCipherSuccess();
        const orderRecord: OrderRecord = {
          orderNumber,
          items,
          totalAmount: grandTotal,
          customer: formData,
          createdAt: dateFormatted,
          telegramMessageId: data.result?.message_id,
        };
        onOrderSuccess(orderRecord);
      } else {
        audioEngine.playStoneThud();
        const apiError = data?.description || `Ошибка Telegram API (Код ${response.status})`;
        setErrorMessage(`Не удалось отправить заказ в Telegram: ${apiError}. Пожалуйста, повторите попытку.`);
      }
    } catch (err) {
      audioEngine.playStoneThud();
      setErrorMessage(
        err instanceof Error
          ? `Ошибка соединения: ${err.message}`
          : 'Сетевая ошибка при связи с сервером Telegram.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pb-16 px-4 sm:px-6 pt-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#272727] text-xs font-[var(--font-space)]">
          <button
            onClick={() => {
              audioEngine.playTypewriterKey();
              onBackToCart();
            }}
            className="flex items-center gap-1.5 text-[#b8b8b8] hover:text-[#f5f5f5] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться в корзину</span>
          </button>

          <span className="text-[#666666] uppercase tracking-wider">
            Оформление заказа в ₸
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f5f5] font-[var(--font-epilogue)] tracking-tight mb-6">
          Данные Получателя & Доставка
        </h1>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="p-4 mb-6 border border-[#b00020] bg-[#1a1a1a] shadow-[0_0_20px_rgba(176,0,32,0.3)] text-xs font-[var(--font-courier)] text-[#f5f5f5] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#b00020] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold font-[var(--font-space)] uppercase tracking-wider text-[#b00020] block mb-1">
                Ошибка оформления заказа:
              </span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer Info Card */}
              <div className="border border-[#272727] bg-[#121212] p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] pb-3 mb-4 border-b border-[#272727]">
                  1. Контактная информация
                </h2>

                <div className="space-y-4">
                  {/* Name field (required) */}
                  <div>
                    <label className="block text-xs font-[var(--font-space)] text-[#b8b8b8] uppercase tracking-wider mb-1.5">
                      Имя и фамилия <span className="text-[#b00020]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                      }}
                      placeholder="Например: Артур Вейн"
                      className={`w-full p-3.5 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5] ${
                        validationErrors.name ? 'border-[#b00020]' : ''
                      }`}
                    />
                    {validationErrors.name && (
                      <span className="text-[11px] text-[#b00020] font-[var(--font-courier)] mt-1 block">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone field (required) */}
                  <div>
                    <label className="block text-xs font-[var(--font-space)] text-[#b8b8b8] uppercase tracking-wider mb-1.5">
                      Номер телефона <span className="text-[#b00020]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined });
                      }}
                      placeholder="+7 777 000 0000"
                      className={`w-full p-3.5 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5] ${
                        validationErrors.phone ? 'border-[#b00020]' : ''
                      }`}
                    />
                    {validationErrors.phone && (
                      <span className="text-[11px] text-[#b00020] font-[var(--font-courier)] mt-1 block">
                        {validationErrors.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Details Card */}
              <div className="border border-[#272727] bg-[#121212] p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] pb-3 mb-4 border-b border-[#272727]">
                  2. Способ доставки в Казахстане
                </h2>

                <div className="space-y-3 mb-5">
                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'courier' })}
                    className={`p-3.5 border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.deliveryMethod === 'courier'
                        ? 'border-[#ff7518] bg-[#1a1a1a]'
                        : 'border-[#272727] bg-[#121212] hover:border-[#b8b8b8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border flex items-center justify-center ${formData.deliveryMethod === 'courier' ? 'border-[#ff7518] bg-[#ff7518]' : 'border-[#272727]'}`}>
                        {formData.deliveryMethod === 'courier' && <Check className="w-3 h-3 text-[#0e0e0e]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold font-[var(--font-epilogue)] text-[#f5f5f5]">
                          Курьерская доставка по Казахстану
                        </div>
                        <div className="text-[11px] text-[#666666] font-[var(--font-courier)]">
                          Срок: 1–3 рабочих дня в любой город РК
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#f5f5f5]">1 500 ₸</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    className={`p-3.5 border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.deliveryMethod === 'express'
                        ? 'border-[#ff7518] bg-[#1a1a1a]'
                        : 'border-[#272727] bg-[#121212] hover:border-[#b8b8b8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border flex items-center justify-center ${formData.deliveryMethod === 'express' ? 'border-[#ff7518] bg-[#ff7518]' : 'border-[#272727]'}`}>
                        {formData.deliveryMethod === 'express' && <Check className="w-3 h-3 text-[#0e0e0e]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold font-[var(--font-epilogue)] text-[#f5f5f5]">
                          Срочная доставка (Алматы & Астана)
                        </div>
                        <div className="text-[11px] text-[#666666] font-[var(--font-courier)]">
                          День-в-день в течение 4 часов
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#f5f5f5]">3 000 ₸</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                    className={`p-3.5 border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.deliveryMethod === 'pickup'
                        ? 'border-[#ff7518] bg-[#1a1a1a]'
                        : 'border-[#272727] bg-[#121212] hover:border-[#b8b8b8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border flex items-center justify-center ${formData.deliveryMethod === 'pickup' ? 'border-[#ff7518] bg-[#ff7518]' : 'border-[#272727]'}`}>
                        {formData.deliveryMethod === 'pickup' && <Check className="w-3 h-3 text-[#0e0e0e]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold font-[var(--font-epilogue)] text-[#f5f5f5]">
                          Самовывоз из хранилища
                        </div>
                        <div className="text-[11px] text-[#666666] font-[var(--font-courier)]">
                          г. Алматы, Архивный переулок, 7
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#ff7518]">Бесплатно</span>
                  </label>
                </div>

                {/* Address field */}
                <div className="mb-4">
                  <label className="block text-xs font-[var(--font-space)] text-[#b8b8b8] uppercase tracking-wider mb-1.5">
                    Адрес доставки (город, улица, дом, кв.)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Например: г. Алматы, пр. Достык 120, кв. 44"
                    className="w-full p-3.5 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5]"
                  />
                </div>

                {/* Comment field */}
                <div>
                  <label className="block text-xs font-[var(--font-space)] text-[#b8b8b8] uppercase tracking-wider mb-1.5">
                    Комментарий к заказу (время, домофон, пожелания)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Укажите код домофона или удобное время для звонка..."
                    className="w-full p-3.5 tactile-input text-xs font-[var(--font-courier)] text-[#f5f5f5] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Review & Submit (5 cols) */}
            <div className="lg:col-span-5">
              <div className="border border-[#272727] bg-[#121212] p-5 sm:p-6 sticky top-20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] font-[var(--font-space)] pb-3 mb-4 border-b border-[#272727]">
                  Состав заказа
                </h3>

                {/* Items preview */}
                <div className="divide-y divide-[#272727] max-h-56 overflow-y-auto pr-1 mb-4 text-xs font-[var(--font-courier)]">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[#f5f5f5] font-bold truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-[#666666]">
                          {item.quantity} шт. × {formatPrice(item.product.price)}
                        </div>
                      </div>
                      <span className="font-mono text-[#f5f5f5] tabular-nums shrink-0">
                        {formatPrice(item.quantity * item.product.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2.5 text-xs font-[var(--font-courier)] text-[#b8b8b8] pb-4 mb-4 border-y border-[#272727] pt-4">
                  <div className="flex justify-between">
                    <span>Сумма товаров:</span>
                    <span className="font-mono text-[#f5f5f5] tabular-nums font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span className="font-mono text-[#f5f5f5] tabular-nums">
                      {deliveryFee === 0 ? '0 ₸ (Самовывоз)' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-xs font-bold font-[var(--font-space)] text-[#666666] uppercase">
                    ИТОГО:
                  </span>
                  <span className="text-2xl font-extrabold font-[var(--font-space)] text-[#f5f5f5] tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-blood-velvet py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mb-4 ${
                    isSubmitting ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#ff7518]" />
                      <span>Отправка в архив Telegram...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Оформить заказ</span>
                    </>
                  )}
                </button>

                <div className="p-3 bg-[#1a1a1a] border border-[#272727] text-[11px] font-[var(--font-courier)] text-[#666666] leading-relaxed">
                  🔒 Без онлайн-оплаты картой. Данные заказа передаются напрямую в Telegram-бота администратора магазина.
                  Оплата при получении курьеру или Kaspi.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
