import z from 'zod' // Look at deep lern of zod validation
import moment from 'moment'

const taskBaseSchema = z.object({
  title: z.string().min(1, { message: "The title can't be empty" }).max(20, { message: 'title max 20 long' }),
  status: z.enum(['new', 'in-progress', 'done','cancel']),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  limitTime: z.string().optional().nullable()
})

const taskSchema = taskBaseSchema.superRefine((data, ctx) => {
  const createdAtMoment = moment(data.updatedAt, true)
  const limitTimeMoment = moment(data.limitTime, true)

  if (data.limitTime && createdAtMoment.isAfter(limitTimeMoment)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Limit time can't be higher  than created time",
      path: ['createdAt']
    })
  }
})

// Update Scheme
const partialTaskSchema = taskBaseSchema.partial().superRefine((data, ctx) => {
  if (data.limitTime) {
    const updatedAtMoment = moment(data.updatedAt, true)
    const limitTimeMoment = moment(data.limitTime, true)

    if (limitTimeMoment.isBefore(updatedAtMoment)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Limit time can't be higher  than updated time",
        path: ['updatedAt']
      })
    }
  }
})

export function validTask (objTask) {
  return taskSchema.safeParse(objTask) // return an obj with error instead of throwing an error and stopping the program
}

export function validUpdate (obj) {
  return partialTaskSchema.safeParse(obj)
}
