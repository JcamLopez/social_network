import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const passwordHash = (password: string): Promise<string> =>
    bcrypt.hash(password, SALT_ROUNDS)

export const comparePassword = (plainText: string, hash: string): Promise<boolean> =>
    bcrypt.compare(plainText, hash)

// Hash ficticio para igualar el tiempo de respuesta cuando el usuario no existe
// y evitar enumeración de correos por diferencias de latencia.
const DUMMY_HASH = bcrypt.hashSync('dummy-password-for-timing', SALT_ROUNDS)

export const compareAgainstDummy = (plainText: string): Promise<boolean> =>
    bcrypt.compare(plainText, DUMMY_HASH).then(() => false)
