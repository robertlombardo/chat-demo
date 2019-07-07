const publish = (io, socket) => {
    return ({channel, message_body}) => {
        const { id, display_name, color } = socket.user

        io.in(channel).emit('chat_message', {
            time_stamp   : new Date().getTime(),
            user_id      : id,
            display_name,
            message_body,
            color,
        })
    }
}
module.exports = publish
