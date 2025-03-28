/* eslint-disable no-unused-vars */
import moment from 'moment'
import conn from './dbConn.js'

export default class TasksModel {
  static #setQuery = (custom = '') => {
    const query = ` 
    SELECT 
    BIN_TO_UUID(id) as id,
    title,
    status,
    description,
    DATE_FORMAT(createdAt, '%Y-%m-%dT%H:%i') as createdAt,
    DATE_FORMAT(updatedAt, '%Y-%m-%dT%H:%i') as updatedAt,
    DATE_FORMAT(limitTime, '%Y-%m-%dT%H:%i') as limitTime
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
      limitTime: data.limitTime
        ? moment(data.limitTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        : null
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

  static async getAll ({ user, status }) {
    if (!user) return []

    if (status) {
      try {
        console.log(this.#setQuery('AND status=?'))
        const [tasks] = await conn.query(this.#setQuery('AND status=?'), [user, status])
        if (tasks.length === 0) return []
        return tasks
      } catch (e) {
        console.log('An error ocurred: ', e.message)
      }
    } else {
      try {
        const [tasks] = await conn.query(this.#setQuery(), [user])
        if (tasks.length === 0) return []
        return tasks
      } catch (e) {
        console.log('An error ocurred: ', e.message)
      }
    }
  }

  static async getById ({ user, taskId }) {
    if (!user || !taskId) return []
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

      if (task.legth === 0) return { message: 'Task not deleted' }
      return 'Task deleted'
    } catch (e) {
      console.log('An error ocurred: ', e.message)
    }
  }
}
