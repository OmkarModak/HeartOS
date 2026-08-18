import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface WarningScreenProps {
  onProceed: () => void;
}

export const WarningScreen = ({ onProceed }: WarningScreenProps) => {
  return (
    <motion.div
      className="glass-panel"
      style={{ 
        padding: '2.5rem', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        maxWidth: '500px',
        margin: '0 auto'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', justifyContent: 'center', color: 'var(--accent-purple)' }}
      >
        <AlertTriangle size={60} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="glow-text" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--accent-purple)' }}>
          Wait a second...
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          The next chapter gets a little personal. I wanted to give you a heads up before we continue.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary glow-button"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-purple)' }}
          onClick={onProceed}
        >
          Proceed <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
