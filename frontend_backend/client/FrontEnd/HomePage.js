import React from 'react'
import MainImage from './MainImage'
import Navbar from './Navbar'
import CompanySection from './CompanySection'
import ServicesSection from './ServicesSection'
import RecruitmentSection from './RecruitmentSection'
import NewsSection from './NewsSection'
import AccessSection from './AccessSection'

export default class HomePage extends React.Component {
    render(){
        return(
            <div className="home-page">
                <MainImage/>
                <Navbar/>
                <CompanySection/>
                <ServicesSection/>
                <RecruitmentSection/>
                <NewsSection/>
                <AccessSection/>
            </div>
        )
    }
}