import Router from 'koa-router'

const router = Router()

router.get('/', (ctx, next) => {
  ctx.body = 'this a users response!'
})

export default router
