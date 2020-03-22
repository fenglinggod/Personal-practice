function bodyParser() {

}

bodyParser.json = function(){
    return function(req,res,next) {
        if(req.headers['content-type'] === 'application/json') {
            const arr = []
            req.on('data', function(d){
                arr.push(d)
            })
            req.on('end', function(){
                req.body = JSON.parse(Buffer.concat(arr).toString())
                next()
            })
        } else {
            next()
        }
    }
}
bodyParser.urlencoded = function(){
    return function(req,res,next) {
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            const arr = []
            req.on('data', function(d){
                arr.push(d)
            })
            req.on('end', function(){
                req.body = require('querystring').parse(Buffer.concat(arr).toString())
                next()
            })
        } else {
            next()
        }
    }
}

module.exports = bodyParser