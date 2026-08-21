import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BootScreen } from './components/BootScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SadScreen } from './components/SadScreen';
import { StoryChapter } from './components/StoryChapter';
import { WarningScreen } from './components/WarningScreen';
import { PollSystem } from './components/PollSystem';
import { FinalReveal } from './components/FinalReveal';
import { CodeChallenge } from './components/CodeChallenge';
import { FloatingHearts } from './components/FloatingHearts';
import { ClickEffectManager } from './components/ClickEffectManager';
import { DateAskScreen } from './components/DateAskScreen';
import { DateJokeScreen } from './components/DateJokeScreen';
import { DateFormScreen } from './components/DateFormScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { QASignoff } from './components/QASignoff';
import { storyChapters } from './data/story';
import { polls, interPoll } from './data/polls';

type AppState = 'BOOT' | 'WELCOME' | 'QA_SIGNOFF' | 'DENIED' | 'QUIT' | 'STORY' | 'PERSONAL_WARNING' | 'INTER_POLL' | 'POLLS' | 'CODE_CHALLENGE' | 'DATE_ASK' | 'DATE_JOKE' | 'DATE_FORM' | 'DATE_CHECKOUT' | 'FINAL';

function App() {
  const [appState, setAppState] = useState<AppState>('BOOT');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const [dateData, setDateData] = useState({ date: '', time: '', food: '' });

  useEffect(() => {
    console.log(
      "%c[QA ALERT] Hello Shraddha! The developer has left a backdoor open for you. ❤️",
      "color: #ff5f56; font-size: 16px; font-weight: bold; background: #2d2d2d; padding: 8px; border-radius: 4px;"
    );
    console.log(
      "%cHint: Try clicking on the print statement string in the code editor! 😉",
      "color: #27c93f; font-size: 14px; font-style: italic;"
    );
  }, []);

  const handleNextChapter = () => {
    if (currentChapterIndex === 1) {
      setAppState('PERSONAL_WARNING');
    } else if (currentChapterIndex === 3) {
      setAppState('INTER_POLL');
    } else if (currentChapterIndex < storyChapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else {
      setAppState('POLLS');
    }
  };

  const handleWarningProceed = () => {
    setCurrentChapterIndex(2);
    setAppState('STORY');
  };

  const handleInterPollComplete = () => {
    setCurrentChapterIndex(4);
    setAppState('STORY');
  };

  const handleNextPoll = () => {
    if (currentPollIndex < polls.length - 1) {
      setCurrentPollIndex(prev => prev + 1);
    } else {
      setAppState('CODE_CHALLENGE');
    }
  };

  return (
    <>
      <ClickEffectManager />
      <div className="bg-effects">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>
      <FloatingHearts />

      <div style={{ position: 'fixed', bottom: '15px', right: '20px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.3)', zIndex: 50, pointerEvents: 'none', letterSpacing: '0.5px', fontFamily: 'monospace' }}>
        Designed & Developed for you ❤️
      </div>

      <div className="app-container">
        <AnimatePresence mode="wait">
          {appState === 'BOOT' && (
            <BootScreen key="boot" onComplete={() => setAppState('DATE_ASK')} />
          )}

          {appState === 'WELCOME' && (
            <WelcomeScreen 
              key="welcome"
              onAgree={() => setAppState('QA_SIGNOFF')} 
              onDisagree={() => setAppState('DENIED')} 
            />
          )}

          {appState === 'QA_SIGNOFF' && (
            <QASignoff key="qa-signoff" onComplete={() => setAppState('STORY')} />
          )}

          {appState === 'DENIED' && (
            <SadScreen key="denied" onTryAgain={() => setAppState('STORY')} onQuit={() => setAppState('QUIT')} />
          )}

          {appState === 'QUIT' && (
            <motion.div
              key="quit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'monospace' }}
            >
              <p>{'> System shutting down...'}</p>
              <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'var(--accent-pink)' }}>Fine. Goodbye, Shraddha. 💔</p>
            </motion.div>
          )}

          {appState === 'PERSONAL_WARNING' && (
            <WarningScreen key="warning" onProceed={handleWarningProceed} />
          )}

          {appState === 'STORY' && (
            <motion.div
              key={`story-${currentChapterIndex}`}
              initial={{ opacity: 0, x: 40, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <StoryChapter 
                chapter={storyChapters[currentChapterIndex]} 
                index={currentChapterIndex}
                totalChapters={storyChapters.length}
                onNext={handleNextChapter} 
              />
            </motion.div>
          )}

          {appState === 'INTER_POLL' && (
            <PollSystem 
              key="inter-poll"
              question={interPoll}
              onComplete={handleInterPollComplete}
            />
          )}

          {appState === 'POLLS' && (
            <PollSystem 
              key={`poll-${currentPollIndex}`}
              question={polls[currentPollIndex]}
              onComplete={handleNextPoll}
            />
          )}

          {appState === 'CODE_CHALLENGE' && (
            <CodeChallenge key="code-challenge" onComplete={() => setAppState('FINAL')} />
          )}

          {appState === 'DATE_ASK' && (
            <DateAskScreen key="date-ask" onAgree={() => setAppState('DATE_JOKE')} />
          )}

          {appState === 'DATE_JOKE' && (
            <DateJokeScreen key="date-joke" onNext={() => setAppState('DATE_FORM')} />
          )}

          {appState === 'DATE_FORM' && (
            <DateFormScreen key="date-form" onNext={(data) => {
              setDateData(data);
              setAppState('DATE_CHECKOUT');
            }} />
          )}

          {appState === 'DATE_CHECKOUT' && (
            <CheckoutScreen key="checkout" data={dateData} onComplete={() => setAppState('FINAL')} />
          )}

          {appState === 'FINAL' && (
            <FinalReveal key="final" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
