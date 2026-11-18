import 'dotenv/config'

const requireEnv = (name: string): string => {
    const value = process.env[name]
    if (!value)
        throw new Error(`La variable ${name} no existe en el archivo .env`)
    return value
}

const parsePort = (raw: string | undefined): number => {
    if (raw === undefined || raw === '') return 5000
    const port = Number(raw)
    if (!Number.isInteger(port) || port < 1 || port > 65535)
        throw new Error('La variable PORT debe ser un entero entre 1 y 65535')
    return port
}

export const env = {
    PORT: parsePort(process.env.PORT),
    SECRET_COOKIES: requireEnv('SECRET_COOKIES'),
    NODE_ENV: requireEnv('NODE_ENV'),
    isProduction: process.env.NODE_ENV === 'production'
} as const
