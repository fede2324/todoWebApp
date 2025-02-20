import z from 'zod'
import moment from 'moment'

const taskSchema = z.object({
  title: z.string().min(5, { message: "The title can't be empty" }).max(20, { message: 'title max 20 long' }),
  status: z.enum(['new', 'in-progress', 'done']),
  description: z.string(),
  createdAt: z.string().datetime({ message: 'Invalid datetime' }),
  updatedAt: z.string().datetime({ message: 'Invalid datetime' }),
  limitTime: z.string().datetime({ message: 'Invalid datetime' }).optional()
}).refine(data => {
  // Convertir las fechas a objetos moment para la comparación
  const createdAtMoment = moment(data.createdAt, 'DD-MM-YYYY HH:mm:ss', true)
  const limitTimeMoment = moment(data.limitTime, 'DD-MM-YYYY HH:mm:ss', true)

  // Verificar que la fecha de creación no sea menor al límite
  return !data.limitTime || createdAtMoment.isSameOrBefore(limitTimeMoment)
}, {
  message: 'La fecha de creación no puede ser mayor al límite',
  path: ['createdAt']
})

export function validateTask (objTask) {
  return taskSchema.safeParse(objTask) // return an obj with error instead of throwing an error and stopping the program
}
