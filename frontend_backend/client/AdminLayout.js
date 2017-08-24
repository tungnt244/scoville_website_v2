import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminLogin from './AdminLogin'
import {Switch, Route} from 'react-router-dom'
import CMSLayout from './CMS/CMSLayout'
import UMSLayout from './UMS/UMSLayout'
import FMSLayout from './FMS/FMSLayout'
import CFMSLayout from './CFMS/CFMSLayout'
import checkValidToken from './CheckValidToken'
import {connect} from 'react-redux'
import {actionSetLogin} from './modules/isLogin'

class AdminLayout extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: this.props.isLogged
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isLogged != this.state.isLogged){
            this.setState({
                isLogged: nextProps.isLogged
            })
        }
    }

    componentDidMount(){
        if(localStorage.getItem("token")) {
            checkValidToken(()=>{
                this.props.setLogin(true)
            })
        } else{localStorage.clear()}
    }

    render(){
        if(!this.state.isLogged){
            return(
            <div>
                <AdminNavbar/>
                <Route exact path='/admin' component={AdminLogin}/>
            </div>
            )
        }
        return(
            <div>
                <AdminNavbar/>
                <Switch>
                    <Route exact path='/admin' component={AdminLogin}/>
                    <Route path='/admin/cms' component={CMSLayout}/>
                    <Route path='/admin/users' component={UMSLayout}/>
                    <Route path='/admin/forms' component={FMSLayout}/>
                    <Route path='/admin/contacts' component={CFMSLayout}/>
                </Switch>              
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setLogin: (isLogged) => {
            dispatch(actionSetLogin(isLogged))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)