import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { createCategory, deactivateCategory, getAllCategories, updateCategory } from '../services/category.services.js'
import type { getCategoryDTO } from '../schemas/category.schemas.js'
import type { paginationQueryDTO } from '../schemas/pagination.schema.js'

export const createCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
    const category = await createCategory(req.body)
    res.status(201).json({ succes: true, message: 'Categoría creada', data: { category } })
})

export const getCategoriesHandler = asyncHandler(async (req: Request, res: Response) => {
    const categories = await getAllCategories(req.query as unknown as paginationQueryDTO)
    res.status(200).json({ succes: true, message: 'Categorías consultadas', data: { categories } })
})

export const updateCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
    const category = await updateCategory(req.params as unknown as getCategoryDTO, req.body)
    res.status(200).json({ succes: true, message: 'Categoría actualizada', data: { category } })
})

export const deleteCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
    const category = await deactivateCategory(req.params as unknown as getCategoryDTO)
    res.status(200).json({ succes: true, message: 'Categoría eliminada', data: { category } })
})
