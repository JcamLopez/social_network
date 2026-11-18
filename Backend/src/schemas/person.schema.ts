import * as z from 'zod'

export const documentField = z.string().trim().length(10, 'El documento debe contener 10 caracteres')


export const firstNameField = z.string().trim().min(1, 'Debe digitar el primer nombre').max(50)

export const middleNameField = z.string().trim().max(50)

export const fullLastNameField = z.string().trim().min(1, 'Debe ingresar el apellido').max(50)

export const ageField = z.coerce.number()
    .int('La edad debe ser un número entero')
    .min(1, 'Debe ingresar la edad')
    .max(120, 'La edad no es válida')