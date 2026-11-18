import * as z from 'zod'
import {docTypeField} from './documentType.schema.js'
import {documentField,firstNameField,middleNameField,fullLastNameField,ageField} from './person.schema.js'
import {emailField,loginPasswordField,newPasswordField} from './user.schemas.js'

export const personBaseSchema = z.object({
    document: documentField,
    typeDoc: docTypeField,
    firstName: firstNameField,
    middleName: middleNameField.optional(),
    fullLastName: fullLastNameField,
    age: ageField
})

export const userBaseSchema = z.object({
    email: emailField,
    password: loginPasswordField
})

export const createdUserSchema = personBaseSchema.extend({
    email: emailField,
    password: newPasswordField
})

export type loginSchemaDTO = z.infer<typeof userBaseSchema>
export type createdUserSchemaDTO = z.infer<typeof createdUserSchema>
