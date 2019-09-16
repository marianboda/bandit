import React, { useState } from 'react';
import { Button } from 'evergreen-ui';

export const LibraryPage = (props) => {
  const [albums, setAlbums] = useState([]);

  const handleGet = async () => {
    const albums = await fetch('/albums').then(r => r.json());
    setAlbums(albums);
  }

  return (
    <>
      <Button onClick={handleGet}>GET</Button>
      { albums.map(i => <div>{i.artist} - {i.title}</div>) }
    </>
  )
}
