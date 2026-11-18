import { prisma } from '../config/connectPrisma.config.js'


export const getDoctype = async () => {
    return await prisma.typeDocumnet.findMany({
        where: {
            status: 'ACTIVED'
        }
    })
}