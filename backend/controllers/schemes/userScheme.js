import z from 'zod'

const userScheme = z.object({
  username: z.string().max(20, { message: 'Userame be max 20 characters long' }),
  password: z.string().min(8, { message: 'Password be 8 characters or more' }).max(20, { message: 'Userame be max 20 characters long' })
})

export function validateUser (user) {
  return userScheme.safeParse(user)
}
