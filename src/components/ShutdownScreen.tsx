import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ShutdownScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(timer);
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
        </motion.div>
      )}
    </div>
  );
};

