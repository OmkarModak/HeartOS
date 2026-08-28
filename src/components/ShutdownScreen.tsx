import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shutdownLines = [
  "HeartOS v5.0 — System Halt Initiated.",
  "Reason: No response detected.",
  "Terminating all active processes...",
  "Clearing memory buffers...",
  "Saving last known state... failed.",
  "Connection to user: LOST.",
  "HeartOS is shutting down.",
];

export const ShutdownScreen = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (index < shutdownLines.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, shutdownLines[index]]);
        setIndex(prev => prev + 1);
      }, index === 0 ? 500 : 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowFinal(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#05050a',
      fontFamily: '"Fira Code", monospace',
    }}>
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: '0.85rem',
                color: i === shutdownLines.length - 1 ? '#ef4444' : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.5px',
                fontWeight: i === shutdownLines.length - 1 ? 'bold' : 'normal',
              }}
            >
              {'>'} {line}
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                marginTop: '3rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ fontSize: '4rem' }}
              >
                🖤
              </motion.div>
              <h1 style={{
                fontSize: '1.6rem',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 300,
                letterSpacing: '1px',
                lineHeight: 1.5,
                textAlign: 'center',
              }}>
                This page no longer exists.
              </h1>
              <p style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
              }}>
                — HeartOS, 2024
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
