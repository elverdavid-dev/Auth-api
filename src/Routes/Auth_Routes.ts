import { Router } from 'express'
import {
  ControllerSignupUser,
  ControllerLoginUser,
  ControllerLogOutSession,
  ControllerChangePassword
} from '../Controllers/Auth_Controllers'
import { CheckSession } from '../Middlewares/Session_Middleware'
import { SignupValidator } from '../Validators/Signup_Validator'
import { LoginValidator } from '../Validators/Login_Validator'

const router = Router()

router.post('/signup', SignupValidator, ControllerSignupUser)
router.post('/login', LoginValidator, ControllerLoginUser)
router.post('/logout', CheckSession, ControllerLogOutSession)
router.patch('/change-password/:id', ControllerChangePassword)

export default router
