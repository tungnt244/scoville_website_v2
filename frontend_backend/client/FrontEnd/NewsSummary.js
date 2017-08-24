import React, {Component} from 'react'

export default class NewsSummary extends Component {

    constructor(props){
        super(props)
        this.state = {
            article: this.props.article || 'AIを活用したタクシー配車アプリの実用実験を今夏に開始、早くも兆…'
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            article: nextProps.article
        })
    }

    render(){
        console.log('hello', this.state.article)
        let id = this.state.article.id
        let url = '/news/' + id
        console.log('url', url)
        if(this.state.article)
            return(
                <div>
                    <p className="date-text text-left ">
                        2017.07.21
                    </p>
                    <a href={url} className="text-left blue-text">
                        {`${this.state.article.title}`}
                    </a>
                </div>
            )
        else{
            return(
                <div>Wait a minute</div>
            )
        }
    }
}