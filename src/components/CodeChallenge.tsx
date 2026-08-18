import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal as TerminalIcon } from 'lucide-react';

interface CodeChallengeProps {
  onComplete: () => void;
}

export const CodeChallenge = ({ onComplete }: CodeChallengeProps) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['> Ready.']);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRunClick = () => {
    setTerminalOutput(prev => [...prev, '> Error: Automated run script failed.', '> Suggestion: Manual QA override required. Check the source code.']);
  };

  const handleSecretClick = () => {
    if (isSuccess) return;
    setIsSuccess(true);
    setTerminalOutput(prev => [...prev, '> Override triggered...', '> Compiling...', '> Success! Compatibility is Infinity.']);
    
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Unlocking final sequence...']);
    }, 1000);

    setTimeout(() => {
      onComplete();
    }, 2500);
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
            compatibility_test.py
          </div>
        </div>

        {/* Code Area */}
        <div style={{ padding: '20px', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', lineHeight: '1.5', color: '#d4d4d4', overflowX: 'auto' }}>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#569cd6' }}>def</span>&nbsp;
            <span style={{ color: '#dcdcaa' }}>calculate_compatibility</span>
            (boy, girl):
          </div>
          <div style={{ paddingLeft: '20px', display: 'flex' }}>
            <span style={{ color: '#c586c0' }}>if</span>&nbsp;
            girl == <span style={{ color: '#ce9178' }}>"Shraddha"</span> <span style={{ color: '#c586c0' }}>and</span> boy == <span style={{ color: '#ce9178' }}>"Omkar"</span>:
          </div>
          <div style={{ paddingLeft: '40px' }}>
            <span style={{ color: '#c586c0' }}>return</span> <span style={{ color: '#4ec9b0' }}>float</span>(<span style={{ color: '#ce9178' }}>'inf'</span>)
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#c586c0' }}>return</span> <span style={{ color: '#b5cea8' }}>0</span>
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
                  color: line.includes('Error') ? '#ff5f56' : line.includes('Success') || line.includes('Compiling') ? '#27c93f' : '#a3a3a3',
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
