import { Router, json } from 'express'
import { user } from '../Controllers/userController'
import { authenticate } from '../Controllers/authenticationController'

const router = Router()

router.get("/users", user.getAllUsers);
router.post('/user', user.create_bcrypt);
router.post('/login', authenticate);

export const userRouter = router