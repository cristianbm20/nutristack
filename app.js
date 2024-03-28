import express from 'express'
import 'dotenv/config.js'

export const createApp = () => {
  const app = express()
  app.disable('x-powered-by') // Disable X-Powered-By: Express header
  app.use(express.static('public'))

  return app
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp()
  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
