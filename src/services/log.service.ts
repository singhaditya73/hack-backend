
import prisma from '../config/database'

interface LogData {
  userId?: number;
  action: string;
  details: string;
  status: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export class LogService {
  static async createLog(data: LogData) {
    try {
      return await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          details: data.details,
          status: data.status,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        }
      })
    } catch (error) {
      console.error('Failed to create audit log:', error)
    }
  }

  static async getLogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: {
          timestamp: 'desc'
        },
        include: {
          user: {
            select: {
              username: true,
              role: true
            }
          }
        }
      }),
      prisma.auditLog.count()
    ])

    return {
      logs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    }
  }

  static async getLogStats() {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const [totalLogs, recentLogs, failedAttempts, successfulLogins] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.count({
        where: {
          timestamp: {
            gte: twentyFourHoursAgo
          }
        }
      }),
      prisma.auditLog.count({
        where: {
          status: false
        }
      }),
      prisma.auditLog.count({
        where: {
          action: 'login',
          status: true
        }
      })
    ])

    return {
      totalLogs,
      recentLogs,
      failedAttempts,
      successfulLogins
    }
  }
}
