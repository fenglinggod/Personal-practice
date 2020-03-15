const http = require('http')

let start = 0;
let mode = 'start'

const fs = require('mz/fs');
const ws = fs.createWriteStream('5.jpg')
const downLoad = () => {
    http.get({
        hostname: 'localhost',
        port: 3001,
        headers: {
            Range: `bytes=${start}-${start+1024}`
        }
    }, (res)=>{
        const total = res.headers['content-range'].split('/')[1]
        res.on('data', (chunk) => {
            ws.write(chunk)
            start += 1024
            if(start <= total) {
                mode === 'start' && downLoad()
            } else {
                ws.end()
            }
        })
    })
}

process.stdin.on('data', (data) => {
    if(data.toString().includes('pause')) {
        mode = 'pause'
    } else {
        mode = 'start'
        downLoad()
    }
})

downLoad()
