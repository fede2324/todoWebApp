/* eslint-disable no-undef */
// This file is to realize test to API
import request from 'supertest'
import app from '../app.js' // Import APP to make the tests

let token

//  LOGIN AND GET TOKEN TO USE
beforeAll(async () => {
  const res = await request(app)
    .post('/api/v1/users/auth/login') // Router of LOGIN
    .send({ username: 'testuser', password: '12345678' }) // Send user to test (AUTH ROUTES)
    .expect(200) // Expect an status OK (200)

  expect(res.headers['set-cookie']).toBeDefined()// Verify if token exist

  token = res.headers['set-cookie'][0].split(';')[0]// extract only tokne and store it
})

// ALL routes to test for /TASKS
describe('/api/v1/tasks routes', () => {
  let taskId // Guardar el ID de una tarea creada en beforeAll()

  beforeAll(async () => {
    // Crear una tarea antes de todas las pruebas
    const newTask = {
      title: 'TEST JEST',
      status: 'new',
      description: 'Task for testing',
      createdAt: '2024-01-21T11:11:00Z',
      updatedAt: '2024-01-21T11:11:00Z',
      limitTime: '2024-10-10T00:00:00Z'
    }

    const res = await request(app)
      .post('/api/v1/tasks')
      .send(newTask)
      .set('Cookie', token)

    expect(res.body).toHaveProperty('content')
    taskId = res.body.content.id
  })

  it('CREATE NEW TASK', async () => {
    const newTask = {
      title: 'TEST JEST 2',
      status: 'new',
      description: 'Another task for testing',
      createdAt: '2024-01-21T11:11:00Z',
      updatedAt: '2024-01-21T11:11:00Z',
      limitTime: '2024-10-10T00:00:00Z'
    }

    const res = await request(app)
      .post('/api/v1/tasks')
      .send(newTask)
      .set('Cookie', token)
      .expect(201)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('content.id')
    expect(res.body.status).toBe('ok')
    expect(res.body.content).toBeInstanceOf(Object)
  })

  it('LIST ALL TASKS', async () => {
    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Cookie', token)
      .expect(200)

    expect(res.body).toHaveProperty('content')
    expect(res.body.status).toBe('ok')
    expect(res.body.content).toBeInstanceOf(Array)
    expect(res.body.qty).toBeGreaterThan(0) // Asegura que hay al menos una tarea
  })

  it('DETAILS OF TASK BY ID', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/${taskId}`) // Usa el ID generado en beforeAll()
      .set('Cookie', token)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('content.id')
    expect(res.body.status).toBe('ok')
    expect(res.body.content).toBeInstanceOf(Object)
  })

  it('UPDATE TASK BY ID', async () => {
    const updateTask = {
      status: 'done',
      updatedAt: '2024-04-24T06:15:00Z',
      limitTime: null
    }

    const res = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .set('Cookie', token)
      .send(updateTask)
      .expect(200)

    expect(res.body).toHaveProperty('content.id')
    expect(res.body.status).toBe('ok')
    expect(res.body.content.status).toBe('done') // Verifica que el status se actualizó correctamente
  })

  it('DELETE TASK BY ID', async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set('Cookie', token)
      .expect(200)

    expect(res.body.status).toBe('ok')
    expect(res.body.content).toBe('Task deleted') // Agrega un mensaje en la API si no está
  })
})
