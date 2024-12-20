
import { Context } from 'hono'
import { LogService } from '../services/log.service'

export class LogController {
  static async getLogs(c: Context) {
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    
    const result = await LogService.getLogs(page, limit)
    return c.json(result)
  }

  static async getLogStats(c: Context) {
    const stats = await LogService.getLogStats()
    return c.json(stats)
  }
}