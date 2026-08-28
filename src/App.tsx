import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { V4BootScreen } from './components/V4BootScreen';
import { V4WarningScreen } from './components/V4WarningScreen';
import { V4Confession } from './components/V4Confession';
import { V5BootScreen } from './components/V5BootScreen';
import { V5HerOS } from './components/V5HerOS';
import { FloatingHearts } from './components/FloatingHearts';
import { ClickEffectManager } from './components/ClickEffectManager';

type AppState = 'V4_BOOT' | 'V4_WARNING' | 'V4_CONFESSION' | 'V5_BOOT' | 'V5_HER_OS';

function App() {
  const [appState, setAppState] = useState<AppState>('V5_BOOT');

  useEffect(() => {
    if (appState === 'V5_BOOT' || appState === 'V5_HER_OS') {
      document.body.classList.add('theme-you');
    } else {
      document.body.classList.remove('theme-you');
    }
  }, [appState]);

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
