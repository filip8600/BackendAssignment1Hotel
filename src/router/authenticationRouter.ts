// import { Router } from "express"
// import { user } from "../Controllers/userController";

// const router = Router()


// /*
// Authentication
//   - `GET /users`–list all user IDs
//   - `GET /users/{:uid}`–view user data
//   - `POST /user`–create user
//   - `POST /login`–issue JWT token 
//   */
// router.get("/users",user.getAllUsers);
// router.get("/users/{:uid}", user.check_bcrypt)
// router.post("/user",user.create_bcrypt);
// router.post("/login",);

// export const usersRouter = router;


///Version 2:

import { Router, json } from 'express'
import { authenticate, check } from '../Controllers/authenticationController'

const router = Router()
router.use(json())

router.post('', authenticate)
router.post('/verify', check)

export { router as AuthenticationRouter }