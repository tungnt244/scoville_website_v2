import React from 'react'
import axios from 'axios'
import {api_url} from '../../config'
import {Link} from 'react-router-dom'

export default class NewsPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Title',
            content: 'Content',
        }
    }

    getNews = (id = this.props.match.params.id) => {
        axios.get(api_url +'/news/'+id).then(response => {
            let {content, description, id, picture, title} = response.data
            let nextId = this.props.getNextNews(id)
            let nextUrl = '/news/' + nextId
            let prevId = this.props.getPrevNews(id)
            let prevUrl = '/news/' + prevId
            this.setState({
                id: id,
                title: title,
                content: content,
                avatar: picture,
                description: description,
                nextUrl,
                prevUrl
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id != this.state.id){
            this.getNews(nextProps.match.params.id)
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.getNews()
        }else{
            this.setState({
                content: 'Can not load the new'
            })
        }

    }

    createMarkup() {
        return {__html: this.state.content};
    }

    MyComponent() {
        return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }

    render(){
        let link=''
        let back = link+'/news'
        const text = this.state.title;
        let url = "";
        if(typeof(window) !== "undefined") {
          url = window.location.href
        }
        return(
            <div>
                <div className="body-wrapper text-center">
                    <section>
                        <h2 className="news-section-heading" ><big>NEWS</big></h2>
                        <br/><br/>
                        <div className="social">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${url}">
                              <img className= "social-image" src="/images/facebook.png" />
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}">
                              <img className= "social-image" src="/images/twitter.png" />
                            </a>
                        </div>
                    </section>
                    <div className='container text-left'>
                        {this.MyComponent()}
                    </div>
                    <div className="button-container text-center">
                        <button className="newspage-button"> <Link to={this.state.nextUrl || '/'}> 前のニュースのタイトル</Link></button>
                        <button className="newspage-button"> <Link to={this.state.prevUrl || '/'} >次のニュースのタイトル</Link></button>
                    </div>
                </div>
                <footer className="gray-footer footer-text">
                        Copyright Scoville All Rights Reserved.
                </footer>
            </div>
        )
    }
}