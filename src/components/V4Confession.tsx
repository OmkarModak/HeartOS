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
    content: "In 3rd year, a girl fell for me after I won a singing competition. But she had a toxic Ola manager ex who was aggressive. She couldn't leave him. One night, he stopped our car and threatened her. I protected her. We sorted it out, but he went mad, stalking us to college and threatening me. He even followed us during the preparations for our cultural event, where we were the hosts. The day we finally ended it, he brought his friends to threaten me, so I called my closest friends to protect us. He threatened to show her naked pics. I shouted at him, made sure she wanted to leave him, and we ended it. I want to be completely open with you—this was the first girl I was intimate with.",
  },
  {
    title: "The Betrayal (Cont.)",
    content: "A few months later, when everything was good, there was a twist. My first ex and her boyfriend manipulated the situation. I get manipulated easily, and they took advantage. Because of that, my relationship broke, and she blocked me everywhere. Later, I found out she ended up dating the close friend she always used to call 'bro'.",
  },
  {
    title: "The 4-Year Silence",
    content: "For a year, I was completely broken. Then I started hitting the gym. I started my MSc in IT. I continued the gym for 2 years. I got a job where I interned. For almost 4 years, I had absolutely no girlfriend, nothing. My life was completely focused. I became the silent gym guy. People used to call me 'Mr. Consistent.'",
  },

  {
    title: "The Illusion (Part 1)",
    content: "Wait... before you, there was one more story. After those 4 years, a new girl joined as a receptionist at my gym. She was very quiet. As a friend, I started talking to her, and I started liking her—not loving her yet, because she looked cute from the outside, but you never know the truth on the inside. She approached me first. We'd click random pictures, text each other, and go to the temple. I used to come from the office after 9 PM just to wait for her shift to end so we could spend time together.",
  },
  {
    title: "The Illusion (Part 2)",
    content: "She had a childhood best friend who I already knew from the gym, and we became close too. One day at the temple, she introduced me to her mom. Her best friend pulled me aside and told me, 'Don't make her sad, she went through a toxic relationship.' I promised I wouldn't. Everything was going so well... because you never know what's coming next, right?",
  },
  {
    title: "The Red Flag",
    content: "One day in the gym, she handed me her phone to show me something on Instagram. I saw a notification pop up: 'I love you too' from a guy—an old friend from her martial arts classes. I asked her about it. She brushed it off, saying it was 'normal' for them to talk like that and that even her parents knew. Like a fool, I trusted her and let it go. We eventually started dating, and I was intimate with her, completely trusting the situation.",
  },
  {
    title: "The Trap (Part 1)",
    content: "In early 2024, I told her I wanted a real future with her. She said her parents were complicated. I started visiting her family's rented home, thinking maybe their poor condition was the issue, and I wanted to fix it. Her parents started acting very sweet to me, and soon, they asked me to drive them in my car to a wedding in their native place, Bijapur.",
  },
  {
    title: "Fighting For Her",
    content: "My dad, being well-connected, looked into her family and warned me not to go—he said they had a very weird history and were frauds. But I fought with my own parents for her. I defended her. I convinced my family and drove them to Bijapur. It was supposed to be a 3-day trip, but it turned into 4 days in a village with no infrastructure, no proper lights, and no toilets.",
  },
  {
    title: "The Disrespect",
    content: "They treated me like nothing but a driver for those 4 days. Back home, my mom was terrified they were going to force me to marry her there. My sister was the only one who defended me, knowing I wouldn't do anything wrong. Despite how badly I was treated, I still sat down with her mom and told her I liked her daughter. Her mom cried in front of me, making it seem like a touching moment. But that wasn't the end... the main thing started from here.",
  },
  {
    title: "The Dice In Their Game",
    content: "The doubts started when her mom asked me for 50k. At the time, I was only earning 24k a month. When I said I didn't have it, she told me to ask my friends or family. That's when I realized they never paid me for driving to Bijapur or for the rented car. I started feeling weird, but I was so manipulated by her words. I went to their home every day, playing Ludo with them like a fool... not realizing I was the dice in their game. I lied to my dad about going there. My sister still supported me because I hid the truth from her too. Shraddha, note this: I am trusting you with my absolute full heart here. Nobody else knows this.",
  },
  {
    title: "The Financial Drain",
    content: "Her mom started asking me to buy groceries and vegetables. I paid half of her first-year college fees (her best friend, who loved her, paid the other half). I bought her mom a new phone she never paid me back for. I gave my girlfriend money for petrol and daily things. I was going completely out of budget. I had to take loans just to survive. Why am I telling you this? Because absolutely no one knows. I agreed to everything and suffered in silence because I thought it was love.",
  },
  {
    title: "The Dark Reality",
    content: "The truth about her family was darker than I could have imagined. Her parents weren't actually married; her father had escaped his real family to be with her mother. They were violently abusive to each other. Once, she called me crying that she had been beaten and was running away, only for them to act like nothing happened days later. She also revealed a deeply traumatic past of being assaulted when she was young. But the most twisted part? After our breakup, her best friend told me she still talks nicely to the man who did it. I couldn't understand how.",
  },
  {
    title: "The Breaking Point",
    content: "In March 2026, I was heading to Pune for my new job training in a 3AC train. The week before, I had paid the advance for her college trip. Before I left, she demanded I drop her at the station on my day off. When I told her I couldn't and suggested her best friend, she questioned, 'Are you my boyfriend or is she?' We fought, and she cried. Still, she jumped onto my train to Pune just to see me. When the TC came, she ran. I was so pissed, but even then, she completely denied that she was in the wrong.",
  },
  {
    title: "The Emotional Blackmail",
    content: "During that first weekend in Pune, she picked a fight because I hadn't asked if she got her periods. My weekend was already chaotic settling in where my sister lives, but I just took the blame to stop the fighting. It didn't work. For the next two months, we constantly fought. The breaking point came one night at 2 AM. During a fight, she swallowed 5 tablets, telling me 'let whatever is gonna happen, happen.' Thankfully they were just headache pills, but it was pure emotional blackmail. That was the exact moment whatever love I had left for her completely died.",
  },
  {
    title: "The End (June 2026)",
    content: "I told her we would talk when I got back. Finally, in June 2026, I ended it and told her everything. She still tried to blame me and even tried to manipulate my sister into taking her side, but my sister saw right through her. Even her female best friend (the one from the gym) is still on my side to this day because she knows the reality of what I went through. The moment it was over, I finally felt completely relieved.",
  },
  {
    title: "My Goal Today",
    content: "Today, I am in a much better place. Back then, they financially drained me when I was barely earning 24k. Now, I earn above 40k. My priority is my career and my stability. I've made a promise to myself: I will not get married until my income reaches above 60k. I am focused on building a secure, solid future.",
  },
  {
    title: "The Audacity",
    content: "But here is the most insane part. Just last Thursday, out of nowhere, she called me while I was at the office. She asked if I was busy. I said yes, but asked what she wanted. She just said, 'Nothing, I just miss you.' I simply said 'OK' and cut the call. After everything she put me through, she still had the audacity to call. Shraddha, this is my entire past. This is why I built walls. This is what I survived before I met you.\n\nSo I have to ask you... should I block her?",
  },
  {
    title: "Until You",
    content: "And then... I saw you. After 4 years of silence and building my walls, you were the one who made me delete that app.",
  }
];

