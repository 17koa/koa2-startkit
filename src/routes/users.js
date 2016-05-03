import Router from 'koa-router'
import usersCtrl from '../controllers/usersCtrl'

const router = Router()

router.get('/', usersCtrl)

export default router
