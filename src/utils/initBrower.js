const puppeteer = require('puppeteer')

function init(){
  const MAX_WSE = 4;  //启动几个浏览器 
  global.WSE_LIST = []; //存储browserWSEndpoint列表
  (async () => {
    for(var i=0;i<MAX_WSE;i++){
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      const browserWSEndpoint = await browser.wsEndpoint();
      logger.info(browserWSEndpoint)
      global.WSE_LIST[i] = browserWSEndpoint;
    }
    logger.info(`浏览器全部启动完成`)
  })();	
}

export default init