import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckSquare, Square } from 'lucide-react';

interface WarningScreenProps {
  onProceed: () => void;
}

export const WarningScreen = ({ onProceed }: WarningScreenProps) => {
  const [agreed, setAgreed] = useState(false);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}
        onClick={() => setAgreed(!agreed)}
      >
        <div style={{ marginTop: '2px', color: agreed ? 'var(--accent-purple)' : '#888' }}>
          {agreed ? <CheckSquare size={20} /> : <Square size={20} />}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          I agree to not screenshot the following content and use it as blackmail material in future arguments.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <motion.button
          whileHover={agreed ? { scale: 1.05 } : {}}
          whileTap={agreed ? { scale: 0.95 } : {}}
          className={agreed ? "btn-primary glow-button" : "btn-secondary"}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: agreed ? 'var(--accent-purple)' : 'transparent',
            opacity: agreed ? 1 : 0.5,
            cursor: agreed ? 'pointer' : 'not-allowed'
          }}
          onClick={() => {
            if (agreed) onProceed();
          }}
          disabled={!agreed}
        >
          Proceed <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
