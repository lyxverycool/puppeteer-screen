const puppeteer = require('puppeteer')
const path = require('path')
const mime = require('mime-types')
import fs from 'fs'

async function getImg(url, width, height,nowait) {
    let tmp = Math.floor(Math.random()* 4);
    let browserWSEndpoint = global.WSE_LIST[tmp];
    const browser = await puppeteer.connect({browserWSEndpoint});
    const page = await browser.newPage()
    let pageUrl=url||'https://www.baidu.com/#/'

    await page.goto(pageUrl)
    await page.setViewport({
			width: width || 1920,
			height: height || 1080
    });
    if(!nowait){
      await page.waitForTimeout(7000) //等待7秒
    }
    if (!fs.existsSync('./screenImgs')) {
      fs.mkdirSync('./screenImgs')
    }
    const timestamp=new Date().getTime()
    const filePath=`./screenImgs/${timestamp}.jpg`
    await page.screenshot({
        path: path.join(filePath),
        type: 'jpeg',
        quality: 100,
    })
    await page.close();
    logger.info(`${pageUrl}截图成功,存储为${timestamp}.jpg`)
    return filePath
}

async function getPdf(url, width, height,nowait) {
  let tmp = Math.floor(Math.random()* 4);
  let browserWSEndpoint = global.WSE_LIST[tmp];
  const browser = await puppeteer.connect({browserWSEndpoint});
  const page = await browser.newPage()
  let pageUrl=url||'https://www.baidu.com/#/'

  await page.goto(pageUrl)
  await page.setViewport({
    width: width || 1920,
    height: height || 1080
  });
  if (!fs.existsSync('./pdfs')) {
    fs.mkdirSync('./pdfs')
  }
  if(!nowait){
    await page.waitForTimeout(7000) //等待7秒
  }
  const timestamp=new Date().getTime()
  const filePath=`./pdfs/${timestamp}.pdf`
  await page.pdf({
    path: path.join(filePath),
    width: width || 1920,
    height: height || 1080
  })
  await page.close();
  logger.info(`${pageUrl}pdf生成成功`)
  return filePath
}

class Screen {
  async GetScreenshots(ctx) {
    try {
      const { url,width,height,nowait } = ctx.request.query
      const filePath=await getImg(url,parseInt(width),parseInt(height),nowait)
      const file = fs.readFileSync(filePath);
      let mimeType = mime.lookup(filePath);
      ctx.set('content-type', mimeType); 
      ctx.body = file; 
    } catch (error) {
      logger.error(error)
      return ctx.sendError(`${error}`)
    }
  }
  async GetScreenFast(ctx) {
    try {
      const { url,width,height } = ctx.request.query
      const filePath=await getImg(url,parseInt(width),parseInt(height),true)
      const file = fs.readFileSync(filePath);
      let mimeType = mime.lookup(filePath);
      ctx.set('content-type', mimeType); 
      ctx.body = file; 
    } catch (error) {
      logger.error(error)
      return ctx.sendError(`${error}`)
    }
  }
  async GetPdf(ctx) {
    try {
      const { url,width,height,nowait } = ctx.request.query
      const filePath=await getPdf(url,parseInt(width),parseInt(height),nowait)
      const file = fs.readFileSync(filePath);
      let mimeType = mime.lookup(filePath);
      ctx.set('content-type', mimeType); 
      ctx.body = file; 
    } catch (error) {
      logger.error(error)
      return ctx.sendError(`${error}`)
    }
  }
}

export default new Screen()
