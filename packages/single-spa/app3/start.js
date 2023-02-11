const express = require('express')
const kolorist = require('kolorist')
const path = require('node:path')
const app = express()
const port = 10803

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.use('/assets', express.static(path.resolve(__dirname + '/assets')))

app.listen(port, () => {
  const url = `http://localhost:${port}`
  console.log(kolorist.lightCyan(`Example app listening at ${url}`))
})
