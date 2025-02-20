import express from 'express'
import { UserController } from '../controllers/userController.js'
import authenticate from '../middlewares/jwt.js'

export const userRouter = express.Router()

userRouter.post('/', UserController.signIn)
userRouter.post('/auth/login', UserController.logIn)

// Authenticate required
userRouter.get('/auth', authenticate, UserController.testAuth) // ONLY TEST AUTH
userRouter.delete('/', authenticate, UserController.deleteUser)
userRouter.post('/auth/logout', authenticate, UserController.logOut)
