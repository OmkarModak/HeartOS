import { motion } from 'framer-motion';
import { Sticker } from './Sticker';
import sadSticker from '../assets/sticker-sad.png';

export const SadScreen = ({ onTryAgain, onQuit }: { onTryAgain: () => void, onQuit?: () => void }) => {
  return (
    <motion.div
      className="glass-panel"
      style={{ position: 'relative', padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Sticker src={sadSticker} alt="Sad Mascot" position="top-right" />
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        Wow, you actually managed to click it! 😲<br /><br />
        But you came here so far... please continue? 🥺❤️
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary glow-button"
          onClick={onTryAgain}
        >
          Okay, let's continue! 😄
        </motion.button>

        {onQuit && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
            onClick={onQuit}
          >
            No, let me out. 🚪
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
