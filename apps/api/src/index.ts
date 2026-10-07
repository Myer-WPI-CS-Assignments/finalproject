import express from 'express'

const app = express()
const game = require("./game-enpoints")

const port = 3000

module.exports = app;

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/level/image', game.sendLevelImage);
app.post('/level/new', game.startNewLevel);
app.post('/leve/guess', game.checkGuess);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
