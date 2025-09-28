import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState('');

  // useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+?><:{}[]';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9999);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div
      className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #581c87, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6"
        style={{
          width: '100%',
          maxWidth: '28rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
              margin: '0 0 8px 0',
            }}
          >
            Password Generator
          </h1>
          <p
            style={{
              color: '#d1d5db',
              fontSize: '14px',
              margin: '0',
            }}
          >
            Create secure passwords instantly
          </p>
        </div>

        {/* Password Display */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input
            type="text"
            value={Password}
            readOnly
            ref={passwordRef}
            placeholder="Generated Password"
            style={{
              width: '100%',
              padding: '12px 80px 12px 12px',
              fontSize: '14px',
              fontFamily: 'monospace',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={copyPasswordtoClipboard}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#f97316',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Length Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: '14px',
                margin: '0',
              }}
            >
              Password Length:{' '}
              <span style={{ color: '#f97316', fontWeight: 'bold' }}>{length}</span>
            </label>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#9ca3af',
              }}
            >
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <input
                type="checkbox"
                id="number"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label
                htmlFor="number"
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '14px',
                  flex: '1',
                  cursor: 'pointer',
                  margin: '0',
                }}
              >
                Include Numbers
              </label>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>0-9</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <input
                type="checkbox"
                id="character"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(!characterAllowed)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label
                htmlFor="character"
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '14px',
                  flex: '1',
                  cursor: 'pointer',
                  margin: '0',
                }}
              >
                Include Special Characters
              </label>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>!@#$%</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={passwordGenerator}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #f97316, #ec4899)',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            🔐 Generate New Password
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0' }}>
            Keep your accounts secure with strong passwords
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
