import { motion } from 'framer-motion';
import type { Chapter } from '../data/story';
import { ArrowRight } from 'lucide-react';

interface StoryChapterProps {
  chapter: Chapter;
  index: number;
  totalChapters: number;
  onNext: () => void;
}

export const StoryChapter = ({ chapter, index, totalChapters, onNext }: StoryChapterProps) => {
  return (
    <div
      className="glass-panel"
      style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent-pink)', fontWeight: 600, letterSpacing: '0.05em' }}>
          CHAPTER {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: '2rem' }}>{chapter.emoji}</span>
      </div>
      
      <h2 className="glow-text" style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
        {chapter.title}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
        {chapter.content.map((paragraph, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary glow-button"
        style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}
        onClick={onNext}
      >
        {index < totalChapters - 1 ? 'Continue' : 'Continue'} <ArrowRight size={18} />
      </motion.button>
    </div>
  );
};
