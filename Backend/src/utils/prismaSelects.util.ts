import type { Prisma } from '@prisma/client'


export const publicUserSelect = {
    email: true,
    personDocument: true,
    status: true,
    createdAt: true
} satisfies Prisma.UserSelect


export const publicUserWithPersonSelect = {
    ...publicUserSelect,
    person: true
} satisfies Prisma.UserSelect
