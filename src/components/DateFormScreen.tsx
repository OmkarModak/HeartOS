import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Utensils } from 'lucide-react';

interface DateFormScreenProps {
  onNext: (data: { date: string; time: string; food: string }) => void;
}

const foodOptions = [
  "Pizza 🍕", "Sushi 🍣", "Indian 🍛", "Italian 🍝",
  "Mexican 🌮", "Burgers 🍔", "Street Food 🥘", "Chinese 🥢"
];

export const DateFormScreen = ({ onNext }: DateFormScreenProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [otherFood, setOtherFood] = useState('');

  const isFormValid = date !== '' && time !== '' && (selectedFood !== '' && (selectedFood !== 'Other' || otherFood.trim() !== ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({
        date,
        time,
        food: selectedFood === 'Other' ? otherFood : selectedFood
      });
    }
  };

  return (
    <motion.div
      className="glass-panel"
      style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="glow-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>Plan the Date ❤️</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Configure the perfect evening.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Date & Time */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Calendar size={16} /> Select Day
            </label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none'
              }}
              required
            />
          </div>
          <div style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Clock size={16} /> Select Time
            </label>
            <select 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none', cursor: 'pointer'
              }}
              required
            >
              <option value="" style={{ color: 'black' }}>Select time...</option>
              <option value="6:00 PM" style={{ color: 'black' }}>6:00 PM</option>
              <option value="6:30 PM" style={{ color: 'black' }}>6:30 PM</option>
              <option value="7:00 PM" style={{ color: 'black' }}>7:00 PM</option>
              <option value="7:30 PM" style={{ color: 'black' }}>7:30 PM</option>
              <option value="8:00 PM" style={{ color: 'black' }}>8:00 PM</option>
              <option value="8:30 PM" style={{ color: 'black' }}>8:30 PM</option>
              <option value="9:00 PM" style={{ color: 'black' }}>9:00 PM</option>
              <option value="9:30 PM" style={{ color: 'black' }}>9:30 PM</option>
              <option value="10:00 PM" style={{ color: 'black' }}>10:00 PM</option>
            </select>
          </div>
        </div>

        {/* Food */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <Utensils size={16} /> Cuisine Preference
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
            {foodOptions.map((food) => (
              <div 
                key={food}
                onClick={() => setSelectedFood(food)}
                style={{
                  padding: '0.6rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                  background: selectedFood === food ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedFood === food ? 'var(--accent-pink)' : 'var(--card-border)'}`,
                  color: selectedFood === food ? 'white' : 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}
              >
                {food}
              </div>
            ))}
            <div 
              onClick={() => setSelectedFood('Other')}
              style={{
                padding: '0.6rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                background: selectedFood === 'Other' ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selectedFood === 'Other' ? 'var(--accent-pink)' : 'var(--card-border)'}`,
                color: selectedFood === 'Other' ? 'white' : 'var(--text-primary)',
                transition: 'all 0.2s'
              }}
            >
              Other
            </div>
          </div>

          {selectedFood === 'Other' && (
            <motion.input
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              type="text"
              placeholder="Type your craving here..."
              value={otherFood}
              onChange={(e) => setOtherFood(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none', marginTop: '0.5rem', width: '100%'
              }}
              required
            />
          )}
        </div>

        <motion.button
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          className="btn-primary glow-button"
          disabled={!isFormValid}
          style={{ 
            marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
          type="submit"
        >
          Proceed to Checkout <ArrowRight size={18} />
        </motion.button>
      </form>
    </motion.div>
  );
};
