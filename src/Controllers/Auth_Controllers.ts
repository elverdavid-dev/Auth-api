import { Request, Response } from 'express'
import { HttpError } from '../Errors/Http_Erros'
import {
  ServiceSignupUser,
  ServiceLoginUser,
  ServiceChangePassword
} from '../Services/Auth_Services'
import { serialize } from 'cookie'
import { OptionCookieLogout } from '../Utils/CookieOptions'
import { ErrorMessageControllersAuth } from '../Errors/Message_Error'

const { MessageErrorLoginUser, MessageErrorLogoutUser, MessageErrorSignupUser } =
 ErrorMessageControllersAuth

//* POST Register
const ControllerSignupUser = async ({ body }: Request, res: Response) => {
  try {
    const { MessageResponse, cookie, message } = await ServiceSignupUser(body)
    if (cookie) {
      res.setHeader('Set-Cookie', cookie)
    }

    if (MessageResponse === undefined) {
      res.status(409)
      res.json({ message })
    } else {
      res.json(MessageResponse)
    }
  } catch (error) {
    HttpError(res, MessageErrorSignupUser, error)
  }
}

//* POST Login
const ControllerLoginUser = async ({ body }: Request, res: Response) => {
  try {
    const { MessageResponse, cookie, message } = await ServiceLoginUser(body)
    if (cookie) {
      res.setHeader('Set-Cookie', cookie)
    }
    if (MessageResponse === undefined) {
      res.status(401)
      res.json({ message })
    } else {
      res.json(MessageResponse)
    }
  } catch (error) {
    HttpError(res, MessageErrorLoginUser, error)
  }
}

//* POST Logout
const ControllerLogOutSession = async (req: Request, res: Response) => {
  try {
    const Cookie = serialize('token', '', OptionCookieLogout)
    res.setHeader('Set-Cookie', Cookie)
    res.json({ message: 'Sesion cerrada correctamente' })
  } catch (error) {
    HttpError(res, MessageErrorLogoutUser, error)
  }
}

//* PATCH Change password
const ControllerChangePassword = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params
    const { message, UserId } = await ServiceChangePassword(parseInt(id), body)
    if (!UserId) {
      res.status(403)
      res.json({ message })
    } else {
      res.json({ UserId, message })
    }
  } catch (error) {
    HttpError(res, 'Error a el cambiar la contraseña', error)
  }
}
export {
  ControllerSignupUser,
  ControllerLoginUser,
  ControllerLogOutSession,
  ControllerChangePassword
}
