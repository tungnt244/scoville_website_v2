import React, {Component} from 'react'
import {Switch, Route} from 'react-router'
import FMSManager from './FMSManager'
import FMSForm from './FMSForm'

export default class CMSLayout extends Component {

    render(){
        return(
            <Switch>
                <Route path="/admin/forms" exact={true} component={FMSManager}/>
                <Route path="/admin/forms/:id" component={FMSForm}/>
            </Switch>
        )
    }

}