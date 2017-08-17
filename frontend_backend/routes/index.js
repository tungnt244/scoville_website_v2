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

import getArticlesBrief from './api/getArticlesBrief';
import deleteArticleById from './api/deleteArticleById';
import login from './api/login';
import checkToken from './api/CheckToken';
const router = express.Router()

const store = createStore(reducers, applyMiddleware(thunk));

router.get('/cms/checktoken', (req, res) => {
  checkToken(req.get("Authorization"), (isValid) => {
    if(isValid) res.send({isValid: isValid})
    else return res.send("Token is not valid")  
  })
})

router.get('/cms/news/brief', (req, res) => {
  getArticlesBrief((articles) => {
    if(articles) res.send(articles)
    else return res.status(404).send("Not good")
  })
})

router.delete('/cms/news/:id', (req, res) => {
  deleteArticleById(req.params.id, (message)=> {
    if(message) res.send(message)
    else return res.status(404).send("delete article failed")
  })
})

router.post('/admin/login', (req, res) => {
  login(req.body, (response) => {
    if(response.token){
      return res.send({
        email: response.email,
        token: response.token
      })
    }else {
      console.log('error : ', response.error)
      return res.status(401).send(response.error)
    }
  })
})

router.get('*', (req, res) => {
  console.log('heelo worl')
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
module.exports = router;
