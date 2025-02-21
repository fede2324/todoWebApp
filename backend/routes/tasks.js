import express from 'express'
import authenticate from '../middlewares/jwt.js' // -> JSW middleware to valite user by token
import TasksController from '../controllers/tasksController.js'

const tasksRouter = express.Router()

// Private routes (Authenticate required)
tasksRouter.post('/', authenticate, TasksController.createTask) // Create

tasksRouter.get('/', authenticate, TasksController.getAll) // Read ALL

tasksRouter.get('/:idTask', authenticate, TasksController.getById) // Read by ID

tasksRouter.patch('/:idTask', authenticate, TasksController.updateTask) // Update

tasksRouter.delete('/:idTask', authenticate, TasksController.deleteTask) // Delete

export default tasksRouter
