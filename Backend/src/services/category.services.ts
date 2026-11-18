import { prisma } from '../config/connectPrisma.config.js'
import type { createCategoryDTO, getCategoryDTO, updateCategoryDTO } from '../schemas/category.schemas.js'
import type { paginationQueryDTO } from '../schemas/pagination.schema.js'

export const createCategory = async (body: createCategoryDTO) => {
    return prisma.category.create({
        data: { title: body.title }
    })
}

// `where` incluye status: la actualización de una categoría inactiva devuelve P2025 (404).
export const updateCategory = async ({ categoryId }: getCategoryDTO, body: updateCategoryDTO) => {
    return prisma.category.update({
        where: { categoryId, status: 'ACTIVED' },
        data: { title: body.newTitle }
    })
}

export const getAllCategories = async ({ page, limit }: paginationQueryDTO) => {
    return prisma.category.findMany({
        where: { status: 'ACTIVED' },
        orderBy: { title: 'asc' },
        skip: (page - 1) * limit,
        take: limit
    })
}

// Soft delete: nunca se elimina la fila.
export const deactivateCategory = async ({ categoryId }: getCategoryDTO) => {
    return prisma.category.update({
        where: { categoryId, status: 'ACTIVED' },
        data: { status: 'INACTIVED' }
    })
}
