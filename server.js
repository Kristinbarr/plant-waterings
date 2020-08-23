const express = require('express')
const plantsRouter = require('./plants/plants-router')
const server = express()

server.use(express.json())
server.use(plantsRouter) 

server.get('/', (req, res) => {
  res.send({ message: 'api up' })
})

module.exports = server