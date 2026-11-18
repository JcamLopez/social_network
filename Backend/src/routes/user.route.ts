import { Router } from 'express'
import { Authenticate } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validateSchemas.middleware.js'
import { updateDocumentSchema, updateEmailSchema, updateUserProfileSchema } from '../schemas/user.schemas.js'
import {
    deactivateCurrentUser,
    getCurrentUser,
    updateCurrentUserDocument,
    updateCurrentUserEmail,
    updateCurrentUserProfile
} from '../controllers/user.controller.js'

const router = Router()

// Recurso "me": el usuario autenticado. La identidad sale del token, nunca de la URL.
router.use(Authenticate)

router.get('/me', getCurrentUser)
router.delete('/me', deactivateCurrentUser)
router.patch('/me/profile', validateSchema({ body: updateUserProfileSchema }), updateCurrentUserProfile)
router.patch('/me/document', validateSchema({ body: updateDocumentSchema }), updateCurrentUserDocument)
router.patch('/me/email', validateSchema({ body: updateEmailSchema }), updateCurrentUserEmail)

export default router
