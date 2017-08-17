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
        console.log('hello')
        if(this.state.article)
            return(
                <div>
                    <p className="date-text text-left ">2017.07.21</p>
                    <a href="" className="text-left blue-text">
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

// <Media>
//                     <Media.Left>
//                         <Thumbnail href={`/news/${this.state.article.id}`} width={64} height={64} src={this.state.article.picture} alt="Image"/>
//                     </Media.Left>
//                     <Media.Body>
//                         <Media.Heading>{this.state.article.title}</Media.Heading>
//                         <p>{this.state.article.description}</p>
//                     </Media.Body>
//                 </Media>