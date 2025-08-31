
export default function Search({ q, setQ, onSearchFull, onSearchLast4 }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        placeholder="Search by full PAN or last 4"
        value={q}
        onChange={(e) => setQ(e.target.value.replace(/[^0-9\s]/g, ''))}
      />
      <button onClick={onSearchFull}>Search Full PAN</button>
      <button onClick={onSearchLast4}>Search Last 4</button>
    </div>
  );
}
