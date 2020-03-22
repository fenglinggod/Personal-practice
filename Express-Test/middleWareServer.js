const express = require('./Self-Express/express')
const app = express()
const PORT = 8081

app.use('/', (req, res, next) => {
    console.log(1)
    next()
})
app.use('/sd', (req, res, next) => {
    console.log(req.path)
    next()
})
app.listen(PORT, ()=>{
    console.log(`Server start on ${PORT}`)
})