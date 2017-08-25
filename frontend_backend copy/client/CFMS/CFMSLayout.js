import React, {Component} from 'react'
import {Switch, Route} from 'react-router'
import CFMSManager from './CFMSManager'
import CFMSForm from './CFMSForm'

export default class CFMSLayout extends Component {

    render(){
        return(
            <Switch>
                <Route path="/admin/contacts" exact={true} component={CFMSManager}/>
                <Route path="/admin/contacts/:id" component={CFMSForm}/>
            </Switch>
        )
    }

}