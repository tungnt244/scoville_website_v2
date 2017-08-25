import React from  'react'
import axios from 'axios'
import {api_url} from '../../config'
import NewsSummary from './NewsSummary'
export default class NewsSection extends React.Component{

    constructor(props){
        super(props)
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
        for(let i=0; i<news.length && i<4; i++){
            temp.push(<NewsSummary key={news[i].id} new={news[i]}/>
        )}
        return temp
    }

    render(){
        let url ='/news'
        return(
            <div>
                <hr id="NEWS"/>
                <div className="container bottom-padding" id="news-container">
                    <div className="text-center">
                        <section>
                            <h2 className="section-heading" ><big>NEWS</big></h2>
                            <br/><br/>
                        </section>
                    </div>
                    {this.state && this.renderAllSummary()}
                    <div className="text-center">
                        <a href={url}><button className="btn button-news"><span className="btn-word">see more</span></button></a>
                    </div>
                        <br/><br/><br/><br/><hr id="ACCESS"/>
                </div>
            </div>
        )
    }
}