/**
 * index controller
 */
export default async (ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  }

  await ctx.render('index', {})
}
