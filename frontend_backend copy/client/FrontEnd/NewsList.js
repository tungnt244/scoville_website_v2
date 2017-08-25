import React from 'react'
import axios from 'axios'
import {api_url} from '../../config'
import NewsSummary from './NewsSummary'

export default class NewsList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount(){
        axios.get(api_url +'/news/brief').then(response => {
            this.setState({
                news: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
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
        if(this.state.news.length > 0){
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
        else
            return(<div>Wait a second</div>)
    }
}

