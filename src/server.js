import express from 'express';
import fetch from 'node-fetch';
import sqlite from 'sqlite3';
import { parseInfo, parseData } from './services/Bandcamp.js';

const app = express();
const port = 5000;

const db = new sqlite.Database('./data/db.sqlite');

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

async function dbGet(query) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

async function dbRun(query) {
    return new Promise((resolve, reject) => {
        db.run(...query, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function saveAlbum(album) {
    const record = {
        artist: album.data.artist,
        url: album['og:url'],
        title: album.data.current.title,
        imageUrl: album['og:image'],
        releaseDate: album.data.current.release_date,
        data: JSON.stringify(album),
    };

    const keys = Object.keys(record);
    const vals = keys.map(key => record[key]);
    const valMasks = vals.map(_ => '?');

    return [`INSERT OR IGNORE INTO album (${keys.join(',')}) VALUES (${valMasks.join(', ')})`, ...vals];
}

app.post('/albumInfo', async (req, res) => {
    const { url } = req.body;
    console.log(url);

    const response = await fetch(url);
    const result = await response.text();

    const albumShortInfo = parseInfo(result);
    const albumData = parseData(result);

    const album = { ...albumShortInfo, data: albumData };
    await dbRun(saveAlbum(album));

    res.send(album);
});

app.get('/albums', async (req, res) => {
    const albums = await dbGet('SELECT * FROM album');
    res.send(albums);
});