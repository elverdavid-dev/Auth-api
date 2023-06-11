import { PrismaClient } from '@prisma/client'
import { User } from '../Interfaces/User_Interface'
import { ErrorMessageServices } from '../Errors/Message_Error'

const { users } = new PrismaClient()
const { MessageErrorDelateUser, MessageErrorUpdateUser } = ErrorMessageServices
// ? Get all users
const ServiceGetAllUsers = async (pageNumber: number) => {
  const pageSize = 20
  const skipCount = (pageNumber - 1) * pageSize

  const UserList = await users.findMany({
    orderBy: { id: 'desc' },
    select: { id: true, email: true, name: true, role: true },
    skip: skipCount,
    take: pageSize
  })
  return UserList
}

// ? Get one user
const ServiceGetOneUser = async (idUser: number) => {
  const OneUser = await users.findUnique({
    where: {
      id: idUser
    },
    select: { id: true, email: true, name: true, role: true }
  })

  return OneUser
}

// ? Update User
const ServiceUpdateUser = async (id: number, { email, name, role }: User) => {
  const User = await users.findFirst({
    where: { id }
  })

  if (User == null) {
    return { message: MessageErrorUpdateUser }
  }

  //* Si es tiene el role ADMIN puede cambiar el role de los demas si no No
  if (User?.role === 'ADMIN') {
    await users.update({
      where: { id },
      data: { name, email, role }
    })
    return { idUser: id, message: 'Usuario actualizado correctamente' }
  } else {
    await users.update({
      where: { id },
      data: { name, email }
    })
    return { idUser: id, message: 'Usuario actualizado correctamente' }
  }
}

// ? Delate User
const ServiceDelateUser = async (id: number) => {
  const VerifyUser = await users.findFirst({
    where: { id }
  })

  if (VerifyUser == null) {
    return { message: MessageErrorDelateUser }
  }
  await users.delete({
    where: { id }
  })

  return { idUser: id, message: 'Usuario eliminado correctamente' }
}

export { ServiceGetAllUsers, ServiceGetOneUser, ServiceUpdateUser, ServiceDelateUser }
