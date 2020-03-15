const http = require('http')
const fs = require('mz/fs')
const url = require('url')
const chalk = require('chalk')
const path = require('path')
const ejs = require('ejs')
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
                this.sendFile(req, res, absPath)
            }
        } catch (e) {
            console.log(e)
            this.sendError(req, res, absPath)
        }
    }

    sendFile(req, res, absPath) {
        res.setHeader('Content-Type', `${mime.getType(absPath)};charset=utf8`)
        fs.createReadStream(absPath).pipe(res)
    }

    sendError(req, res) {
        res.statusCode = 404
        res.end('Not Found')
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