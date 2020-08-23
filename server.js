const express = require('express')
const plantsRouter = require('./plants/plants-router')
const wateringsRouter = require('./waterings/waterings-router')
const server = express()

server.use(express.json())
server.use('/plants', plantsRouter)
server.use('/waterings', wateringsRouter)

server.get('/', (req, res) => {
  res.send({ message: 'api up' })
})

module.exports = server