import { Router } from 'express'
import { Authenticate } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validateSchemas.middleware.js'
import { createdPublicationSchema, updatePublicationSchema, PublicationIdSchema } from '../schemas/publication.schema.js'
import { paginationQuerySchema } from '../schemas/pagination.schema.js'
import {
    createPublicationHandler,
    deletePublicationHandler,
    getPublicationsHandler,
    updatePublicationHandler
} from '../controllers/publication.controller.js'

const router = Router()

router.use(Authenticate)

router.get('/', validateSchema({ query: paginationQuerySchema }), getPublicationsHandler)
router.post('/', validateSchema({ body: createdPublicationSchema }), createPublicationHandler)
router.patch('/:publicationId', validateSchema({ params: PublicationIdSchema, body: updatePublicationSchema }), updatePublicationHandler)
router.delete('/:publicationId', validateSchema({ params: PublicationIdSchema }), deletePublicationHandler)

export default router
