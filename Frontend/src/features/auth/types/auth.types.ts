import type { TypeDoc } from '../../typeDocument/types/document.types'

export interface RegisterPayload {
    email: string
    password: string
    document: string
    typeDoc: TypeDoc
    firstName: string
    middleName?: string | null
    fullLastName: string
    age: number
}


export interface PersonData {
    document: string
    typeDoc: TypeDoc
    firstName: string
    middleName: string | null
    fullLastName: string
    age: number
}


export interface User {
    email: string
    personDocument: string
    status: string
    createdAt: string
    person: PersonData
}


export interface LoginPayload {
    email: string,
    password: string
}

export interface ValidationErrors {
    [key: string]: string[]
}