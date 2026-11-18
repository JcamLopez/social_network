import * as z from 'zod'
const docTypeEnum = z.enum(['PP', 'CC', 'TI']);

// 2. Usamos string() COMPLETAMENTE VACÍO para que TypeScript no moleste
export const docTypeField = z
  .string()
  .refine(
    (val) => ['PP', 'CC', 'TI'].includes(val),
    { message: 'Debe seleccionar un tipo de documento válido' }
  );
/* export const docTypeField = z.enum(['PP', 'CC', 'TI'], {
    message: 'Debe seleccionar un tipo de documento válido'
}) */

export type typeDocDTO = z.infer<typeof docTypeField>

