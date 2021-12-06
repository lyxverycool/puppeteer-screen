const puppeteer = require('puppeteer')
const path = require('path')
const mime = require('mime-types')
import fs from 'fs'

async function getImg(url, width, height,nowait) {
    let tmp = Math.floor(Math.random()* 4);
    let browserWSEndpoint = global.WSE_LIST[tmp];
    const browser = await puppeteer.connect({browserWSEndpoint});
    // const browser = await puppeteer.launch({
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //     defaultViewport: {
    //         width:width || 1920,
    //         height:height || 1080,
    //     }
    // })
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
    //await browser.close()
    logger.info(`${pageUrl}截图成功`)
    return filePath
}

class Screen {
  async GetScreenshots(ctx) {
    try {
      const { url,width,height,nowait } = ctx.request.query
      const filePath=await getImg(url,parseInt(width),parseInt(height),nowait)
      // const data={url:"/screenImgs/template.jpg"}
      // const msg= "获取截图成功!"
      //  return ctx.send(data,msg);
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
