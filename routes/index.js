import express from 'express';
import appRouter from '../client/router';
import {match, createRoutes} from 'react-router'

var router = express.Router();
const routes = createRoutes(appRouter())
/* GET home page. */
router.get('*', (req, res) => {
  match({routes, location:req.url}, (err, redirectLocation, renderProps) =>{
    // check for error and redirection
    const content = renderToString(<RouterContext {...renderProps}/>)
  })
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
