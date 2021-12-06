const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const app = new Koa()
import cors from './utils/corsMiddleware'
import routers from './routers/index'
import Logger from './utils/logger'
import sendMiddleware from './utils/sendMiddleware'
import deleteImgSchedule from './utils/deleteImg'
import initBrower from './utils/initBrower'
// error handler
onerror(app)

//logger
global.logger = Logger(process.env.LOG_DIR, process.env.NODE_ENV == 'development')

// middlewares
app.use(cors())
app.use(sendMiddleware())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(historyApiFallback({ whiteList: ['/api'] }))
// app.use(require('koa-static')('./logs'))

//多个路由
app.use(require('koa-static-router')([
  {
  dir:'screenImgs',    
  router:'/screenImgs/'   //路由命名   路由长度 =2
},{
  dir:'logs',   //静态资源目录对于相对入口文件index.js的路径
  router:'/logs/'    //路由命名  路由长度 =2
}
]))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// apiTime
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//定时任务
deleteImgSchedule()

initBrower()

// routes
routers(app)

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
});

module.exports = app
