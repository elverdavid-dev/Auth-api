import { CookieSerializeOptions } from 'cookie'

//* Create cookie options
const OptionCookie: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 86400,
  domain: 'localhost',
  path: '/',
  secure: true,
  sameSite: 'lax'
}

//* Delate cookie options
const OptionCookieLogout: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 0,
  domain: 'localhost',
  path: '/',
  secure: true,
  sameSite: 'lax'
}

export { OptionCookie, OptionCookieLogout }
