import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal as TerminalIcon } from 'lucide-react';

interface CodeChallengeProps {
  onComplete: () => void;
}

export const CodeChallenge = ({ onComplete }: CodeChallengeProps) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['> Ready.']);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRunClick = () => {
    if (showInput || isSuccess) return;
    setTerminalOutput(prev => [
      ...prev, 
      '> Executing patch query...',
      '> ERROR: Authentication Required.',
      '> SYSTEM PROMPT: I am the only system requirement you need. 4 letters. What am I?',
      '> Awaiting override password...'
    ]);
    setShowInput(true);
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = inputValue.trim().toLowerCase();
      setTerminalOutput(prev => [...prev, `> [INPUT]: ${val}`]);
      setInputValue('');
      
      if (val === 'love') {
        setShowInput(false);
        setIsSuccess(true);
        setTerminalOutput(prev => [...prev, '> ACCESS GRANTED. Executing patch...', '> Downloading YOU database...']);
        
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, '> Processing results... 1 row returned.']);
        }, 1500);
        
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, '> CPU Usage: 100% ❤️']);
        }, 3000);
        
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, '> Unlocking final sequence...']);
        }, 4500);

        setTimeout(() => {
          onComplete();
        }, 6000);
      } else {
        setTerminalOutput(prev => [...prev, '> ACCESS DENIED. Incorrect password.', '> Awaiting override password...']);
      }
    }
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
            <span style={{ color: '#dcdcaa' }}>authenticate_user</span>():
          </div>
          <div style={{ paddingLeft: '20px', display: 'flex' }}>
            <span style={{ color: '#dcdcaa' }}>print</span>(<span style={{ color: '#ce9178' }}>"Initializing romantic override protocols..."</span>)
          </div>
          <br />
          <div style={{ paddingLeft: '20px', color: '#6a9955', fontStyle: 'italic' }}>
            # SYSTEM PROMPT: I am the only system requirement you need.
          </div>
          <div style={{ paddingLeft: '20px', color: '#6a9955', fontStyle: 'italic' }}>
            # 4 letters. What am I?
          </div>
          <br />
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#9cdcfe' }}>password</span> = <span style={{ color: '#dcdcaa' }}>input</span>(
            <span style={{ color: '#ce9178' }}>
              "Override code: "
            </span>
            )
          </div>
          <br />
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#c586c0' }}>if</span> <span style={{ color: '#dcdcaa' }}>hash</span>(<span style={{ color: '#9cdcfe' }}>password</span>) == <span style={{ color: '#4fc1ff' }}>SECRET_HASH</span>:
          </div>
          <div style={{ paddingLeft: '40px' }}>
            <span style={{ color: '#dcdcaa' }}>unlock_heart</span>()
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#c586c0' }}>else</span>:
          </div>
          <div style={{ paddingLeft: '40px' }}>
            <span style={{ color: '#c586c0' }}>raise</span> <span style={{ color: '#4ec9b0' }}>Exception</span>(<span style={{ color: '#ce9178' }}>"Access Denied"</span>)
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
        <div 
          style={{ background: '#000000', padding: '16px', minHeight: '120px', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem', color: '#a3a3a3', borderTop: '1px solid #333' }}
          onClick={() => showInput && inputRef.current?.focus()}
        >
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
                  color: line.includes('ERROR') || line.includes('DENIED') || line.includes('WARNING') ? '#ff5f56' : line.includes('GRANTED') || line.includes('Success') || line.includes('Compiling') || line.includes('100%') ? '#27c93f' : '#a3a3a3',
                  marginBottom: '4px'
                }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
          {showInput && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ color: '#27c93f', marginRight: '8px' }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputSubmit}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.85rem',
                  outline: 'none',
                  flex: 1
                }}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
