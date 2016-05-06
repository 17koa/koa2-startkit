export default async (ctx, next) => {
  const title = 'koa2 title'

  await ctx.render('index', {
    title
  })
}
