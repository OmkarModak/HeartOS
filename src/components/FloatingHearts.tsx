import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
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

      setHearts(prev => [...prev.slice(-15), { id, x, size, duration, delay, emoji }]);
    };

    const interval = setInterval(generateHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0], scale: 1 }}
          transition={{ duration: heart.duration, delay: heart.delay, ease: 'linear' }}
          style={{ position: 'absolute', fontSize: heart.size, filter: 'blur(1px)' }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};
