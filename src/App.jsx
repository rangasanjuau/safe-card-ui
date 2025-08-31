

import { useState } from 'react';
import { createCard, searchByPan, searchByLast4 } from './api';

export default function App() {
  const [name, setName] = useState('');
  const [pan, setPan] = useState('');
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  async function onCreate(e) {
    e.preventDefault();
    setError('');
    try {
      const out = await createCard(name, pan);
      setResults([out, ...results]);
      setPan('');
    } catch (err) { console.error(err); setError('Failed to create card'); }
  }

  async function onSearchFull() {
    setError('');
    try { setResults(await searchByPan(q)); } catch { setError('Search failed'); }
  }

  async function onSearchLast4() {
    setError('');
    try { setResults(await searchByLast4(q)); } catch { setError('Search failed'); }
  }



  return (
    <div style={{ maxWidth: 680, margin: '2rem auto', fontFamily: 'Inter,system-ui, sans-serif' }}>
      <h2>Secure Card Vault</h2>
      <form onSubmit={onCreate} style={{
        display: 'grid', gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <input placeholder="Cardholder Name" value={name}
          onChange={e => setName(e.target.value)} required />
        <input placeholder="Card Number (PAN)" value={pan}
          onChange={e => setPan(e.target.value.replace(/[^0-9\s]/g, ''))} required />
        <button type="submit">Create Card</button>
      </form>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input placeholder="Search by full PAN or last 4" value={q}
          onChange={e => setQ(e.target.value.replace(/[^0-9\s]/g, ''))} />
        <button onClick={onSearchFull}>Search Full PAN</button>
        <button onClick={onSearchLast4}>Search Last 4</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table width="100%" cellPadding="8" style={{
        borderCollapse:
          'collapse'
      }}>
        <thead>
          <tr><th align="left">Cardholder</th><th align="left">Masked PAN</
          th><th align="left">Created</th></tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id} style={{ borderTop: '1px solid #eee' }}>
              <td>{r.cardholderName}</td>
              <td>{r.maskedPan}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: '#666', marginTop: '1rem' }}>Note: The UI
        never logs or stores plaintext PAN. Open console—you will not see PAN values
        logged.</p>
    </div>
  );
}