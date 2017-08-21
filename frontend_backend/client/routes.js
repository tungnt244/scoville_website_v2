import Layout from './layout'
import NotFoundPage from './NotFoundPage'
import HomePage from './FrontEnd/HomePage';
import NewsLayout from './FrontEnd/NewsLayout';
import NewsList from './FrontEnd/NewsList';
import NewsPage from './FrontEnd/NewsPage';
import AdminLayout from './AdminLayout';
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
            component: AdminLayout,
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ]
}]

export default routes