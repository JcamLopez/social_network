/** Identidad del usuario autenticado, reconstruida desde la BD en cada request. */
export interface AuthUser {
    email: string
    document: string
}
