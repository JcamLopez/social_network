import { prisma } from '../config/connectPrisma.config.js'
import { AppError } from '../errors/app.errors.js'
import type { createdUserSchemaDTO, loginSchemaDTO } from '../schemas/auth.schemas.js'
import { compareAgainstDummy, comparePassword, passwordHash } from '../utils/hash.util.js'
import { signAccessToken } from '../utils/jwt.util.js'
import { publicUserSelect, publicUserWithPersonSelect } from '../utils/prismaSelects.util.js'

export const createUser = async (body: createdUserSchemaDTO) => {
    const { email, password, document, typeDoc, firstName, middleName, fullLastName, age } = body

    return await prisma.user.create({
        data: {
            email,
            password: await passwordHash(password),
            person: {
                create: { document, typeDoc, firstName, middleName, fullLastName, age }
            }
        },
        select: publicUserWithPersonSelect
    })
}

export const login = async (body: loginSchemaDTO) => {
    const { email, password } = body

    const user = await prisma.user.findUnique({
        where: { email },
        select: { ...publicUserWithPersonSelect, password: true }
    })

    // Siempre se ejecuta bcrypt para no revelar si el correo existe por tiempo de respuesta.
    const passwordMatches = user ? await comparePassword(password, user.password) : await compareAgainstDummy(password)

    if (!user || !passwordMatches)
        throw new AppError('Correo o contraseña incorrectos', 401)

    // Se verifica el estado solo después de comprobar la contraseña,
    // para no revelar a un tercero que la cuenta existe y está desactivada.
    if (user.status !== 'ACTIVED')
        throw new AppError('El usuario está desactivado', 403)

    const { password: _hash, ...publicUser } = user

    return {
        token: signAccessToken(publicUser.email),
        user: publicUser
    }
}
