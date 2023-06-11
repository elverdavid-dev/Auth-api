import { Router } from 'express'
import {
  ControllerGetAllUsers,
  ControllerDelateUser,
  ControllerGetOneUser,
  ControllerUpdateUser
} from '../Controllers/User_Controllers'
import { CheckSession } from '../Middlewares/Session_Middleware'
import { ProtecteRoutesByRole } from '../Middlewares/ProtecteRoutesByRole'

const router = Router()

router.get('/all', CheckSession, ProtecteRoutesByRole, ControllerGetAllUsers)
router.get('/one/:id', CheckSession, ControllerGetOneUser)
router.put('/update/:id', CheckSession, ControllerUpdateUser)
router.delete('/delete/:id', CheckSession, ControllerDelateUser)

export default router
