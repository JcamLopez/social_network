import { prisma } from '../config/connectPrisma.config.js'
import { AppError } from '../errors/app.errors.js'
import type { createdPublicationDTO, PublicationIdDTO, updatePublicationDTO } from '../schemas/publication.schema.js'
import type { paginationQueryDTO } from '../schemas/pagination.schema.js'

// Solo se exponen categorías activas y vínculos activos.
const publicationInclude = {
    publication_category: {
        where: { status: 'ACTIVED', category: { status: 'ACTIVED' } },
        include: { category: true }
    }
} as const

/** Valida que todas las categorías existan y estén activas. Devuelve los IDs sin duplicados. */
const resolveActiveCategoryIds = async (categoryIds: number[]): Promise<number[]> => {
    const uniqueIds = [...new Set(categoryIds)]
    const activeCount = await prisma.category.count({
        where: { categoryId: { in: uniqueIds }, status: 'ACTIVED' }
    })
    if (activeCount !== uniqueIds.length)
        throw new AppError('Una o más categorías no existen o están inactivas.', 400)
    return uniqueIds
}

/** Carga una publicación activa y verifica que pertenezca al solicitante. */
const assertOwnedActivePublication = async (publicationId: number, requesterEmail: string) => {
    const publication = await prisma.publication.findFirst({
        where: { publicationId, status: 'ACTIVED' },
        select: { publicationId: true, userEmail: true }
    })
    if (!publication)
        throw new AppError('Publicación no encontrada.', 404)
    if (publication.userEmail !== requesterEmail)
        throw new AppError('No tienes permiso para modificar esta publicación.', 403)
    return publication
}

export const createPublication = async (body: createdPublicationDTO, userEmail: string) => {
    const { title, description, categoryIds } = body
    const uniqueCategoryIds = await resolveActiveCategoryIds(categoryIds)

    return prisma.publication.create({
        data: {
            userEmail,
            title,
            description,
            publication_category: {
                create: uniqueCategoryIds.map(categoryId => ({ categoryId }))
            }
        },
        include: publicationInclude
    })
}

export const updatePublication = async (
    { publicationId }: PublicationIdDTO,
    body: updatePublicationDTO,
    requesterEmail: string
) => {
    const { title, description, categoryIds } = body
    await assertOwnedActivePublication(publicationId, requesterEmail)

    const uniqueCategoryIds = categoryIds ? await resolveActiveCategoryIds(categoryIds) : undefined

    return prisma.$transaction(async tx => {
        if (uniqueCategoryIds) {
            // Reemplazo de categorías sin duplicar filas: se desactivan las que sobran
            // y se reactivan o crean las nuevas (upsert sobre la clave compuesta).
            await tx.publicationCategory.updateMany({
                where: {
                    publicationId,
                    status: 'ACTIVED',
                    categoryId: { notIn: uniqueCategoryIds }
                },
                data: { status: 'INACTIVED' }
            })

            for (const categoryId of uniqueCategoryIds) {
                await tx.publicationCategory.upsert({
                    where: { publicationId_categoryId: { publicationId, categoryId } },
                    update: { status: 'ACTIVED' },
                    create: { publicationId, categoryId }
                })
            }
        }

        return tx.publication.update({
            where: { publicationId },
            data: { title, description },
            include: publicationInclude
        })
    })
}

export const deletePublication = async ({ publicationId }: PublicationIdDTO, requesterEmail: string) => {
    await assertOwnedActivePublication(publicationId, requesterEmail)

    return prisma.publication.update({
        where: { publicationId },
        data: { status: 'INACTIVED' }
    })
}

export const getAllPublications = async ({ page, limit }: paginationQueryDTO) => {
    return prisma.publication.findMany({
        where: { status: 'ACTIVED' },
        include: publicationInclude,
        orderBy: { publicationId: 'desc' },
        skip: (page - 1) * limit,
        take: limit
    })
}
