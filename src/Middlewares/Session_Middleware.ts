import { RequestHandler } from 'express'
import { VerifyToken } from '../Auth/Jwt_Handle'
import { ErrorPrefix } from '../Utils/Prefix'
import { bold } from 'console-log-colors'

const CheckSession: RequestHandler = ({ cookies }, res, next) => {
  try {
    const jwt: string = cookies.token
    const DecodedToken = VerifyToken(jwt)

    if (!DecodedToken) {
      res.status(401)
      res.json({ message: 'No tienes un token valido!' })
    }
    next()
  } catch (error) {
    console.log(`${ErrorPrefix} - ${bold('No tienes una sesion valida!')}`)
    res.status(401)
    res.json({ message: 'No tienes una sesion valida!' })
  }
}
export { CheckSession }
