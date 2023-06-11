export interface User {
  name: string
  email: string
  password: string
  id: number
  role: Role
}

export type Auth = Pick<User, 'email' | 'password'>

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface ChangePassword {
  CurrentPassword: string
  NewPassword: string
}
