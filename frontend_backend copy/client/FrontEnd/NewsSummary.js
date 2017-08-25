import React, {Component} from 'react'

export default class NewsSummary extends Component {

    constructor(props){
        super(props)
        this.state = {
            new: this.props.new || 'AIを活用したタクシー配車アプリの実用実験を今夏に開始、早くも兆…'
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            new: nextProps.new
        })
    }

    render(){
        let id = this.state.new.id
        let url = '/news/' + id
        let date = new Date(this.state.new.created_at)
        let dateFormat = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        if(this.state.new)
            return(
                <div>
                    <p className="date-text text-left ">
                        {dateFormat}
                    </p>
                    <a href={url} className="text-left blue-text">
                        {`${this.state.new.title}`}
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