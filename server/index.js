const express     = require('express')
const { resolve } = require('path')
const sockets     = require('./sockets')
const setup       = require('./middlewares/frontendMiddleware')

const app = express()

// api entry point
sockets.init(app)

// in production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
})
