import { hash, compare } from 'bcrypt'

const encryptPassword = async (password: string) => {
  const passHash = await hash(password, 8)
  return passHash
}

const comparePassword = async (password: string, passHash: string) => {
  const isCorrect = await compare(password, passHash)
  return isCorrect
}

export { encryptPassword, comparePassword }
