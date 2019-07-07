import io from 'socket.io-client'
import {
    API_SOCKET_CONNECTED,
    API_SOCKET_ERROR,
    SEND_CHAT_MESSAGE,
    GOT_NEW_CHAT_MESSAGE,
}         from './containers/Home/actions'
import {
    channel,
}         from 'redux-saga'
import {
    put,
    take,
    takeEvery,
    all,
}         from 'redux-saga/effects'

let api_socket
const socket_channel = channel()

function* watchSocketChannel() {
    while (true) {
        const action = yield take(socket_channel)
        yield put(action)
    }
}

function* connectAPISocket() {
    const { protocol, hostname } = window.location

    api_socket = io.connect(`${protocol}//${hostname}:1337`, {
        transports : ['websocket', 'polling'],
        path       : '/api'
    })

    api_socket.on('connected', () => {
        socket_channel.put({type: API_SOCKET_CONNECTED, api_socket})
    })

    api_socket.on('error', api_socket_err => {
        socket_channel.put({type: API_SOCKET_ERROR, api_socket_err})
    })

    api_socket.on('chat_message', message_data => {
        socket_channel.put({type: GOT_NEW_CHAT_MESSAGE, message_data})
    })
}

function* watchSendChatMessage() {
    yield takeEvery(SEND_CHAT_MESSAGE, ({channel, message_body}) => {
        api_socket.emit('publish', {channel, message_body})
    })
}

export default function* rootSaga() {
  yield all([
    watchSocketChannel(),
    connectAPISocket(),
    watchSendChatMessage(),
  ])
}
