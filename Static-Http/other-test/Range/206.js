const http = require('http')
const fs = require('mz/fs')
const path = require('path')
const server = http.createServer()

const FILE = path.resolve(__dirname, '4.jpg')
const {size:total} = fs.statSync(FILE)
server.on('request', (req, res) => {
    const range = req.headers['range']
    res.setHeader('Content-Type', 'image/jpeg')
    if(range) {
        let [,start,end] = range.match(/(\d*)-(\d*)/)
        start = start ? start*1:0
        end = end ? end-1:total
        console.log(start, end)
        res.statusCode = 206
        res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
        fs.createReadStream(FILE, {start, end:end>total?total:end}).pipe(res)
    } else {
        fs.createReadStream(FILE).pipe(res)
    }
})
server.listen(3001)