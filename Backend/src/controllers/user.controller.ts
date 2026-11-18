import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { getAuthUser } from '../utils/request.util.js'
import { signAccessToken } from '../utils/jwt.util.js'
import { ACCESS_TOKEN_COOKIE, accessTokenCookieOptions } from '../config/auth.config.js'
import { AppError } from '../errors/app.errors.js'
import { deactivateUser, getUserByEmail, updateDocument, updateEmail, updateProfile } from '../services/user.services.js'

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    const user = await getUserByEmail({ email })
    if (!user)
        throw new AppError('Usuario no encontrado', 404)
    res.status(200).json({ succes: true, message: 'Usuario obtenido', newUser: user })
})

export const updateCurrentUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const { document } = getAuthUser(req)
    const person = await updateProfile(req.body, document)
    res.status(200).json({ succes: true, message: 'Usuario actualizado', newUser: person })
})

export const deactivateCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    const user = await deactivateUser({ email })
    res.clearCookie(ACCESS_TOKEN_COOKIE, accessTokenCookieOptions)
    res.status(200).json({ succes: true, message: 'Usuario desactivado', delet: user })
})

export const updateCurrentUserDocument = asyncHandler(async (req: Request, res: Response) => {
    const { document } = getAuthUser(req)
    const person = await updateDocument(req.body, document)
    res.status(200).json({ succes: true, message: 'Documento actualizado', document: person })
})

export const updateCurrentUserEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = getAuthUser(req)
    const user = await updateEmail(req.body, email)
    // El claim `sub` del token contiene el email: se reemite la cookie para no dejar sesiones desfasadas.
    res.cookie(ACCESS_TOKEN_COOKIE, signAccessToken(user.email), accessTokenCookieOptions)
    res.status(200).json({ succes: true, message: 'Email actualizado', email: user })
})
