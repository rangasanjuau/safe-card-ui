import { useState } from 'react';
import { createCard, searchByPan, searchByLast4 } from './api';
import CreateCardForm from './components/CreateCardForm';
import Header from './components/Header';

import Search from './components/Search';
import ResultsTable from './components/ResultsTable';
import Footer from './components/Footer';

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
    } catch (err) {
      // Map Spring Boot error JSON to user-friendly UI
      if (err.message) {
        setError(err.message);
      } else if (err.error) {
        setError(err.error); // fallback
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  async function onSearchFull() {
    setError('');
    try {
      setResults(await searchByPan(q));
    } catch (err) {

      console.error(err);
      // Map Spring Boot error JSON to user-friendly UI
      if (err.message) {
        setError(err.message);
      } else if (err.error) {
        setError(err.error); // fallback
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  async function onSearchLast4() {
    setError('');
    try {
      setResults(await searchByLast4(q));
    } catch (err) {

      console.error(err);
      if (err.message) {
        setError(err.message);
      } else if (err.error) {
        setError(err.error); // fallback
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: '2rem auto', fontFamily: 'Inter,system-ui,sans-serif', padding: '0 1rem' }}>
      <Header />
      <CreateCardForm name={name} pan={pan} setName={setName} setPan={setPan} onCreate={onCreate} />
      <Search q={q} setQ={setQ} onSearchFull={onSearchFull} onSearchLast4={onSearchLast4} />
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <ResultsTable results={results} />
      <Footer />
    </div>
  );
}