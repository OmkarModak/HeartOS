import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const confessionSteps = [
  {
    title: "The Little Things",
    content: "I know you have a mole on the side of your neck. It's the little things I notice about you.",
  },
  {
    title: "The Commitment",
    content: "When I saw you and we started texting, I deleted my profile from the Shaadi app immediately. I did it because I thought you were the one I wanted in my life.",
  },
  {
    title: "A Serious Question",
    content: "What if I lose my job? What will you think of me? I need to know we can weather any storm together.",
  },
  {
    title: "My Family",
    content: "I want to be completely honest about my family. My mom is a little vulnerable; she gets scared if anything happens. My father sometimes struggles to understand how to handle situations in the moment, but he always realizes it later. He is an educated person, and once he understands, it's all good.",
  },
  {
    title: "My Sister",
    content: "Then there's my elder sister. We are waiting for her marriage, but due to her past relationship, she isn't ready to move on just yet. I am always by her side, supporting her.",
  },
  {
    title: "My Circle",
    content: "I have limited friends. Some hate me, some love me like nothing else. The ones who love me are 'my boys.' Why do some hate me? Because of my past relationships and the fuck ups I made.",
  },
  {
    title: "The Past (Part 1)",
    content: "I've had my heart broken before. In my 1st year of BSc, I had a crush on the most beautiful girl in college. I waited hours for her classes to finish just to drop her home like Romeo. We dated cutely for a few months. I never even touched her... but the day I just touched her shoulder and said 'chaloo', she asked for a break shortly after. I cried and was depressed. Later, I fell for a scholar, but she was too possessive—calling every minute—so it didn't last.",
  },
  {
    title: "The Past (Part 2)",
    content: "In my 2nd year, I fell for a senior comp sci girl. Everything was perfect until chaos erupted at my home over my sister's relationship (because they found out I supported her). Because of the home chaos, I had to break up with her. I told her the truth, but she didn't believe me. Since her mom knew about us, she blamed me. I couldn't help it; things at home were messy. So, we broke up.",
  },
  {
    title: "The Drama & Betrayal",
    content: "In 3rd year, a girl fell for me after I won a singing competition. But she had a toxic Ola manager ex who was aggressive. She couldn't leave him. One night, he stopped our car and threatened her. I protected her. We sorted it out, but he went mad, stalking us to college and threatening me. At a cultural event, I brought my friends to protect us. He threatened to show her naked pics. I shouted at him, made sure she wanted to leave him, and we ended it.",
  },
  {
    title: "The Betrayal (Cont.)",
    content: "But there was a twist. My first ex and her boyfriend manipulated the situation. I get manipulated easily, and they took advantage. Because of that, my relationship broke. She blocked me everywhere. A year later, I found out she was dating the very friend I had called to help protect us that night.",
  },
  {
    title: "The 4-Year Silence",
    content: "For a year, I was completely broken. Then I started hitting the gym. I started my MSc in IT. I continued the gym for 2 years. I got a job where I interned. For almost 4 years, I had absolutely no girlfriend, nothing. My life was completely focused. I became the silent gym guy. People used to call me 'Mr. Consistent.'",
  },
  {
    title: "Until You",
    content: "And then... I saw you. After 4 years of silence and building my walls, you were the one who made me delete that app.",
  },
  {
    title: "The Final Chapter",
    content: "[...waiting for the final story...]"
  }
];

export const V4Confession = () => {
  const [step, setStep] = useState(0);
  const [jobAnswer, setJobAnswer] = useState('');
  const [littleThingsResponse, setLittleThingsResponse] = useState<string | null>(null);

  const littleThingsOptions = [
    "Aww, you noticed! 🥺",
    "Stalker vibes 👀😂",
    "I didn't even realize! 🙈"
  ];

  const handleNext = () => {
    if (step === 2 && jobAnswer.trim().length === 0) return;
    
    if (step < confessionSteps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '1rem' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          style={{ padding: '3rem 2rem', maxWidth: '700px', width: '100%', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            {step + 1} / {confessionSteps.length}
          </div>

          <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-pink)', textAlign: 'center' }}>
            {confessionSteps[step].title}
          </h2>

          <div style={{ fontSize: '1.2rem', color: 'white', lineHeight: '1.8', marginBottom: '3rem', whiteSpace: 'pre-wrap' }}>
            {confessionSteps[step].content}
            
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
              >
                {littleThingsOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setLittleThingsResponse(opt)}
                    style={{
                      background: littleThingsResponse === opt ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${littleThingsResponse === opt ? 'var(--accent-pink)' : 'rgba(255,255,255,0.2)'}`,
                      padding: '0.8rem 1.5rem',
                      borderRadius: '50px',
                      color: littleThingsResponse === opt ? 'var(--accent-pink)' : 'white',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      maxWidth: '300px'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem' }}
              >
                <textarea
                  value={jobAnswer}
                  onChange={(e) => setJobAnswer(e.target.value)}
                  placeholder="Your honest answer..."
                  style={{
                    width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255, 51, 102, 0.4)',
                    color: 'white', fontSize: '1.1rem', outline: 'none', resize: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </motion.div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
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
              className="btn-primary glow-button"
              style={{
                padding: '0.8rem 2rem',
                opacity: (step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0) ? 0.5 : 1,
                cursor: (step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0) ? 'not-allowed' : 'pointer'
              }}
              disabled={(step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0)}
            >
              {step === confessionSteps.length - 2 ? "Read Final Chapter" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
