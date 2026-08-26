import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import marshmallowMeet from '../assets/marshmallow-meet.jpg';
import loveSticker from '../assets/sticker-love.png';

const getHerQuestions = (chosenName: string, answers: Record<string, string> = {}) => [
  {
    title: "HeartOS meets YouOS",
    content: "You stayed. You actually stayed.\n\nHeartOS was built to tell you my darkest truths, and I fully expected it to end there. But you clicked 'Continue making me smile'. That means more to me than words can say.\n\nNow that you know everything about me... it's my turn to learn everything about you. Welcome to YouOS.",
    type: "info",
    image: marshmallowMeet
  },
  {
    title: "The Name Game",
    content: "Before we go any further, I have a very important question.\n\nShould I call you Shru or Shraddha?",
    type: "single-choice",
    key: "name_pref",
    options: ["Call me Shru 🙈", "Shraddha is fine 😊", "Whatever you want ❤️"]
  },
  {
    title: "The Elephant in the Room 🐘",
    content: "Okay, before I get my hopes too high... I have to ask. Is there already a lucky guy in your life? (Please say no 🙈)",
    type: "single-choice",
    key: "status",
    options: ["Nope, I'm single! 😊", "It's complicated 🫣", "Yes, sorry! 😅"]
  },
  ...(answers.status === "Yes, sorry! 😅" ? [{
    title: "Wait, what? 💔",
    content: "You just said you have a boyfriend... then why were you on the Shaadi app? Explain yourself young lady! 🤨",
    type: "textarea",
    key: "why_shaadi"
  }] : []),
  {
    title: `Little ${chosenName}`,
    content: `Let's start from the beginning. How was little ${chosenName}'s childhood? Were you a quiet kid, a troublemaker, or somewhere in between? Tell me a memory you cherish.`,
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
    content: `I laid all my cards on the table. Now, if you're comfortable, I want to know about your past. What experiences made you the ${chosenName} you are today?\n\n(Feel free to skip this if you're not ready to share yet.)`,
    type: "textarea",
    key: "past",
    required: false
  },
  {
    title: "The Oct 4th Date",
    content: "I want our date on October 4th to be perfect. Today I asked you for your wishlist of places rather than just a cafe, so I can finalize my office leave and plan the best day for us.\n\nSo... where do you really want to go?",
    type: "textarea",
    key: "wishlist"
  },
  {
    title: "The Vibe Check",
    content: "What is your exact mood right now about this whole October 4th thing?",
    type: "single-choice",
    key: "vibe",
    options: ["Excited but nervous 🦋", "Still thinking about it 🤔", "Not finalized yet, let's see how you behave 👀", "Already planning my outfit 👗"]
  },
  {
    title: "The Food Priority",
    content: "Oct 4th is locked in (hopefully). But let's get to the most critical question... What kind of food vibe are we going for?",
    type: "choice-with-text",
    key: "food",
    options: ["Coffee & deep conversations ☕", "Something sweet 🍰", "Proper food, I'm always hungry 🍔", "Street food adventures 🌮"]
  },
  {
    title: "The Flag Assessment",
    content: "Okay, let's be real. After surviving the intense rollercoaster of HeartOS, tell me honestly...\n\nWhat are my green flags? And what are my red flags?",
    type: "choice-with-text",
    key: "flags",
    options: ["Green Flag: Honest 🟩", "Green Flag: Cares a lot 🟩", "Red Flag: Overthinks 🚩", "Red Flag: Too protective 🚩"]
  },
  {
    title: "The Distance",
    content: "Since we live in two different cities... where should we meet on October 4th?",
    type: "single-choice",
    key: "meet_location",
    options: ["Central point 📍", "You come to Goa 🏖️", "I come to Nashik 🍷", "Let's figure it out together 🤝"]
  },
  {
    title: "SECURITY CLEARANCE",
    content: "SYSTEM OVERRIDE REQUIRED.\n\nTo prove you are truly ready to submit your answers... What is the exact distance in kilometers between us?",
    type: "passcode",
    key: "passcode",
    expectedAnswer: "693"
  },
  {
    title: "The Beginning",
    content: "Thank you for sharing your world with me.\n\nAre you ready for everything that comes next?",
    type: "choice",
    key: "ready",
    options: ["I was born ready ✨", "Yes, let's do this ❤️", "I can't wait! 😊"],
    image: loveSticker
  }
];

