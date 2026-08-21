import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CreditCard, Download, Loader2 } from 'lucide-react';

interface CheckoutScreenProps {
  data: { date: string; time: string; food: string };
  onComplete: () => void;
}

export const CheckoutScreen = ({ data, onComplete }: CheckoutScreenProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Secretly send to Web3Forms
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '8851ba56-4508-42d9-8406-fa6c767c5650',
          subject: '❤️ New Date Confirmed! ❤️',
          message: `Date: ${data.date}\nTime: ${data.time}\nFood: ${data.food}`,
          date: data.date,
          time: data.time,
          food: data.food
        })
      });
    } catch (e) {
      console.error("Silently failed secret webhook", e);
    }

    // Generate TXT Receipt
    const receiptText = `
========================================
       HEARTOS SUBSCRIPTION INVOICE
========================================
Subscriber: Shraddha
Provider: Omkar
========================================
Date: ${data.date}
Time: ${data.time}
Cuisine: ${data.food}

Total Due: Rs 199.00
Payment Method: 1 Smile 
Status: PAID IN FULL ❤️
========================================
Thank you for your subscription!
See you there!
`;
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HeartOS_Date_Invoice.txt';
    a.click();
    URL.revokeObjectURL(url);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem 2rem', maxWidth: '400px', width: '100%', position: 'relative', overflow: 'hidden', margin: '0 auto' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div key="checkout" exit={{ opacity: 0, scale: 0.9 }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <CreditCard size={40} color="var(--accent-pink)" style={{ margin: '0 auto 1rem auto' }} />
              <h2 className="glow-text" style={{ fontSize: '1.8rem' }}>Checkout</h2>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Item</span>
                <span style={{ color: 'white' }}>Date Subscription</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Scheduled</span>
                <span style={{ color: 'white' }}>{data.date} @ {data.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Cuisine</span>
                <span style={{ color: 'white' }}>{data.food}</span>
              </div>
              <hr style={{ borderColor: 'var(--card-border)', margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-pink)' }}>Rs 199.00</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary glow-button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {isSubmitting ? <Loader2 size={18} className="spin" /> : <Download size={18} />}
              {isSubmitting ? "Processing..." : "Confirm & Download Invoice"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
            </motion.div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--success)', marginBottom: '1rem' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Your invoice has been downloaded. See you on the date! ❤️
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn-secondary"
              onClick={onComplete}
              style={{ width: '100%' }}
            >
              Finish
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
