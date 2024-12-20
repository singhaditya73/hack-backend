import { Context } from 'hono'
import * as jsonwebtoken from 'jsonwebtoken'
import { UserService } from '../services/user.service'
import { LogService } from '../services/log.service'
import { JWT_SECRET } from '../config/constants'

export class AuthController {
  static async signup(c: Context) {
    const { username, password } = await c.req.json()
    
    try {
      const user = await UserService.createUser(username, password)
      await LogService.createLog({
        userId: user.id,
        action: 'signup',
        details: 'User registration',
        status: true,
        ipAddress: c.req.header('x-forwarded-for'),
        userAgent: c.req.header('user-agent')
      })
      
      const token = jsonwebtoken.sign(
        { userId: user.id, role: user.role }, 
        JWT_SECRET,
        { expiresIn: '24h' }
      )
      return c.json({ token })
    } catch (error) {
      await LogService.createLog({
        action: 'signup',
        details: 'Failed registration attempt',
        status: false,
        ipAddress: c.req.header('x-forwarded-for'),
        userAgent: c.req.header('user-agent')
      })
      return c.json({ error: 'Username already exists' }, 400)
    }
  }

  static async login(c: Context) {
    const { username, password } = await c.req.json()
    
    const user = await UserService.validateUser(username, password)
    
    if (!user) {
      await LogService.createLog({
        action: 'login',
        details: 'Failed login attempt',
        status: false,
        ipAddress: c.req.header('x-forwarded-for'),
        userAgent: c.req.header('user-agent')
      })
      return c.json({ error: 'Invalid credentials' }, 401)
    }
    
    await LogService.createLog({
      userId: user.id,
      action: 'login',
      details: 'Successful login',
      status: true,
      ipAddress: c.req.header('x-forwarded-for'),
      userAgent: c.req.header('user-agent')
    })
    
    const token = jsonwebtoken.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    return c.json({ token, role: user.role })
  }
}