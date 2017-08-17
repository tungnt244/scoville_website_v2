import React, {Component} from 'react'
import axios from 'axios'
import {url} from '../../config'
import checkValidToken from '../CheckValidToken'
import {renderRoutes} from 'react-router-config'
import {Switch, Route} from 'react-router'
import CMSManager from './CMSManager'
import CMSEditor from './CMSEditor'
export default class CMSLayout extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAdmin: false
        }
    }
    
    componentDidMount(){
        let checkTokenPromise = new Promise((resolve, reject) => {
            checkValidToken(() => resolve("success"))
        })
        
        checkTokenPromise.then(() => this.setState({
            isAdmin: true
        }))
    }

    render(){
        if(this.state.isAdmin){
            return(
                <Switch>
                    <Route path="/admin/cms" exact={true} component={CMSManager}/>
                    <Route path="/admin/cms/editor" exact={true} component={CMSEditor}/>
                    <Route path="/admin/cms/editor/:id" component={CMSEditor}/>
                </Switch>
            )
        }else{
            return(
            <div>
                You are not the admin
            </div>
        )
        }
    }
}