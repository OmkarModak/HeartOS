import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const V4WarningScreen = ({ onProceed }: { onProceed: () => void }) => {
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        transition={{ duration: 0.8 }}
        style={{ padding: '4rem 3rem', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255, 51, 102, 0.3)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ background: 'rgba(255, 51, 102, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
            <Lock size={48} color="var(--accent-pink)" />
          </div>
        </motion.div>

        <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '2px' }}>
          THE GATE OF TRUST
        </h2>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', marginBottom: '2.5rem', borderLeft: '4px solid var(--accent-pink)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', fontStyle: 'italic' }}>
            "The following information is highly personal. I have never shared these truths with anyone before."
          </p>
          <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>
            Please proceed only if you are truly into me, and promise to hold this with trust.
          </p>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '2.5rem', cursor: 'pointer', textAlign: 'left' }}>
          <input 
            type="checkbox" 
            checked={acknowledged} 
            onChange={(e) => setAcknowledged(e.target.checked)} 
            style={{ width: '20px', height: '20px', accentColor: 'var(--accent-pink)', cursor: 'pointer' }}
          />
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', userSelect: 'none' }}>
            I acknowledge and promise to keep this trust.
          </span>
        </label>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 51, 102, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          disabled={!acknowledged}
          className="btn-primary"
          style={{
            padding: '1.2rem 3rem',
            fontSize: '1.2rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            background: 'linear-gradient(45deg, #ff3366, #ff6b6b)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            cursor: acknowledged ? 'pointer' : 'not-allowed',
            opacity: acknowledged ? 1 : 0.5,
            boxShadow: acknowledged ? '0 4px 15px rgba(255, 51, 102, 0.2)' : 'none'
          }}
        >
          I Promise
        </motion.button>
      </motion.div>
    </div>
  );
};
