import { GOT_NEW_CHAT_MESSAGE } from './actions'

export const initial_state = {
    message_log : [
        {user_id: 'app', display_name: 'Rob', message_body: 'Welcome to the demo, baby!', time_stamp: new Date().getTime()}
    ],
}

export default function (state=initial_state, action) {
    switch (action.type) {

        case GOT_NEW_CHAT_MESSAGE: {
            const new_state = {
                ...state,
                message_log: [].concat(state.message_log, [action.message_data]),
            }
        
            return new_state
        }

        default: return state
    }
}
