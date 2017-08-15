import React from 'react'
import {Router, browserHistory, Route} from 'react-router'

import AppRoot from './app-root.js'
import Home from './home.js'
import List from './list.js'

const AppRouter = () => {
    return(
        <Router history={browserHistory}>
            <Route path='/' component={AppRoot}>
                <Route path='/list' component={List}/>
                <Route path='/home' component={Home}/>
            </Route>
        </Router>
    )
}

export default AppRouter;