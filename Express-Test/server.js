const express = require('./Self-Express')
const app = express()
const PORT = 8081;

app.get('/', (req,res) => {
    res.end('get /')
})
app.get('/p/:id/:name', (req, res)=> {
    console.log(req.params)
    console.log(req.query)
})
app.post('/', (req,res) => {
    res.end('get /')
})
app.all('/', (req,res) => {
    res.end('all /')
})
app.all('*', (req,res) => {
    res.end('all *')
})
app.listen(PORT, () => {
    console.log(`server start on ${PORT}`)
})
