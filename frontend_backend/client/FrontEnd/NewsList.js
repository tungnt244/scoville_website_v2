import React from 'react'
import axios from 'axios'
import {api_url} from '../../config'
import NewsSummary from './NewsSummary'

export default class NewsList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        axios.get(api_url +'/news/brief').then(response => {
            this.setState({
                articles: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    renderAllSummary(){
        let articles = this.state.articles
        let temp = []
        for(let i=0; i<articles.length; i++){
            console.log(i, JSON.stringify(articles[i], null, 4))
            temp.push(<NewsSummary key={articles[i].id} article={articles[i]}/>)
        }
        console.log('temp', temp)
        return temp
    }

    render(){
        if(this.state.articles.length > 0){
            return(
            <div>
                <div className="container" id="newslist-container">
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
        }else
            return(<div>Wait a second</div>)
    }
}

