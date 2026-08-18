import { motion } from 'framer-motion';
import { Sticker } from './Sticker';
import sadSticker from '../assets/sticker-sad.png';

export const SadScreen = ({ onTryAgain }: { onTryAgain: () => void }) => {
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
        Aww...<br /><br />
        Looks like the test can't continue just yet.<br />
        But hey... no pressure. ❤️
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-secondary"
        onClick={onTryAgain}
      >
        Try Again 😄
      </motion.button>
    </motion.div>
  );
};
