export const TOKEN = "9292524346:AAG8mnlIm5Mm1pn6at2My4aQ4FHXqYMfORE";
export const CHAT_ID = "5074390027".trim();

import { CartItem, CheckoutFormData } from '../types/shop';
import { formatPrice } from '../data/products';

export interface TelegramSendResult {
  success: boolean;
  messageId?: number;
  errorMessage?: string;
}

export function buildTelegramOrderMessage(
  orderNumber: string,
  items: CartItem[],
  totalAmount: number,
  customer: CheckoutFormData
): string {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const deliveryMethodLabels: Record<string, string> = {
    courier: 'Курьерская доставка по Казахстану (1 500 ₸)',
    express: 'Срочная доставка день-в-день (3 000 ₸)',
    pickup: 'Самовывоз из хранилища (бесплатно)',
  };

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
    `💰 Итого к оплате: ${formatPrice(totalAmount)}`,
    `🚚 Способ доставки: ${deliveryMethodLabels[customer.deliveryMethod] || 'Курьер'}`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 Данные покупателя:`,
    `• Имя: ${customer.name}`,
    `• Телефон: ${customer.phone}`,
    `• Адрес: ${customer.address.trim() || 'Не указан / Самовывоз'}`,
    `• Комментарий: ${customer.comment.trim() || 'Нет комментария'}`,
    `━━━━━━━━━━━━━━━━━━`,
    `📅 Дата и время: ${dateFormatted}`,
  ].join('\n');

  return message;
}

export async function sendOrderToTelegram(
  orderNumber: string,
  items: CartItem[],
  totalAmount: number,
  customer: CheckoutFormData
): Promise<TelegramSendResult> {
  const message = buildTelegramOrderMessage(orderNumber, items, totalAmount, customer);

  try {
    const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
      method: "POST",
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        errorMessage: (errorData as { description?: string }).description || `HTTP ошибка ${response.status}`,
      };
    }

    const data = await response.json();
    if (data && data.ok === true) {
      return {
        success: true,
        messageId: data.result?.message_id,
      };
    } else {
      return {
        success: false,
        errorMessage: data?.description || 'Telegram Bot API вернул статус ok: false',
      };
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Сетевая ошибка при отправке в Telegram',
    };
  }
}
