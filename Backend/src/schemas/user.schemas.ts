import * as z from 'zod'
import { docTypeField } from './documentType.schema.js'
import { ageField, documentField, firstNameField, fullLastNameField, middleNameField } from './person.schema.js'

export const emailField = z.email('Debe ingresar un email válido')
    .trim()
    .toLowerCase()
    

// bcrypt solo considera los primeros 72 bytes: se limita para no truncar silenciosamente.
export const newPasswordField = z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede superar 72 caracteres')

export const loginPasswordField = z.string()
    .min(1, 'Debe ingresar una contraseña')
    .max(72)
const atLeastOneField = (value: Record<string, unknown>) =>
    Object.values(value).some(field => field !== undefined)


export const getUserEmailSchema = z.object({
    email: emailField
})

export const updateUserProfileSchema = z.object({
    firtsName: firstNameField.optional(),
    middleName: middleNameField.nullable().optional(),
    fullLastName: fullLastNameField.optional(),
    age: ageField.optional()
}).refine(atLeastOneField, 'Debe enviar al menos un campo para actualizar')

export const updateEmailSchema = z.object({
    newEmail: emailField,
    currentPassword: loginPasswordField
})

export const updateDocumentSchema = z.object({
    documentNew: documentField,
    typeDoc: docTypeField
})

export type updateDocumentDTO = z.infer<typeof updateDocumentSchema>
export type updateEmailDTO = z.infer<typeof updateEmailSchema>
export type getUserEmailDTO = z.infer<typeof getUserEmailSchema>
export type updateProfileUserDTO = z.infer<typeof updateUserProfileSchema>
