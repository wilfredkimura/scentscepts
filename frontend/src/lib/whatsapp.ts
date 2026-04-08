export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  items: Array<{
    name: string;
    brand: string;
    selectedSize: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export const formatWhatsAppMessage = (data: CheckoutData): string => {
  const WHATSAPP_NUMBER = "254716052342"; // Placeholder: Business WhatsApp Number
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  let message = `*🏛️ SCENTCEPTS — DIGITAL INVOICE*\n`;
  message += `_House of Luxury Olfaction_\n`;
  message += `------------------------------------------\n\n`;

  message += `*ORDER REF:* #${Math.random().toString(36).substring(7).toUpperCase()}\n`;
  message += `*DATE:* ${timestamp}\n\n`;

  message += `*👤 CUSTOMER DETAILS*\n`;
  message += `*Name:* ${data.name.trim()}\n`;
  message += `*Phone:* ${data.phone.trim()}\n`;
  message += `*Address:* ${data.address.trim()}\n\n`;

  message += `*🛍️ ORDER SUMMARY*\n`;
  data.items.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `${index + 1}. *${item.brand.toUpperCase()}* — ${item.name}\n`;
    message += `   _Size:_ ${item.selectedSize.toUpperCase()}\n`;
    message += `   _Qty:_ ${item.quantity} x KSh ${item.price.toLocaleString()}\n`;
    message += `   _Subtotal:_ *KSh ${subtotal.toLocaleString()}*\n\n`;
  });

  message += `*💳 FINANCIAL SUMMARY*\n`;
  message += `*TOTAL AMOUNT:* KSh ${data.total.toLocaleString()}\n`;
  message += `*PAYMENT STATUS:* _Pending Confirmation_\n`;
  message += `------------------------------------------\n\n`;

  message += `*ACTION REQUIRED:*\n`;
  message += `Please reply with "CONFIRM" to process this order. Our concierge will contact you shortly regarding delivery.\n\n`;
  message += `_Thank you for choosing Scentcepts Society._`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
