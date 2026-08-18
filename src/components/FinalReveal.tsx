import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sticker } from './Sticker';
import loveSticker from '../assets/sticker-love.png';

export const FinalReveal = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 3000);
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
              style={{ background: 'var(--success)', height: '20px', marginTop: '1rem' }}
            />
            <p style={{ marginTop: '0.5rem' }}>100% - Deployment successful.</p>
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
              <p>HEARTOS v1.0</p>
              <p>Developer: Omkar</p>
              <p>Status: Still debugging 😄</p>
              <p>Known issue: Gets a little cheesy sometimes 🧀</p>
              <p>Build: Successful ❤️</p>
              <p style={{ marginTop: '0.5rem' }}>
                If you wish to delete this: <span style={{ color: '#ff5f56' }}>DELETE FROM YOU;</span> 🥺
              </p>
            </div>
            
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
              <p>I don't know where this goes.</p>
              <p>I don't want to pretend I know the future.</p>
              <p>I just know that I like talking to you. I like your energy.</p>
              <p>You felt different to me.</p>
              <p>And I'd genuinely like the chance to know you better.</p>
              <p>If you want to, I'd like to choose you.</p>
              <p>And if someday you want to choose me too...</p>
              <p style={{ fontWeight: 600, color: 'var(--accent-pink)', marginTop: '1rem' }}>
                maybe we can see where this goes. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
