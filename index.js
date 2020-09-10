require('dotenv').config()

const tracer = require('dd-trace').init()

tracer.init({
  analytics: true,
  profiling: true,
})

// StatsD
var StatsD = require('hot-shots')
var dogstatsd = new StatsD()
dogstatsd.increment('plant-waterings-index')

const server = require('./server')
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`\n*** Listening on port: ${PORT} ***\n`)
})
