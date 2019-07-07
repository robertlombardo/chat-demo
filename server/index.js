const express     = require('express')
const { resolve } = require('path')
const argv        = require('minimist')(process.argv.slice(2))
const sockets     = require('./sockets')
const setup       = require('./middlewares/frontendMiddleware')
const logger      = require('./util//logger')

const app = express()

// api entry point
sockets.init(app)

// in production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host  || process.env.HOST
const host       = customHost || null // let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

const PORT = parseInt(argv.port || process.env.PORT || '3000', 10)

app.listen(PORT, host, err => {
  if (err) {
    return logger.error(err.message)
  }
  logger.appStarted(PORT, prettyHost)
})
