import { connect }   from 'react-redux'
import { 
    sendChatMessage,
}                    from './actions'
import Home           from './Home'

const mapStateToProps = state => {
    return {...state.home}
}

const mapDispatchToProps = {
    sendChatMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
