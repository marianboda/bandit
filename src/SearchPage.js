import React, { useState } from 'react';
import { Button, TextInput } from 'evergreen-ui';
import { AlbumInfo } from './components/AlbumInfo';

export const SearchPage = (props) => {
  const [url, setUrl] = useState('https://fief.bandcamp.com/album/iii');
  const [albumInfo, setAlbumInfo] = useState(null);

  const handleUrlChange = (e) => setUrl(e.target.value)

  const handleAdd = () => {
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

  return (
    <div>
      <TextInput placeholder="enter album url" value={url} onChange={handleUrlChange} />
      <Button onClick={handleAdd}>ADD</Button>
      <AlbumInfo data={albumInfo} />
    </div>
  );
}
