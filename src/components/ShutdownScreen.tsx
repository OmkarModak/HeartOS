import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ShutdownScreen = ({ onContinue }: { onContinue: () => void }) => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 600);
    const t2 = setTimeout(() => setShowButton(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#4a4a4a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid rgba(255,255,255,0.2)',
              borderTop: '3px solid rgba(255,255,255,0.85)',
              borderRadius: '50%',
            }}
          />
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            fontWeight: 400,
            letterSpacing: '0.3px',
            margin: 0,
          }}>
            This page is no longer available.
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            margin: 0,
          }}>
            HeartOS, 2026
          </p>

          {/* Subtle continue button — only visible if you're looking */}
          {showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              onClick={onContinue}
              style={{
                marginTop: '2rem',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.12)',
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                cursor: 'pointer',
                letterSpacing: '1px',
                padding: '0.5rem 1rem',
              }}
            >
              continue anyway
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};
