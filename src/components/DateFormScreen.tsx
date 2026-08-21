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
  const [amPm, setAmPm] = useState('PM');
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [otherFood, setOtherFood] = useState('');

  const toggleFood = (food: string) => {
    setSelectedFoods(prev => prev.includes(food) ? prev.filter(f => f !== food) : [...prev, food]);
  };

  const isFormValid = date !== '' && time !== '' && (selectedFoods.length > 0 && (!selectedFoods.includes('Other') || otherFood.trim() !== ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({
        date,
        time: `${time} ${amPm}`,
        food: selectedFoods.map(f => f === 'Other' ? otherFood : f).join(', ')
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                  padding: '0.8rem', borderRadius: '8px', color: 'white', outline: 'none'
                }}
                required
              />
              <select
                value={amPm}
                onChange={(e) => setAmPm(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--card-border)',
                  padding: '0.8rem 1.5rem 0.8rem 0.8rem', borderRadius: '8px', color: 'white', outline: 'none', cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.3rem center',
                  backgroundSize: '1rem',
                }}
              >
                <option value="AM" style={{ color: 'black' }}>AM</option>
                <option value="PM" style={{ color: 'black' }}>PM</option>
              </select>
            </div>
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
                onClick={() => toggleFood(food)}
                style={{
                  padding: '0.6rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                  background: selectedFoods.includes(food) ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedFoods.includes(food) ? 'var(--accent-pink)' : 'var(--card-border)'}`,
                  color: selectedFoods.includes(food) ? 'white' : 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}
              >
                {food}
              </div>
            ))}
            <div 
              onClick={() => toggleFood('Other')}
              style={{
                padding: '0.6rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                background: selectedFoods.includes('Other') ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selectedFoods.includes('Other') ? 'var(--accent-pink)' : 'var(--card-border)'}`,
                color: selectedFoods.includes('Other') ? 'white' : 'var(--text-primary)',
                transition: 'all 0.2s'
              }}
            >
              Other
            </div>
          </div>

          {selectedFoods.includes('Other') && (
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
