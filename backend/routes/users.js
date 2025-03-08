import express from 'express'
import { UserController } from '../controllers/userController.js'
import authenticate from '../middlewares/jwt.js'

const userRouter = express.Router()

// Public routes
userRouter.post('/', UserController.signIn)

userRouter.post('/auth/login', UserController.logIn)

userRouter.get('/auth/validate', UserController.validate)

// Private routes (Authenticate required)
userRouter.get('/auth', authenticate, UserController.testAuth) // ONLY TEST AUTH

userRouter.delete('/', authenticate, UserController.deleteUser)

userRouter.post('/auth/logout', authenticate, UserController.logOut)

export default userRouter
