const schedule = require("node-schedule");
import File from './file'
const path = require('path')

function deleteImgSchedule() {
  schedule.scheduleJob('0 0 12 * * *', function () {
    const filePath=path.join('./screenImgs')
    File.deleteFolder(filePath)
    logger.info(`删除图片成功！~`)
  });
}

export default deleteImgSchedule