import { Router, json } from 'express'
import { authenticate, check } from '../Controllers/authenticationController'

const AuthenticationRouter = Router()
AuthenticationRouter.use(json())

AuthenticationRouter.post('', authenticate)
AuthenticationRouter.post('/verify', check)

export { AuthenticationRouter }