// POST validation
import z from 'zod'

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(3).max(24),
  surname: z.string({
    required_error: 'Username is required'
  }).min(3).max(24),
  phone: z.string().min(3).max(24).regex(/^[0-9]{10}$/),
  email: z.string({
    required_error: 'Email is required'
  }).min(3).max(24).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string({
    required_error: 'Password is required'
  }).min(6).max(24).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
})

export function validateUser (user) {
  return userSchema.safeParse(user)
}
