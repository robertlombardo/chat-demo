import {
    API_SOCKET_CONNECTED,
    GOT_NEW_CHAT_MESSAGE,
} from './actions'

export const initial_state = {
    api_socket  : undefined,
    user        : {
        id           : undefined,
        display_name : '???'
    },
    message_log : [
        {user_id: 'app', display_name: 'Rob', message_body: 'Welcome to the demo, baby!', time_stamp: new Date().getTime()}
    ],
}

function appReducer(state=initial_state, action) {
    switch (action.type) {

        case API_SOCKET_CONNECTED: {
            const new_state = {
                ...state,
                api_socket: action.api_socket
            }

            return new_state
        }

        case GOT_NEW_CHAT_MESSAGE: {
            const new_state = {
                ...state,
                message_log: [].concat(state.message_log, [action.message_data])
            }
        
            return new_state
        }

        default: return state
    }
}

export default appReducer
