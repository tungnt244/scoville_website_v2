import React, {Component} from 'react'
import {Switch, Route} from 'react-router'
import UMSManager from './UMSManager'
import UMSUser from './UMSUser'
export default class UMSLayout extends Component {

    render(){
        return(
            <Switch>
                <Route path="/admin/users" exact={true} component={UMSManager}/>
                <Route path="/admin/users/create" exact={true} component={UMSUser}/>
                <Route path="/admin/users/:id" component={UMSUser}/>
            </Switch>
        )
    }
}