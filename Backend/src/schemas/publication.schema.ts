import * as z from 'zod'

const categoryIdsField = z.array(
    z.number().int().positive('Los IDs de categoría deben ser números positivos')
)
    .min(1, 'Debe seleccionar al menos una categoría')
    .max(20, 'Una publicación puede tener máximo 20 categorías')

export const createdPublicationSchema = z.object({
    title: z.string().trim().min(1, 'Debe ingresar el título de la publicación').max(50),
    description: z.string().trim().min(1, 'Debe ingresar una descripción').max(5000),
    categoryIds: categoryIdsField
})

export const updatePublicationSchema = z.object({
    title: z.string().trim().min(1, 'El título no puede estar vacío').max(50).optional(),
    description: z.string().trim().min(1, 'La descripción no puede estar vacía').max(5000).optional(),
    categoryIds: categoryIdsField.optional()
}).refine(
    value => Object.values(value).some(field => field !== undefined),
    'Debe enviar al menos un campo para actualizar'
)

export const PublicationIdSchema = z.object({
    publicationId: z.coerce.number().int().positive('El ID de la publicación no es válido')
})

export type PublicationIdDTO = z.infer<typeof PublicationIdSchema>
export type createdPublicationDTO = z.infer<typeof createdPublicationSchema>
export type updatePublicationDTO = z.infer<typeof updatePublicationSchema>
