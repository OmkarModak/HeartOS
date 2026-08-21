import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface DateJokeScreenProps {
  onNext: () => void;
}

export const DateJokeScreen = ({ onNext }: DateJokeScreenProps) => {
  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <h2 className="glow-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Awesome!</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Wait, just to clarify... did you mean a romantic date, or one of these?
      </p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [-5, 5, -5, 5, 0] }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '4px solid var(--accent-pink)',
          boxShadow: '0 0 30px rgba(255, 95, 86, 0.4)'
        }}
      >
        <img 
          src="/date-joke.jpg" 
          alt="Literal Dates" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-primary glow-button"
        onClick={onNext}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        Haha, very funny. Let's plan the real one <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
};
