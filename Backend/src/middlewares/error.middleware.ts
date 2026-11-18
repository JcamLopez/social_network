import type { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { z, ZodError } from 'zod'
import { AppError } from '../errors/app.errors.js'

interface ErrorBody {
    success: false
    message: string
    errors?: Record<string, string[] | undefined>
}

const send = (res: Response, status: number, body: ErrorBody) => res.status(status).json(body)

const mapPrismaKnownError = (error: Prisma.PrismaClientKnownRequestError): { status: number; message: string } => {
    switch (error.code) {
        case 'P2002': {
            const target = error.meta?.target
            const fields = Array.isArray(target) ? target.join(', ') : typeof target === 'string' ? target : 'campo desconocido'
            return { status: 409, message: `Conflicto: ya existe un registro con este dato (${fields}).` }
        }
        case 'P2003':
            return { status: 409, message: 'Estás intentando referenciar un dato que no existe en el sistema.' }
        case 'P2025':
            return { status: 404, message: 'Registro no encontrado.' }
        case 'P2000': {
            const column = typeof error.meta?.column_name === 'string' ? error.meta.column_name : 'columna desconocida'
            return { status: 400, message: `El valor proporcionado excede el límite de caracteres permitido para: ${column}.` }
        }
        case 'P2024':
            return { status: 503, message: 'Se agotó el tiempo de espera para obtener una conexión a la base de datos.' }
        default:
            return { status: 500, message: 'Error interno al procesar la solicitud en la base de datos.' }
    }
}

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent)
        return next(error)

    if (error instanceof AppError)
        return send(res, error.statusCode, { success: false, message: error.message })

    if (error instanceof ZodError) {
        const flattened = z.flattenError(error)
        return send(res, 400, {
            success: false,
            message: 'Datos de entrada inválidos.',
            errors: flattened.fieldErrors
        })
    }

    // JSON malformado en el body (body-parser)
    if (error instanceof SyntaxError && 'body' in error)
        return send(res, 400, { success: false, message: 'El cuerpo de la solicitud no es un JSON válido.' })

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { status, message } = mapPrismaKnownError(error)
        if (status === 500)
            console.error(`[Prisma ${error.code}]`, error.meta)
        return send(res, status, { success: false, message })
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        console.error('[Prisma validation]', error.message)
        return send(res, 500, { success: false, message: 'Error interno del servidor' })
    }

    if (error instanceof Prisma.PrismaClientInitializationError)
        return send(res, 503, { success: false, message: 'No hay conexión con la base de datos' })

    console.error(error)
    return send(res, 500, { success: false, message: 'Error interno del servidor' })
}
