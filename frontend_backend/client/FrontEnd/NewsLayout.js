import React from 'react'
import NavbarNews from './NavbarNews'
import NewsPage from './NewsPage'
import NewsList from './NewsList'
import {Switch, Route} from 'react-router-dom'

export default class NewsLayout extends React.Component {
  render(){
    return(
      <div className="news-layout">
        <NavbarNews/>
        <Switch>
          <Route path='/news' exact={true} component={NewsList}/>
          <Route path='/news/:id' component={NewsPage}/>
        </Switch>
      </div>
    )
  }
}