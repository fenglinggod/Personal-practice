let response = {
    _body: undefined,
    get body(){
        return this._body
    },

    set body(v){
        this._body = v
        this.statusCode(200)
    },

    set(key, val){
        this.res.setHeader(key, val)
    },

    statusCode(val){
        this.res.statusCode = val
    }
}
module.exports = response