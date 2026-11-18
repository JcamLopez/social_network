import type { ZodType } from 'zod'
import type { Request, Response, NextFunction } from 'express'

interface RequestSchemas {
    body?: ZodType
    params?: ZodType
    query?: ZodType
}


export const validateSchema = (schemas: RequestSchemas) =>
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (schemas.body)
                req.body = await schemas.body.parseAsync(req.body)

            if (schemas.params)
                req.params = (await schemas.params.parseAsync(req.params)) as Request['params']

            if (schemas.query) {
                const query = await schemas.query.parseAsync(req.query)
                Object.defineProperty(req, 'query', { value: query, writable: true, configurable: true, enumerable: true })
            }

            next()
        } catch (error) {
            console.log("accaaaa esta mi error")
            console.log(error)
            next(error)
        }
    }
