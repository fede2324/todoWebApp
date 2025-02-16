import express from 'express'
import { authenticate } from '../middlewares/jsw' // -> JSW middleware to valite user by token
import { TasksController } from '../controllers/tasksController.js'

export const tasksRouter = express.Router()

tasksRouter.get('/', authenticate, TasksController.allTasks)
tasksRouter.get('/:taskId', authenticate, TasksController.detailsTask)
tasksRouter.post('/', authenticate, TasksController.newTask)
tasksRouter.patch('/:taskId', authenticate, TasksController.updateTask)
tasksRouter.delete('/:taskId', authenticate, TasksController.deleteTask)
