
import { Hono } from 'hono'
import { LogController } from '../controllers/log.controller'
import { roleGuard } from '../middleware/auth.middleware'

const router = new Hono()

const allowedRoles = ['ADMIN', 'SECURITY_ANALYST', 'INCIDENT_RESPONDER']

router.get('/', roleGuard(allowedRoles), LogController.getLogs)
router.get('/stats', roleGuard(allowedRoles), LogController.getLogStats)

export default router