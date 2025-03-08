import z from 'zod'

const userScheme = z.object({
  username: z.string().max(20, { message: 'Username be max 20 characters long' }),
  password: z.string().min(8, { message: 'Password be 8 characters or more' }).max(20, { message: 'Password be max 20 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Confirm password be 8 characters or more' }).max(20, { message: 'Confirm password be max 20 characters long' })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export function validateUser (user) {
  const result = userScheme.safeParse(user)
  if (result.success) {
    return { data: result.data } // Devuelve los datos validados
  } else {
    return { error: result.error } // Devuelve los errores de validación
  }
}
