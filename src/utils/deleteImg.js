const schedule = require("node-schedule");
import File from './file'
const path = require('path')

function deleteImgSchedule() {
  schedule.scheduleJob('0 0 0 * * *', function () {
    const filePath=path.join('./screenImgs')
    const pdfPath=path.join('./pdfs')
    File.deleteFolder(filePath)
    File.deleteFolder(pdfPath)
    logger.info(`删除成功！~`)
  });
}

export default deleteImgSchedule