import { serialize } from 'cookie'
import { comparePassword, encryptPassword } from '../Auth/EncryptPassword'
import { GenerateToken } from '../Auth/Jwt_Handle'
import { Auth, ChangePassword, User } from '../Interfaces/User_Interface'
import { PrismaClient } from '@prisma/client'
import { OptionCookie } from '../Utils/CookieOptions'
import { ErrorMessageServices } from '../Errors/Message_Error'

const { users } = new PrismaClient()
const { MessageErrorIncorrectPassword, MessageErrorUserExist, MessageErrorUserNotFound } =
 ErrorMessageServices

// ? SignUp User
const ServiceSignupUser = async ({ email, name, password, role }: User) => {
  const UserExist = await users.findFirst({
    where: { email }
  })

  if (UserExist != null) {
    return { message: MessageErrorUserExist }
  } else {
    const passwordEncrypt = await encryptPassword(password)
    const UserCreated = await users.create({
      data: {
        name,
        email,
        password: passwordEncrypt,
        role
      }
    })
    const token = GenerateToken(UserCreated.id)
    const cookie = serialize('token', token, OptionCookie)

    return {
      MessageResponse: { userId: UserCreated.id, message: 'Usuario creado correctamente' },
      cookie
    }
  }
}

// ? Login User
const ServiceLoginUser = async ({ email, password }: Auth) => {
  const UserExist = await users.findFirst({
    where: { email }
  })

  if (UserExist == null) {
    return { message: MessageErrorUserNotFound }
  } else {
    const PasswordCompared = await comparePassword(password, UserExist.password)
    if (!PasswordCompared) return { message: MessageErrorIncorrectPassword }
    const token = GenerateToken(UserExist.id)
    const cookie = serialize('token', token, OptionCookie)
    return {
      MessageResponse: { id: UserExist.id, message: 'Sesion iniciada correctamente' },
      cookie
    }
  }
}

// ? Change password
const ServiceChangePassword = async (
  id: number,
  { CurrentPassword, NewPassword }: ChangePassword
) => {
  const UserExist = await users.findFirst({
    where: { id }
  })

  if (UserExist == null) {
    return { message: 'El usuario no existe' }
  }

  const PasswordCompared = await comparePassword(CurrentPassword, UserExist.password)
  if (!PasswordCompared) return { message: MessageErrorIncorrectPassword }

  const NewPasswordEncrypt = await encryptPassword(NewPassword)

  const PasswordUpdated = await users.update({
    where: { id },
    data: { password: NewPasswordEncrypt }
  })
  console.log(PasswordUpdated)
  return { UserId: UserExist.id, message: 'Contraseña cambiada correctamente' }
}

export { ServiceSignupUser, ServiceLoginUser, ServiceChangePassword }
