
import { Context } from 'hono'
import { UserService } from '../services/user.service'
import prisma from '../config/database'

export class UserController {
  static async getProfile(c: Context) {
    const { userId } = c.get('jwtPayload')
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true
      }
    })
    return c.json(user)
  }

  static async updateRole(c: Context) {
    const { role: newRole } = await c.req.json()
    const userId = parseInt(c.req.param('id'))
    
    const user = await UserService.updateUserRole(userId, newRole)
    return c.json(user)
  }

  static async getAllUsers(c: Context) {
    const users = await UserService.getAllUsers()
    return c.json(users)
  }
}