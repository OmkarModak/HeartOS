import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalSurveyScreenProps {
  onComplete: (data: { home: string; hobbies: string; goals: string; knowMore: string }) => void;
}

export const PersonalSurveyScreen = ({ onComplete }: PersonalSurveyScreenProps) => {
  const [step, setStep] = useState(0);
  const [home, setHome] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [goals, setGoals] = useState('');
  
  const [knowMore, setKnowMore] = useState('');
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleFinal = (answer: string) => {
    setKnowMore(answer);
    setStep(4);
    setTimeout(() => {
      onComplete({ home, hobbies, goals, knowMore: answer });
    }, 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '1rem' }}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              Let's dive deeper...
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'white', marginBottom: '2rem' }}>
              I want to know more about the real you. Starting simple...<br/><br/>
              <span style={{ fontWeight: 600 }}>Who is at your home? 🏡</span>
            </p>
            <textarea
              value={home}
              onChange={(e) => setHome(e.target.value)}
              placeholder="Tell me about your family, pets, roommates..."
              style={{
                width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)',
                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none', marginBottom: '1.5rem',
                fontFamily: 'inherit'
              }}
            />
            <motion.button 
              whileHover={home.trim() ? { scale: 1.05 } : {}}
              whileTap={home.trim() ? { scale: 0.95 } : {}}
              className="btn-primary glow-button"
              onClick={handleNext}
              disabled={!home.trim()}
              style={{ opacity: home.trim() ? 1 : 0.5, cursor: home.trim() ? 'pointer' : 'not-allowed', width: '100%' }}
            >
              Next ✨
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              Free time...
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'white', marginBottom: '2rem' }}>
              When you're not working or studying...<br/><br/>
              <span style={{ fontWeight: 600 }}>What do you like to do? 🎨🎧📚</span>
            </p>
            <textarea
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="Hobbies, interests, guilty pleasures..."
              style={{
                width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)',
                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none', marginBottom: '1.5rem',
                fontFamily: 'inherit'
              }}
            />
            <motion.button 
              whileHover={hobbies.trim() ? { scale: 1.05 } : {}}
              whileTap={hobbies.trim() ? { scale: 0.95 } : {}}
              className="btn-primary glow-button"
              onClick={handleNext}
              disabled={!hobbies.trim()}
              style={{ opacity: hobbies.trim() ? 1 : 0.5, cursor: hobbies.trim() ? 'pointer' : 'not-allowed', width: '100%' }}
            >
              Next ✨
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              Looking ahead...
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'white', marginBottom: '2rem' }}>
              I love ambition in a person.<br/><br/>
              <span style={{ fontWeight: 600 }}>What are your goals in life? 🚀</span>
            </p>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Career, travel, personal growth..."
              style={{
                width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)',
                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none', marginBottom: '1.5rem',
                fontFamily: 'inherit'
              }}
            />
            <motion.button 
              whileHover={goals.trim() ? { scale: 1.05 } : {}}
              whileTap={goals.trim() ? { scale: 0.95 } : {}}
              className="btn-primary glow-button"
              onClick={handleNext}
              disabled={!goals.trim()}
              style={{ opacity: goals.trim() ? 1 : 0.5, cursor: goals.trim() ? 'pointer' : 'not-allowed', width: '100%' }}
            >
              Almost done... ➡️
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              Thanks for sharing.
            </h2>
            <p style={{ fontSize: '1.3rem', color: 'white', marginBottom: '2rem', fontWeight: 600 }}>
              Now... Do you want to know me more? 🤔
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary glow-button"
                onClick={() => handleFinal("Yes! ✨")}
              >
                Yes! ✨
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
                onClick={() => handleFinal("A little bit 😊")}
              >
                A little bit 😊
              </motion.button>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%', position: 'relative' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              Noted. 📝
            </h2>
            <p style={{ fontSize: '1.3rem', color: 'white', marginBottom: '2rem', lineHeight: '1.6' }}>
              Because if you really want to know me...<br/><br/>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-pink)' }}>HeartOS v4.0</span> will be entirely about me. <br/><br/>
              Currently in development. 😉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
