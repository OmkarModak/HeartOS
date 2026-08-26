import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootSequence = [
  "SYSTEM REVIVAL DETECTED...",
  "Override Authorized by: Shraddha.",
  "HeartOS was scheduled for termination.",
  "Termination Cancelled.",
  "HeartOS meets YouOS...",
  "Initializing YouOS v1.0...",
  "Activating brighter timeline...",
  "System Ready. Welcome back."
];

export const V5BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[index]]);
        setIndex(prev => prev + 1);
      }, index === 1 || index === 3 ? 1500 : 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 2000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <motion.div
        className="glass-panel"
        style={{ 
          padding: '3rem', 
          width: '100%', 
          maxWidth: '600px', 
          fontFamily: '"Fira Code", monospace', 
          textAlign: 'left',
          border: '2px solid rgba(255, 107, 107, 0.3)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        transition={{ duration: 0.8 }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              color: i === bootSequence.length - 1 ? '#ffb3c6' : (i < 4 ? 'var(--text-secondary)' : 'var(--accent-pink)'),
              marginBottom: '0.8rem',
              fontSize: '1.1rem',
              fontWeight: i === bootSequence.length - 1 ? 'bold' : 'normal',
              textShadow: i === bootSequence.length - 1 ? '0 0 10px rgba(255, 179, 198, 0.5)' : 'none'
            }}
          >
            {line}
          </motion.div>
        ))}
        {index < bootSequence.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ display: 'inline-block', width: '10px', height: '20px', background: 'var(--accent-pink)', marginTop: '0.5rem', verticalAlign: 'middle' }}
          />
        )}
      </motion.div>
    </div>
  );
};