export const V4Confession = () => {
  const [step, setStep] = useState(0);
  const [jobAnswer, setJobAnswer] = useState('');
  const [littleThingsResponse, setLittleThingsResponse] = useState<string | null>(null);
  const [commitmentResponse, setCommitmentResponse] = useState<string | null>(null);
  const [blockAnswer, setBlockAnswer] = useState<string | null>(null);

  const littleThingsOptions = [
    "Aww, you noticed! 🥺",
    "Stalker vibes 👀😂",
    "I didn't even realize! 🙈"
  ];
  
  const commitmentOptions = [
    "Awww, that's so sweet! 🥺❤️",
    "Wait, seriously?! 😳",
    "I'm glad you did. 😊"
  ];
  
  const blockOptions = [
    "Yes, block her right now! 🚫",
    "Absolutely block her! 🛑"
  ];

  const handleNext = () => {
    if (step === 2 && jobAnswer.trim().length === 0) return;
    if (confessionSteps[step].title === "The Audacity" && !blockAnswer) return;
    
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

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
              >
                {commitmentOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setCommitmentResponse(opt)}
                    style={{
                      background: commitmentResponse === opt ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${commitmentResponse === opt ? 'var(--accent-pink)' : 'rgba(255,255,255,0.2)'}`,
                      padding: '0.8rem 1.5rem',
                      borderRadius: '50px',
                      color: commitmentResponse === opt ? 'var(--accent-pink)' : 'white',
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

            {confessionSteps[step].title === "The Audacity" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
              >
                {blockOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setBlockAnswer(opt)}
                    style={{
                      background: blockAnswer === opt ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${blockAnswer === opt ? 'var(--accent-pink)' : 'rgba(255,255,255,0.2)'}`,
                      padding: '0.8rem 1.5rem',
                      borderRadius: '50px',
                      color: blockAnswer === opt ? 'var(--accent-pink)' : 'white',
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
                opacity: (step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0) || (confessionSteps[step].title === "The Audacity" && !blockAnswer) ? 0.5 : 1,
                cursor: (step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0) || (confessionSteps[step].title === "The Audacity" && !blockAnswer) ? 'not-allowed' : 'pointer'
              }}
              disabled={(step === confessionSteps.length - 1) || (step === 2 && jobAnswer.trim().length === 0) || (confessionSteps[step].title === "The Audacity" && !blockAnswer)}
            >
              {step === confessionSteps.length - 2 ? "Read Final Chapter" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
