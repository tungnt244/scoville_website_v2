import React from 'react'

export default class Home extends React.Component{

    componentDidMount(){
        console.log('did mounted')
    }

    render(){
        console.log('render')
        return(
            <div>
                <h1>This is homepage</h1>
            </div>
        )
    }
}