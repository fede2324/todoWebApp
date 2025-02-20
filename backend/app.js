import express from 'express'
import { corsConfig } from './middlewares/cors.js'
import { userRouter } from './routes/users.js'
import cookieParser from 'cookie-parser'
// import { tasksRouter } from './routes/tasks.js'

const PORT = process.env.PORT || 3000
const app = express()

app.disable('x-powered-by') // Disable x-powered
app.use(express.json()) // Use json Middleware
app.use(corsConfig())
app.use(cookieParser())

// app.use('/api/v1/task', tasksRouter)
app.use('/api/v1/users', userRouter)
app.use((req, res) => {
  res.status(404).send('<h1>No found page</h1>')
})

app.listen(PORT, () => {
  console.log(`The server listening in http://localhost:${PORT}`)
})
