
import { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { JWT_SECRET } from '../config/constants'

export const authMiddleware = jwt({
  secret: JWT_SECRET
})

export const roleGuard = (allowedRoles: string[]) => {
  return async (c: Context, next: Next) => {
    const { role } = c.get('jwtPayload')
    
    if (!allowedRoles.includes(role)) {
      return c.json({ error: 'Unauthorized' }, 403)
    }
    
    await next()
  }
}