import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sticker } from './Sticker';
import loveSticker from '../assets/sticker-love.png';

export const FinalReveal = () => {
  const [phase, setPhase] = useState(0);
  const [testPassed, setTestPassed] = useState<boolean | null>(null);

  useEffect(() => {
    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 4500); // Wait longer so she can read it
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 4000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontFamily: 'monospace', color: 'var(--success)' }}
          >
            <p>{'> Building something special...'}</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5 }}
              style={{ background: 'var(--success)', height: '20px', marginTop: '1rem', marginBottom: '0.5rem' }}
            />
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2.5 }}
            >
              100% - Deployment successful. ❤️
            </motion.p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="reveal1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-pink)' }}>
              HEARTOS ❤️
            </h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>
              Designed and developed specifically for you.
            </h2>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="reveal2"
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ padding: '2.5rem', maxWidth: '500px', width: '100%', position: 'relative' }}
          >
            {/* Magical Floating Background Hearts & Sparkles */}
            {[...Array(12)].map((_, i) => {
              const emojis = ['❤️', '💖', '✨', '💕', '💘', '🥰'];
              const randomEmoji = emojis[i % emojis.length];
              const randomLeft = 5 + (i * 8); // Spread them across the width
              const randomDelay = i * 0.2;
              const randomDuration = 2.5 + (i % 3);
              
              return (
                <motion.div
                  key={`bg-magic-${i}`}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ 
                    opacity: [0, 0.8, 0], 
                    scale: [0.5, 1.2, 0.8],
                    y: [20, -150]
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay + 1, // Start after panel fades in
                    ease: "easeOut"
                  }}
                  style={{
                    position: 'absolute',
                    fontSize: `${1.2 + (i % 2)}rem`,
                    left: `${randomLeft}%`,
                    bottom: '-30px',
                    zIndex: -1,
                    pointerEvents: 'none',
                    filter: 'blur(0.5px)'
                  }}
                >
                  {randomEmoji}
                </motion.div>
              );
            })}

            <Sticker src={loveSticker} alt="Love Mascot" delay={1.5} position="bottom-right" />
            
            <div style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <p>HEARTOS v2.0</p>
              <p>Developer: Omkar</p>
              <p>Status: Still debugging 😄</p>
              <p>Known issue: Gets a little cheesy sometimes 🧀</p>
              <p>Build: Successful ❤️</p>
              <p style={{ marginTop: '0.5rem' }}>
                If you wish to delete this: <span style={{ color: '#ff5f56' }}>DELETE FROM YOU;</span> 🥺
              </p>
            </div>
            
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
              <p>You actually said yes! 🎉</p>
              <p>I know building an entire OS update just to ask you out is a little bit extra...</p>
              <p>But honestly, you're absolutely worth the effort.</p>
              <p>I'm really looking forward to our date. Good food, good company, and finally getting to spend time with you.</p>
              <p>I promise to bring my best behavior (and maybe a terrible joke or two).</p>
              <p>Thank you for subscribing to HeartOS v2.0.</p>
              <p style={{ fontWeight: 600, color: 'var(--accent-pink)', marginTop: '1rem' }}>
                I can't wait to see you. ❤️
              </p>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
