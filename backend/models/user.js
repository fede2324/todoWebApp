import mysql from 'mysql2/promise'
import { configDb } from '../configs/db.js'
let conn

try {
  conn = await mysql.createConnection(configDb)
} catch (e) {
  console.log('Error on DB connection')
}

export class UserModel {
  static async getUser (userName) {
    const query = 'SELECT BIN_TO_UUID(id) as id, username FROM users WHERE username = ?'

    try {
      const [userData] = await conn.query(query, [userName])
      return userData
    } catch (e) {
      console.error('An error ocurred: ', e.message)
    }
  }

  static async newUser ({ input }) {
    const [uuidResult] = await conn.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    const query = 'INSERT INTO users (id,username,password) VALUES (UUID_TO_BIN(?),?,?)'
    const values = [...Object.values(input)]

    try {
      const result = await conn.query(query, [uuid, ...values])
      return result
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }

  static async logIn ({ userName }) {
    const query = 'SELECT BIN_TO_UUID(id) as id, username, password FROM users WHERE username = ?'

    try {
      const [userData] = await conn.query(query, [userName])
      return userData
    } catch (e) {
      console.error('An error ocurred: ', e.message)
    }
  }

  static async deleteUser ({ userID }) {
    console.log(userID)
    const query = 'SELECT id FROM users WHERE id = UUID_TO_BIN(?)'
    const user = await conn.query(query, [userID])
    if (!user) return []

    try {
      await conn.query('DELETE FROM users WHERE id = UUID_TO_BIN(?)', [userID])
      // When are tasks of users delete all task too
      return [{ message: 'USER DELETED' }]
    } catch (e) {
      console.error('An error ocurred: ', e.message)
    }
  }
}
