'use strict'
import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx) => {
  let title = 'server of iform-sceenshots'
  await ctx.render('index', { title })
})

export default router
