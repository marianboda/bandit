import React from 'react';

export function AlbumInfo({ data }) {
  if (!data) return null;
  return (
    <div>
      <h2>{data.artist} - {data.title}</h2>
      <img width="200" src={data.image} alt="cover" />
      <ol>
        {data.tracks.map(i => <li>{i.title}</li>)}
      </ol>
    </div>
  )
}
