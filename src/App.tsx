import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BootScreen } from './components/BootScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SadScreen } from './components/SadScreen';
import { StoryChapter } from './components/StoryChapter';
import { PollSystem } from './components/PollSystem';
import { FinalReveal } from './components/FinalReveal';
import { CodeChallenge } from './components/CodeChallenge';
import { FloatingHearts } from './components/FloatingHearts';
import { ClickEffectManager } from './components/ClickEffectManager';
import { storyChapters } from './data/story';
import { polls, interPoll } from './data/polls';

type AppState = 'BOOT' | 'WELCOME' | 'DENIED' | 'STORY' | 'INTER_POLL' | 'POLLS' | 'CODE_CHALLENGE' | 'FINAL';

function App() {
  const [appState, setAppState] = useState<AppState>('BOOT');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPollIndex, setCurrentPollIndex] = useState(0);

  useEffect(() => {
    console.log(
      "%c[QA ALERT] Hello Shraddha! The developer has left a backdoor open for you. ❤️",
      "color: #ff5f56; font-size: 16px; font-weight: bold; background: #2d2d2d; padding: 8px; border-radius: 4px;"
    );
  }, []);

  const handleNextChapter = () => {
    if (currentChapterIndex === 3) {
      setAppState('INTER_POLL');
    } else if (currentChapterIndex < storyChapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else {
      setAppState('POLLS');
    }
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

      <div className="app-container">
        <AnimatePresence mode="wait">
          {appState === 'BOOT' && (
            <BootScreen key="boot" onComplete={() => setAppState('WELCOME')} />
          )}

          {appState === 'WELCOME' && (
            <WelcomeScreen 
              key="welcome"
              onAgree={() => setAppState('STORY')} 
              onDisagree={() => setAppState('DENIED')} 
            />
          )}

          {appState === 'DENIED' && (
            <SadScreen key="denied" onTryAgain={() => setAppState('WELCOME')} />
          )}

          {appState === 'STORY' && (
            <StoryChapter 
              key={`story-${currentChapterIndex}`} 
              chapter={storyChapters[currentChapterIndex]} 
              index={currentChapterIndex}
              totalChapters={storyChapters.length}
              onNext={handleNextChapter} 
            />
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

          {appState === 'FINAL' && (
            <FinalReveal key="final" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
