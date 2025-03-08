/* eslint-disable no-undef */
import request from 'supertest'
import { expect } from 'chai'
import app from '../app.js'

let token

describe('TEST USERS ROUTES /users', () => {
  // Create a test account
  before(async () => {
    const newUser = { username: 'mochaUser', password: '12345678' }
    await request(app)
      .post('/api/v1/users')
      .send(newUser)
  })

  beforeEach(async () => {
    // Login with MochaUser before each test
    const res = await request(app)
      .post('/api/v1/users/auth/login')
      .send({ username: 'mochaUser', password: '12345678' })

    expect(res.status).to.equal(200)
    token = res.headers['set-cookie'][0].split(';')[0] // Save token JWT
  })

  it('LogOut user', async () => {
    const res = await request(app)
      .post('/api/v1/users/auth/logout')
      .set('Cookie', token) // Pass token cookie

    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal('ok')
  })

  it('Delete user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('Cookie', token)

    expect(res.status).to.equal(204)
  })
})
