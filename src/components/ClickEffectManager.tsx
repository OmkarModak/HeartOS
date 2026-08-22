import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'boop' | 'trail';
  emoji?: string;
}

const TRAIL_EMOJIS = ['✨', '🌸', '🦋', '❤️', '💫'];

export const ClickEffectManager = () => {
  const [effects, setEffects] = useState<ClickEffect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore clicks on interactive elements
      if (target.closest('button, a, input, textarea')) return;
      // Also ignore clicks on our cute sticker mascot
      if (target.closest('img') && target.closest('img')?.src.includes('sticker')) return;

      const isInsideCard = !!target.closest('.glass-panel');
      
      const newEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        type: isInsideCard ? 'boop' : 'heart'
      };

      setEffects(prev => [...prev, newEffect]);

      // Remove after 1 second
      setTimeout(() => {
        setEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
      }, 1000);
    };

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle trail generation to every 50ms
      if (now - lastTime < 50) return;
      lastTime = now;

      // Don't spawn trail if moving fast near buttons/links to avoid cluttering interactions
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea')) return;

      const randomEmoji = TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)];
      const trailEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY + 10,
        type: 'trail',
        emoji: randomEmoji
      };

      setEffects(prev => [...prev, trailEffect]);

      // Trails disappear faster
      setTimeout(() => {
        setEffects(prev => prev.filter(eff => eff.id !== trailEffect.id));
      }, 600);
    };

    // Use capture phase to ensure it catches everything
    window.addEventListener('click', handleClick, true);
    window.addEventListener('mousemove', handleMouseMove, true);
    return () => {
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('mousemove', handleMouseMove, true);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
      <AnimatePresence>
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            initial={{ opacity: 0, scale: effect.type === 'trail' ? 0 : 0.5, y: 0, x: '-50%' }}
            animate={{ opacity: effect.type === 'trail' ? 0.6 : 1, scale: effect.type === 'trail' ? 0.8 : 1, y: effect.type === 'trail' ? -20 : -40, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, opacity: { duration: effect.type === 'trail' ? 0.6 : 0.5 } }}
            style={{
              position: 'absolute',
              left: effect.x,
              top: effect.y,
              fontSize: '1.5rem',
              fontWeight: 600,
              pointerEvents: 'none',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              color: effect.type === 'boop' ? 'var(--text-secondary)' : 'inherit',
              zIndex: effect.type === 'trail' ? -1 : 1
            }}
          >
            {effect.type === 'heart' ? (
              <motion.div
                animate={{ rotate: [-10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '2rem' }}
              >
                ❤️
              </motion.div>
            ) : effect.type === 'boop' ? (
              <div style={{ 
                fontSize: '0.9rem', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)',
                padding: '4px 10px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                boop! 🔒
              </div>
            ) : (
              <div style={{ fontSize: '1rem', filter: 'hue-rotate(15deg)' }}>
                {effect.emoji}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
