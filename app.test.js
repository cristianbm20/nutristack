import request from 'supertest'
import { createApp } from './app'

describe('Test Express server', () => {
  let app

  beforeAll(() => {
    app = createApp()
  })

  test('Should respond with 200 status code for serving static files', async () => {
    const response = await request(app).get('/index.html')
    expect(response.statusCode).toBe(200)
  })
})
