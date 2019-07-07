import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
}                           from 'redux'
import createSagaMiddleware from 'redux-saga'
import HomeReducer          from 'containers/Home/reducer'
import rootSaga             from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState={}) {
    const store = createStore(
        combineReducers({
            home: HomeReducer,
        }),
        initialState,
        compose(applyMiddleware(sagaMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}
