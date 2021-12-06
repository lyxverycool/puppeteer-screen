'use strict'

import Screen from '../controller/screen'
import Router from 'koa-router'

const API_PATH = process.env.API_PATH
const router = new Router({
  prefix: `/${API_PATH}`
})

router.get('/getScreenshots', Screen.GetScreenshots)

export default router
