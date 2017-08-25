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
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLogged: nextProps.isLogged
        })
    }

    componentDidMount(){
        if(localStorage.getItem("token")) {
            checkValidToken().then(response => {
                if(response.data){
                    return this.props.setLogin(true)
                }
            }).catch(error => {
                if(error.response){
                    console.log('error: ', error.response)
                }else if(error.request){
                    console.log('error: '. error.request)
                }else{
                    console.log('error: ', error)
                }
                return this.props.setLogin(false)
            })
        } else {
            return this.props.setLogin(false)
        }
        
    }

    render(){
        if(!this.state) {
            return(
                <h1 className="text-center">Please wait...</h1>
            )
        }

        if(!this.state.isLogged){
            return(
            <div>
                <Route exact path='/admin' component={AdminLogin}/>
            </div>
            )
        }

        return(
            <div>
                <AdminNavbar/>
                <Switch>
                    <Route exact path='/admin' component={CMSLayout}/>
                    <Route path='/admin/cms' component={CMSLayout}/>
                    <Route path='/admin/users' component={UMSLayout}/>
                    <Route path='/admin/forms' component={FMSLayout}/>
                    <Route path='/admin/contacts' component={CFMSLayout}/>
                    <Route path='/admin/logout' component={AdminLogin}/>
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