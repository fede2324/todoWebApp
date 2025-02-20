/* eslint-disable no-unused-vars */
import { UserModel } from '../models/user.js'
import { TaskModel } from '../models/tasks.js'
import { validateUser } from './schemes/userScheme.js'

export class UserController {
  // Private fuction to validate existence of user on DB
  static async #getUser (username) {
    const existUser = await UserModel.getUser({ username })
    return existUser
  }

  // Hashed password before to send database
  static async #hashPassword (password) {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
  }

  // Register a new user on database
  static async signIn (req, res) {
    const data = validateUser(req.body)
    if (data.error) return res.status(400).json({ error: JSON.parse(data.error.message) })

    // Validate user
    const userExist = this.#getUser(data.username)
    if (userExist.length === 0) return res.status(400).json({ message: 'username in use' })

    // Try create new user if it don't exist
    try {
      data.password = this.#hashPassword(data.password)
      console.info('CREATE USER', data)
      const newUser = await UserModel.newUser({ input: data })
      if (newUser.status === 'error') return res.status(400).json({ message: "User can't be create. Try again " })
      return res.status(201).json({ message: 'User created' })
    } catch (e) {
      console.log('An error ocurred: ', e.message)
      return res.status(500).json({ message: 'An error ocurred' })
    }
  }

  // Login user and create token (JWT) to access your tasks
  static async logIn (req, res) {
    const data = validateUser(req.body)
    if (data.error) return res.status(400).json({ error: JSON.parse(data.error.message) })
    try {
      console.info('LOGIN', data) // For test
    } catch (e) {
      console.log('An error ocurred: ', e.message)
      return res.status(500).json({ message: 'An error ocurred' })
    }
  }

  // Delete your by username and password
  static async deleteUser (req, res) {
    const { id } = req.params

    // Validate ID and search

    try {
      console.info('DELETE USER', id)
    } catch (e) {
      console.log('An error ocurred: ', e.message)
      return res.status(500).json({ message: 'An error ocurred' })
    }
  }
}
