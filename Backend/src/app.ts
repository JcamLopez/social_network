import express from 'express'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFoundHandler } from './middlewares/notFound.middleware.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import publicationRouter from './routes/publication.route.js'
import categoryRouter from './routes/category.route.js'
import typeDocument from './routes/typeDocument.route.js'
import cors from 'cors'

const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Obligatorio para que las cookies (el token de sesión) funcionen
}))

const apiRouter = express.Router()
// 4. Inyección de las rutas individuales dentro del Router Maestro
apiRouter.use('/auth', authRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/publications', publicationRouter)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/type', typeDocument)
app.use('/api', apiRouter)


app.use(notFoundHandler)
app.use(errorHandler)

export default app
