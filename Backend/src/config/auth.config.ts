import type { CookieOptions } from 'express'
import { env } from './env.config.js'

export const ACCESS_TOKEN_COOKIE = 'access_token'
export const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60
export const JWT_ALGORITHM = 'HS256' as const

export const accessTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'strict',
    maxAge: TOKEN_TTL_SECONDS * 1000
}
