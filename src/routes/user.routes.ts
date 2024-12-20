
import { Hono } from 'hono'
import { UserController } from '../controllers/user.controller'
import { roleGuard } from '../middleware/auth.middleware'

const router = new Hono()

router.get('/me', UserController.getProfile)
router.get('/all', roleGuard(['ADMIN']), UserController.getAllUsers)
router.patch('/:id/role', roleGuard(['ADMIN']), UserController.updateRole)

export default router