'use strict'
import Router from 'koa-router'

const fs = require('fs')
const { resolve }  = require('path')
const router = new Router()

const getFiles = async (src) => {
  let files=[]
  try {
    files = fs.readdirSync(resolve(process.cwd(), src))
  } catch (error) {
    
  }
	return files
}

router.get('/', async (ctx) => {
  const title = '表单归档截屏服务,每天晚上12点清空截图文件'
  const API_PATH="api"
  const host=process.env.NODE_ENV == 'development'?'':'/screen'
  const apis= [
    {
      path: "接口路径",
      detail: "接口功能",
      method: "接口方式",
      params: "接口参数"
    },
    {
      path: `/${API_PATH}/getScreenshots`,
      detail: "浏览器截图,默认等待七秒",
      method: "GET",
      params: "url, width, height,nowait"
    },
    {
      path: `/${API_PATH}/getScreenfast`,
      detail: "浏览器快速截图",
      method: "GET",
      params: "url, width, height"
    },
    {
      path: `/${API_PATH}/getPdf`,
      detail: "浏览器截屏为pdf，默认等待七秒",
      method: "GET",
      params: "url, width, height,nowait"
    },
    {
      path: `/logs/log.log`,
      detail: "日志",
      method: "GET",
      params: "/"
    },
  ]
  const imgs = await getFiles('screenImgs') 
  const pdfs = await getFiles('pdfs')
  await ctx.render('index', { host,title,apis,imgs,pdfs})
})

export default router
