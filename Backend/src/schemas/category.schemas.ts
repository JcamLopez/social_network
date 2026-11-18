import * as z from 'zod'

export const createCategorySchema = z.object({
    title: z.string().trim().min(1, 'Debe ingresar la categoría').max(50)
})

export const getCategorySchema = z.object({
    categoryId: z.coerce.number().int().positive('El ID de la categoría no es válido')
})

export const updateCategorySchema = z.object({
    newTitle: z.string().trim().min(1, 'Debe ingresar el nuevo título').max(50)
})

export type createCategoryDTO = z.infer<typeof createCategorySchema>
export type updateCategoryDTO = z.infer<typeof updateCategorySchema>
export type getCategoryDTO = z.infer<typeof getCategorySchema>
