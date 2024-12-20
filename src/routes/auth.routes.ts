
import { Hono } from 'hono'
import { AuthController } from '../controllers/auth.controller'

const router = new Hono()

router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)

export default router