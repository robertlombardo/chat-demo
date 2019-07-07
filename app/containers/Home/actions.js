const API_SOCKET_CONNECTED = 'API_SOCKET_CONNECTED'
const API_SOCKET_ERROR     = 'API_SOCKET_ERROR'
const SEND_CHAT_MESSAGE    = 'SEND_CHAT_MESSAGE'
const GOT_NEW_CHAT_MESSAGE  = 'GOT_NEW_CHAT_MESSAGE'

export {
    API_SOCKET_CONNECTED,
    API_SOCKET_ERROR,
    SEND_CHAT_MESSAGE,
    GOT_NEW_CHAT_MESSAGE,
}

export function sendChatMessage(message_body) {
    return {
        type: SEND_CHAT_MESSAGE,
        channel: 'global',
        message_body,
    }
}