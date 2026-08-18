import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Chapter } from '../data/story';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface StoryChapterProps {
  chapter: Chapter;
  index: number;
  totalChapters: number;
  onNext: () => void;
}

export const StoryChapter = ({ chapter, index, onNext }: StoryChapterProps) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    setVisibleCount(1);
    setClickCount(0);
    setStartIndex(0);
  }, [chapter.id]);

  const handleNextLine = () => {
    if (isClearing) return;

    if (visibleCount < chapter.content.length) {
      if (chapter.content[visibleCount] === "---") {
        setIsClearing(true);
        setTimeout(() => {
          setStartIndex(visibleCount + 1);
          setVisibleCount(prev => prev + 2);
          setIsClearing(false);
        }, 1500);
      } else {
        setVisibleCount(prev => prev + 1);
      }
    } else {
      if (index === 3) {
        if (clickCount < 3) {
          setClickCount(prev => prev + 1);
        } else {
          onNext();
        }
      } else {
        onNext();
      }
    }
  };

  return (
    <div
      className="glass-panel"
      style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px', margin: '0 auto', minHeight: '550px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent-pink)', fontWeight: 600, letterSpacing: '0.05em' }}>
          CHAPTER {String(index + 1).padStart(2, '0')}
        </span>
        <motion.span 
          style={{ fontSize: '2rem', display: 'inline-block', cursor: 'pointer' }}
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {chapter.emoji}
        </motion.span>
      </div>
      
      <h2 className="glow-text" style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
        {chapter.title}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, minHeight: '200px', justifyContent: 'center' }}>
        <AnimatePresence mode="popLayout">
          {chapter.content.slice(startIndex, visibleCount).map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}
            >
              {paragraph}
            </motion.p>
          ))}
          {isClearing && (
            <motion.p
              key="clear-command"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: '1.1rem', color: 'var(--success)', fontFamily: 'monospace', fontWeight: 'bold' }}
            >
              {'> system.clear()'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-primary glow-button"
        style={{ 
          alignSelf: 'flex-end', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginTop: '2rem',
          opacity: isClearing ? 0 : (index === 3 && visibleCount >= chapter.content.length && clickCount > 0 && clickCount < 3) ? 0.6 : 1,
          transform: (index === 3 && visibleCount >= chapter.content.length && clickCount > 0 && clickCount < 3) ? 'translateX(2px)' : 'none',
          pointerEvents: isClearing ? 'none' : 'auto'
        }}
        onClick={handleNextLine}
        disabled={isClearing}
      >
        {visibleCount < chapter.content.length ? (
          <>Next <ChevronDown size={18} /></>
        ) : (
          <>Continue <ArrowRight size={18} /></>
        )}
      </motion.button>

      <AnimatePresence>
        {index === 3 && visibleCount >= chapter.content.length && clickCount >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ alignSelf: 'flex-end', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'right' }}
          >
            It was intentionally done.. you thought it's broken right? No. At least not with your heart. ❤️<br/>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Click continue again to proceed)</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
