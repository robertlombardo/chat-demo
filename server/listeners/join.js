const join = (io, socket) => {
    return ({channel}) => {
        socket.join(channel)

        io.in(channel).emit('joined', {
            // username
            // numInChannel
        })
    }
}
module.exports = join
