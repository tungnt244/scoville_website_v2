import React, {Component} from 'react'
import axios from 'axios'
import {url} from '../../config'
import checkValidToken from '../CheckValidToken'
import {renderRoutes} from 'react-router-config'
import {Switch, Route} from 'react-router'
import UMSManager from './UMSManager'
import UMSUser from './UMSUser'
export default class UMSLayout extends Component {

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
                    <Route path="/admin/users" exact={true} component={UMSManager}/>
                    <Route path="/admin/users/create" exact={true} component={UMSUser}/>
                    <Route path="/admin/users/:id" component={UMSUser}/>
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