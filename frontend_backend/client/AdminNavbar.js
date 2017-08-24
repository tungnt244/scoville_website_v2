import React from 'react'
import {Link} from 'react-router-dom'

export default class AdminNavbar extends React.Component{



    render(){
        return(
            <div className="collapse navbar-collapse" id="news-navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                    <li><Link className="news-big-word" to='/admin/cms'>Content</Link></li>
                    <li><Link className="news-big-word" to='/admin/users'>Users</Link></li>
                    <li><Link className="news-big-word" to='/admin/forms'>Forms</Link></li>
                    <li><Link className="news-big-word" to='/admin/contacts'>Contacts</Link></li>
                    <li><Link className="news-big-word" to='/admin/logout'>Logout</Link></li>
              </ul>
            </div>
        )
    }
}