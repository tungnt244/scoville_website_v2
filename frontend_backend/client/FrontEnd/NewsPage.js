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
        return(
            <div>{this.MyComponent()}</div>
        )
    }
}