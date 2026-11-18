import { PrismaClient } from '@prisma/client'
import { env } from './env.config.js'

export const prisma = new PrismaClient({
    log: env.isProduction ? ['error', 'warn'] : ['query', 'error', 'warn']
})
