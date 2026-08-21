import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { Sticker } from './Sticker';

interface DateAskScreenProps {
  onAgree: () => void;
}

export const DateAskScreen = ({ onAgree }: DateAskScreenProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [disagreePosition, setDisagreePosition] = useState({ x: 0, y: 0 });

  const handleAgree = () => {
    setIsAgreed(true);
    setTimeout(() => {
      onAgree();
    }, 1500);
  };

  const handleDisagreeHover = () => {
    const randomX = (Math.random() * 200) - 100;
    const randomY = (Math.random() * 200) - 100;
    setDisagreePosition({ x: randomX, y: randomY });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        className="glass-panel"
        style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', width: '100%', zIndex: 10 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isAgreed ? 1.2 : 1, opacity: isAgreed ? 0 : 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <Sticker src="/sticker-greeting.png" alt="Greeting Mascot" delay={0.2} position="bottom-left" message="HeartOS v2.0 loaded! 🚀" />
        
        <Heart size={48} color="var(--accent-pink)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 className="glow-text" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Critical Update!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Since you loved HeartOS v1, a critical security patch is required to continue. <br /><br />
          <b>Will you go on a date with me?</b>
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary glow-button"
            onClick={handleAgree}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Heart size={18} fill="currentColor" /> Yes, obviously!
          </motion.button>

          <motion.button
            animate={{ x: disagreePosition.x, y: disagreePosition.y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 20 }}
            onMouseEnter={handleDisagreeHover}
            onTouchStart={handleDisagreeHover}
          >
            <X size={18} /> No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
