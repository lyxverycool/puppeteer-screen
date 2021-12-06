import fs from 'fs'
import superagent from 'superagent'

class File {
  mkdir(dirname) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dirname)) {
        reject('文件夹已经存在')
      } else {
        fs.mkdirSync(dirname)
        resolve(console.log(`${dirname}文件夹已建立`))
      }
    })
  }

  writeFile(filename, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(console.log(`写入完成 ---- ${filename}`))
      })
    })
  }

  readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
  downLoadImgs(imgs) {
    return new Promise((resovle, reject) => {
      imgs.forEach((imgUrl, index) => {
        // 获取图片名
        let imgName = imgUrl.split('/').pop()
        const path = './img'
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path)
        }
        // 下载图片存放到指定目录
        let stream = fs.createWriteStream(`./img/${imgName}`)
        let req = superagent.get(imgUrl)
        req.pipe(stream)
        console.log(`开始下载图片 ${imgUrl} --> ./img/${imgName}`)
      })
      resovle('下载完成！')
    })
  }
  // 删除指定文件夹的图片
 deleteFolder(path) {
  var files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
    } 
  }
}
}
export default new File()
