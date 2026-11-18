import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { getDoctype } from '../services/typeDoc.services.js'

export const getTypeDocHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await getDoctype()
    return res.status(200).json({
        success: true,
        message: 'Tipo de datos consultados con exito',
        data: result
    })

})