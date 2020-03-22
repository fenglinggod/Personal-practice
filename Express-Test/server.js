const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
// let str = ejs.render(template,{name: 'xxx'})
// console.log(str)
const PORT = 8081;
app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}))
app.use(cookieParser('secret'))
app.get('/read', function(req, res) {
    console.log(req.session.a)
    res.send(req.cookies)
})
app.get('/write', function(req, res) {
    res.cookie('name', 'xxx', {signed: true})
    req.session.a = 'hello'
    res.send('ok')
})

// console.log(unescape('s%3Axxx.MT3PTffBZOmeB%2BeQ1wrfLTY4eW3SWUWo0whNfFSDTFM'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())
// app.post('/test', (req, res) => {
//     console.log(req.body)
// })

// app.use(express.static(__dirname))

// app.engine('.html', require('ejs').__express)
// app.set('view engine', '.html')
// app.set('views', 'page')
// app.get('/', (req, res) => {
//     res.render('index', {arr: [1,2,32]})
// })

// app.use(function(req,res,next){
//     next('xxxx')
// })

// app.get('/abb', (req,res) => {
//     console.log(req.path)
//     res.sendFile('./package.json', {root: __dirname})
// })
// app.get('/p/:id/:name', (req, res)=> {
//     console.log(req.params)
//     console.log(req.query)
// })
// app.all('*', (req,res) => {
//     res.send('all *')
// })

// app.use(function(err,req,res,next){
//     console.log(err)
//     res.end('errroror')
// })
app.listen(PORT, () => {
    console.log(`server start on ${PORT}`)
})

// multer