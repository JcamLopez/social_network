import * as z from 'zod'

export const docTypeField = z.enum(['PP', 'CC', 'TI'], {
    message: 'Debe seleccionar un tipo de documento válido'
})


export type typeDocDTO = z.infer<typeof docTypeField>

