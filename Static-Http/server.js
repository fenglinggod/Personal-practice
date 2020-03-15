const http = require('http')
const fs = require('mz/fs')
const url = require('url')
const chalk = require('chalk')
const path = require('path')
const ejs = require('ejs')
const crypto = require('crypto')
const mime = require('mime')
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')
class Server {
    constructor(config){
        this.port = config.port
        this.host = config.host
        this.dir = config.dir
        this.template = template
    }

    async handleRequest(req, res) {
        // 目录 || 文件
        // 文件 --》 展示
        // 目录 --》 列出目录列表
        const {pathname} = url.parse(req.url)
        const absPath = path.join(this.dir, decodeURIComponent(pathname))
        try {
            const stat = await fs.stat(absPath)
            if(stat.isDirectory()){
                const dirs = await fs.readdir(absPath);
                const hrefs = dirs.map(d=>({href: path.join(pathname, d), dir: d}))
                const str = ejs.render(this.template, {arr: hrefs})
                res.setHeader('Content-Type', "text/html;charset=utf8")
                res.end(str)
            } else {
                this.sendFile(req, res, stat, absPath)
            }
        } catch (e) {
            console.error(e)
            this.sendError(req, res, absPath)
        }
    }

    sendFile(req, res, stat, absPath) {
        res.setHeader('Content-Type', `${mime.getType(absPath)};charset=utf8`)
        if(this.readCatch(req, res, stat)) {
            res.statusCode = 304;
            return res.end();
        }

        fs.createReadStream(absPath).pipe(res)
        // const rs = fs.createReadStream(absPath)
        // const md5 = crypto.createHash('md5')
        // const arr = []
        // rs.on('data', (chunk)=>{
        //     md5.update(chunk)
        //     arr.push(chunk)
        // })
        // rs.on('end', ()=>{
        //     const serverTag = md5.digest('base64')
        //     const clentTag = req.headers['if-none-match']
        //     if(serverTag === clentTag){
        //         res.statusCode = 304;
        //         res.end()
        //         return;
        //     }
        //     res.setHeader('ETag', serverTag)
        //     res.end(Buffer.concat(arr))
        // })
    }

    sendError(req, res) {
        res.statusCode = 404
        res.end('Not Found')
    }

    readCatch(req, res, stat) {
        const modifiedSince = req.headers['if-modified-since']
        const lastModified = stat.ctime.toGMTString()
        const noneMatch = req.headers['if-none-match']
        const etag = stat.size+''

        res.setHeader('Catch-Control', 'max-age=5')
        res.setHeader('Last-Modified', lastModified)
        res.setHeader('ETag', etag)

        if(lastModified !== modifiedSince) {
            return false
        }
        if(noneMatch !== etag) {
            return false
        }
        return true
    }

    start(){
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, this.host, ()=>{
            console.log(chalk.yellow(`Staring up http-server, serving ${this.dir}\r\nAvailable on\r\n`))
            console.log(chalk.green(`  http://${this.host}:${this.port}`))
        })
    }
}
module.exports = Server

// tips
// node使用http的请求头取值时要全部小写，当设置请求头时则要大写首字母 