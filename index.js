require('dotenv').config()

const tracer = require('dd-trace').init()

tracer.init({
  analytics: true,
  profiling: true,
})

// tracer.use('pg', {
//   analytics: true
// })

// StatsD
var StatsD = require('hot-shots')
var dogstatsd = new StatsD()
dogstatsd.increment('plant-waterings-index')
dogstatsd.histogram('my_histogram', 42)

const server = require('./server')
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`\n*** Listening on port: ${PORT} ***\n`)
})
