import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trends?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Erro ao buscar tendências:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>Buscador de Tendências</h1>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Digite um termo (ex: futebol, eleições)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={fetchTrends} disabled={!keyword || loading} style={{ padding: 10 }}>
          Buscar
        </button>
      </div>
      {loading && <p>Buscando...</p>}
      {results.length > 0 && (
        <div style={{ background: '#fff', padding: 20, border: '1px solid #ccc' }}>
          <h2>Resultados para: {keyword}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={results}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
