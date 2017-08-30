import React from  'react'

export default class ServicesSection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid text-center" id="SERVICES-container">
                    <section>
                        <h2 className="section-heading"><big>SERVICES</big></h2>
                        <br/>
                    </section>
                    <p className="real">
                        “real”と”tech driven”の融合
                    </p>
                    <br/>
                    <div id="services-text-container" className="container japanese-text big-line-space">
                        リアルだけでもない。Webだけでも完結しない。<br/>
                        “人のリアルと融合したproduct”をキーワードに、<br/>
                        <p id="twoline1">
                            事業領域を定めることなく、創業1年半の間に13の事業を創造しています。
                        </p>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/HR.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hoverHR.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/media.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hovermedia.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/geeksalon.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hovergeeksalon.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/web.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hoverweb.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/food.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hoverfood.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/artificialIntelligence.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hoverartificialIntelligence.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="hover">
                                <img className="imgcenter" src="/images/app.png"/>
                                <div className="overlay">
                                    <img className="imgcenter img-overlay" src="/images/hoverapp.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                        </div>
                    </div>
                    <br/><br/>
                    <p id="small-text" className="japanese-text text-right">
                        ※年内ローンチ予定事業含む 
                    </p>
                </div>
                <hr id="RECRUITMENT"/>
            </div>
        )
    }
}