import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const analyzeDocument = async () => {
    if (!file) {
      setError("Please select a PDF file before proceeding.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/analyze', formData);
      setResults(response.data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Backend error. Please ensure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>AI Document Analyzer</h1>
        <p>Harness the power of multi-agent AI to summarize, extract insights, and fact-check in seconds.</p>
      </header>

      <main>
        <section className="upload-section">
          <div className="file-input-wrapper">
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange} 
              id="pdf-upload"
            />
          </div>
          <button onClick={analyzeDocument} disabled={loading || !file}>
            {loading ? "Processing via AI Agents..." : "Analyze Document"}
          </button>
          {error && <p style={{color: 'var(--danger)', marginTop: '1rem'}}>{error}</p>}
        </section>

        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>AI Agents are carefully reviewing your document...</p>
          </div>
        )}

        {results && (
          <div className="results-grid">


            <section className="card insights">
              <h2>💡 Key Insights</h2>
              <ul>
                {results.insights?.map((it, i) => <li key={i}>{it}</li>) || <li>No insights generated.</li>}
              </ul>
            </section>

            <section className="card facts">
              <h2>⚖️ Fact Check</h2>
              <div className="facts-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Claim</th>
                      <th>Status</th>
                      <th>Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.factCheck?.map((f, i) => {
                       let statusClass = 'neutral';
                       const s = String(f.status).toLowerCase();
                       if(s.includes('true') || s.includes('accurate') || s.includes('correct')) statusClass = 'true';
                       if(s.includes('false') || s.includes('inaccurate') || s.includes('incorrect')) statusClass = 'false';

                       return (
                        <tr key={i}>
                          <td>{f.claim}</td>
                          <td>
                            <span className={`status-badge ${statusClass}`}>
                              {f.status}
                            </span>
                          </td>
                          <td>{f.reasoning}</td>
                        </tr>
                      );
                    }) || <tr><td colSpan="3">No claims verified.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;