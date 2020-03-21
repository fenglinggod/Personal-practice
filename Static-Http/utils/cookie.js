// cookie可选options
// domain
// path
// max-age
// expires
// httpOnly
const querystring = require('querystring')
const crypto = require('crypto')
let secret = 'self-secret'
const getSHA = (data) => {
    return crypto.createHmac('sha256', secret).update(data).digest('base64').replace(/\+|\//g, '')
}
let c_arr = []
const setCookie = (k, v, options={}) => {
    const c_item = []
    if(k && v) {
        c_item.push(`${k}=${v}.${getSHA(v)}`)
        if(options.domain) {
            c_item.push(`domain=${options.domain}`)
        }
        if(options.path) {
            c_item.push(`path=${options.path}`)
        }
        if(options.maxAge) {
            c_item.push(`max-age=${options.maxAge}`)
        }
        if(options.expires) {
            c_item.push(`expires=${options.expires}`)
        }
        if(options.httpOnly) {
            c_item.push(`httpOnly=${options.httpOnly}`)
        }

        c_arr.push(c_item.join('; '))
    } 
}

const getCookie = () => {
    const r = [...c_arr]
    c_arr = []
    return r
}

const getCookieFromHeader = (cookies) => {
    let q = querystring.parse(cookies, '; ') || {}
    let r = {}
    Object.entries(q).forEach(([k,v])=>{
        const [cv, rv] = v.split('.')
        if(getSHA(cv) === rv) {
            r[k] = cv
        }
    })
    return r
}

module.exports = {
    cookies: getCookie,
    setCookie,
    getCookie: getCookieFromHeader
}