import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { ErrorPrefix } from '../Utils/Prefix'
import { bold } from 'console-log-colors'

const LoginValidator = [
  check('email')
    .isEmail()
    .withMessage('El correo electrónico no es válido!')
    .notEmpty()
    .withMessage('El correo es obligatorio!')
    .trim(),

  check('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria!')
    .trim()
    .isString()
    .isLength({ min: 4 })
    .withMessage('la contraseña tiene que ser mayor a 4 digitos!'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors = errors.array()
      console.log(`${ErrorPrefix} - ${bold('Error de validacion!')}`)
      return res.status(400).json({
        message: 'Error de validación',
        errors: validationErrors
      })
    }

    next()
  }
]

export { LoginValidator }
