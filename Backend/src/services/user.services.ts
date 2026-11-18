import { prisma } from '../config/connectPrisma.config.js'
import { AppError } from '../errors/app.errors.js'
import type { getUserEmailDTO, updateDocumentDTO, updateEmailDTO, updateProfileUserDTO } from '../schemas/user.schemas.js'
import { comparePassword } from '../utils/hash.util.js'
import { publicUserWithPersonSelect, publicUserSelect } from '../utils/prismaSelects.util.js'

export const getUserByEmail = async ({ email }: getUserEmailDTO) => {
    return prisma.user.findFirst({
        where: { email, status: 'ACTIVED' },
        select: publicUserWithPersonSelect
    })
}

export const deactivateUser = async ({ email }: getUserEmailDTO) => {
    return prisma.user.update({
        where: { email, status: 'ACTIVED' },
        data: { status: 'INACTIVED' },
        select: publicUserSelect
    })
}

export const updateProfile = async (body: updateProfileUserDTO, document: string) => {
    const { firtsName, middleName, fullLastName, age } = body

    // Solo se actualizan los campos enviados; `middleName: null` permite borrarlo.
    return prisma.person.update({
        where: { document },
        data: { firtsName, middleName, fullLastName, age }
    })
}

export const updateEmail = async (body: updateEmailDTO, currentEmail: string) => {
    const { newEmail, currentPassword } = body

    const user = await prisma.user.findUnique({
        where: { email: currentEmail },
        select: { email: true, password: true, status: true }
    })
    if (!user || user.status !== 'ACTIVED')
        throw new AppError('Usuario no encontrado', 404)

    if (!(await comparePassword(currentPassword, user.password)))
        throw new AppError('La contraseña actual es incorrecta', 401)

    if (newEmail === currentEmail)
        throw new AppError('El nuevo correo es igual al actual', 400)

    return prisma.user.update({
        where: { email: currentEmail },
        data: { email: newEmail },
        select: publicUserSelect
    })
}

export const updateDocument = async (body: updateDocumentDTO, currentDocument: string) => {
    const { documentNew, typeDoc } = body

    // La FK User.personDocument se actualiza en cascada (acción por defecto de Prisma).
    return prisma.person.update({
        where: { document: currentDocument },
        data: { document: documentNew, typeDoc }
    })
}
