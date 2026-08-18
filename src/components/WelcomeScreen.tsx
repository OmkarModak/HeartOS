import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { Sticker } from './Sticker';
import greetingSticker from '../assets/sticker-greeting.png';

interface WelcomeScreenProps {
  onAgree: () => void;
  onDisagree: () => void;
}

export const WelcomeScreen = ({ onAgree, onDisagree }: WelcomeScreenProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [disagreePosition, setDisagreePosition] = useState({ x: 0, y: 0 });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleAgree = () => {
    setIsAgreed(true);
    setTimeout(() => {
      onAgree();
    }, 2500); // Wait for the animation to finish
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
            <Sticker src={greetingSticker} alt="Greeting Mascot" delay={0.2} position="bottom-left" message="Hi.." />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {getGreeting()}, Shraddha. Welcome back to my heart. ❤️
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
            key="heart-door-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2, 15], opacity: [0, 1, 1, 1] }}
            transition={{ duration: 1.8, ease: "easeInOut", times: [0, 0.3, 0.5, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none'
            }}
          >
            {/* Left Half of Heart */}
            <motion.div 
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: '-100vw', opacity: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
              style={{ position: 'absolute', right: '50%', color: 'var(--accent-pink)' }}
            >
              <svg width="200" height="200" viewBox="0 0 50 100" preserveAspectRatio="none">
                <path d="M50 85C50 85 10 55 10 30C10 15 25 5 40 10C46 12 50 18 50 18V85Z" fill="currentColor" />
              </svg>
            </motion.div>
            
            {/* Right Half of Heart */}
            <motion.div 
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: '100vw', opacity: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
              style={{ position: 'absolute', left: '50%', color: 'var(--accent-pink)' }}
            >
              <svg width="200" height="200" viewBox="50 0 50 100" preserveAspectRatio="none">
                <path d="M50 85V18C50 18 54 12 60 10C75 5 90 15 90 30C90 55 50 85 50 85Z" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
