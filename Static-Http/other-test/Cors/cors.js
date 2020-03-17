const http = require('http')
const fs = require('mz/fs')
const url = require('url')
const path = require('path')
const mime = require('mime')

const server = http.createServer()
server.on('request', async (req, res) => {
    const {pathname} = url.parse(req.url)

    if(pathname === '/test') {
        return res.end(JSON.stringify({test: 'mytest'}))
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
server.listen(3000)