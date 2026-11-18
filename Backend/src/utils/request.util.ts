import type { Request } from 'express'
import { AppError } from '../errors/app.errors.js'
import type { AuthUser } from '../types/auth.types.js'

/** Devuelve el usuario autenticado. Lanza 401 si el middleware Authenticate no se ejecutó. */
export const getAuthUser = (req: Request): AuthUser => {
    if (!req.user)
        throw new AppError('Acceso no autorizado.', 401)
    return req.user
}
