import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const herQuestions = [
  {
    title: "HeartOS meets YouOS",
    content: "You stayed. You actually stayed.\n\nHeartOS was built to tell you my darkest truths, and I fully expected it to end there. But you clicked 'Continue making me smile'. That means more to me than words can say.\n\nNow that you know everything about me... it's my turn to learn everything about you. Welcome to YouOS.",
    type: "info"
  },
  {
    title: "The Name Game",
    content: "Before we go any further, I have a very important question.\n\nShould I call you Shru or Shraddha?",
    type: "single-choice",
    key: "name_pref",
    options: ["Call me Shru 🙈", "Shraddha is fine 😊", "Whatever you want ❤️"]
  },
  {
    title: "Little Shru",
    content: "Let's start from the beginning. How was little Shru's childhood? Were you a quiet kid, a troublemaker, or somewhere in between? Tell me a memory you cherish.",
    type: "textarea",
    key: "childhood"
  },
  {
    title: "Your World",
    content: "I know how much your family means to you. How is everyone at home? Aai, pappa, aaji, ajoba, and your lahan bhau? What's your favorite thing about your family?",
    type: "textarea",
    key: "family"
  },
  {
    title: "Your Adventures",
    content: "I know you love cricket, trekking, travelling, and exploring new places. If we could pack our bags and go anywhere in the world tomorrow, where are we going and why?",
    type: "textarea",
    key: "travel"
  },
  {
    title: "Your Past",
    content: "I laid all my cards on the table. Now, if you're comfortable, I want to know about your past. What experiences made you the Shru you are today?",
    type: "textarea",
    key: "past"
  },
  {
    title: "The Oct 4th Date",
    content: "I want our date on October 4th to be perfect. Today I asked you for your wishlist of places rather than just a cafe, so I can finalize my office leave and plan the best day for us.\n\nSo... where do you really want to go?",
    type: "textarea",
    key: "wishlist"
  },
  {
    title: "The Beginning",
    content: "Thank you for sharing your world with me.\n\nAre you ready for everything that comes next?",
    type: "choice",
    key: "ready",
    options: ["I was born ready ✨", "Yes, let's do this ❤️", "I can't wait! 😊"]
  }
];

export const V5HerOS = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleNext = () => {
    if (step < herQuestions.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const currentQ = herQuestions[step];
  const isAnswerMissing = currentQ.type !== 'info' && (!answers[currentQ.key as string] || answers[currentQ.key as string].trim() === '');

  const submitAnswers = async (finalChoice: string) => {
    setIsSubmitting(true);
    const finalAnswers: Record<string, string> = { ...answers, ready: finalChoice };
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '8851ba56-4508-42d9-8406-fa6c767c5650',
          subject: '🌸 Shraddha completed YouOS! 🌸',
          message: `YouOS Responses:\n\n1. Name Pref: ${finalAnswers.name_pref}\n2. Childhood: ${finalAnswers.childhood}\n3. Family: ${finalAnswers.family}\n4. Travel/Trekking: ${finalAnswers.travel}\n5. Her Past: ${finalAnswers.past}\n6. Date Wishlist: ${finalAnswers.wishlist}\n7. Ready?: ${finalAnswers.ready}`
        })
      });
      setIsDone(true);
    } catch (err) {
      console.error(err);
      setIsDone(true); // Still proceed even if it fails
    }
  };

  if (isDone) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', padding: '2rem', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
          <h1 className="glow-text" style={{ fontSize: '3.5rem', color: '#ffb3c6', marginBottom: '1rem' }}>See you on Oct 4th. ❤️</h1>
          <p style={{ fontSize: '1.2rem', color: 'white', opacity: 0.8 }}>Thank you for opening up to me.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '1rem' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="glass-panel"
          style={{ 
            padding: '3rem', 
            width: '100%', 
            maxWidth: '600px', 
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: 'rgba(255, 179, 198, 0.05)',
            border: '1px solid rgba(255, 179, 198, 0.2)'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            {step + 1} / {herQuestions.length}
          </div>

          <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#ffb3c6' }}>
            {currentQ.title}
          </h2>
          
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-line' }}>
            {currentQ.content}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2rem' }}>
            {currentQ.type === 'textarea' && (
              <textarea
                value={answers[currentQ.key as string] || ''}
                onChange={(e) => setAnswers({ ...answers, [currentQ.key as string]: e.target.value })}
                placeholder="Type your answer here..."
                style={{
                  width: '100%',
                  minHeight: '150px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255, 179, 198, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            )}

            {currentQ.type === 'single-choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                {currentQ.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [currentQ.key as string]: opt })}
                    style={{
                      background: answers[currentQ.key as string] === opt ? 'rgba(255, 179, 198, 0.3)' : 'rgba(255, 179, 198, 0.1)',
                      border: `1px solid ${answers[currentQ.key as string] === opt ? '#ffb3c6' : 'rgba(255, 179, 198, 0.3)'}`,
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      color: answers[currentQ.key as string] === opt ? 'white' : '#ffb3c6',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      maxWidth: '400px'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                {currentQ.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => submitAnswers(opt)}
                    disabled={isSubmitting}
                    style={{
                      background: 'rgba(255, 179, 198, 0.1)',
                      border: '1px solid #ffb3c6',
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      color: '#ffb3c6',
                      fontSize: '1.1rem',
                      cursor: isSubmitting ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      maxWidth: '400px'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentQ.type !== 'choice' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button
                onClick={handlePrev}
                style={{
                  background: 'none',
                  border: 'none',
                  color: step === 0 ? 'transparent' : 'rgba(255,255,255,0.5)',
                  cursor: step === 0 ? 'default' : 'pointer',
                  fontSize: '1rem',
                  textDecoration: 'underline'
                }}
                disabled={step === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                style={{
                  background: 'linear-gradient(45deg, #ffb3c6, #ff8fab)',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '50px',
                  color: '#2b0014',
                  fontWeight: 'bold',
                  opacity: isAnswerMissing ? 0.5 : 1,
                  cursor: isAnswerMissing ? 'not-allowed' : 'pointer',
                  boxShadow: isAnswerMissing ? 'none' : '0 4px 15px rgba(255, 179, 198, 0.3)'
                }}
                disabled={isAnswerMissing}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
