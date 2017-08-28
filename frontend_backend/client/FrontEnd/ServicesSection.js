import React from  'react'

export default class ServicesSection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid text-center" id="SERVICES-container">
                    <section>
                        <h2 className="section-heading"><big>SERVICES</big></h2><br/>
                    </section>
                    <p className="real">
                        “real”と”tech driven”の融合
                    </p><br/>
                    <div id="services-text-container" className="container japanese-text big-line-space">
                        リアルだけでもない。Webだけでも完結しない。<br/>
                        “人のリアルと融合したproduct”をキーワードに、<br/>
                        <p id="twoline1">
                            事業領域を定めることなく、創業1年半の間に13の事業を創造しています。
                        </p>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/HR.png"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/media.png"/>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/geeksalon.png"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/web.png"/>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/food.png"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/artificialInteligence.png"/>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/app.png"/>
                        </div>
                    </div><br/><br/>
                    <p id="small-text" className="japanese-text text-right">
                        ※年内ローンチ予定事業含む 
                    </p>
                </div>
                <hr id="RECRUITMENT"/>
            </div>
        )
    }
}