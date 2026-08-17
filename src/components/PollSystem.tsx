import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PollQuestion, PollOption } from '../data/polls';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface PollSystemProps {
  question: PollQuestion;
  onComplete: () => void;
}

export const PollSystem = ({ question, onComplete }: PollSystemProps) => {
  const [selectedOption, setSelectedOption] = useState<PollOption | null>(null);
  const [showReaction, setShowReaction] = useState(false);

  const handleSelect = (option: PollOption) => {
    if (selectedOption?.id === option.id) return;
    setSelectedOption(option);
    setShowReaction(true);
  };

  return (
    <motion.div
      key={question.id}
      className="glass-panel"
      style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <h2 className="glow-text" style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        {question.question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {question.options.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          const showNotSelected = selectedOption && !isSelected;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option)}
              whileHover={!isSelected ? { scale: 1.02 } : {}}
              whileTap={!isSelected ? { scale: 0.98 } : {}}
              animate={
                isSelected
                  ? (option.isPositive ? { scale: [1, 1.05, 1], borderColor: 'var(--success)' } : { x: [-10, 10, -10, 10, 0], borderColor: 'var(--error)' })
                  : {}
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: isSelected ? 'rgba(255,255,255,0.1)' : 'var(--card-bg)',
                border: `1px solid ${isSelected ? (option.isPositive ? 'var(--success)' : 'var(--error)') : 'var(--card-border)'}`,
                borderRadius: '12px',
                opacity: showNotSelected ? 0.5 : 1,
                transition: 'opacity 0.3s, background 0.3s'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{option.emoji}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showReaction && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <motion.div
              animate={selectedOption.isPositive ? { y: [0, -20, 0] } : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '3rem' }}
            >
              {selectedOption.reactionEmoji}
            </motion.div>
            <motion.button
              className="btn-primary glow-button"
              onClick={selectedOption.isPositive ? onComplete : () => {
                setSelectedOption(null);
                setShowReaction(false);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {selectedOption.isPositive ? (
                <>Continue <ArrowRight size={18} /></>
              ) : (
                <>Try Again <RotateCcw size={18} /></>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
