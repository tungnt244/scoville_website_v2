import React from 'react'
import {Link} from 'react-router-dom'

export default class AdminNavbar extends React.Component{

    render(){
        return(
            <ul>
                <li><Link to='/admin'>Login</Link></li>
                <li><Link to='/admin/cms'>Content</Link></li>
                <li><Link to='/admin/users'>USERS</Link></li>
                <li><Link to='/admin/forms'>FORMS</Link></li>
            </ul>
        )
    }
}