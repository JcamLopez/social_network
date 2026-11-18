import type { Request, Response, NextFunction } from 'express'
import { ACCESS_TOKEN_COOKIE } from '../config/auth.config.js'
import { prisma } from '../config/connectPrisma.config.js'
import { AppError } from '../errors/app.errors.js'
import { verifyAccessToken } from '../utils/jwt.util.js'

/**
 * Verifica el JWT y reconstruye la identidad desde la base de datos.
 * Así un usuario desactivado pierde acceso de inmediato y el email/documento
 * nunca están desfasados respecto al token.
 */
export const Authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token: unknown = req.cookies?.[ACCESS_TOKEN_COOKIE]
        if (typeof token !== 'string' || token.length === 0)
            throw new AppError('Acceso no autorizado. No se encontró el token de autenticación.', 401)

        const email = verifyAccessToken(token)
        if (!email)
            throw new AppError('Token inválido o expirado.', 401)

        const user = await prisma.user.findFirst({
            where: { email, status: 'ACTIVED' },
            select: { email: true, personDocument: true }
        })
        if (!user)
            throw new AppError('Token inválido o expirado.', 401)

        req.user = { email: user.email, document: user.personDocument }
        next()
    } catch (error) {
        next(error)
    }
}
