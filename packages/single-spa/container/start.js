const express = require('express')
const kolorist = require('kolorist')
const path = require('node:path')
const app = express()
const port = 10800

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/app1', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/app2', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/app3', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.listen(port, () => {
  const url = `http://localhost:${port}`
  console.log(kolorist.lightCyan(`Example app listening at ${url}`))
})
