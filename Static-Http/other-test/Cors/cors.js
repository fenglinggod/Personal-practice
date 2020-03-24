const http = require('http')
const fs = require('mz/fs')
const url = require('url')
const path = require('path')
const mime = require('mime')

const server = http.createServer()
server.on('request', async (req, res) => {
    const {pathname} = url.parse(req.url)

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Max-Age', 10)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token')
    res.setHeader("Access-Control-Expose-Headers","Content-Disposition");
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(req.method === 'OPTIONS') {
        return res.end()
    }

    if(pathname === '/test') {
        return res.end(JSON.stringify({test: 'mytest'}))
    }

    if(pathname === '/download') {
        res.setHeader('Content-Disposition', 'attachment;filename=abc.mp4')
        res.setHeader('Content-Type', "video/mpeg4")
        fs.createReadStream(path.join(__dirname, './abc.mp4')).pipe(res)
        return
    }

    const absPath = path.join(__dirname, pathname)
    try{
        const stat = await fs.stat(absPath)
        
        res.statusCode = 200
        res.setHeader('Content-Type', mime.getType(absPath)+";charset=utf8")
        console.log(stat.isDirectory())
        if(stat.isDirectory()) {
            res.end('dir')
        } else {
            fs.createReadStream(absPath).pipe(res)
        }
    } catch(e) {
        res.statusCode = 404
        res.end('null')
    }
})
server.listen(4000)