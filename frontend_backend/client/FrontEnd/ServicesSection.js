import React from  'react'

export default class ServicesSection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid text-center grey-background" id="SERVICES-container">
                    <section>
                        <h2 className="section-heading"><big>SERVICES</big></h2><br/>
                    </section>
                    <p className="real">“real”と”tech driven”の融合</p><br/>
                    <div id="services-text-container" className="container japanese-text big-line-space">
                    リアルだけでもない。Webだけでも完結しない。<br/>
                    “人のリアルと融合したproduct”をキーワードに、<br/>
                    <p id="twoline1">事業領域を定めることなく、創業1年半の間に13の事業を創造しています。</p>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/mediaicon.png"/>
                            <p className="japanese-text text-center">メディア開発事業</p>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/HR.png"/>
                            <p className="japanese-text text-center">HR領域</p>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/webService.png"/>
                            <p className="japanese-text text-center">ウェブサービス</p>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/AI.png"/>
                            <p className="japanese-text text-center">人工知能活用事業</p>
                        </div>
                    </div>
                    <div className="row small-row">
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/food.png"/>
                            <p className="japanese-text text-center">飲食店事業</p>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/engineerEducation.png"/>
                            <p className="japanese-text text-center">エンジニア教育事業</p>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <img className="img-responsive imgcenter" src="/images/app.png"/>
                            <p className="japanese-text text-center">アプリ開発事業</p>
                            <hr id="RECRUITMENT"/>
                        </div>
                    </div><br/><br/>
                    <p id="small-text" className="japanese-text text-right">※年内ローンチ予定事業含む </p>
                </div>
            </div>
              )
            }
}