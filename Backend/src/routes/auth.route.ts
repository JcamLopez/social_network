import { Router } from 'express'
import { createdUserSchema, userBaseSchema } from '../schemas/auth.schemas.js'
import { validateSchema } from '../middlewares/validateSchemas.middleware.js'
import { loginUser, registerUser } from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', validateSchema({ body: createdUserSchema }), registerUser)
router.post('/login', validateSchema({ body: userBaseSchema }), loginUser)

export default router
