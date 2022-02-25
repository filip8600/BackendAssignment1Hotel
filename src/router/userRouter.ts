import { Router } from 'express'
import { user } from '../Controllers/userController'
import { authenticate } from '../Controllers/authenticationController'

const userRouter = Router()

userRouter.post('/user', user.create_bcrypt);
userRouter.post('/login', authenticate);

//export const userRouter = router

//Secure methods:

const secureUserRouter = Router()
secureUserRouter.get("/users", user.getAllUsers);
secureUserRouter.get("/users/:uid", user.getOne);

export { secureUserRouter, userRouter }