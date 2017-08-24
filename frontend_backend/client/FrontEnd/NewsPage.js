import React from 'react'
import axios from 'axios'
import {api_url} from '../../config'

export default class NewsPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Title',
            content: 'Content'
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            axios.get(api_url +'/news/'+this.props.match.params.id).then(response => {
                let {content, description, id, picture, title} = response.data
                this.setState({
                id: id,
                title: title,
                content: content,
                avatar: picture,
                description: description
                })
            }).catch(error => {
                console.log('error: ', error)
            })
        }else{
            this.setState({
                content: 'Can not load the article'
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
        const text = this.state.title;
        let url = "";
        if(typeof(window) !== "undefined") {
          url = window.location.href
        }
        return(
            <div>
                <div className="text-center">
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
                </div>
                <div className='container'>
                    {this.MyComponent()}
                </div>
                <footer className="gray-footer footer-text">
                        Copyright Scoville All Rights Reserved.
                </footer>
            </div>
        )
    }
}