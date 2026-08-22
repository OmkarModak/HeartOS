import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FinalRevealProps {
  userData: {
    home: string;
    hobbies: string;
    goals: string;
    knowMore: string;
    venue: string;
    isRealDate: string;
  }
}

export const FinalReveal = ({ userData }: FinalRevealProps) => {
  const [phase, setPhase] = useState(0);
  const [doIMatter, setDoIMatter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [friendBtnPos, setFriendBtnPos] = useState({ x: 0, y: 0 });

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '8851ba56-4508-42d9-8406-fa6c767c5650',
          subject: '❤️ Shraddha Completed v3.0! ❤️',
          message: `Date Logistics:\nDate: Oct 4th, 12:42 PM\nReal Date?: ${userData.isRealDate.toUpperCase()}\nVenue: ${userData.venue}\n\nGetting to know her:\nHome: ${userData.home}\nHobbies: ${userData.hobbies}\nGoals: ${userData.goals}\nWant to know me more?: ${userData.knowMore}\n\nDeep Questions:\nDo I matter to you?: ${doIMatter}\nAre you into me?: YES (She couldn't click no 😂)`
        })
      });
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
    setPhase(6); // Thank You
  };

  useEffect(() => {
    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 4500);
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 4000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const sendEasterEggEmail = (word: string) => {
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '8851ba56-4508-42d9-8406-fa6c767c5650',
        subject: '❤️ Shraddha Found the Easter Egg! ❤️',
        message: `Shraddha successfully unlocked the final Easter Egg!\nShe typed: "${word}"`
      })
    }).catch(console.error);
  };

  useEffect(() => {
    if (phase !== 6) return;
    
    let keyBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 8) {
        keyBuffer = keyBuffer.slice(-8);
      }
      if (keyBuffer === 'iloveyou') {
        setPhase(7);
        sendEasterEggEmail('i love you');
      } else if (keyBuffer === 'ilikeyou') {
        setPhase(8);
        sendEasterEggEmail('i like you');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  const handleFriendHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 200;
    setFriendBtnPos({ x: newX, y: newY });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontFamily: 'monospace', color: 'var(--success)' }}
          >
            <p>{'> Finalizing setup...'}</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5 }}
              style={{ background: 'var(--success)', height: '20px', marginTop: '1rem', marginBottom: '0.5rem' }}
            />
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2.5 }}
            >
              100% - Deployment successful. ❤️
            </motion.p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="reveal1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-pink)' }}>
              HEARTOS v3.0 ❤️
            </h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>
              Deep Dive Edition.
            </h2>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="reveal2"
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ padding: '3rem 2rem', maxWidth: '500px', width: '100%', position: 'relative' }}
          >
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '1.2rem' }}>
              <p>I know you're super busy, and we don't always get to talk as much as I'd like...</p>
              <p>But honestly, every time we do, it genuinely makes my day.</p>
              <p>Your energy is just different.</p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              style={{ marginTop: '3rem', textAlign: 'center' }}
            >
              <button 
                className="btn-primary glow-button"
                onClick={() => setPhase(3)}
              >
                Next ✨
              </button>
            </motion.div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="reveal3"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative' }}
          >
            <motion.div
              whileHover={{ scale: 1.2, transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.2 } }}
              style={{ display: 'inline-block', marginBottom: '2rem' }}
            >
              <Heart size={80} fill="var(--accent-pink)" color="var(--accent-pink)" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 51, 102, 0.8))' }} />
            </motion.div>
            
            <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '2rem', color: 'white', fontWeight: 600 }}>
              This is what my heart does when I see a notification from you.
            </p>

            <button className="btn-primary glow-button" onClick={() => setPhase(4)}>Continue ❤️</button>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            key="reveal4"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              So...
            </h2>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'white', fontWeight: 600 }}>
              I just wanted to ask... Do I matter to you?
            </p>
            
            <textarea
              value={doIMatter}
              onChange={(e) => setDoIMatter(e.target.value)}
              placeholder="Be completely honest..."
              style={{
                width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)',
                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none', marginBottom: '1.5rem',
                fontFamily: 'inherit',
                boxShadow: 'inset 0 0 10px rgba(255, 51, 102, 0.2)',
                position: 'relative', zIndex: 50, pointerEvents: 'auto', userSelect: 'auto'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.button 
                whileHover={doIMatter.trim() ? { scale: 1.05 } : {}}
                whileTap={doIMatter.trim() ? { scale: 0.95 } : {}}
                className="btn-primary glow-button"
                onClick={() => setPhase(5)}
                disabled={!doIMatter.trim()}
                style={{ opacity: doIMatter.trim() ? 1 : 0.5, cursor: doIMatter.trim() ? 'pointer' : 'not-allowed' }}
              >
                Next ➡️
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 5 && (
          <motion.div
            key="reveal5"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-pink)' }}>
              And honestly...
            </h2>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '3rem', color: 'white', fontWeight: 600 }}>
              Are you into me?
            </p>
            
            <div style={{ position: 'relative', minHeight: '150px' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary glow-button"
                onClick={handleFeedbackSubmit}
                style={{ position: 'relative', zIndex: 10, width: '200px' }}
              >
                {isSubmitting ? "Finishing up..." : "Yes ❤️"}
              </motion.button>

              <motion.div
                animate={{ x: friendBtnPos.x, y: friendBtnPos.y }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ position: 'absolute', top: '50px', left: '50%', marginLeft: '-100px', width: '200px', zIndex: 5 }}
                onHoverStart={handleFriendHover}
                onClick={handleFriendHover}
              >
                <button className="btn-secondary" style={{ width: '100%' }}>
                  Just as friends 😅
                </button>
                {friendBtnPos.x !== 0 && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-pink)', marginTop: '0.5rem', fontWeight: 'bold' }}>
                    I'm not letting you click that! 😂
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 6 && (
          <motion.div
            key="reveal6"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative', textAlign: 'center' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--success)' }}>
              THANK YOU ❤️
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              You're amazing.<br/><br/>
              I can't wait for Oct 4th. See you then, Shraddha! ✨
            </p>
            
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />
            
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1rem' }}>
              P.S. System locked. To unlock the final Easter egg, type the password anywhere on your screen.<br/>
              <span style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>Hint: 3 words, 8 letters ❤️</span>
            </p>
            <button 
              onClick={() => {
                setPhase(9);
                sendEasterEggEmail('She gave up and clicked skip! 🙈');
              }}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', marginTop: '1rem', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-pink)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              (I give up, just skip this 🙈)
            </button>
          </motion.div>
        )}

        {phase === 7 && (
          <motion.div
            key="reveal7"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            style={{ padding: '4rem 3rem', maxWidth: '600px', width: '100%', position: 'relative', textAlign: 'center', background: 'rgba(255, 51, 102, 0.1)', border: '2px solid var(--accent-pink)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <Heart size={100} fill="var(--accent-pink)" color="var(--accent-pink)" />
            </motion.div>
            
            <h2 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>
              I KNEW YOU WOULD!
            </h2>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.8', color: 'var(--accent-pink)', fontWeight: 'bold' }}>
              I love you too. ❤️
            </p>
          </motion.div>
        )}

        {phase === 8 && (
          <motion.div
            key="reveal8"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            style={{ padding: '4rem 3rem', maxWidth: '600px', width: '100%', position: 'relative', textAlign: 'center', background: 'rgba(255, 51, 102, 0.1)', border: '2px solid var(--accent-pink)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <Heart size={100} fill="var(--accent-pink)" color="var(--accent-pink)" />
            </motion.div>
            
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
              I LIKE YOU TOO! 😊
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--accent-pink)', fontWeight: 'bold' }}>
              (But secretly, I was hoping for the "L" word... 😉)
            </p>
          </motion.div>
        )}

        {phase === 9 && (
          <motion.div
            key="reveal9"
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            style={{ padding: '4rem 3rem', maxWidth: '600px', width: '100%', position: 'relative', textAlign: 'center', background: 'rgba(255, 51, 102, 0.1)', border: '2px solid var(--accent-pink)' }}
          >
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
              It's okay! 😂
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--accent-pink)', fontWeight: 'bold' }}>
              I still like you anyway.<br/>See you on Oct 4th! ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
