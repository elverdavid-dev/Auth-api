import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

const GenerateToken = (id: number) => {
  const Jwt = sign({ id }, JWT_SECRET, { expiresIn: '24h' })
  return Jwt
}

const VerifyToken = (token: string) => {
  const IsOk = verify(token, JWT_SECRET)
  return IsOk
}
export { GenerateToken, VerifyToken }
