
import { hash, compare } from 'bcryptjs'
import prisma from '../config/database'
import { SALT_ROUNDS } from '../config/constants'
import { Role } from '@prisma/client'

export class UserService {
  static async createUser(username: string, password: string) {
    const hashedPassword = await hash(password, SALT_ROUNDS)
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      }
    })
  }

  static async validateUser(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    
    if (!user) return null
    
    const validPassword = await compare(password, user.password)
    if (!validPassword) return null
    
    return user
  }

  static async updateUserRole(userId: number, role: Role) {
    return await prisma.user.update({
      where: { id: userId },
      data: { role }
    })
  }

  static async initializeAdmin() {
    const admin = await prisma.user.findUnique({
      where: { username: 'admin' }
    })
    
    if (!admin) {
      const hashedPassword = await hash('admin', SALT_ROUNDS)
      await prisma.user.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          role: Role.ADMIN
        }
      })
    }
  }

  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true
      }
    })
  }
}