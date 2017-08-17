import Layout from './layout'
import NotFoundPage from './NotFoundPage'
import HomePage from './FrontEnd/HomePage';
import NewsLayout from './FrontEnd/NewsLayout';
import NewsList from './FrontEnd/NewsList';
import NewsPage from './FrontEnd/NewsPage';
import AdminLogin from './AdminLogin';
import CMSLayout from './CMS/CMSLayout';
import CMSManager from './CMS/CMSManager';
import CMSEditor from './CMS/CMSEditor';
import UMSLayout from './UMS/UMSLayout';
import UMSManager from './UMS/UMSManager';
import UMSUser from './UMS/UMSUser';
import FMSManager from './FMS/FMSManager';
import FMSForm from './FMS/FMSForm';
import React from 'react'
import {Route} from 'react-router-dom'

const routes = [{
    component: Layout,
    routes: [
        {
            path: '/', component: HomePage, exact: true
        },
        {
            path: '/news',
            component: NewsLayout,
        },
        {
            path: '/admin',
            component: AdminLogin,
            exact: true
        },
        {
            path: '/admin/cms',
            component: CMSLayout
        },
        {
            path: '/admin/users',
            component: UMSLayout,
            
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ]
}]

export default routes