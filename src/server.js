import express from 'express'
import fetch from 'node-fetch'
import { parseInfo } from './services/Bandcamp.js'

const app = express()
const port = 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(express.json())

app.post('/albumInfo', async (req, res) => {
    const { url } = req.body
    console.log(url)

    const response = await fetch(url);
    const result = await response.text();

    res.send(parseInfo(result))
})