import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {RouterContext, match, createRoutes} from 'react-router'
import appRouter from '../client/router'
import PropTypes from 'prop-types';

var router = express.Router()
const routes = createRoutes(appRouter())

class DataProvider extends React.Component {
  getChildContext(){
    return {
      data: this.props.data
    }
  }
  render() {
    return <RouterContext {...this.props}/>
  }
}

DataProvider.propTypes = {
  data: PropTypes.object
}

DataProvider.childContextTypes = {
  data: PropTypes.object
}

// router.get('/list', (req, res) => {
//   console.log('in here')
//   match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       fetch('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
//         const data = {items: JSON.parse(body)};
//         const content = renderToString(<DataProvider {...renderProps} data={data}/>);
//         res.render('index', {title: 'Express', data, content});
//       });
//     } else {
//       res.status(404).send('Not Found');
//     }
//   });
// })

router.get('*', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(<RouterContext {...renderProps}/>)
      res.render('index', {title: 'Express', data: false, content})
    } else {
      res.status(404).send('Not Found');
    }
  });
})



module.exports = router;
