import express from 'express'
import { corsConfig } from './middleware/cors.js'
import { userRouter } from './routes/user.js'
import { tasksRouter } from './routes/tasks.js'

const PORT = process.env.PORT = 3000
const app = express()

// CORS allow Domains

app.disable('x-powered-by') // Disable x-powered
app.use(express.json()) // Use json Middleware
app.use(corsConfig())

//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!! JSW JSON-WEB-TOKEN

app.use('/v1/task', tasksRouter)
app.use('/v1/users', userRouter)
app.use((req, res) => {
  res.status(404).send('<h1>No found page</h1>')
})

app.listen(PORT, () => {
  console.log(`The server listening in http://localhost:${PORT}`)
})
