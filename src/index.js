import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './redux/store'

import App from './containers/App'

ReactDOM.render((
    <Provider store={store}>  {/* 内部向容器组件提供store*/}
        <App/>
    </Provider>      
),document.getElementById('root'))

/* store.subscribe(()=>{
ReactDOM.render(<App store={store}/>,document.getElementById('root'))
}) */