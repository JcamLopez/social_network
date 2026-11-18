import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js'
import { JWT_ALGORITHM, TOKEN_TTL_SECONDS } from '../config/auth.config.js'

interface AccessTokenClaims {
    sub: string
}

export const signAccessToken = (email: string): string => {
    const claims: AccessTokenClaims = { sub: email }
    return jwt.sign(claims, env.SECRET_COOKIES, {
        algorithm: JWT_ALGORITHM,
        expiresIn: TOKEN_TTL_SECONDS
    })
}

/** Devuelve el email (claim `sub`) o null si el token es inválido o expiró. */
export const verifyAccessToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, env.SECRET_COOKIES, { algorithms: [JWT_ALGORITHM] })
        if (typeof decoded === 'object' && typeof decoded.sub === 'string')
            return decoded.sub
        return null
    } catch {
        return null
    }
}
