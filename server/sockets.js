const http      = require('http')
const SocketIO  = require('socket.io')
const Listeners = require('./listeners')

// config
const PORT    = process.env.PORT || 1337
const OPTIONS = {
    origins    : '*:*',
    transports : ['websocket', 'polling'],
    path       : '/api'
}

exports.init = express_app => {
    const server = http.createServer(express_app)
    const io     = SocketIO.listen(server, OPTIONS)

    server.once('listening', () => {
        console.log(`chat server is listening on port: ${PORT}`)
    })
    server.listen(PORT)

    io.sockets.on('connection', socket => {

        socket.on('join',    Listeners.join(io, socket))
        socket.on('publish', Listeners.publish(io, socket))

        socket.on('error', socket_err => console.log({socket_err}))

        socket.join('global')

        const now = new Date().getTime().toString()
        socket.user = {
            id           : now,
            display_name : `user_${now.slice(now.length-4)}`,
            color        : '#' + (Math.random()*0xFFFFFF<<0).toString(16) // assign a random color
        }

        socket.emit('connected')
    })
}
