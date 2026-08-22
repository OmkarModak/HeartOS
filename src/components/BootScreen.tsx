import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, DownloadCloud, Sparkles } from 'lucide-react';

const updateSequence = [
  "Downloading HeartOS v3.0...",
  "Applying overnight hotfixes...",
  "Developer log: Deployed in record time. I'm a fast bug fixer when it comes to you 😉",
  "Optimizing romantic aesthetic algorithms...",
  "Update Complete. Rebooting..."
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Progress bar animation from 0 to 100
    const duration = 7500; // 7.5 seconds total
    const intervalTime = 50;
    const increment = (100 / (duration / intervalTime));

    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Map progress to steps for text updates
    if (progress < 15) setStep(0);
    else if (progress < 35) setStep(1);
    else if (progress < 70) setStep(2);
    else if (progress < 95) setStep(3);
    else setStep(4);
  }, [progress]);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => onComplete(), 1500);
      return () => clearTimeout(t);
    }
  }, [isFinished, onComplete]);

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem', maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
    >
      <motion.div
        animate={{ scale: isFinished ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2rem' }}
      >
        {isFinished ? (
          <CheckCircle2 size={64} color="var(--accent-pink)" />
        ) : step === 2 ? (
          <Sparkles size={64} color="var(--accent-pink)" />
        ) : step === 3 ? (
          <Heart size={64} color="var(--accent-pink)" />
        ) : (
          <DownloadCloud size={64} color="var(--text-secondary)" />
        )}
      </motion.div>

      <h2 style={{ color: 'white', marginBottom: '2rem', fontWeight: 600 }}>System Update</h2>

      {/* Progress Bar Container */}
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <motion.div
          style={{ height: '100%', background: 'var(--accent-pink)', borderRadius: '4px' }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>

      {/* Dynamic Text */}
      <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ 
              color: step === 2 ? 'var(--accent-pink)' : 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: '1.5', 
              fontStyle: step === 2 ? 'italic' : 'normal',
              fontWeight: step === 2 ? 600 : 400
            }}
          >
            {updateSequence[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums' }}>
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
};
