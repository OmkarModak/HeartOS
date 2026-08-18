import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  popped: boolean;
}

const emojis = ['❤️', '✨', '💖', '💕'];

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHeart = () => {
      const id = Math.random();
      const x = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 2;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      setHearts(prev => [...prev.slice(-15), { id, x, size, duration, delay, emoji, popped: false }]);
    };

    const interval = setInterval(generateHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePop = (id: number) => {
    setHearts(prev => prev.map(h => h.id === id ? { ...h, popped: true } : h));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <AnimatePresence>
        {hearts.map(heart => !heart.popped ? (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.5, 0], scale: 1 }}
            exit={{ scale: 3, opacity: 0, filter: 'blur(5px)', rotate: 45, transition: { duration: 0.3 } }}
            transition={{ duration: heart.duration, delay: heart.delay, ease: 'linear' }}
            style={{ position: 'absolute', fontSize: heart.size, filter: 'blur(1px)', pointerEvents: 'auto', cursor: 'crosshair' }}
            onClick={(e) => {
              e.stopPropagation();
              handlePop(heart.id);
            }}
          >
            {heart.emoji}
          </motion.div>
        ) : null)}
      </AnimatePresence>
    </div>
  );
};
