import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { V4BootScreen } from './components/V4BootScreen';
import { V4WarningScreen } from './components/V4WarningScreen';
import { V4Confession } from './components/V4Confession';
import { V5BootScreen } from './components/V5BootScreen';
import { V5HerOS } from './components/V5HerOS';
import { FloatingHearts } from './components/FloatingHearts';
import { ClickEffectManager } from './components/ClickEffectManager';
import { ShutdownScreen } from './components/ShutdownScreen';

type AppState = 'V4_BOOT' | 'V4_WARNING' | 'V4_CONFESSION' | 'V5_BOOT' | 'V5_HER_OS';

const notify = (subject: string, message: string) => {
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: '8851ba56-4508-42d9-8406-fa6c767c5650',
      subject,
      message,
    }),
  }).catch(() => {}); // silent fail
};

function App() {
  const [isShutdown, setIsShutdown] = useState(true);
  const [appState, setAppState] = useState<AppState>('V5_BOOT');

  // Fire once on page load — someone visited
  useEffect(() => {
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    notify(
      '👀 Someone visited HeartOS',
      `HeartOS was opened at ${time} (IST).\n\nThe shutdown screen is showing. Let's see if she clicks continue...`
    );
  }, []);

  useEffect(() => {
    if (!isShutdown && (appState === 'V5_BOOT' || appState === 'V5_HER_OS')) {
      document.body.classList.add('theme-you');
    } else {
      document.body.classList.remove('theme-you');
    }
  }, [appState, isShutdown]);

  const handleContinue = () => {
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    notify(
      '💗 She clicked "continue anyway"!',
      `She found the hidden button and clicked "continue anyway" at ${time} (IST).\n\nShe's in. 🎉`
    );
    setIsShutdown(false);
  };

  if (isShutdown) {
    return <ShutdownScreen onContinue={handleContinue} />;
  }

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
          {appState === 'V4_BOOT' && (
            <V4BootScreen key="v4_boot" onComplete={() => setAppState('V4_WARNING')} />
          )}

          {appState === 'V4_WARNING' && (
            <V4WarningScreen key="v4_warning" onProceed={() => setAppState('V4_CONFESSION')} />
          )}

          {appState === 'V4_CONFESSION' && (
            <V4Confession key="v4_confession" onSurvive={() => setAppState('V5_BOOT')} />
          )}

          {appState === 'V5_BOOT' && (
            <V5BootScreen key="v5_boot" onComplete={() => setAppState('V5_HER_OS')} />
          )}

          {appState === 'V5_HER_OS' && (
            <V5HerOS key="v5_her_os" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
