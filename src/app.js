const Koa = require('koa')
const app = new Koa()
const path = require('path')
const router = require('koa-router')()
const views = require('koa-views')
// const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(require('koa-static')(path.join(__dirname, '../public'))))

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
