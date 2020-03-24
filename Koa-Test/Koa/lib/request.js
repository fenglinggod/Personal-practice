const url = require('url')
let request = {
    get method() {
        return this.req.method
    },

    get path(){
        return url.path(this.req.url).pathname
    }
}
module.exports = request