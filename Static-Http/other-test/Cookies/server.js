const http = require('http')
const Url = require('url')
const cookieUtil = require('../../utils/cookie')

const server = http.createServer()
server.on('request', (req, res) => {
    const {url} = req
    if(url === '/favicon.ico') return res.end();
    const {query, pathname} = Url.parse(url, true)
    console.log(cookieUtil.getCookie(req.headers['cookie']))

    if(pathname === '/setCookie') {
        Object.entries(query).forEach(([k,v])=>{
            cookieUtil.setCookie(k,v,{maxAge: 100, path: '/'})
        })
        res.setHeader('Set-Cookie', cookieUtil.cookies())
    }
    res.end();
})
server.listen(8082)