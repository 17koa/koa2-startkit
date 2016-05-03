import Koa from 'koa'
import path from 'path'
import Router from 'koa-router'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'

const app = new Koa()
const router = Router()
const bodyparser = Bodyparser()

const index = require('./routes/index')
const users = require('./routes/users')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
})))

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// 500 error
koaOnError(app, {
  template: 'views/500.ejs'
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.use('/', index.routes(), index.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())

// response
app.use(router.routes(), router.allowedMethods())

// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

export default app
