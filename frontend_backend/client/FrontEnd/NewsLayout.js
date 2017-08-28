import React from 'react'
import NavbarNews from './NavbarNews'
import NewsPage from './NewsPage'
import NewsList from './NewsList'
import {Switch, Route} from 'react-router-dom'
import axios from 'axios'
import {api_url} from '../../config'
import _ from 'lodash'

export default class NewsLayout extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      listNews: []
    }
  }

  componentDidMount(){
    axios.get(api_url +'/news/brief').then(response => {
      this.setState({
        listNews: response.data
      })
      }).catch(error => {
        console.log('error: ', error)
      })
  }

  getNextNews = (currentId) => {
    let listNews = this.state.listNews
    let currIndex = _.findIndex(listNews, (currentNews) => {
      return currentNews.id == currentId
    })
    if(currIndex == listNews.length-1) {
      return currentId
    }
    return listNews[currIndex+1].id
  }

  getPrevNews = (currentId) => {
    let listNews = this.state.listNews
    let currIndex = _.findIndex(listNews, (currentNews) => {
      return currentNews.id == currentId
    })
    if(currIndex == 0) {
      return currentId
    }
    return listNews[currIndex-1].id
  }

  render(){
    if(this.state.listNews.length > 0){
      console.log('list')
      return(
        <div className="news-layout">
          <NavbarNews/>
          <Switch>
            <Route path='/news' exact={true} render={(props) => {
              return <NewsList {...props} listNews={this.state.listNews} />
            }}/>
            <Route path='/news/:id' render={(props)=> {
              return <NewsPage {...props} getPrevNews={this.getPrevNews} getNextNews={this.getNextNews}/>
            }}
              />
          </Switch>
        </div>
      )
    }
    else{
      return(
        <div>Wait a second</div>
      )
    }
  }
}