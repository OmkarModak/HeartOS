import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootSequence = [
  "HEARTOS v1.0",
  "Initializing...",
  "[✓] Loading personality",
  "[✓] Loading memories",
  "[✓] Loading life story",
  "[✓] Loading compatibility engine",
  "[✓] Detecting cute bugs",
  "[✓] Preparing something special",
  "SYSTEM READY ❤️"
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, bootSequence[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? 800 : currentIndex === bootSequence.length - 1 ? 1200 : 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--success)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: '0.5rem' }}
        >
          {line}
        </motion.div>
      ))}
      {currentIndex < bootSequence.length && (
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--success)', marginTop: '0.5rem', verticalAlign: 'middle' }}
        />
      )}
    </motion.div>
  );
};
