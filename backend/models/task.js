/* eslint-disable no-unused-vars */
import mysql from 'mysql2/promise'
import config from '../configs/db.js'
import moment from 'moment'
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

  static async createTask ({ data, user }) {
    const query =
    `
    INSERT INTO tasks (id,title,status,description,id_user,createdAt,updatedAt,limitTime)
    VALUES(UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?,?)
    `

    const [uuidResult] = await conn.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    const newTask = {
      id: uuid,
      title: data.title,
      status: data.status,
      description: data.description,
      id_user: user,
      createdAt: moment(data.createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      limitTime: moment(data.limitTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') || null
    }

    try {
      const values = Object.values(newTask)
      const [task] = await conn.query(query, values)
      if (!task) return []

      return newTask
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }

  static async getAll ({ user }) {
    if (!user) return []

    try {
      const [tasks] = await conn.query(this.#setQuery(), [user])

      if (tasks.length === 0) return []

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

  static async updateTask ({ data, newData }) {
    const updateData = {} // new data to remplace

    Object.keys(newData).forEach(key => { // Verify if the new value exist and diferent with the actual value (data = dataDB)
      if (newData[key] !== undefined && newData[key] !== data[key]) {
        updateData[key] = newData[key] // if that's the case is true modify the old value
      }
    })

    if (Object.keys(updateData) === 0) return data

    //  Change format of datetime if exist on request data
    if (updateData.limitTime) {
      updateData.limitTime = moment(updateData.limitTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') || null
    }
    updateData.updatedAt = moment(updateData.updatedAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')

    try {
      const placeholders = Object.keys(updateData).map(key => `${key} = ?`).join(', ') // Create by dynamic way parameters. of query
      const query = `UPDATE tasks SET ${placeholders} WHERE BIN_TO_UUID(id) = ?`

      const values = [...Object.values(updateData), data.id]

      await conn.query(query, values)

      return { ...data, ...newData }
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }

  static async deleteTask ({ idTask }) {
    const query = 'DELETE FROM tasks WHERE BIN_TO_UUID(id) = ?'

    try {
      const [task] = await conn.query(query, [idTask])

      if (task.legth === 0) return { status: 'error', message: 'Task not deleted' }
      return { status: 'ok', message: 'Task deleted' }
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }
}
