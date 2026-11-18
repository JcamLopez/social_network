import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { createUser, login } from '../services/auth.services.js'
import { ACCESS_TOKEN_COOKIE, accessTokenCookieOptions } from '../config/auth.config.js'

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    console.log("acaaaa llegoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(req.body)
    const newUser = await createUser(req.body)
    res.status(201).json({ success: true, message: 'Usuario creado con éxito', data: { newUser } })
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { token, user } = await login(req.body)
    res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions)
    res.status(200).json({ succes: true, data: { user } })
})
