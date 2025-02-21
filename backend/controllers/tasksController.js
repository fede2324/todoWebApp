import TasksModel from '../models/task.js'
import { validTask, validTaskPartial } from './schemes/taskscheme.js'
import moment from 'moment'

export default class TasksController {
  static async createTask (req, res) {
    const idUser = req.user.id

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })
    console.log('Create new task', idUser)
  }

  static async getAll (req, res) {
    const idUser = req.user.id

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })

    try {
      const tasks = await TasksModel.getAll({ user: idUser })

      if (tasks.length === 0) return res.status(404).json({ message: 'Tasks not found' })

      return res.status(200).json({ cont: tasks.length, tasks })
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ message: "Can't get tasks of user, try again " })
    }
  }

  static async getById (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params

    if (!idUser || !idTask) return res.status(404).json({ message: 'Invalid userId or task' })
    try {
      const [task] = await TasksModel.getById({ user: idUser, taskId: idTask })

      if (!task) return res.status(404).json({ message: 'Task not found' })

      return res.status(200).json(task)
    } catch (e) {
      console.log("Can't get tasks of user")
      return res.status(500).json({ message: "Can't get tasks of user, try again " })
    }
  }

  static async updateTask (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params.id

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })
    console.log('Update task :' + idTask + ' by User: ' + idUser)
  }

  static async deleteTask (req, res) {
    const idUser = req.user.id
    const { idTask } = req.params.id

    if (!idUser) return res.status(404).json({ message: 'Invalid userId' })
    console.log('Update task :' + idTask + ' by User: ' + idUser)
  }
}
