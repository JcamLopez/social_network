import type { Server } from 'node:http'
import app from './app.js'
import { env } from './config/env.config.js'
import { prisma } from './config/connectPrisma.config.js'

const server: Server = app.listen(env.PORT, () => {
    console.log(`Servidor listo en: http://localhost:${env.PORT}`)
})

const shutdown = (signal: NodeJS.Signals) => {
    console.log(`Recibido ${signal}. Cerrando servidor...`)
    server.close(() => {
        prisma.$disconnect().finally(() => process.exit(0))
    })
    setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
