const Koa = require('koa')
const fs = require('fs')
const koa = new Koa()
// koa.use(async (ctx) => {
//     console.log(ctx.request.method)

//     ctx.set('Content-Type', 'application/x-javascript')
//     ctx.body = fs.createReadStream('./Koa-Test/test.js')
// })
koa.use((ctx, next)=> {
    console.log(1)
    next()
    console.log(2)
})
koa.use((ctx, next)=> {
    console.log(3)
    next()
    console.log(4)
})
koa.listen(8081)