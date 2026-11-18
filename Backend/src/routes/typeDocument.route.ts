import { Router } from 'express'
import {getTypeDocHandler} from '../controllers/docType.controller.js'
const router = Router()


router.get('/document',getTypeDocHandler)
export default router