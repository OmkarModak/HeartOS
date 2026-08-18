import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal as TerminalIcon } from 'lucide-react';

interface CodeChallengeProps {
  onComplete: () => void;
}

export const CodeChallenge = ({ onComplete }: CodeChallengeProps) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['> Ready.']);
  const [isSuccess, setIsSuccess] = useState(false);
  const [runClicks, setRunClicks] = useState(0);

  const handleRunClick = () => {
    const newClicks = runClicks + 1;
    setRunClicks(newClicks);

    if (newClicks >= 3) {
      setTerminalOutput(prev => [
        ...prev, 
        '> Error: Automated run script failed.', 
        '> Hint: The developer left a backdoor open.  Inspect to check the browser console for a clue! 🕵️‍♀️'
      ]);
    } else {
      setTerminalOutput(prev => [
        ...prev, 
        '> Error: Automated run script failed.', 
        '> Suggestion: Manual QA override required. Check the source code.'
      ]);
    }
  };

  const handleSecretClick = () => {
    if (isSuccess) return;
    setIsSuccess(true);
    
    if (runClicks === 0) {
      setTerminalOutput(prev => [...prev, '> Good eye! 😉 You found the override without even clicking Run.', '> Executing query...']);
    } else {
      setTerminalOutput(prev => [...prev, '> Executing query...']);
    }
    
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Downloading YOU database...']);
    }, 800);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Processing results... 1 row returned.']);
    }, 1800);
    
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> WARNING: Heart CPU Usage spiking...']);
    }, 2800);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> CPU Usage: 100% ❤️']);
    }, 4200);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Unlocking final sequence...']);
    }, 5800);

    setTimeout(() => {
      onComplete();
    }, 7500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
    >
      <div style={{ background: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
        
        {/* Fake Window Header */}
        <div style={{ background: '#2d2d2d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <div style={{ marginLeft: 'auto', color: '#888', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            query_heart.py
          </div>
        </div>

        {/* Code Area */}
        <div style={{ padding: '20px', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', lineHeight: '1.5', color: '#d4d4d4', overflowX: 'auto' }}>
          <div style={{ color: '#6a9955', fontStyle: 'italic' }}>
            # TODO: Write a patch to fix my inability to act cool around her.
          </div>
          <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '10px' }}>
            # Status: Attempted. Failed miserably.
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#569cd6' }}>def</span>&nbsp;
            <span style={{ color: '#dcdcaa' }}>query_heart_database</span>():
          </div>
          <div style={{ paddingLeft: '20px', display: 'flex' }}>
            <span style={{ color: '#9cdcfe' }}>sql_query</span> = <span style={{ color: '#ce9178' }}>"""</span>
          </div>
          <div style={{ paddingLeft: '40px', color: '#ce9178' }}>
            SELECT y.name, y.beauty_level, y.cuteness_level
          </div>
          <div style={{ paddingLeft: '40px', color: '#ce9178' }}>
            FROM YOU y
          </div>
          <div style={{ paddingLeft: '40px', color: '#ce9178' }}>
            WHERE y.status = 0
          </div>
          <div style={{ paddingLeft: '60px', color: '#ce9178' }}>
            AND y.past = ANY;
          </div>
          <br />
          <div style={{ paddingLeft: '40px', color: '#ce9178' }}>
            -- I don't care about previous versions.
          </div>
          <div style={{ paddingLeft: '40px', color: '#ce9178' }}>
            -- I'm interested in the current release. 😄
          </div>
          <div style={{ paddingLeft: '20px', color: '#ce9178' }}>
            """
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#c586c0' }}>return</span> <span style={{ color: '#dcdcaa' }}>execute</span>(<span style={{ color: '#9cdcfe' }}>sql_query</span>)
          </div>
          <br />
          <div style={{ color: '#6a9955', fontStyle: 'italic' }}>
            # QA task: The automated 'Run' button below is currently broken.
          </div>
          <div style={{ color: '#6a9955', fontStyle: 'italic' }}>
            # Manual override required to proceed.
          </div>
          <br />
          <div>
            <span style={{ color: '#dcdcaa' }}>print</span>(
            <span 
              onClick={handleSecretClick}
              style={{ 
                color: '#ce9178', 
                cursor: 'pointer', 
                position: 'relative',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 8px rgba(206, 145, 120, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              "click me to continue"
            </span>
            )
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ background: '#252526', padding: '12px 20px', display: 'flex', borderTop: '1px solid #333' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunClick}
            disabled={isSuccess}
            style={{ 
              background: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontFamily: 'inherit',
              fontWeight: 600,
              cursor: isSuccess ? 'not-allowed' : 'pointer',
              opacity: isSuccess ? 0.5 : 1
            }}
          >
            <Play size={16} fill="currentColor" /> Run Code
          </motion.button>
        </div>

        {/* Fake Terminal */}
        <div style={{ background: '#000000', padding: '16px', minHeight: '120px', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem', color: '#a3a3a3', borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#888' }}>
            <TerminalIcon size={14} /> TERMINAL
          </div>
          <AnimatePresence>
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ 
                  color: line.includes('Error') || line.includes('WARNING') ? '#ff5f56' : line.includes('Success') || line.includes('Compiling') || line.includes('100%') ? '#27c93f' : '#a3a3a3',
                  marginBottom: '4px'
                }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
