import { motion } from 'framer-motion';
import { CheckSquare, Bug } from 'lucide-react';

interface QASignoffProps {
  onComplete: () => void;
}

export const QASignoff = ({ onComplete }: QASignoffProps) => {
  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '2.5rem', maxWidth: '500px', width: '100%' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="glow-text" style={{ fontSize: '1.8rem', color: 'var(--accent-pink)', marginBottom: '0.5rem' }}>
          HeartOS Pre-Release QA Form
        </h2>
        <p style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
          Document ID: HOS-2026-QA
        </p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', fontFamily: 'monospace', fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--text-secondary)' }}>Developer:</span> Omkar</p>
        <p style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--text-secondary)' }}>Lead QA:</span> Shraddha</p>
        <p><span style={{ color: 'var(--text-secondary)' }}>Status:</span> Pending Sign-off</p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
          <Bug size={20} color="var(--error)" /> Known Bugs
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            "Bug 01: System experiences unpredictable heartbeat when near QA.",
            "Bug 02: Memory leak (Can't stop thinking about you).",
            "Bug 03: Excessively generates cheesy lines."
          ].map((bug, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.2) }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}
            >
              <CheckSquare size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ lineHeight: '1.4' }}>{bug}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          By clicking below, you acknowledge these "bugs" and approve this version for release.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary glow-button"
          onClick={onComplete}
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
        >
          I acknowledge & Approve Release! 📝✨
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
