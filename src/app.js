import Koa from 'koa'
import path from 'path'
import Router from 'koa-router'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

const app = new Koa()
const router = Router()
const bodyparser = Bodyparser()

const index = require('./routes/index')
const users = require('./routes/users')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))
app.use(require('koa-static')(__dirname + '../public'))

app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.use('/', index.routes(), index.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())

app.use(router.routes(), router.allowedMethods())
// response

app.on('error', (err, ctx) => {
  console.log(err)
})

export default app
