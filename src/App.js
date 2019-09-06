import React, { useState } from 'react';
import { Button, SearchInput } from 'evergreen-ui';
import './App.css';

function AlbumInfo({ data }) {
  if (!data) return null;
  return (
    <div>
      <h2>{data.artist} - {data.title}</h2>
      <img width="200" src={data.image} alt="cover"/>
      <ol>
        { data.tracks.map(i => <li>{i.title}</li>)}
      </ol>
    </div>
  )
}

function App() {
  const [url, setUrl] = useState('');
  const [albumInfo, setAlbumInfo] = useState(null);

  const handleGet = () => {
    fetch('http://localhost:3000/albumInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    }).then(r => r.json()).then(res => {
      const albumInfo = {
        artist: res.data.artist,
        title: res.data.current.title,
        image: res['og:image'],
        releaseDate: res.data.current.release_date,
        tracks: res.data.trackinfo.map(
          track => ({
            title: track.title,
            duration: track.duration,
          }),
        ),
      };
      setAlbumInfo(albumInfo)
    })
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
        <AlbumInfo data={albumInfo} />
      </div>
    </div>
  );
}

export default App;
