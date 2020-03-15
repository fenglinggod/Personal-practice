#! /usr/bin/env node

let config = {
    port: 3000,
    host: 'localhost',
    dir: process.cwd() // 获取启动路径
}

const commander = require('commander');
const package = require('../package.json');

commander.version(package.version)
    .usage('p-http-server [options]')
    .option('-p, --port <n>', 'set server port')
    .option('-o, --host <n>', 'set server host')
    .option('-d, --dir <n>', 'set server directory')
    .on('--help', function(){
        console.log('Example:')
        console.log('  $ p-http-server --port --host')
    })
    .parse(process.argv)
config = {...config, ...commander}

const Server = require('../server.js')
const server = new Server(config)
server.start()