import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface VenueFormScreenProps {
  onNext: (data: { venue: string; isRealDate: string; customDate: string }) => void;
}

export const VenueFormScreen = ({ onNext }: VenueFormScreenProps) => {
  const [venue, setVenue] = useState('');
  const [isRealDate, setIsRealDate] = useState<string | null>(null);
  const [dateStatus, setDateStatus] = useState<'keep' | 'change' | null>(null);
  const [customDate, setCustomDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (venue.trim() && isRealDate && dateStatus) {
      if (dateStatus === 'change' && !customDate.trim()) return;
      onNext({ 
        venue, 
        isRealDate, 
        customDate: dateStatus === 'keep' ? 'Oct 4th, 12:42 PM' : customDate 
      });
    }
  };

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem 2rem', maxWidth: '400px', width: '100%', position: 'relative', overflow: 'hidden', margin: '0 auto' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="glow-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Date Locked In 🔒</h2>
        <p style={{ color: 'var(--text-secondary)' }}>We have a date. Just need the location.</p>
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>
          Our last planned date was <strong>Oct 4th, 12:42 PM</strong>.<br/>Does that still work?
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: dateStatus === 'change' ? '1rem' : 0 }}>
          <button
            type="button"
            onClick={() => setDateStatus('keep')}
            className={dateStatus === 'keep' ? "btn-primary glow-button" : "btn-secondary"}
            style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem' }}
          >
            Yes, keep it!
          </button>
          <button
            type="button"
            onClick={() => setDateStatus('change')}
            className={dateStatus === 'change' ? "btn-primary glow-button" : "btn-secondary"}
            style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem' }}
          >
            Change it
          </button>
        </div>
        
        <AnimatePresence>
          {dateStatus === 'change' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="datetime-local"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                  padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none',
                  boxSizing: 'border-box',
                  colorScheme: 'dark'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 'bold' }}>
            Just to be clear... Is this a real date? 👀
          </label>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setIsRealDate('yes')}
              className={isRealDate === 'yes' ? "btn-primary glow-button" : "btn-secondary"}
              style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem' }}
            >
              Yes, it's a date 💖
            </button>
            <button
              type="button"
              onClick={() => setIsRealDate('no')}
              className={isRealDate === 'no' ? "btn-primary glow-button" : "btn-secondary"}
              style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem' }}
            >
              Just hanging out 😅
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isRealDate ? 1 : 0, height: isRealDate ? 'auto' : 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden' }}
        >
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} />
            Where are we going?
          </label>
          <input 
            type="text" 
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Restaurant, Cafe, Park..."
            style={{
              background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
              padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none'
            }}
            required={isRealDate !== null}
          />
        </motion.div>

        <motion.button
          whileHover={venue.trim() && dateStatus && (dateStatus === 'keep' || customDate.trim()) ? { scale: 1.02 } : {}}
          whileTap={venue.trim() && dateStatus && (dateStatus === 'keep' || customDate.trim()) ? { scale: 0.98 } : {}}
          className="btn-primary glow-button"
          type="submit"
          disabled={!venue.trim() || !dateStatus || (dateStatus === 'change' && !customDate.trim()) || !isRealDate}
          style={{ marginTop: '1rem', opacity: (venue.trim() && dateStatus && (dateStatus === 'keep' || customDate.trim()) && isRealDate) ? 1 : 0.5, cursor: (venue.trim() && dateStatus && (dateStatus === 'keep' || customDate.trim()) && isRealDate) ? 'pointer' : 'not-allowed' }}
        >
          Confirm Venue ✨
        </motion.button>
      </form>
    </motion.div>
  );
};
