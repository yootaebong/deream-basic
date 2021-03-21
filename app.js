const express = require(`express`)
const app = express()
const path = require('path')
const fs = require('fs')
const router = express.Router()

global.webRootPath = path.join(__dirname + '/front')
global.backRootPath = path.join(__dirname + '/back')

// 메인페이지
router.get('/', (req, res) => {
    fs.readFile(global.webRootPath + '/index.html', (error, data) => {
        res.end(data)
    })
})

// 프론트 
app.use('/css', express.static(global.webRootPath + '/css'))
app.use('/img', express.static(global.webRootPath + '/res/img'))
app.use('/font', express.static(global.webRootPath + '/res/font'))
app.use('/js', express.static(global.webRootPath + '/js'))
app.use('/', router)

// 백
app.use('/data', express.static(global.backRootPath + '/res/data') )

app.listen(8200)
console.log(global.webRootPath)