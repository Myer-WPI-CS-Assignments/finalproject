import { Pool } from 'pg'
import { createApp } from './app.ts'
import { config } from "dotenv";

const app = express()
const game = require("./game-enpoints")
const port = 3000
const databaseUrl = process.env.DATABASE_URL
const sessionSecret = process.env.SESSION_SECRET

module.exports = app;

if (!databaseUrl || !sessionSecret) {
  throw new Error('DATABASE_URL and SESSION_SECRET are required')
}

const pool = new Pool({ connectionString: databaseUrl })
pool.on('error', (error) => console.error('PostgreSQL pool error:', error))

const port = Number(process.env.PORT ?? 3000)
const app = createApp(pool, sessionSecret, process.env.NODE_ENV === 'production')

config()

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/level/image', game.sendLevelImage);
app.post('/level/new', game.startNewLevel);
app.post('/leve/guess', game.checkGuess);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
