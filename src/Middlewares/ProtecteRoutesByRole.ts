import { RequestHandler } from 'express'
import { ErrorPrefix } from '../Utils/Prefix'
import { bold } from 'console-log-colors'
import { VerifyToken } from '../Auth/Jwt_Handle'
import { PrismaClient } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

const { users } = new PrismaClient()

const ProtecteRoutesByRole: RequestHandler = async ({ cookies }, res, next) => {
  try {
    const jwt: string = cookies.token
    const DecodedToken = VerifyToken(jwt) as JwtPayload
    const id = DecodedToken.id
    const user = await users.findFirst({ where: { id }, select: { role: true } })
    if (user === null) {
      res.status(404)
      res.json({ message: 'El usuario no existe!' })
      console.log(`${ErrorPrefix} - El usuario no existe!`)
      return
    }
    if (user?.role !== 'ADMIN') {
      res.status(401)
      res.json({ message: 'No tienes autorizacion para acceder a esta ruta!' })
      console.log(`${ErrorPrefix} -${bold(' No tienes autorizacion para acceder a esta ruta!')}`)
      return
    }
    next()
  } catch (error) {
    console.log(`${ErrorPrefix} - ${bold('Error')}`)
  }
}

export { ProtecteRoutesByRole }
