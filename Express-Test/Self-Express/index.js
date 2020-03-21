const http = require('http')
const methods = require('methods')
const Url = require('url')

// path-to-regexp
const application = () => {
    let app = (req, res) => {
        const method = req.method.toLowerCase()
        const {pathname} = Url.parse(req.url)

        for(let i=0; i< app.routes.length; i++) {
            const _route = app.routes[i]
            if(_route.method === method || _route.method === 'all') {
                if(_route.path && _route.path instanceof RegExp) {
                    if(_route.path.test(pathname)) {
                        const [, ...r] = pathname.match(_route.path)
                        let params = _route.path.params.reduce((m,c,index)=>(m[c]=r[index], m), {})
                        req.params = params
                        _route.callback(req, res)
                        return
                    }
                }
                if(pathname === _route.path || _route.path === '*') {
                    _route.callback(req, res)
                    return
                } 
            }
        }
        res.end(`Cannot ${method} ${pathname}`)
    }
    app.routes = [];
    ([...methods, 'all']).forEach(method => {
        app[method] = (path, callback) => {
            if(path.includes(':')) {
                let params = []
                let re = new RegExp(path.replace(/:([^\/]+)/g, function(){
                    params.push(arguments[1])
                    return '([^\/]+)'
                }))
                
                path = re
                path.params = params
            }
            const route = {
                method,
                path,
                callback
            }
            app.routes.push(route)
        }
    });
    app.listen = (...args) => {
        http.createServer(app).listen(...args)
    }
    return app
}
module.exports = application

// /dssd/:id/:name
// /:([^\/]+)/g
// let s = '/dssd/:id/:name'
// let c = '/dssd/1/2'
// let a = []
// let regS = s.replace(/:([^\/]+)/g, function(){
//     console.log(arguments)
//     a.push(arguments[1])
//     return '([^\/]+)'
// })
// let reg = new RegExp(regS)
// let [, ...rest] = c.match(reg)
// console.log(rest)
// let p = a.reduce((m,c,i)=>{
//     m[c]=rest[i]
//     return m
// },{})
// console.log(p)