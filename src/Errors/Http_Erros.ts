import { Response } from 'express'
import { ErrorPrefix } from '../Utils/Prefix'
import { bold } from 'console-log-colors'

const HttpError = (res: Response, ErrorMessage: string, ErrorConsole: unknown) => {
  console.log(`${ErrorPrefix} - ${bold(`${ErrorMessage}`)} - ${ErrorConsole}`)
  res.status(500)
  res.json({ message: ErrorMessage })
}

export { HttpError }
