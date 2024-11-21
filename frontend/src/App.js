import React, { useState } from 'react';
import './App.css';

function App() {
  const [numKids, setNumKids] = useState(1);
  const [kids, setKids] = useState(['']);
  const [pemKey, setPemKey] = useState('');
  const [operation, setOperation] = useState('generate-keys');
  const [message, setMessage] = useState('');

  const handleNumKidsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumKids(num);
    setKids(Array(num).fill(''));
  };

  const handleKidChange = (index, value) => {
    const newKids = [...kids];
    newKids[index] = value;
    setKids(newKids);
  };

  const handlePemKeyChange = (e) => {
    setPemKey(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const generateKeys = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kids }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'keys.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('Keys generated and downloaded');
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to generate keys');
    }
  };

  const convertPemToJwk = async () => {
    try {
      const response = await fetch('http://localhost:5000/convert-pem-to-jwk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pemKey, kids }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jwks.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('PEM key converted to JWKs and downloaded');
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to convert PEM to JWK');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (operation === 'generate-keys') {
      generateKeys();
    } else if (operation === 'convert-pem-to-jwk') {
      convertPemToJwk();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Key and JWT Management Tool</h1>
        <div className="input-group">
          <label className="operation-label">
            Select Operation:
            <select value={operation} onChange={handleOperationChange} className="operation-select">
              <option value="generate-keys">Generate Keys and JWTs</option>
              <option value="convert-pem-to-jwk">Convert PEM to JWKs</option>
            </select>
          </label>
        </div>
        {operation === 'generate-keys' && (
          <>
            <div className="input-group">
              <label>
                Number of KIDs:
                <input
                  type="number"
                  value={numKids}
                  onChange={handleNumKidsChange}
                  min="1"
                />
              </label>
            </div>
            {kids.map((kid, index) => (
              <div className="input-group" key={index}>
                <label>
                  KID {index + 1}:
                  <input
                    type="text"
                    value={kid}
                    onChange={(e) => handleKidChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </>
        )}
        {operation === 'convert-pem-to-jwk' && (
          <>
            <div className="input-group">
              <label>
                PEM Key:
                <textarea
                  value={pemKey}
                  onChange={handlePemKeyChange}
                  rows="10"
                  cols="50"
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Number of KIDs:
                <input
                  type="number"
                  value={numKids}
                  onChange={handleNumKidsChange}
                  min="1"
                />
              </label>
            </div>
            {kids.map((kid, index) => (
              <div className="input-group" key={index}>
                <label>
                  KID {index + 1}:
                  <input
                    type="text"
                    value={kid}
                    onChange={(e) => handleKidChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </>
        )}
        <button className="generate-button" onClick={handleSubmit}>Submit</button>
        {message && (
          <div className="message">
            <h2>{message}</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;