import React, { useState } from 'react';
import { Button, SearchInput } from 'evergreen-ui'
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('')
  const handleGet = () => {
    fetch('http://localhost:3000/albumInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    }).then(r => r.json()).then(res => setName(res.title))
  }

  const handleUrlChange = (e) => setUrl(e.target.value)

  return (
    <div className="App">
      <header className="App-header">
        Bandit
      </header>
      <div className="App-content">
        <SearchInput placeholder="enter album url" value={url} onChange={handleUrlChange} />
        <Button onClick={handleGet}>GET</Button>
        <h2>{ name }</h2>
      </div>
    </div>
  );
}

export default App;
