import express from 'express'
import { UserController } from '../controllers/userController.js'

export const userRouter = express.Router()

userRouter.get('/:idUser', UserController.getUser) // get info User
userRouter.post('/', UserController.register) // create new user
userRouter.post('/', UserController.login) // login user
userRouter.get('/:idUser', UserController.deleteUser) // get info User
