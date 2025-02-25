import TasksModel from '../models/task.js'
import { validTask, validUpdate } from './schemes/taskscheme.js'

export default class TasksController {
  static async createTask (req, res) {
    const idUser = req.user.id

    const validData = validTask(req.body)

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })
    if (validData.error) return res.status(400).json({ status: 'error', message: JSON.parse(validData.error.message) })

    try {
      const newTask = await TasksModel.createTask({ data: validData.data, user: idUser })

      if (newTask.length === 0) return res.status(400).json({ status: 'error', message: 'Task no created. Try again.' })

      return res.status(201).json({ status: 'ok', content: newTask })
    } catch (e) {
      console.log('An error ocurred :', e.message)
      return res.status(500).json({ status: 'error', message: "Can't create new task, try again" })
    }
  }

  static async getAll (req, res) {
    const idUser = req.user.id

    if (!idUser) return res.status(404).json({ status: 'error', message: 'Invalid userId' })

    try {
      const tasks = await TasksModel.getAll({ user: idUser })

      if (tasks.length === 0) return res.status(404).json({ status: 'error', message: 'Task not found' })

      return res.status(200).json({ status: 'ok', qty: tasks.length, content: tasks })
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ status: 'error', message: "Can't get tasks of user, try again " })
    }
  }

  static async getById (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params

    if (!idUser || !idTask) return res.status(404).json({ message: 'Invalid userId or task' })
    try {
      const [task] = await TasksModel.getById({ user: idUser, taskId: idTask })

      if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' })

      return res.status(200).json({ status: 'ok', content: task })
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ status: 'error', message: "Can't get details of task, try again " })
    }
  }

  static async updateTask (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params
    const validData = validUpdate(req.body)

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })
    if (validData.error) return res.status(400).json({ status: 'error', message: JSON.parse(validData.error.message) })

    try {
      const [task] = await TasksModel.getById({ user: idUser, taskId: idTask })
      if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' })

      const updatedTask = await TasksModel.updateTask({ data: task, newData: validData.data })

      if (updatedTask.length === 0) return res.status(304).json({ status: 'error', message: "Can't updated task" })

      return res.status(200).json({ status: 'ok', content: updatedTask })
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ status: 'error', message: "Can't update task.Try again" })
    }
  }

  static async deleteTask (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params

    if (!idUser) return res.status(404).json({ status: 'error', message: 'Invalid userId' })
    const [task] = await TasksModel.getById({ user: idUser, taskId: idTask })
    if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' })

    try {
      const taskDelete = await TasksModel.deleteTask({ idTask })

      if (taskDelete.status === 'error') return res.status(500).json(taskDelete)

      return res.status(200).json({ status: 'ok', content: taskDelete })
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ status: 'error', message: "Can't delete task.Try again" })
    }
  }
}
