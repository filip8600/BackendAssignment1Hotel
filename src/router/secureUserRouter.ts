import { Router, json } from 'express'
import { user } from '../Controllers/userController'
import { authenticate } from '../Controllers/authenticationController'

const router = Router()

router.get("/users", user.getAllUsers);
router.get("/users/:uid", user.getOne);



export const secureUserRouter = router