import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from "./reducer";

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
//应用redux的异步中间件