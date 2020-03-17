const zlib = require('zlib')
const fs = require('mz/fs')
const path = require('path')
const gzip = zlib.createGzip() // 转化流

fs.createReadStream(path.join(__dirname, '../Range/4.jpg')).pipe(gzip).pipe(fs.createWriteStream(path.join(__dirname, './4.gz')))
// gzip无法压缩图片(无法缩小文件)

