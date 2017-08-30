import React from 'react'
import NewsSummary from './NewsSummary'

export default class NewsList extends React.Component {

    constructor(props){
        super(props)
        console.log('props', this.props)
        this.state = {
            news: this.props.listNews
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('next', nextProps)
    }

    renderAllSummary(){
        let news = this.state.news
        let temp = []
        for(let i=0; i<news.length; i++){
            temp.push(<NewsSummary key={news[i].id} new={news[i]}/>
        )}
        return temp
    }

    render(){
        console.log(this.state)
        return(
            <div>
               <div className="container body-wrapper" id="newslist-container">
                  <div className="text-center">
                     <section>
                        <h2 className="news-section-heading" ><big>NEWS</big></h2>
                        <br/><br/>
                     </section>
                  </div>
                  {this.renderAllSummary()}
               </div>
               <footer className="gray-footer footer-text">
                  Copyright Scoville All Rights Reserved.
               </footer>
            </div>
        )
    }
}

