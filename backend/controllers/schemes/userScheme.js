import z from 'zod'

const userScheme = z.object({
  username: z.string().max(20, { message: 'Username be max 20 characters long' }),
  password: z.string().min(8, { message: 'Password be 8 characters or more' }).max(20, { message: 'Password be max 20 characters long' }),
  confirmPasswd: z.string().min(8, { message: 'Confirm password be 8 characters or more' }).max(20, { message: 'Confirm password be max 20 characters long' })
}).refine(data => data.password === data.confirmPasswd, {
  message: 'Passwords do not match',
  path: ['confirmPasswd']
})

export function validateUser (user) {
  return userScheme.safeParse(user)
}
