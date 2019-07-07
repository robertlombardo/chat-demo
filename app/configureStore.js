import {
    createStore,
    applyMiddleware,
    compose,
}                           from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer        from './reducers'
import rootSaga             from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState={}) {
    const store = createStore(
        createReducer(),
        initialState,
        compose(applyMiddleware(sagaMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}
