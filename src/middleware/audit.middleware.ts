
import { Context, Next } from 'hono'
import { LogService } from '../services/log.service'

export const auditMiddleware = async (c: Context, next: Next) => {
  const start = Date.now()
  
  try {
    await next()
  } finally {
    const duration = Date.now() - start
    const jwtPayload = c.get('jwtPayload')
    
    await LogService.createLog({
      userId: jwtPayload?.userId,
      action: `${c.req.method} ${c.req.path}`,
      details: `Request processed in ${duration}ms`,
      status: c.res.status < 400,
      ipAddress: c.req.header('x-forwarded-for') || 'unknown',
      userAgent: c.req.header('user-agent')
    })
  }
}