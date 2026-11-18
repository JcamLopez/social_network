import { Router } from 'express'
import { Authenticate } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validateSchemas.middleware.js'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/category.schemas.js'
import { paginationQuerySchema } from '../schemas/pagination.schema.js'
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler
} from '../controllers/category.controller.js'

const router = Router()

router.use(Authenticate)

router.get('/', validateSchema({ query: paginationQuerySchema }), getCategoriesHandler)
router.post('/', validateSchema({ body: createCategorySchema }), createCategoryHandler)
router.patch('/:categoryId', validateSchema({ params: getCategorySchema, body: updateCategorySchema }), updateCategoryHandler)
router.delete('/:categoryId', validateSchema({ params: getCategorySchema }), deleteCategoryHandler)

export default router
