require('dotenv').config()

const tracer = require('dd-trace').init()

tracer.init({
  analytics: true,
  profiling: true,
})

tracer.use('pg', {
  analytics: true
})

const server = require('./server')
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`\n*** Listening on port: ${PORT} ***\n`)
})
