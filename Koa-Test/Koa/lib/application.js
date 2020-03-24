const Emitter = require('events')
const http = require('http')
const context = require('./context')
const response = require('./response')
const request = require('./request')
const Stream = require('stream')
module.exports = class Application extends Emitter{

    constructor() {
        super()
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(fn) {
        this.fn = fn
    }

    createContext(req, res){
        const ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = ctx.response.req = req
        ctx.res = ctx.response.res = ctx.request.res = res
        return ctx
    }

    handleRequest(req, res){
        const ctx = this.createContext(req, res)
        ctx.statusCode(404)
        this.fn(ctx)

        let body = ctx.body
        console.log(body)
        if(body instanceof Stream) {
            body.pipe(res)
        } else if(typeof body === 'object') {
            ctx.set('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
        } else if(typeof body === 'string' || Buffer.isBuffer(body)){
            res.end(ctx.body)
        } else {
            res.end('Not Found')
        }
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}