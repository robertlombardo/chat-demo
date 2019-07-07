import React      from 'react'
import {
    Container,
    TextField,
    Button,
}                 from '@material-ui/core'
import './style.scss'

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            new_message_input: ''
        }

        this.onNewMessageInputChange = this.onNewMessageInputChange.bind(this)
        this.onSendBtnClick          = this.onSendBtnClick.bind(this)
    }

    onNewMessageInputChange({target}) {
        this.setState({new_message_input: target.value})
    }

    onSendBtnClick() {
        this.props.sendChatMessage(this.state.new_message_input)
        this.setState({new_message_input: ''})
    }

    componentWillMount() {
        document.addEventListener('keydown', ({code}) => {
            if (code === 'Enter') {
                this.onSendBtnClick()
            }
        })
    }

    render() {
        const { new_message_input } = this.state
        const { message_log       } = this.props

        return (
            <div className="app-wrapper">
                <Container maxWidth="lg">
                    <h1 className="app-title">Rob's Razzle Dazzle Chat Demo</h1>
                    <div className="message-log-wrapper">
                        <div className="message-log-scrollable">
                            {
                                message_log.map(entry => {
                                    const { color, time_stamp, display_name, message_body } = entry

                                    return (
                                        <div className="message-log-entry" key={time_stamp} style={{color}}>
                                            <div className="message-sender">{display_name}:</div>
                                            <div className="message-body">{message_body}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="chat-input-row">
                        <TextField
                            id              = "outlined-full-width"
                            label           = "Say something"
                            style           = {{margin: 8}}
                            placeholder     = "..."
                            fullWidth
                            margin          = "normal"
                            variant         = "outlined"
                            InputLabelProps = {{shrink: true}}
                            value           = {new_message_input}
                            onChange        = {this.onNewMessageInputChange}
                        />
                        <Button
                            className = "chat-send-btn"
                            variant   = "contained"
                            color     = "primary"
                            onClick   = {this.onSendBtnClick}
                        >
                            Send
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home
