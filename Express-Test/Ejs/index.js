// function render (templateStr, data) {
//     return templateStr.replace(/<%=([\s\S]*?)%>/g, function(){
//         return data[arguments[1]]
//     })
// }
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
function render (templateStr, obj) {
    let head = 'with(data) {\r\n let str = `'
    let content = templateStr.replace(/<%=([\s\S]*?)%>/g, function(){
                return '${'+arguments[1]+'}'
             })
    content = content.replace(/<%([\s\S]*?)%>/g, function(){
        return '`\r\n' + arguments[1] + '\r\nstr+=`'
    })
    let tail = '`; \r\n return str  \r\n}'
    const fn = new Function('data', head + content + tail)
    return fn(obj)
}
console.log(render(template, {arr: [1,3,4]}).toString())


