import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';

type Position = 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';

interface StickerProps {
  src: string;
  alt: string;
  delay?: number;
  size?: number;
  position?: Position;
  message?: string;
}

export const Sticker = ({ src, alt, delay = 0, size = 150, position = 'center', message }: StickerProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setShowMessage(true), delay * 1000 + 1500);
      return () => clearTimeout(t);
    }
  }, [message, delay]);

  const handleClick = () => {
    setIsClicked(true);
    setShowMessage(true);
    setTimeout(() => setIsClicked(false), 500);
  };
  
  const getPositionStyles = (): CSSProperties => {
    if (position === 'center') {
      return { display: 'flex', justifyContent: 'center', marginBottom: '1rem', position: 'relative' };
    }
    
    const base: CSSProperties = { position: 'absolute', zIndex: 50 };
    switch (position) {
      case 'top-right': return { ...base, top: -size / 2.5, right: -size / 4 };
      case 'top-left': return { ...base, top: -size / 2.5, left: -size / 4 };
      case 'bottom-right': return { ...base, bottom: -size / 3, right: -size / 4 };
      case 'bottom-left': return { ...base, bottom: -size / 3, left: -size / 4 };
      case 'top-center': return { ...base, top: -size / 1.5, left: '50%', transform: 'translateX(-50%)' };
      default: return base;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: position === 'top-right' ? 30 : position === 'top-left' ? -30 : -15 }}
      animate={{ scale: 1, opacity: 1, rotate: position === 'top-right' ? 10 : position === 'top-left' ? -10 : 0 }}
      transition={{ 
        type: 'spring', 
        damping: 15, 
        stiffness: 250, 
        delay: delay 
      }}
      style={getPositionStyles()}
    >
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            style={{
              position: 'absolute',
              top: position.includes('bottom') ? '-20px' : '20px',
              left: position.includes('left') ? '70%' : 'auto',
              right: position.includes('right') ? '70%' : 'auto',
              background: 'white',
              color: '#0d0d12',
              padding: '8px 16px',
              borderRadius: '16px',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 60
            }}
          >
            {message}
            <div style={{
              position: 'absolute',
              bottom: position.includes('bottom') ? '-6px' : 'auto',
              top: position.includes('top') ? '-6px' : 'auto',
              left: position.includes('left') ? '10px' : 'auto',
              right: position.includes('right') ? '10px' : 'auto',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: position.includes('bottom') ? '8px solid white' : 'none',
              borderBottom: position.includes('top') ? '8px solid white' : 'none',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img 
        src={src} 
        alt={alt} 
        onClick={handleClick}
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'contain', 
          mixBlendMode: 'lighten',
          WebkitMaskImage: 'radial-gradient(circle closest-side at 50% 50%, black 80%, transparent 100%)',
          maskImage: 'radial-gradient(circle closest-side at 50% 50%, black 80%, transparent 100%)',
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 55
        }} 
        animate={isClicked ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { y: [0, -10, 0] }}
        transition={{ duration: isClicked ? 0.5 : 4, repeat: isClicked ? 0 : Infinity, ease: 'easeInOut', delay: isClicked ? 0 : delay }}
      />
    </motion.div>
  );
};
