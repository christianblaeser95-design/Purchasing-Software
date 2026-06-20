import { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState('Lädt...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('Backend nicht erreichbar'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚀 Purchasing Software</h1>
      <p>Backend Status: {status}</p>
    </div>
  );
}