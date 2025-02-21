import mysql from 'mysql2/promise'
import config from '../configs/db.js'
let conn

try {
  conn = await mysql.createConnection(config)
} catch (e) {
  console.log('An error ocurred: ', e.message)
}

export default class TasksModel {
  static #setQuery = (custom = '') => {
    const query = ` 
    SELECT 
    BIN_TO_UUID(id) as id,
    title,
    status,
    description,
    DATE_FORMAT(createdAt, '%d-%m-%Y %H:%i:%s') as createdAt,
    DATE_FORMAT(updatedAt, '%d-%m-%Y %H:%i:%s') as updatedAt,
    limitTime
    FROM tasks WHERE BIN_TO_UUID(id_user) = ?`

    if (typeof custom !== 'string' || custom.match(/(DROP|DELETE|INSERT|UPDATE|ALTER|TRUNCATE)/i)) {
      throw new Error('Invalid custom query part')
    }
    return `${query} ${custom}`
  }

  static async getAll ({ user }) {
    if (!user) return []

    try {
      const [tasks] = await conn.query(this.#setQuery(), [user])

      if (tasks.legth === 0) return []

      return tasks
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }

  static async getById ({ user, taskId }) {
    if (!user || !taskId) return []
    console.log(user, taskId)
    try {
      const [task] = await conn.query(this.#setQuery('AND BIN_TO_UUID(id) = ?'), [user, taskId])
      if (task.legth === 0) return []

      return task
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }
}
