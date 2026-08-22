import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';

interface CheckoutScreenProps {
  data: { venue: string; customDate?: string };
  onComplete: () => void;
}

export const CheckoutScreen = ({ data, onComplete }: CheckoutScreenProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete();
    }, 1500); // Small fake delay for effect
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
        <motion.div key="checkout" exit={{ opacity: 0, scale: 0.9 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <CreditCard size={40} color="var(--accent-pink)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 className="glow-text" style={{ fontSize: '1.8rem' }}>Date Verified.</h2>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subscription Plan</span>
              <span style={{ color: 'white', fontWeight: 600 }}>HeartOS Premium ❤️</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Date</span>
              <span style={{ color: 'white' }}>{data.customDate || 'Oct 4th, 12:42 PM'}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Venue</span>
              <span style={{ color: 'white' }}>{data.venue}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Total</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Rs 199.00</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Since you already paid in v2.0... 😉
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="btn-primary glow-button"
              style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', width: '100%' }}
            >
              {isSubmitting ? (
                <Loader2 size={20} className="spin" style={{ margin: '0 auto' }} />
              ) : (
                "Proceed to Final Step ✨"
              )}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
