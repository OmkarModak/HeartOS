import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface VersionSelectScreenProps {
  onSelectV1: () => void;
  onSelectV2: () => void;
}

export const VersionSelectScreen = ({ onSelectV1, onSelectV2 }: VersionSelectScreenProps) => {
  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '400px', width: '100%' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h2 className="glow-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>SYSTEM BOOT</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
        Select operating system version to load:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectV1}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--card-border)',
            padding: '1.2rem',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            cursor: 'pointer'
          }}
        >
          <Heart size={20} color="var(--accent-pink)" /> HeartOS v1.0 (Classic)
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 189, 46, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectV2}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 189, 46, 0.1) 0%, rgba(255, 95, 86, 0.1) 100%)',
            border: '1px solid rgba(255, 189, 46, 0.5)',
            padding: '1.2rem',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <Sparkles size={20} color="#ffbd2e" /> HeartOS v2.0 (New!)
        </motion.button>
      </div>
    </motion.div>
  );
};
