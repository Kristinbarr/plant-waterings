const express = require('express')
const server = express()

server.get('/', (req, res) => {
  res.send({ message: 'api up' })
})

module.exports = server