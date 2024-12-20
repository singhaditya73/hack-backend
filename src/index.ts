
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authMiddleware } from './middleware/auth.middleware'
import { auditMiddleware } from './middleware/audit.middleware'
import { UserService } from './services/user.service'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import logRoutes from './routes/log.routes'

const app = new Hono()
UserService.initializeAdmin()
app.use(cors())
app.use('*', auditMiddleware)
app.use('/api/*', authMiddleware)
app.route('/', authRoutes)
app.route('/api/users', userRoutes)
app.route('/api/logs', logRoutes)

export default app