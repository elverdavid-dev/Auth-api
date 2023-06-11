import { Request, Response } from 'express'
import { HttpError } from '../Errors/Http_Erros'
import {
  ServiceGetAllUsers,
  ServiceGetOneUser,
  ServiceDelateUser,
  ServiceUpdateUser
} from '../Services/User_Services'
import { ErrorMessageControllersUsers } from '../Errors/Message_Error'

const {
  MessageErrorGetAllUser,
  MessageErrorDelateUser,
  MessageErrorGetOneUser,
  MessageErrorUpdateUser
} = ErrorMessageControllersUsers

//* GET
const ControllerGetAllUsers = async ({ query }: Request, res: Response) => {
  try {
    const { page = 1 } = query
    const pageNumber = parseInt(page?.toString())
    const ResponseUserList = await ServiceGetAllUsers(pageNumber)
    res.json(ResponseUserList)
  } catch (error) {
    HttpError(res, MessageErrorGetAllUser, error)
  }
}

//* GET
const ControllerGetOneUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const ResponseOneUser = await ServiceGetOneUser(parseInt(id))
    if (ResponseOneUser != null) {
      res.json(ResponseOneUser)
    } else {
      res.status(404)
      res.json({ message: 'El usuario no existe!' })
    }
  } catch (error) {
    HttpError(res, MessageErrorGetOneUser, error)
  }
}

//* PUT
const ControllerUpdateUser = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params
    const { message, idUser } = await ServiceUpdateUser(parseInt(id), body)
    if (!idUser) {
      res.status(404)
      res.json({ message })
    } else {
      res.json({ idUser, message })
    }
  } catch (error) {
    HttpError(res, MessageErrorUpdateUser, error)
  }
}

//* DELATE
const ControllerDelateUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const { message, idUser } = await ServiceDelateUser(parseInt(id))
    if (!idUser) {
      res.status(404)
      res.json({ message })
    } else {
      res.json({ idUser, message })
    }
  } catch (error) {
    HttpError(res, MessageErrorDelateUser, error)
  }
}

export { ControllerDelateUser, ControllerGetAllUsers, ControllerGetOneUser, ControllerUpdateUser }
