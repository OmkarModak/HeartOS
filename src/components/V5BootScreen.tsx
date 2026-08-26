import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="phone-wrapper">
      <div className="chat-container">
        <div className="chat-scroll-area" style={{ justifyContent: 'center' }}>
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className="chat-bubble-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  color: i === bootSequence.length - 1 ? '#ffb3c6' : 'var(--text-secondary)',
                  fontWeight: i === bootSequence.length - 1 ? 'bold' : 'normal',
                  fontFamily: '"Fira Code", monospace',
                  border: i === bootSequence.length - 1 ? '1px solid #ffb3c6' : '1px solid var(--card-border)',
                  background: i === bootSequence.length - 1 ? 'rgba(255, 179, 198, 0.1)' : 'var(--card-bg)'
                }}
              >
                {line}
              </motion.div>
            ))}
            {index < bootSequence.length && (
              <motion.div
                className="chat-bubble-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '60px', display: 'flex', justifyContent: 'center', gap: '4px' }}
              >
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} style={{ width: 8, height: 8, background: 'var(--text-secondary)', borderRadius: '50%' }} />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} style={{ width: 8, height: 8, background: 'var(--text-secondary)', borderRadius: '50%' }} />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} style={{ width: 8, height: 8, background: 'var(--text-secondary)', borderRadius: '50%' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
