'use strict'

const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
const util = require('util')

const server = http.createServer((req, res) => {
    try {
        if (req.method !== 'POST') {
            throw {status: '404', why: `method: ${req.method} not found`}
        }
        if (req.url !== '/upload') {
            throw {status: '404', why: `url: ${req.url} not found`}
        }
        let form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, file) {
            res.writeHead(200, {'content-type': 'text/plain'})
            let f = file['dist.tar.xz'].path// + 'dist.tar.xz'
            let i = fs.readFileSync(f)
            console.log(fields.path)
            let w = fs.writeFileSync(`../${fields.path}`, i)
            return
        })
        console.log(`[LOG]: ${req.method}:  ${req.url} `)
        res.end('OK\n')
    } catch (err) {
        console.log('error')
        console.log(err)
        console.log('error')
        res.statusCode = err.status || 500
        res.end(`Error: ${JSON.stringify(err)}\n`)
    }
})

const port = process.env.PORT || 9595
const hostname = '0.0.0.0'
server.listen(port, hostname, () => {
})
