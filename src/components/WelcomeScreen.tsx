import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { Sticker } from './Sticker';

interface WelcomeScreenProps {
  onAgree: () => void;
  onDisagree: () => void;
}

export const WelcomeScreen = ({ onAgree, onDisagree }: WelcomeScreenProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [disagreePosition, setDisagreePosition] = useState({ x: 0, y: 0 });

  const handleAgree = () => {
    setIsAgreed(true);
    setTimeout(() => {
      onAgree();
    }, 1500); // Wait for the animation to finish
  };

  const handleDisagreeHover = () => {
    const randomX = (Math.random() * 200) - 100;
    const randomY = (Math.random() * 150) - 75;
    setDisagreePosition({ x: randomX, y: randomY });
  };

  return (
    <motion.div
      className={isAgreed ? "" : "glass-panel"}
      style={{ 
        padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative',
        transition: 'background 0.5s, border 0.5s, box-shadow 0.5s, backdrop-filter 0.5s'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <AnimatePresence mode="wait">
        {!isAgreed ? (
          <motion.div
            key="content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <Sticker src="/sticker-greeting.png" alt="Greeting Mascot" delay={0.2} position="bottom-left" message="Hi.." />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Welcome back to my heart, Shraddha. ❤️
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Before we continue, I need to run a small test.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '15px' }}
            >
              <p style={{ marginBottom: '0.5rem' }}>Don't worry...</p>
              <p style={{ marginBottom: '0.5rem' }}>It's not anything stupid.</p>
              <p>It's actually kinda cute. 😄</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ marginTop: '1rem' }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                Are you 18+ and okay with continuing to know more about me?
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary glow-button"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onClick={handleAgree}
                >
                  <Heart size={20} fill="currentColor" /> Agree
                </motion.button>
                
                <motion.button
                  animate={{ x: disagreePosition.x, y: disagreePosition.y }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10 }}
                  onMouseEnter={handleDisagreeHover}
                  onTouchStart={handleDisagreeHover}
                  onClick={onDisagree}
                >
                  <X size={20} /> Disagree
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="heart-animation"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1, 20], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--accent-pink)',
              zIndex: 50
            }}
          >
            <Heart size={100} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
