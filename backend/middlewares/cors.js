import cors from 'cors'

const getAcceptedOrigins = () => {
  const envOrigins = process.env.ACCEPTED_ORIGINS || ''
  return envOrigins.split(',').map(origin => origin.trim())
}

const corsConfig = () => {
  const acceptedOrigins = getAcceptedOrigins()

  return cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`))
    },
    credentials: true
  })
}

export default corsConfig
