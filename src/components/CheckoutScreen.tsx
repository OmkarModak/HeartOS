import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CreditCard, Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CheckoutScreenProps {
  data: { date: string; time: string; food: string };
  onComplete: () => void;
}

export const CheckoutScreen = ({ data, onComplete }: CheckoutScreenProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

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

    // Generate cute PDF Receipt
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width / 2, canvas.height / 2]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save('HeartOS_Date_Invoice.pdf');
      } catch (err) {
        console.error("PDF generation failed", err);
      }
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
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

      {/* Hidden Receipt for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={receiptRef} style={{ width: '400px', background: '#fff', padding: '40px', color: '#000', fontFamily: 'sans-serif', borderRadius: '12px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#ff3366', margin: 0, fontSize: '28px', fontFamily: '"Fira Code", monospace' }}>HeartOS ❤️</h1>
            <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Subscription Invoice</p>
          </div>
          <hr style={{ borderTop: '2px dashed #ccc', borderBottom: 'none', margin: '20px 0' }} />
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>SUBSCRIBER</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>Shraddha</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>PROVIDER</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>Omkar</p>
            </div>
          </div>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: '#666' }}>Date:</span>
              <strong style={{ fontSize: '15px' }}>{data.date}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: '#666' }}>Time:</span>
              <strong style={{ fontSize: '15px' }}>{data.time}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Cuisine:</span>
              <strong style={{ fontSize: '15px', textAlign: 'right', maxWidth: '60%' }}>{data.food}</strong>
            </div>
          </div>
          <hr style={{ borderTop: '2px dashed #ccc', borderBottom: 'none', margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: '#ff3366' }}>Rs 199.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '15px', color: '#666' }}>
            <span>Payment Method:</span>
            <span>1 Smile 😊</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#27c93f', fontWeight: 'bold', fontSize: '22px', border: '3px solid #27c93f', padding: '15px', borderRadius: '8px', transform: 'rotate(-5deg)', width: 'fit-content', margin: '40px auto 0 auto', letterSpacing: '2px' }}>
            PAID IN FULL ❤️
          </div>
          <p style={{ textAlign: 'center', color: '#888', marginTop: '40px', fontSize: '12px' }}>
            Thank you for your subscription.<br/>See you there!
          </p>
        </div>
      </div>
    </>
  );
};
