import React, {Component} from 'react'
import {Switch, Route} from 'react-router'
import CMSManager from './CMSManager'
import CMSEditor from './CMSEditor'
export default class CMSLayout extends Component {

    render(){
        return(
            <Switch>
                <Route path="/admin/cms" exact={true} component={CMSManager}/>
                <Route path="/admin/cms/editor" exact={true} component={CMSEditor}/>
                <Route path="/admin/cms/editor/:id" component={CMSEditor}/>
            </Switch>
        )
    }
}