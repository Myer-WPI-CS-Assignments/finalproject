import express from 'express'

const app = express()
const port = 3000

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
