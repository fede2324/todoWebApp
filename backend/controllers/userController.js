/* eslint-disable no-unused-vars */
import { UserModel } from '../models/user.js'
import { validateUser } from './schemes/userScheme.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const secretKey = process.env.SECRET
const isProduction = process.env.NODE_ENV === 'production'

export class UserController {
  // Private fuction to validate existence of user on DB
  static async #getUser (username) {
    try {
      const user = await UserModel.getUser(username)
      return user || []
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      return []
    }
  }

  // Hashed password before to send database
  static async #hashPassword (password) {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
  }

  // Validate Login from Frontend with Token
  static async validate (req, res) {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ authenticated: false, message: 'No authorized' })

    try {
      const decoded = jwt.verify(token, secretKey)

      res.status(200).json({ authenticated: true, user: decoded })
    } catch (e) {
      console.log('An error ocurred: ', e.message)
      res.status(401).json({ authenticated: false, message: 'Invalid token' })
    }
  }

  // Register a new user on database
  static async signIn (req, res) {
    const { data, error } = validateUser(req.body)

    if (error) {
      return res.status(400).json({ errors: error.errors })
    }
    // Validate user
    const userExist = await UserController.#getUser(data.username)
    if (userExist.length !== 0) return res.status(400).json({ message: 'username in use' })

    // Try create new user if it don't exist
    try {
      data.password = await UserController.#hashPassword(data.password)

      const newUser = await UserModel.newUser({ input: data })

      if (!newUser) return res.status(400).json({ status: 'Error', message: 'An error to create new user' })
      return res.status(201).json({ status: 'Ok', message: 'Created User' })
    } catch (e) {
      console.log('An error ocurred: ', e.message)
      return res.status(500).json({ message: 'An error ocurred' })
    }
  }

  // Login user and create token (JWT) to access your tasks
  static async logIn (req, res) {
    const data = req.body

    // console.log('DATA: ', data)

    // Validar que se envió un username y password
    if (!data.username || !data.password) {
      return res.status(400).json({ message: 'Username or password not valid' })
    }

    let user
    try {
      [user] = await UserModel.logIn({ userName: data.username })
      if (!user) {
        return res.status(404).json({ message: 'Username not found' })
      }
    } catch (e) {
      console.error('An error occurred: ', e.message)
      return res.status(500).json({ message: 'An error occurred' })
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    // Generar el token JWT
    try {
      const userData = { id: user.id, username: user.username }
      const token = jwt.sign(userData, secretKey, { expiresIn: '1h' })

      // Establecer la cookie y devolver la respuesta
      return res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction, // solo HTTPS en producción
        sameSite: 'Strict',
        maxAge: 3600000
      }).status(200).json({ status: 'ok', user: userData })
    } catch (e) {
      console.error('An error occurred: ', e.message)
      return res.status(500).json({ message: 'An error occurred' })
    }
  }

  // LogOut user and remove token from user cookies
  static async logOut (req, res) {
    const token = req.cookies.token
    try {
      if (!token) return res.status(401).json({ status: 'error', message: 'Invalid token' })
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
      })
      return res.status(200).json({ status: 'ok', message: 'Logged out Successfully' })
    } catch (e) {
      console.error('An error occurred: ', e.message)
      return res.status(500).json({ status: 'error', message: 'An error occurred' })
    }
  }

  // Delete your by username and password
  static async deleteUser (req, res) {
    const id = req.user.id
    // Validate ID
    if (!id) return res.status(400).json({ status: 'error', message: 'User ID not found' })

    try {
      const delUser = await UserModel.deleteUser({ userID: id })
      if (!delUser) return res.status(500).json({ status: 'error', message: "User couldn't be deleted" })

      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      })
      console.log('USER DELETED')
      return res.status(204).end()
    } catch (e) {
      console.error('An error occurred:', e.message)
      return res.status(500).json({ message: 'An error occurred' })
    }
  }
}