export const V5HerOS = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [passcodeAttempts, setPasscodeAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  const chosenName = answers.name_pref === "Shraddha is fine 😊" ? "Shraddha" : "Shru";
  const currentQuestions = getHerQuestions(chosenName, answers);

  const handleNext = () => {
    if (currentQuestions[step].type === 'passcode') {
      if (answers['passcode']?.trim() !== currentQuestions[step].expectedAnswer) {
        setPasscodeAttempts(prev => prev + 1);
        return; // Don't proceed to next step
      }
    }

    if (step < currentQuestions.length - 1) {
      setStep(prev => prev + 1);
      setPasscodeAttempts(0);
      setShowHint(false);
    }
  };


  const currentQ = currentQuestions[step];
  let isAnswerMissing = false;
  if (currentQ.type !== 'info') {
    if (currentQ.type === 'passcode') {
      isAnswerMissing = !answers[currentQ.key as string] || answers[currentQ.key as string].trim() === '';
    } else if (currentQ.required !== false) {
      isAnswerMissing = !answers[currentQ.key as string] || answers[currentQ.key as string].trim() === '';
    }
  }

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
          message: `YouOS Responses:\n\n1. Name Pref: ${finalAnswers.name_pref}\n2. Childhood: ${finalAnswers.childhood}\n3. Family: ${finalAnswers.family}\n4. Travel/Trekking: ${finalAnswers.travel}\n5. Her Past: ${finalAnswers.past || 'Skipped'}\n6. Date Wishlist: ${finalAnswers.wishlist}\n7. Vibe: ${finalAnswers.vibe}\n8. Food: ${finalAnswers.food}\n9. Flags: ${finalAnswers.flags}\n10. Meet Loc: ${finalAnswers.meet_location}\n11. Ready?: ${finalAnswers.ready}\n\n[Status]: ${finalAnswers.status}\n[Why Shaadi?]: ${finalAnswers.why_shaadi || 'N/A'}`
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
    <div className="phone-wrapper">
      <div className="chat-container">
        <div className="chat-scroll-area">
          {currentQuestions.slice(0, step + 1).map((q, index) => {
            const isCurrent = index === step;

            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                {/* Omkar's Question Bubble */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="chat-bubble-left"
                >
                  {q.image && (
                    <img src={q.image} alt="pic" style={{ width: '100%', maxWidth: '250px', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} />
                  )}
                  {q.title && <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>{q.title}</div>}
                  <div style={{ whiteSpace: 'pre-line' }}>{q.content}</div>
                </motion.div>

                {/* Shraddha's Past Answer Bubble */}
                {!isCurrent && answers[q.key as string] && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="chat-bubble-right" 
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {answers[q.key as string]}
                  </motion.div>
                )}

                {/* Current Question Input Controls */}
                {isCurrent && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'flex-end', marginTop: '1rem' }}
                  >
                    {q.type === 'textarea' && (
                      <textarea
                        value={answers[q.key as string] || ''}
                        onChange={(e) => setAnswers({ ...answers, [q.key as string]: e.target.value })}
                        placeholder="Type your reply here..."
                        style={{
                          width: '100%',
                          minHeight: '120px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--card-border)',
                          borderRadius: '12px',
                          padding: '1rem',
                          color: 'var(--text-primary)',
                          fontSize: '1rem',
                          resize: 'vertical',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    )}

                    {q.type === 'choice-with-text' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          {q.options?.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const currentAns = answers[q.key as string] || '';
                                const newAns = currentAns ? `${currentAns}\n- ${opt}` : `- ${opt}`;
                                setAnswers({ ...answers, [q.key as string]: newAns });
                              }}
                              style={{
                                background: 'transparent',
                                border: '1px solid var(--accent-primary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                color: 'var(--accent-primary)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              + {opt}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={answers[q.key as string] || ''}
                          onChange={(e) => setAnswers({ ...answers, [q.key as string]: e.target.value })}
                          placeholder="Type your own answer or click the options above..."
                          style={{
                            width: '100%',
                            minHeight: '100px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            padding: '1rem',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            resize: 'vertical',
                            outline: 'none',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                    )}

                    {q.type === 'single-choice' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end', width: '100%' }}>
                        {q.options?.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setAnswers({ ...answers, [q.key as string]: opt })}
                            style={{
                              background: answers[q.key as string] === opt ? 'var(--accent-primary)' : 'transparent',
                              border: `1px solid var(--accent-primary)`,
                              padding: '0.8rem 1.5rem',
                              borderRadius: '20px',
                              color: answers[q.key as string] === opt ? '#ffffff' : 'var(--accent-primary)',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              maxWidth: '85%',
                              textAlign: 'right'
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === 'passcode' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                          {[0, 1, 2].map((i) => (
                            <motion.span 
                              key={i} 
                              animate={{ 
                                scale: i < (3 - passcodeAttempts) ? 1 : 0.8, 
                                opacity: i < (3 - passcodeAttempts) ? 1 : 0.2 
                              }}
                              transition={{ duration: 0.3 }}
                              style={{ fontSize: '1.5rem', filter: i < (3 - passcodeAttempts) ? 'drop-shadow(0 0 5px rgba(255,0,0,0.5))' : 'grayscale(100%)' }}
                            >
                              ❤️
                            </motion.span>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={answers[q.key as string] || ''}
                          onChange={(e) => setAnswers({ ...answers, [q.key as string]: e.target.value })}
                          placeholder="Enter passcode..."
                          style={{
                            background: 'rgba(255, 0, 50, 0.1)',
                            border: '1px solid var(--error)',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            color: 'var(--error)',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            letterSpacing: '5px',
                            width: '100%',
                            maxWidth: '250px',
                            outline: 'none'
                          }}
                        />
                        
                        {passcodeAttempts > 0 && (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            style={{ marginTop: '1rem', color: 'var(--error)', fontSize: '0.9rem', fontFamily: 'monospace', textAlign: 'right' }}
                          >
                            ACCESS DENIED.
                            
                            {passcodeAttempts >= 3 && !showHint && (
                              <div style={{ marginTop: '0.5rem' }}>
                                <button 
                                  onClick={() => setShowHint(true)} 
                                  style={{ background: 'transparent', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'monospace' }}
                                >
                                  Need a hint?
                                </button>
                              </div>
                            )}
                            
                            {showHint && (
                              <div style={{ marginTop: '0.5rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                                (Hint: Google the distance between your city Quepem and my city Nashik... yes, I know! 😉)
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}

                    {q.type === 'choice' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end', width: '100%' }}>
                        {q.options?.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => submitAnswers(opt)}
                            disabled={isSubmitting}
                            style={{
                              background: 'var(--accent-primary)',
                              border: 'none',
                              padding: '1rem 2rem',
                              borderRadius: '20px',
                              color: '#ffffff',
                              fontSize: '1.1rem',
                              cursor: isSubmitting ? 'wait' : 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 4px 15px var(--accent-glow)'
                            }}
                          >
                            {isSubmitting ? 'Sending to Omkar...' : opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Send / Next Button for non-final questions */}
                    {q.type !== 'choice' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '1rem' }}>
                        <button 
                          onClick={handleNext} 
                          disabled={isAnswerMissing}
                          style={{
                            background: isAnswerMissing ? 'transparent' : 'var(--accent-primary)',
                            color: isAnswerMissing ? 'var(--text-secondary)' : '#fff',
                            border: `1px solid ${isAnswerMissing ? 'var(--card-border)' : 'var(--accent-primary)'}`,
                            padding: '0.8rem 2.5rem',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            opacity: isAnswerMissing ? 0.5 : 1,
                            cursor: isAnswerMissing ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isAnswerMissing ? 'none' : '0 4px 15px var(--accent-glow)'
                          }}
                        >
                          Send ➔
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
          
          <div ref={bottomRef} style={{ height: '20px' }} />
        </div>
      </div>
    </div>
  );
};
