let ctx = {

}

function defineGetter(property, key) {
    ctx.__defineGetter__(key, function(){
        return this[property][key]
    })
}

function defineSetter(property, key){
    ctx.__defineSetter__(key, function(v){
        this[property][key] = v
    })
}

defineGetter('request', 'method')
defineGetter('request', 'path')
defineGetter('response', 'set')
defineSetter('response', 'body')
defineGetter('response', 'body')
defineGetter('response', 'statusCode')

module.exports = ctx