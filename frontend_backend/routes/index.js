import express from 'express'
import request from 'request'

import React from 'react'
import {renderToString} from 'react-dom/server'

import StaticRouter from 'react-router-dom/StaticRouter'
import {matchRoutes, renderRoutes} from 'react-router-config'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import routes from '../client/routes'
import reducers from '../client/modules'

const app = express()

const router = express.Router()

const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);
    let context = {}
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
  
  if(context.status === 404){
    res.status(404)
  }
  if(context.status === 302){
    return res.redirect(302, context.url)
  }
  res.render('index', {title: 'Express', data: store.getState(), content});
})

module.exports = router  
