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
import checkToken from './api/CheckToken';

import {getForms, getSingleForm, putSingleForm, deleteSingleForm} from './api/Form';

const app = express()

const router = express.Router()

const store = createStore(reducers, applyMiddleware(thunk));

router.use('/cms*', function(req, res, next){
  console.log('check token middleware')
  checkToken(req.get("Authorization"), (isValid)=> {
    if(isValid) next()
    else return
  })
})

router.use('/forms*', function(req, res, next){
  checkToken(req.get("Authorization"), (isValid)=> {
    if(isValid) next()
    else return
  })
})

router.get('/forms/recruitment', (req, res) => {
  getForms(form => {
    if(form) res.send(form)
    else return res.status(404).send(form)
  })
})

router.get('/forms/recruitment/:id', (req, res) => {
  getSingleForm(req.params.id, (form) => {
    if(form) res.send(form)
    else return res.status(404).send("failed to get form")
  })
})

router.put('/forms/recruitment/:id', (req, res) => {
  putSingleForm(req.params.id, req.body.status, (isOk) => {
    if(isOk) res.send("Successful updated")
    else return res.status(404).send("failed to get form")
  })
})

router.delete('/forms/recruitment/:id', (req, res) => {
  deleteSingleForm(req.params.id, (message)=>{
    if(message) res.send("Successful deleted")
    else return res.status(404).send("failed to delete form")
  })
})

router.get('/cms/news/brief', (req, res) => {
  getArticlesBrief((articles) => {
    if(articles) res.send(articles)
    else return res.status(404).send("failed to get articles")
  })
})

router.delete('/cms/news/:id', (req, res) => {
  deleteArticleById(req.params.id, (message)=> {
    if(message) res.send(message)
    else return res.status(404).send("failed to delete article")
  })
})

router.get('/admin/checktoken', (req, res) => {
  checkToken(req.get("Authorization"), (isValid) => {
    if(isValid) res.send({isValid: isValid})
    else return res.send("Token is not valid")  
  })
})

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
