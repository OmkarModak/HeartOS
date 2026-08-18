import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const introSequence = [
  "HEARTOS v1.0",
  "Initializing...",
  "ERROR: Automated boot sequence failed.",
  "Awaiting manual QA verification..."
];

const checklistItems = [
  "Mounting WHOAMI module...",
  "Loading LIFE.EXE resources...",
  "Running RECOVERY protocols...",
  "Executing WHY_SHAADI() script...",
  "Initializing YOU.EXE...",
  "Preparing something special ❤️"
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [introIndex, setIntroIndex] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(checklistItems.length).fill(false));
  const [systemReady, setSystemReady] = useState(false);

  useEffect(() => {
    if (introIndex < introSequence.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, introSequence[introIndex]]);
        setIntroIndex((prev) => prev + 1);
      }, introIndex === 0 ? 800 : introIndex === 2 ? 1200 : 800);
      return () => clearTimeout(timer);
    } else if (!showChecklist) {
      const timer = setTimeout(() => {
        setShowChecklist(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [introIndex, showChecklist]);

  const handleCheck = (index: number) => {
    if (systemReady) return;
    const newChecked = [...checkedItems];
    newChecked[index] = true;
    setCheckedItems(newChecked);

    if (newChecked.every(Boolean)) {
      setTimeout(() => setSystemReady(true), 500);
    }
  };

  useEffect(() => {
    if (systemReady) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [systemReady, onComplete]);

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '2rem', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', color: 'var(--success)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Intro Lines */}
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ 
            marginBottom: '0.5rem',
            color: line.includes('ERROR') ? '#ff5f56' : line.includes('QA') ? '#ffbd2e' : 'var(--success)'
          }}
        >
          {line}
        </motion.div>
      ))}

      {/* Interactive Checklist */}
      {showChecklist && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
        >
          {checklistItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: checkedItems[idx] ? 'default' : 'pointer', opacity: checkedItems[idx] ? 0.6 : 1 }}
              onClick={() => handleCheck(idx)}
              whileHover={!checkedItems[idx] ? { x: 5 } : {}}
            >
              <span style={{ 
                color: checkedItems[idx] ? 'var(--success)' : '#888',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                [{checkedItems[idx] ? '✓' : ' '}]
              </span>
              <span style={{ color: checkedItems[idx] ? 'var(--success)' : '#d4d4d4' }}>
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* System Ready Message */}
      <AnimatePresence>
        {systemReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', fontWeight: 'bold', color: 'var(--accent-pink)', textAlign: 'center', fontSize: '1.1rem' }}
          >
            ALL MODULES VERIFIED. SYSTEM READY ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blinking Cursor */}
      {!systemReady && (
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--success)', marginTop: '1rem', verticalAlign: 'middle' }}
        />
      )}
    </motion.div>
  );
};
