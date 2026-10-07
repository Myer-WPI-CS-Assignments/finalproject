import { Pool } from 'pg'
import { createApp } from './app.ts'
import { config } from "dotenv";

config()

const databaseUrl = process.env.DATABASE_URL
const sessionSecret = process.env.SESSION_SECRET

if (!databaseUrl || !sessionSecret) {
  throw new Error('DATABASE_URL and SESSION_SECRET are required')
}

const pool = new Pool({ connectionString: databaseUrl })
pool.on('error', (error) => console.error('PostgreSQL pool error:', error))

const port = Number(process.env.PORT ?? 3000)
const app = createApp(pool, sessionSecret, process.env.NODE_ENV === 'production')

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
