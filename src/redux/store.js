
import {createStore,applyMiddleware} from 'redux'
import moduleName from 'redux-thunk'
import reducer from './reducer'

 
export default createStore(reducer,applyMiddleware(thunk))