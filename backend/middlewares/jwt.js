import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  try {
    // Obtener el token desde la cookie
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided' })
    }

    // Validar el token
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: 'Access denied. Invalid token' })

      req.user = user
      next()
    })
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed!' })
  }
}

export default authenticate
